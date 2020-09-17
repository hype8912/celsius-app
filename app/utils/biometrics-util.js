import ReactNativeBiometrics from "react-native-biometrics";
import logger from "./logger-util";
import store from "../redux/store";
import { updateFormFields } from "../redux/forms/formsActions";

export {
  createBiometricsSignature,
  askUserToProvideBiometrics,
  isBiometricsSensorAvailable,
  createBiometricsKey,
  deleteBiometricsKey,
};

async function isBiometricsSensorAvailable() {
  try {
    const res = await ReactNativeBiometrics.isSensorAvailable();
    return res;
  } catch (e) {
    await logger.err(e);
    // console.log('biometrics failed')
  }
}

async function askUserToProvideBiometrics(onSuccess) {
  try {
    const biometricsAvailable = await isBiometricsSensorAvailable();
    if (biometricsAvailable) {
      const resultObject = await ReactNativeBiometrics.simplePrompt({
        promptMessage: "Confirm fingerprint",
      });
      // console.log('result object: ', resultObject)
      const { success } = resultObject;
      if (success) {
        // console.log('successful biometrics provided')
        await createBiometricsKey();
        onSuccess();
      } else {
        // console.log('user cancelled biometric prompt')
        return;
      }
    }
  } catch (e) {
    // console.log('biometrics failed')
  }
}

async function createBiometricsKey(onSuccess) {
  try {
    await checkBiometricsKey(); // TODO move to error handling
    await deleteBiometricsKey();
    const res = await ReactNativeBiometrics.createKeys("Confirm fingerprint");
    if (onSuccess) onSuccess(res.publicKey);
  } catch (e) {
    await logger.err(e);
    // console.log('create biometrics key failed: ', e)
  }
}

async function checkBiometricsKey() {
  const resultObject = await ReactNativeBiometrics.biometricKeysExist();
  return resultObject;
}

async function createBiometricsSignature(onSuccess, msgForUser) {
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
    // console.log('error je: ', e)
    await logger.err(e);
    await ReactNativeBiometrics.deleteKeys();
    await createBiometricsKey();
  }
}

async function deleteBiometricsKey(onSuccess) {
  try {
    await ReactNativeBiometrics.deleteKeys();
    if (onSuccess) onSuccess();
  } catch (e) {
    await logger.err(e);
  }
}
