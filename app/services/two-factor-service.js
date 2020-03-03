import axios from "axios";
import apiUrl from "./api-url";

// TODO move to user-security-service
const TwoFactorService = {
  beginTwoFactorActivation,
  enableTwoFactor,
  disableTwoFactor,
}

/**
 * Initializes the 2FA activation process
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#4ce77b02-310c-46aa-987e-c82b0a23fc8b
 *
 * @param {string|number} pin
 * @return {Promise}
 */
async function beginTwoFactorActivation(pin) {
  const response = await axios.post(`${apiUrl}/users/two_factor/begin`, {
    pin,
  });

  if (!response.data.ok) {
    throw new Error('There was a problem generating your Two Factor secret. Please try again later.')
  }

  return response.data.secret;
}

/**
 * Enables 2FA for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#d2f87206-2792-4973-ab3a-7a0e861b66a9
 *
 * @param {string|number} code
 * @return {Promise}
 */
async function enableTwoFactor(code) {
  const response = await axios.post(`${apiUrl}/users/two_factor/activate`, {
    twoFactorCode: code,
  });

  return response.data.ok;
}

/**
 * Deactivates 2FA for user, PIN is fallback
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#76a3af2e-1828-4f34-b61e-6b87a3442ba2
 *
 * @param {string|number} twoFactorCode
 * @return {Promise}
 */
async function disableTwoFactor(twoFactorCode) {
  const response = await axios.post(`${apiUrl}/users/two_factor/deactivate`, {
    twoFactorCode
  });

  return response.data;
}

export default TwoFactorService;
