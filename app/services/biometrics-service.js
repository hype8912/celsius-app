import axios from "axios";
import apiUrl from "./api-url";

const biometricsService = {
  activateBiometrics,
  deactivateBiometrics,
  checkBiometrics,
};

function activateBiometrics(publicKey, type, verification) {
  return axios.post(`${apiUrl}/users/biometrics/activate`, {
    ...verification,
    public_key: publicKey,
    type,
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
