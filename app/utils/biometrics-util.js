import ReactNativeBiometrics from "react-native-biometrics";
import logger from "./logger-util";
import store from "../redux/store";
import { updateFormFields } from "../redux/forms/formsActions";

export {
  createBiometricsSignature,
  isBiometricsSensorAvailable,
  createBiometricsKey,
  deleteBiometricsKey,
};

async function isBiometricsSensorAvailable() {
  try {
    const res = await ReactNativeBiometrics.isSensorAvailable();
    return res;
  } catch (e) {
    await logger.log(e);
  }
}

async function createBiometricsKey(onSuccess) {
  try {
    await checkBiometricsKey(); // TODO move to error handling
    await deleteBiometricsKey();
    const res = await ReactNativeBiometrics.createKeys("Confirm fingerprint");
    if (onSuccess) onSuccess(res.publicKey);
  } catch (e) {
    await logger.log(e);
  }
}

async function checkBiometricsKey() {
  const resultObject = await ReactNativeBiometrics.biometricKeysExist();
  return resultObject;
}

async function deleteBiometricsKey(onSuccess) {
  try {
    await ReactNativeBiometrics.deleteKeys();
    if (onSuccess) onSuccess();
  } catch (e) {
    await logger.log(e);
  }
}

async function createBiometricsSignature(msgForUser, onSuccess, onError) {
  const deviceId = store.getState().app.advertisingId;
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
      if (onSuccess) onSuccess();
    }
  } catch (e) {
    // TODO better error handling, for now we have 2 errors
    await logger.log("message: ", e.message);
    if (onError) onError(e);
  }
}
