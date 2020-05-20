import ReactNativeBiometrics from "react-native-biometrics";

export { askUserToProvideBiometrics };

async function isBiometricsSensorAvailable() {
  try {
    const resultObject = await ReactNativeBiometrics.isSensorAvailable();
    const { available, biometryType } = resultObject;
    // console.log('result object je: ', resultObject)
    if (available && biometryType === ReactNativeBiometrics.TouchID) {
      // console.log('TouchID is supported')
    } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
      // console.log('FaceID is supported')
    } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
      // console.log('Biometrics is supported')
    } else {
      // console.log('Biometrics not supported')
    }
    return available;
  } catch (e) {
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
    const keyExist = await checkBiometricsKey();
    if (!keyExist) {
      await ReactNativeBiometrics.createKeys("Confirm fingerprint");
    }
    // await createBiometricsSignature()
  } catch (e) {
    // console.log('create biometrics key failed: ', e)
  }
}

async function checkBiometricsKey() {
  const resultObject = await ReactNativeBiometrics.biometricKeysExist();
  // console.log('keys exist: ', resultObject)
  return resultObject;
}

// resultObject.signature sent to server, resultObject.success used for check if pass or not.
// async function createBiometricsSignature () {
//   const epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
//   const payload = epochTimeSeconds + 'Ovo je custom poruka'
//   const resultObject = await ReactNativeBiometrics.createSignature({
//     promptMessage: 'Sign in',
//     payload
//   })
//
//   // console.log('createBiometricsSignature: ', resultObject)
// }
