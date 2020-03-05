import { Platform } from "react-native";
import Mixpanel from "react-native-mixpanel";

import store from "../redux/store";
import appUtil from "./app-util";
import loggerUtil from "./logger-util";
import Constants from "../../constants";
import { getSecureStoreKey, deleteSecureStoreKey } from "./expo-storage";

let userData = {};

let advertisingId;

let revisionId = "";
let version = "";

const appInfo = { os: Platform.OS };

/**
 * Initialize Mixpanel
 */
async function initMixpanel() {
  const { MIXPANEL_TOKEN } = Constants;
  try {
    await Mixpanel.sharedInstanceWithToken(MIXPANEL_TOKEN);
  } catch (err) {
    loggerUtil.log(err);
  }
}

/**
 * Init user data to Mixpanel
 */
async function engage(distinctId, payload = {}) {
  const { MIXPANEL_TOKEN } = Constants;

  Mixpanel.createAlias(distinctId);

  const data = { $set: { ...payload } };
  data.$distinct_id = distinctId;
  data.$token = MIXPANEL_TOKEN;
  Mixpanel.set(data);

  Mixpanel.identify(distinctId);
  await addPushDeviceToken();
}

/**
 * Send event attribution
 *
 * @param {string} event - name of the event
 * @param {Object} data - payload
 */
async function sendEvent(event, data = {}) {
  const { MIXPANEL_TOKEN } = Constants;
  if (!advertisingId) {
    advertisingId = store.getState().app.advertisingId;
    appInfo.advertisingId = advertisingId;
  }
  if (!revisionId || !version) {
    try {
      const metadata = await appUtil.getRevisionId();
      version = metadata.codePushVersion.version;
      revisionId = metadata.codePushVersion.label;

      appInfo.revisionId = revisionId;
      appInfo.appVersion = version;
    } catch (error) {
      loggerUtil.err(error);
    }
  }
  if (!userData.id) {
    setUserData(store.getState().user.profile);
  }
  await track(event, {
    distinct_id: userData.id,
    mixpanel_token: MIXPANEL_TOKEN,
    ...appInfo,
    ...data,
  });
}

/**
 * Set event tracking
 */
function track(event, payload = {}) {
  const data = {
    event,
    ...payload,
  };
  Mixpanel.trackWithProperties(event, data);
}

function setUserData(newUserData) {
  userData = { ...newUserData };
}

function getUserData() {
  return userData;
}

/**
 * Assign device push notification token to Mixpanel user
 */
async function addPushDeviceToken() {
  const token = await getSecureStoreKey("notificationToken");
  if (Platform.OS === "android") {
    Mixpanel.setPushRegistrationId(token);
  } else {
    Mixpanel.addPushDeviceToken(token);
  }
}

/**
 * Remove device push notification token from Mixpanel user
 */
async function logoutUserMixpanel() {
  const token = await getSecureStoreKey("notificationToken");
  await deleteSecureStoreKey("notificationToken");
  if (Platform.OS === "android") {
    Mixpanel.clearPushRegistrationId(token);
  } else {
    Mixpanel.removePushDeviceToken(token);
  }
}

export {
  initMixpanel,
  engage,
  logoutUserMixpanel,
  sendEvent,
  getUserData,
  setUserData,
};
