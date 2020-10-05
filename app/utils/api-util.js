import axios from "axios";
import qs from "qs";
import r from "jsrsasign";
import { Platform } from "react-native";
import { Base64 } from "js-base64";
import DeviceInfo from "react-native-device-info";
import CodePush from "react-native-code-push";
import moment from "moment";

import Constants from "../../constants";
import { getSecureStoreKey } from "./storage-util";
import store from "../redux/store";
import * as actions from "../redux/actions";
import mixpanelAnalytics from "./mixpanel-analytics";
import { SCREENS } from "../constants/SCREENS";
import { STORAGE_KEYS } from "../constants/DATA";

const { CLIENT_VERSION, ENV, PUBLIC_KEY, API_URL } = Constants;
let token;
let deviceModel;
let osVersion;
let buildVersion;
const decodedPublicKey = Base64.decode(PUBLIC_KEY);
// NOTE: used for logging API call durations
const shouldLogDurations = false;
const durations = {};

export default {
  initInterceptors,
  areCallsInProgress,
  parseValidationErrors,
  wereSuccessfulInHistory,
};

/**
 * Initializes axios interceptors for every HTTP request
 */
function initInterceptors() {
  axios.interceptors.request.use(requestInterceptor, error =>
    Promise.reject(error)
  );

  axios.interceptors.response.use(responseInterceptor, errorInterceptor);
}

/**
 * Intercepts every request going through axios and sets all important headers
 */
async function requestInterceptor(req) {
  // Cancel if no internet internet connection
  const { internetConnected } = store.getState().app;
  if (!internetConnected) return false;

  const newRequest = { ...req };

  if (req.url.includes(API_URL)) {
    newRequest.headers = {
      ...newRequest.headers,
      ...setContentTypeHeaders(req),
      ...setDeviceInfoHeaders(),
      ...(await setAppVersionHeaders()),
      ...(await setDeviceIds()),
      ...setGeolocationHeaders(),
      ...(await setAuthHeaders()),
    };

    // NOTE: measures the duration of API call
    if (shouldLogDurations) {
      durations[req.url] = moment();
    }
  }

  if (
    newRequest.method === "post" &&
    newRequest.headers["Content-Type"] !== "multipart/form-data"
  ) {
    newRequest.data = qs.stringify(newRequest.data);
  }

  /* eslint-disable no-underscore-dangle */
  // console.log({ [req.method.toUpperCase()]: newRequest })
  /* eslint-enable no-underscore-dangle */

  return newRequest;
}

/**
 * Sets marketing and Device IDs: AFID, IDFA, AAID and device id
 */
async function setDeviceIds() {
  let deviceId = await store.getState().app.deviceId;
  let AFID = await store.getState().app.appsFlyerUID;
  let IDFA =
    Platform.OS === "ios" && (await store.getState().app.advertisingId);
  let AAID =
    Platform.OS === "android" && (await store.getState().app.advertisingId);

  if (!AFID) {
    await store.dispatch(actions.setAppsFlyerUID());
    AFID = store.getState().app.appsFlyerUID;
  }

  if (!deviceId) {
    store.dispatch(actions.setDeviceId());
    deviceId = await store.getState().app.deviceId;
  }

  if (Platform.OS === "android" && !AAID) {
    await store.dispatch(actions.setAdvertisingId());
    AAID = store.getState().app.advertisingId;
  }

  if (Platform.OS === "ios" && !IDFA) {
    await store.dispatch(actions.setAdvertisingId());
    IDFA = store.getState().app.advertisingId;
  }

  return {
    "X-Advertising-AFID": AFID,
    "X-Advertising-IDFA": IDFA,
    "X-Advertising-AAID": AAID,
    "X-Advertising-DEVICE-ID": deviceId,
  };
}

/**
 * Sets Geolocation headers for every request
 */
function setGeolocationHeaders() {
  const { geolocation } = store.getState().app;
  return {
    "geo-lat": geolocation && geolocation.geoLat,
    "geo-long": geolocation && geolocation.geoLong,
  };
}

/**
 * Sets Device Info Headers
 */
function setDeviceInfoHeaders() {
  return {
    deviceModel: deviceModel || DeviceInfo.getModel(),
    osVersion: osVersion || DeviceInfo.getSystemVersion(),
    os: Platform.OS,
    deviceYearClass: Constants.deviceYearClass,
    installationId: Constants.installationId,
  };
}

/**
 * Sets Content-Type of request
 */
function setContentTypeHeaders(request) {
  const { url, data, headers, method } = request;
  let contentType = headers["Content-Type"];
  let accept = headers.Accept;

  if (method === "post") {
    contentType = "application/x-www-form-urlencoded; charset=UTF-8";
    accept = "application/json";
  }

  if (
    (url.includes("profile/profile_picture") && !data.profile_picture_url) ||
    url.includes("user/profile/documents")
  ) {
    contentType = "multipart/form-data";
  }

  return {
    "Content-Type": contentType,
    Accept: accept,
  };
}

