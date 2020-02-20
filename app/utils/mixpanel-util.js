import { Platform } from "react-native";
import store from "../redux/store";
import appUtil from "./app-util";
import loggerUtil from "./logger-util";
import mixpanelService from "../services/mixpanel-service";

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

// TODO move to top
export { sendEvent, getUserData, setUserData };
