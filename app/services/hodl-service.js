import axios from "axios";
import apiUrl from "./api-url";

const hodlService = {
  beginHodlMode,
  activateHodlMode,
  deactivateHodlMode,
  pollHodlStatus,
};

/**
 * initiation of hodl mode
 * @param verificationCode
 * @returns {Promise}
 */
function beginHodlMode(verificationCode) {
  return axios.post(`${apiUrl}/users/hodl_mode/begin`, verificationCode);
}

/**
 *  activation of hodl mode, user receives 8 digit code
 * @param verificationCode
 * @returns {Promise}
 */
function activateHodlMode(verificationCode) {
  return axios.post(`${apiUrl}/users/hodl_mode/activate`, verificationCode);
}

/**
 * deactivation code where user sends 8 digit code he received on activation
 * @param verificationCode
 * @returns {Promise}
 */
function deactivateHodlMode(verificationCode) {
  return axios.post(`${apiUrl}/users/hodl_mode/deactivate`, verificationCode);
}

/**
 * 30 second interval fetching of hodl status
 * @returns {Promise}
 */

function pollHodlStatus() {
  return axios.get(`${apiUrl}/me/poll`);
}

export default hodlService;
