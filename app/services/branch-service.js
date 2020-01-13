import axios from "axios";
import apiUrl from "./api-url";

// TODO rename to campaigns-service
const branchService = {
  getIndividualLink,
  getByUrl,
  submitProfileCode,
  submitRegistrationCode,
};

/**
 * Gets or creates individual referral link for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#7f82a302-881e-4a64-8d1d-bbcb0354beda
 *
 * @returns {Promise}
 */
function getIndividualLink() {
  return axios.get(`${apiUrl}/branch/individual`);
}

/**
 * Get an analytics event on Branch by URL
 * @returns {Promise}
 */
function getByUrl(url) {
  return axios.get(`${apiUrl}/branch?url=${url}`);
}

/**
 *
 * @param promoCode
 * @returns {Promise}
 */
function submitProfileCode(promoCode) {
  return axios.post(`${apiUrl}/branch/check_code/profile`, { slug: promoCode });
}

/**
 *
 * @param promoCode
 * @returns {Promise}
 */
function submitRegistrationCode(promoCode) {
  return axios.post(`${apiUrl}/branch/check_code/registration`, {
    slug: promoCode,
  });
}

export default branchService;
