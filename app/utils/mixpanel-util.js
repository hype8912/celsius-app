import { Platform } from "react-native";
import Mixpanel from "react-native-mixpanel";

import store from "../redux/store";
import appUtil from "./app-util";
import loggerUtil from "./logger-util";
import Constants from "../../constants";
import mixpanelService from "../services/mixpanel-service";
import { getSecureStoreKey, deleteSecureStoreKey } from "./expo-storage";

let userData = {};

let advertisingId;

let revisionId = "";
let version = "";

const appInfo = { os: Platform.OS };
/**
 * Send event attribution
 *
 * @param {string} event - name of the event
 * @param {Object} data - payload
 */
async function sendEvent(event, data = {}) {
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
  mixpanelService.track(event, {
    distinct_id: userData.id,
    ...appInfo,
    ...data,
  });
}

function setUserData(newUserData) {
  userData = { ...newUserData };
}

function getUserData() {
  return userData;
}

async function initMixpanel() {
  const { MIXPANEL_TOKEN } = Constants;
  try {
    await Mixpanel.sharedInstanceWithToken(MIXPANEL_TOKEN);
  } catch (err) {
    loggerUtil.log(err);
  }
}

async function identifyUserMixpanel(userId) {
  const token = await getSecureStoreKey("notificationToken");
  Mixpanel.identify(userId);
  if (Platform.OS === "android") {
    Mixpanel.setPushRegistrationId(token);
  } else {
    Mixpanel.addPushDeviceToken(token);
  }
}

async function logoutUserMixpanel() {
  const token = await getSecureStoreKey("notificationToken");
  await deleteSecureStoreKey(token);
  if (Platform.OS === "android") {
    Mixpanel.clearPushRegistrationId(token);
  } else {
    Mixpanel.removePushDeviceToken(token);
  }
}

export {
  initMixpanel,
  identifyUserMixpanel,
  logoutUserMixpanel,
  sendEvent,
  getUserData,
  setUserData,
};
