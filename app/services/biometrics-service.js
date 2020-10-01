import axios from "axios";
import apiUrl from "./api-url";
import { BIOMETRIC_TYPES } from "../constants/UI";

const biometricsService = {
  activateBiometrics,
  deactivateBiometrics,
  checkBiometrics,
};

function activateBiometrics(publicKey, type, verification) {
  let bioType;
  if ([BIOMETRIC_TYPES.TOUCH_ID, BIOMETRIC_TYPES.BIOMETRICS].includes(type)) {
    bioType = BIOMETRIC_TYPES.TOUCH_ID;
  } else {
    bioType = BIOMETRIC_TYPES.FACE_ID;
  }

  return axios.post(`${apiUrl}/users/biometrics/activate`, {
    ...verification,
    public_key: publicKey,
    type: bioType,
  });
}

function deactivateBiometrics(verification) {
  return axios.post(`${apiUrl}/users/biometrics/deactivate`, verification);
}

function checkBiometrics(payload, signature) {
  return axios.post(`${apiUrl}/me/biometrics/check`, {
    payload,
    signature,
  });
}

export default biometricsService;
