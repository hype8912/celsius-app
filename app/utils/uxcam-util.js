import RNUxcam from "react-native-ux-cam";
import loggerUtil from "./logger-util";
import Constants from "../../constants";

const { UXCAM_APP_KEY, UXCAM_API_KEY } = Constants;

async function initUxCam() {
  if (!UXCAM_APP_KEY) return;

  try {
    await RNUxcam.optIntoSchematicRecordings();
    await RNUxcam.startWithKey(UXCAM_APP_KEY);
    await RNUxcam.startWithKey(UXCAM_API_KEY);
  } catch (err) {
    loggerUtil.log(err);
  }
}

async function urlForCurrentUser() {
  let url;

  try {
    url = await RNUxcam.urlForCurrentUser();
  } catch (err) {
    loggerUtil.log(err);
  }

  return url;
}

async function urlForCurrentSession() {
  let url;

  try {
    url = await RNUxcam.urlForCurrentSession();
  } catch (err) {
    loggerUtil.log(err);
  }

  return url;
}

async function stopRecordingAndUploadData() {
  try {
    await RNUxcam.stopSessionAndUploadData();
  } catch (err) {
    loggerUtil.log(err);
  }
}

export {
  initUxCam,
  urlForCurrentUser,
  urlForCurrentSession,
  stopRecordingAndUploadData,
};