/**
 * Sets Current app version Headers
 */
async function setAppVersionHeaders() {
  const clientVersion = ENV === "PRODUCTION" ? CLIENT_VERSION : ENV;
  if (!buildVersion) {
    const metadata = await CodePush.getUpdateMetadata();
    buildVersion = metadata ? `${clientVersion}@${metadata.label}` : "local";
  }

  return {
    "X-Client-Version": clientVersion,
    buildVersion,
  };
}

/**
 * Sets User Bearer token
 */
async function setAuthHeaders() {
  try {
    const storageToken = await getSecureStoreKey(
      STORAGE_KEYS.SECURITY_STORAGE_AUTH_KEY
    );
    if (token !== storageToken) token = storageToken;
  } catch (err) {
    mixpanelAnalytics.logError("setAuthHeaders", err);
  }
  return {
    authorization: token && `Bearer ${token}`,
  };
}

/**
 * Intercepts every successful response from server
 */
async function responseInterceptor(res) {
  const { backendStatus } = store.getState().generalData;
  const sign = res.headers["x-cel-sign"];
  const data = res.data;

  // NOTE: logs API call duration to // console
  if (shouldLogDurations) {
    durations[res.config.url] = moment().diff(
      durations[res.config.url],
      "seconds",
      true
    );
    // eslint-disable-next-line no-console
    console.log({ [res.config.url]: durations[res.config.url] });
  }

  if (
    res.config.url.includes(API_URL) &&
    backendStatus &&
    backendStatus.maintenance
  ) {
    store.dispatch(actions.toggleMaintenanceMode());
  }

  if (verifyKey(data, sign)) {
    /* eslint-disable no-underscore-dangle */
    // console.log({ RESPONSE: res })
    /* eslint-enable no-underscore-dangle */

    return res;
  }

  const err = {
    type: "Sign Error",
    msg: "Wrong API key",
  };

  /* eslint-disable no-underscore-dangle */
  // console.log({ API_ERROR: err })
  /* eslint-enable no-underscore-dangle */

  return Promise.reject(err);
}

/**
 * Intercepts every error response from server
 */
async function errorInterceptor(serverError) {
  const defaultMsg = "Oops, it looks like something went wrong!";
  const defaultError = {
    slug: "UNKNOWN_SERVER_ERROR",
    type: "Unknown Server Error",
    msg: defaultMsg,
    raw_error: serverError,
  };

  const err = serverError.response ? serverError.response.data : defaultError;

  if (!err.msg) err.msg = defaultMsg;
  if (!err.status)
    err.status = serverError.response ? serverError.response.status : null;

  if (!err.slug) {
    err.slug = "NO_SLUG";

    // 426 doesn't return a slug, we have a lot of false ooops errors on mixpanel
    if (err.status === 426) {
      err.slug = "VERIFICATION_REQUIRED";
      err.msg = null;
    }
  }

  mixpanelAnalytics.apiError({
    ...err,
    url: serverError.config && serverError.config.url,
    method: serverError.config && serverError.config.method,
  });

  if (err.status === 401) handle401(err);
  if (err.status === 403) {
    if (err.slug === "SIX_DIGIT_PIN_REQUIRED") {
      await handleSixDigitPinChange(serverError.config);
      return;
    }
    await handle403(err);
  }
  if (err.status === 426) {
    const res = await handle426(err, serverError.config);
    return Promise.resolve(res);
  }
  if (err.status === 429) handle429();
  if (err.status === 503) handle503(err);

  /* eslint-disable no-underscore-dangle */
  // console.log({ API_ERROR: err })
  /* eslint-enable no-underscore-dangle */

  return Promise.reject(err);
}

async function handle401(err) {
  if (err.slug === "SESSION_EXPIRED") {
    store.dispatch(actions.expireSession());
    store.dispatch(actions.logoutFormDevice());
  }
  if (err.slug === "PASSWORD_LEAKED") {
    store.dispatch(actions.resetToScreen(SCREENS.PASSWORD_BREACHED));
  }
  if (err.slug === "TWO_FACTOR_INVALID_CODE") {
    store.dispatch(actions.showMessage("error", err.msg));
  }
  if (err.slug === "COMPLIANCE_ERROR") {
    if (err.type === "BitWala") {
      store.dispatch(actions.navigateTo(SCREENS.BITWALA));
    }
  }
}

async function handle403(err) {
  if (err.slug === "USER_SUSPENDED") {
    const { profile } = store.getState().user;
    if (profile && profile.id) {
      store.dispatch(actions.logoutFormDevice());
    }
    store.dispatch(actions.showMessage("error", err.msg));
  }
  if (err.slug === "Token Expired") {
    store.dispatch(actions.logoutFormDevice("login", "inactiveUser", err.msg));
  }
}

