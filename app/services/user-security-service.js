import axios from "axios";
import apiUrl from "./api-url";

const userSecurityService = {
  invalidateSession,
  getUserSecurityOverview,
  beginTwoFactorActivation,
  enableTwoFactor,
  disableTwoFactor,
  setPin,
  checkPin,
  changePin,
  checkTwoFactor,
};

/**
 * Log the user out from all devices
 * @see https://documenter.getpostman.com/view/4207695/S11RLvpb#00bf42d5-3bd7-47e8-a8b8-d31e61f96f83
 *
 * @return {Promise}
 */
function invalidateSession() {
  return axios.post(`${apiUrl}/user/invalidate_session`);
}

/**
 * Get user security overview
 * @returns {Promise}
 */
function getUserSecurityOverview() {
  return axios.get(`${apiUrl}/user/security_overview`);
}

/**
 * Initializes the 2FA activation process
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#4ce77b02-310c-46aa-987e-c82b0a23fc8b
 *
 * @param {string|number} pin
 * @return {Promise}
 */
function beginTwoFactorActivation(pin) {
  return axios.post(`${apiUrl}/users/two_factor/begin`, {
    pin,
  });
}

/**
 * Enables 2FA for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#d2f87206-2792-4973-ab3a-7a0e861b66a9
 *
 * @param {string|number} code
 * @param {string|number} code
 * @return {Promise}
 */
function enableTwoFactor(code) {
  return axios.post(`${apiUrl}/users/two_factor/activate`, {
    twoFactorCode: code,
  });
}

/**
 * Deactivates 2FA for user, PIN is fallback
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#76a3af2e-1828-4f34-b61e-6b87a3442ba2
 *
 * @param {string|number} twoFactorCode
 * @return {Promise}
 */
function disableTwoFactor(verification) {
  return axios.post(`${apiUrl}/users/two_factor/deactivate`, {
    ...verification,
  });
}

/**
 * Sets PIN number for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#2da2217f-17a0-4d2f-bcb7-6fc31dba6a68
 *
 * @para {Object} data
 * @para {string} data.pin - eg. '1111'
 * @para {string} data.pin_confirm - eg. '1111'
 * @returns {Promise}
 */
function setPin(data) {
  return axios.post(`${apiUrl}/me/pin/set`, data);
}

/**
 * Checks pin for user
 * @note endpoint not in postman
 *
 * @param {string} pin - eg. '1111'
 * @returns {Promise}
 */
function checkPin(pin) {
  return axios.post(`${apiUrl}/me/pin/check`, { pin });
}

/**
 * Changes PIN number for the user
 * @note https://documenter.getpostman.com/view/4207695/S11RLvpb#fd597763-179d-426a-88da-379b42f7a902
 *
 * @param {Object} pinData
 * @param {string} pinData.pin - eg. '1111'
 * @param {string} pinData.new_pin - eg. '1234'
 * @param {string} pinData.new_pin_confirm - eg. '1234'
 * @returns {Promise}
 */
function changePin(pinData) {
  return axios.post(`${apiUrl}/user/change_pin`, pinData);
}

/**
 * Checks 2FA code for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#73721752-2e5c-43b2-ab0d-64297b5f9f3b
 *
 * @param {string} code - eg. '123456'
 * @returns {Promise}
 */
function checkTwoFactor(code) {
  return axios.post(`${apiUrl}/me/twoFactor/check`, {
    twoFactorCode: code,
  });
}

export default userSecurityService;
