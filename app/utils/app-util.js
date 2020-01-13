// TODO(sb): RN update dependencies fixes
// import * as Font from "expo-font";
// import { Asset } from "expo-asset";
import React from "react";
import { Image, Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import twitter from "react-native-simple-twitter";
import appsFlyer from "react-native-appsflyer";
import CodePush from "react-native-code-push";

import Constants from "../../constants";
import {
  deleteSecureStoreKey,
  getSecureStoreKey,
  setSecureStoreKey,
} from "./expo-storage";
import baseUrl from "../services/api-url";
import store from "../redux/store";
import * as actions from "../redux/actions";
import apiUtil from "./api-util";
import loggerUtil from "./logger-util";

const {
  SECURITY_STORAGE_AUTH_KEY,
  TWITTER_CUSTOMER_KEY,
  TWITTER_SECRET_KEY,
  APPSFLYER_KEY_ANDROID,
  APPSFLYER_KEY_IOS,
  APPSFLYER_IOS_APP_ID,
} = Constants;

export default {
  initializeThirdPartyServices,
  logoutOnEnvChange,
  initInternetConnectivityListener,
  pollBackendStatus,
  cacheImages,
  cacheFonts,
  recursiveMap,
  getRevisionId,
};

/**
 * Initializes all third party services used in Celsius app
 */
async function initializeThirdPartyServices() {
  await store.dispatch(actions.setAppsFlyerUID());
  await store.dispatch(actions.setAdvertisingId());

  apiUtil.initInterceptors();
  twitter.setConsumerKey(TWITTER_CUSTOMER_KEY, TWITTER_SECRET_KEY);
  const appsFlyerOptions = {
    devKey:
      Platform.OS === "android" ? APPSFLYER_KEY_ANDROID : APPSFLYER_KEY_IOS,
  };

  if (Platform.OS === "ios") {
    appsFlyerOptions.appId = APPSFLYER_IOS_APP_ID;
  }
  await appsFlyer.initSdk(
    appsFlyerOptions,
    result => {
      loggerUtil.log(result);
    },
    error => {
      loggerUtil.err(error);
    }
  );
}

/**
 * Logs the user out on environment change, helps developers
 */
async function logoutOnEnvChange() {
  const previousBaseUrl = await getSecureStoreKey("BASE_URL");
  if (previousBaseUrl !== baseUrl) {
    await deleteSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);
    await setSecureStoreKey("BASE_URL", baseUrl);
  }
}

/**
 * Initializes the connectivity listener for the app
 */
function initInternetConnectivityListener() {
  NetInfo.isConnected.addEventListener("connectionChange", isConnected =>
    store.dispatch(actions.setInternetConnection(isConnected))
  );
}

/**
 * Polls status of the backend app from /status every 30s
 */
const POLL_INTERVAL = 30 * 1000;
let backendPollInterval;
async function pollBackendStatus() {
  if (backendPollInterval) clearInterval(backendPollInterval);
  await store.dispatch(actions.getBackendStatus());
  await store.dispatch(actions.getKYCStatus());

  backendPollInterval = setInterval(async () => {
    await store.dispatch(actions.getBackendStatus());
    await store.dispatch(actions.getKYCStatus());
  }, POLL_INTERVAL);
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
async function cacheFonts(fonts) {
  // for (let i = 0; i < fonts.length; i++) {
  //   await Font.loadAsync(fonts[i]);
  // }
}

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
