import React from "react";
import { Image, NativeModules } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import twitter from "react-native-simple-twitter";
import CodePush from "react-native-code-push";
import jwtDecode from "jwt-decode";
import moment from "moment";
import _ from "lodash";

import Constants from "../../constants";
import {
  deleteSecureStoreKey,
  getSecureStoreKey,
  setSecureStoreKey,
} from "./storage-util";
import baseUrl from "../services/api-url";
import store from "../redux/store";
import * as actions from "../redux/actions";
import { initMixpanel } from "./mixpanel-util";
import { initUxCam } from "./uxcam-util";
import { isUserLoggedIn } from "./user-util/user-util";
import mixpanelAnalytics from "./mixpanel-analytics";
import { STORAGE_KEYS } from "../constants/DATA";

const { TWITTER_CUSTOMER_KEY, TWITTER_SECRET_KEY } = Constants;

export default {
  initializeThirdPartyServices,
  logoutOnEnvChange,
  initInternetConnectivityListener,
  pollBackendStatus,
  cacheImages,
  // cacheFonts,
  recursiveMap,
  getRevisionId,
  updateCelsiusApp,
  shouldUpdateCelsiusApp,
  checkAndRefreshAuthToken,
  getUniqueDeviceIdentifier,
};

/**
 * Initializes all third party services used in Celsius app
 */
async function initializeThirdPartyServices() {
  store.dispatch(actions.setAppsFlyerUID());
  store.dispatch(actions.setAdvertisingId());

  twitter.setConsumerKey(TWITTER_CUSTOMER_KEY, TWITTER_SECRET_KEY);
  await initMixpanel();
  await initUxCam();
}

/**
 * Logs the user out on environment change, helps developers when switching from development to production
 */
async function logoutOnEnvChange() {
  const previousBaseUrl = await getSecureStoreKey(STORAGE_KEYS.BASE_URL);
  if (previousBaseUrl !== baseUrl) {
    await deleteSecureStoreKey(STORAGE_KEYS.SECURITY_STORAGE_AUTH_KEY);
    await setSecureStoreKey(STORAGE_KEYS.BASE_URL, baseUrl);
  }
}

/**
 * Updates Celsius app to the newest code push version on app startup
 */
async function updateCelsiusApp() {
  const { deepLinkData } = store.getState().deepLink;
  if (deepLinkData && !_.isEmpty(deepLinkData) && deepLinkData.type)
    return false;

  try {
    if (await shouldUpdateCelsiusApp()) {
      store.dispatch(
        actions.showMessage(
          "info",
          "Please wait while Celsius app is being updated."
        )
      );
      await CodePush.sync({
        updateDialog: false,
        installMode: CodePush.InstallMode.IMMEDIATE,
      });
      return true;
    }

    return false;
  } catch (err) {
    mixpanelAnalytics.logError("updateCelsiusApp", err);
    return false;
  }
}

/**
 * Checks if app should be updated
 * This is disabled in dev mode
 */
async function shouldUpdateCelsiusApp() {
  const hasUpdate = await CodePush.checkForUpdate();
  // eslint-disable-next-line no-undef
  return !__DEV__ && hasUpdate;
}

/**
 * Initializes the connectivity listener for the app
 */
function initInternetConnectivityListener() {
  NetInfo.addEventListener(state => {
    store.dispatch(actions.setInternetConnection(state.isConnected));
  });
}

/**
 * Polls status of the backend app from /status every 30s
 * @todo rename to poll data or something
 */
const POLL_INTERVAL = 30 * 1000;
let iteration = 0;
let backendPollInterval;
async function pollBackendStatus() {
  if (backendPollInterval) clearInterval(backendPollInterval);
  backendPollInterval = setInterval(async () => {
    if (isUserLoggedIn()) {
      await store.dispatch(actions.getUserStatus());
      await checkAndRefreshAuthToken();
    }
    iteration++;
  }, POLL_INTERVAL);
}

/**
 * Check if auth token is about too expire and refresh it from BE
 * Check every 15min, or every 30 poll iterations
 *
 * @param {string} token - auth token from storage
 * @param {number} expiresInHours - number of hours
 */
async function checkAndRefreshAuthToken(token, expiresInHours) {
  if (iteration % 30 !== 0) return;

  const EXPIRES_IN_HOURS = expiresInHours || 6;
  const storageToken =
    token || (await getSecureStoreKey(STORAGE_KEYS.SECURITY_STORAGE_AUTH_KEY));
  if (!storageToken) return;

  const decodedToken = jwtDecode(storageToken);
  const expirationDate = decodedToken.exp
    ? new Date(decodedToken.exp * 1000)
    : new Date();
  const isAboutToExpire = moment()
    .add(EXPIRES_IN_HOURS, "hours")
    .isAfter(moment(expirationDate));
  if (isAboutToExpire) {
    const refreshTokenError = await store.dispatch(actions.refreshAuthToken());
    return refreshTokenError;
  }
}

/**
 * Caches app images
 *
 * @param {Array} images
 * @returns {Array} - array of promises
 */
// For images that saved to the local file system,
// use Expo.Asset.fromModule(image).downloadAsync()
// to download and cache the image.
// There is also a loadAsync() helper method to cache a batch of assets.
// For web images, use Image.prefetch(image).
// Continue referencing the image normally,
// e.g. with <Image source={require('path/to/image.png')} />
async function cacheImages(images) {
  for (let i = 0; i < images.length; i++) {
    if (typeof image === "string") {
      await Image.prefetch(images[i]);
    } else {
      // await Asset.fromModule(images[i]).downloadAsync();
    }
  }
}

/**
 * Verifies the data with signature key from the server
 *
 * @param {Array} fonts - data from server response
 * @returns {Array} - array of promises
 */
// Fonts are preloaded using Expo.Font.loadAsync(font).
// async function cacheFonts(fonts) {
// for (let i = 0; i < fonts.length; i++) {
//   await Font.loadAsync(fonts[i]);
// }
// }

/**
 * Change all nested react elemnets through fn()
 *
 * @param {Array} children - array of react children elements
 * @param {Function} fn - function that will change all nested elements
 * @returns {Array} - array of react childrens changed through fn()
 */
function recursiveMap(children, fn) {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child;
    }

    let newChild = child;

    if (child.props.children) {
      newChild = React.cloneElement(child, {
        children: recursiveMap(child.props.children, fn),
      });
    }

    return fn(newChild);
  });
}

let metadata;

/**
 * Get the current app verision from CodePush
 */
async function getRevisionId() {
  if (!metadata) {
    metadata = await CodePush.getUpdateMetadata();
  }

  if (!metadata) {
    return {
      codePushVersion: {},
      revisionId: "local",
    };
  }

  const codePushVersion = {
    label: metadata.label,
    version: metadata.appVersion,
    description: metadata.description,
  };

  return {
    codePushVersion,
    revisionId: `${codePushVersion.version}@${codePushVersion.label}`,
  };
}

/**
 * Get Unique Device Identifier for iOS device from UDID.m/h files.
 */
async function getUniqueDeviceIdentifier() {
  const UDID = NativeModules.UDID;
  try {
    const uniqueIdentifier = await UDID.get();
    return uniqueIdentifier;
  } catch (e) {
    mixpanelAnalytics.logError("getUniqueDeviceIdentifier", e);
    return null;
  }
}