async function handleSixDigitPinChange(reqConfig) {
  return new Promise((resolve, reject) => {
    const { formData } = store.getState().forms;
    if (formData.pin || formData.code) {
      navigateToSixDigitFlow(reqConfig, resolve, reject);
    } else {
      store.dispatch(
        actions.navigateTo(SCREENS.VERIFY_PROFILE, {
          hideBack: true,
          showLogOutBtn: true,
          onSuccess: () => {
            navigateToSixDigitFlow(reqConfig, resolve, reject);
          },
        })
      );
    }
  });
}

function navigateToSixDigitFlow(reqConfig, resolve, reject) {
  store.dispatch(
    actions.navigateTo(SCREENS.SIX_DIGIT_PIN_EXPLANATION, {
      onSuccess: async () => {
        try {
          // fetch failed request again after verification successful
          const res = await axios(reqConfig);
          store.dispatch(actions.resetToScreen(SCREENS.WALLET_LANDING));
          store.dispatch(actions.updateFormField("loading", false));
          return resolve(res);
        } catch (e) {
          return reject(e);
        }
      },
    })
  );
}

async function handle426(err, reqConfig) {
  return new Promise((resolve, reject) => {
    // get active screen before rerouting
    const { activeScreen } = store.getState().nav;

    if (activeScreen !== SCREENS.VERIFY_PROFILE) {
      store.dispatch(
        actions.navigateTo(SCREENS.VERIFY_PROFILE, {
          hideBack: true,
          showLogOutBtn: true,
          // PIN || 2FA
          verificationType: err.show,
          hasSixDigitPin: err.has_six_digit_pin,
          biometrics_enabled: err.biometrics_enabled,
          onSuccess: async () => {
            try {
              // fetch failed request again after verification successful
              const res = await axios(reqConfig);

              // navigate back
              if (
                ![
                  SCREENS.LOGIN_LANDING,
                  SCREENS.LOGIN,
                  SCREENS.SPLASH_SCREEN,
                ].includes(activeScreen)
              ) {
                store.dispatch(actions.navigateBack());
              }

              // return successful response
              return resolve(res);
            } catch (e) {
              return reject(e);
            }
          },
        })
      );
    }
  });
}

function handle429() {
  store.dispatch(actions.navigateTo(SCREENS.TOO_MANY_REQUESTS));
}

function handle503(err) {
  if (err.slug === "BREAK_THE_GLASS") {
    store.dispatch(actions.toggleMaintenanceMode(err.title, err.explanation));
  }
}

/**
 * Checks if api calls are in progress
 *
 * @param {Array} callsToCheck - array of api call names from API.js
 * @param {Array} callsInProgress - calls currently in progress
 * @returns {boolean}
 */
function areCallsInProgress(callsToCheck, callsInProgress = undefined) {
  const calls = callsInProgress || store.getState().api.callsInProgress;
  return !!calls.filter(cip => callsToCheck.indexOf(cip) !== -1).length;
}

/**
 * Parses validation errors from server
 *
 * @param {Object} serverError - error response from the server
 * @returns {Object} validationErrors - key/value pairs for errors, key is the field name, value is the error message from server
 */
function parseValidationErrors(serverError) {
  const errKeys = Object.keys(serverError.raw_error);
  const validationErrors = {};

  errKeys.forEach(ek => {
    validationErrors[ek] = serverError.raw_error[ek].msg;
  });

  return validationErrors;
}

/**
 * Checks if some endpoints were successful in history
 *
 * @param {Array} callNames - array of calls from API
 * @param {Number} numberOfCallsInHistory - number of calls to look into history
 * @return {Boolean}
 */
function wereSuccessfulInHistory(callNames, numberOfCallsInHistory = 5) {
  const history = store.getState().api.history;
  const succesfulCalls = callNames.map(cn => `${cn}_SUCCESS`);
  const lastNCalls = history.slice(0, numberOfCallsInHistory);

  let wereSuccessful = false;

  lastNCalls.forEach(cn => {
    wereSuccessful = wereSuccessful || succesfulCalls.includes(cn);
  });

  return wereSuccessful;
}

/**
 * Verifies the data with signature key from the server
 *
 * @param {Object} data - data from server response
 * @param {string} sign - sign from response headers
 * @returns {boolean}
 *
 * endpont /users/hodl_mode/begin returns wrong api key
 * CN-4875 Wire hodl mode
 */

function verifyKey(data, sign) {
  const sig2 = new r.KJUR.crypto.Signature({ alg: "SHA256withRSA" });
  sig2.init(decodedPublicKey);
  if (typeof data === "string") {
    sig2.updateString(data);
  } else {
    sig2.updateString(JSON.stringify(data));
  }
  const isValid = sig2.verify(sign);
  return isValid;
}
