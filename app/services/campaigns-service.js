import axios from "axios";
import apiUrl from "./api-url";

const campaignsService = {
  getIndividualLink,
  getByUrl,
  submitProfileCode,
  submitRegistrationCode,
  submitPromoCode,
};

/**
 * Gets or creates individual referral link for user
 *
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#7f82a302-881e-4a64-8d1d-bbcb0354beda
 *
 * @returns {Promise}
 */
function getIndividualLink() {
  return axios.get(`${apiUrl}/branch/individual`);
}

/**
 * Get an analytics event on Branch by URL
 *
 * @see https://documenter.getpostman.com/view/4207695/celsius/RW1aHzQg?version=latest#20cb5db0-21fe-4628-ac33-0fc155430036
 * @param {string} url
 *
 * @returns {Promise}
 */
function getByUrl(url) {
  return axios.get(`${apiUrl}/branch?url=${url}`);
}

/**
 * Submit campaign promo code in users profile
 *
 * @see https://documenter.getpostman.com/view/4207695/celsius/RW1aHzQg?version=latest#7f82a302-881e-4a64-8d1d-bbcb0354beda
 * @param {string} promoCode
 *
 * @returns {Promise}
 */
function submitProfileCode(promoCode) {
  return axios.post(`${apiUrl}/branch/check_code/profile`, { slug: promoCode });
}

/**
 * Submit promo code during registration
 * @param {string} promoCode
 * @returns {Promise}
 */
function submitRegistrationCode(promoCode) {
  return axios.post(`${apiUrl}/branch/check_code/registration`, {
    slug: promoCode,
  });
}

/**
 * Submit promo code
 * @param {string} promoCode
 * @returns {Promise}
 */

function submitPromoCode(promoCode) {
  return axios.get(`${apiUrl}/promo-codes/apply?code=${promoCode}`);
}

export default campaignsService;
