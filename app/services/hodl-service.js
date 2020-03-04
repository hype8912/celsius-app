import axios from "axios";
import apiUrl from "./api-url";

const hodlService = {
  beginHodlMode,
  activateHodlMode,
  deactivateHodlMode,
};

function beginHodlMode(verificationCode) {
  return axios.post(`${apiUrl}/users/hodl_mode/begin`, {
    verificationCode,
  });
}

function activateHodlMode(verificationCode) {
  return axios.post(`${apiUrl}/users/hodl_mode/activate`, {
    verificationCode,
  });
}

function deactivateHodlMode(verificationCode) {
  return axios.post(`${apiUrl}/users/hodl_mode/deactivate`, {
    verificationCode,
  });
}

export default hodlService;
