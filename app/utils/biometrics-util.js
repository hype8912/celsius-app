import ReactNativeBiometrics from "react-native-biometrics";
import store from "../redux/store";
import { updateFormFields } from "../redux/forms/formsActions";
import {
  BIOMETRIC_ERRORS,
  BIOMETRIC_TEXT,
  BIOMETRIC_TYPES,
} from "../constants/UI";
import mixpanelAnalytics from "./mixpanel-analytics";

export {
  createBiometricsSignature,
  isBiometricsSensorAvailable,
  createBiometricsKey,
  deleteBiometricsKey,
  biometricNonEnrolled,
  getBiometricTypeData,
  // simplePrompt
};

/**
 * Check if Biometrics is available on device
 */
async function isBiometricsSensorAvailable() {
  try {
    const res = await ReactNativeBiometrics.isSensorAvailable();
    return res;
  } catch (e) {
    mixpanelAnalytics.logError("isBiometricsSensorAvailable", e);
  }
}

/**
 * Onetime Biometric key creation
 */
async function createBiometricsKey() {
  try {
    const key = await checkBiometricsKey();
    if (key.keysExist) await deleteBiometricsKey();
    const res = await ReactNativeBiometrics.createKeys();
    return res.publicKey;
  } catch (e) {
    mixpanelAnalytics.logError("createBiometricsKey", e);
    throw e;
  }
}

/**
 * Check if biometrics key is already created
 */
async function checkBiometricsKey() {
  try {
    const resultObject = await ReactNativeBiometrics.biometricKeysExist();
    return resultObject;
  } catch (e) {
    mixpanelAnalytics.logError("checkBiometricsKey", e);
  }
}

/**
 * Delete biometrics key from device
 */
async function deleteBiometricsKey(onSuccess) {
  try {
    await ReactNativeBiometrics.deleteKeys();
    if (onSuccess) onSuccess();
  } catch (e) {
    mixpanelAnalytics.logError("deleteBiometricsKey", e);
  }
}

/**
 * Create biometrics signature needed to verify user
 */
async function createBiometricsSignature(msgForUser) {
  const deviceId = store.getState().app.deviceId;
  const epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
  const payload = `${epochTimeSeconds}${deviceId}`;

  try {
    const resultObject = await ReactNativeBiometrics.createSignature({
      promptMessage: msgForUser || "Authenticate yourself",
      payload,
    });
    if (resultObject.success) {
      store.dispatch(
        updateFormFields({
          signature: resultObject.signature,
          payload,
        })
      );
      return true;
    }
    return false;
  } catch (e) {
    mixpanelAnalytics.logError("createBiometricsSignature", e);
    throw e;
  }
}

/**
 * Check if Biometrics is available on device but it is not enrolled
 */
function biometricNonEnrolled() {
  const { biometrics } = store.getState().biometrics;
  if (
    biometrics &&
    [
      BIOMETRIC_ERRORS.NONE_ENROLLED,
      BIOMETRIC_ERRORS.NO_IDENTITIES_ARE_ENROLLED,
    ].includes(biometrics.error)
  ) {
    return true;
  }
  return false;
}

/**
 * Get Biometric Text, Icon, Image and used it in Modals, banners, etc
 */
function getBiometricTypeData() {
  const { biometrics } = store.getState().biometrics;
  if (biometrics && biometrics.available) {
    switch (biometrics.biometryType) {
      case BIOMETRIC_TYPES.TOUCH_ID:
        return {
          text: BIOMETRIC_TEXT.TOUCH_ID,
          icon: "Fingerprint",
          image: require("../../assets/images/fingerprint.png"),
        };
      case BIOMETRIC_TYPES.FACE_ID:
        return {
          text: BIOMETRIC_TEXT.FACE_ID,
          icon: "FaceRecognition",
          image: require("../../assets/images/face-recognition.png"),
        };
      default: {
        return {
          text: BIOMETRIC_TEXT.BIOMETRICS,
          icon: "Fingerprint",
          image: require("../../assets/images/fingerprint.png"),
        };
      }
    }
  }
}
