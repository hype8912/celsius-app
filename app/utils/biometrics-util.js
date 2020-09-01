import ReactNativeBiometrics from "react-native-biometrics";
import store from "../redux/store";
import logger from "./logger-util";

export {
  createBiometricsSignature,
  askUserToProvideBiometrics,
  isBiometricsSensorAvailable,
  createBiometricsKey,
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

async function createBiometricsKey() {
  try {
    const key = await checkBiometricsKey();
    // console.log('key: ', key)
    if (!key.keysExist) {
      await ReactNativeBiometrics.createKeys("Confirm fingerprint");
      // console.log('bioKey: ', bioKey)
    }
  } catch (e) {
    // console.log('create biometrics key failed: ', e)
  }
}

async function checkBiometricsKey() {
  const resultObject = await ReactNativeBiometrics.biometricKeysExist();
  return resultObject;
}

// resultObject.signature sent to server, resultObject.success used for check if pass or not.
async function createBiometricsSignature(onSuccess, msgForUser) {
  const user = store.getState().user.profile;
  const epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
  const payload = `${epochTimeSeconds}${user.id}`;

  try {
    const resultObject = await ReactNativeBiometrics.createSignature({
      promptMessage: msgForUser || "Authenticate yourself",
      payload,
    });
    if (resultObject.success) {
      // TODO Call endpoint and send signature and payload
      // verifySignatureWithServer(signature, payload)
      if (onSuccess) onSuccess();
    }
  } catch (e) {
    // TODO better error handling, for now we have 2 errors
    // console.log('error je: ', e)
    await ReactNativeBiometrics.deleteKeys();
    await createBiometricsKey();
  }
}
