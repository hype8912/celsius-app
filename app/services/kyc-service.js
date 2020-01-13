import axios from "axios";
import apiUrl from "./api-url";

const kycService = {
  getKYCDocTypes,
  getUtilityBill,
  setUtilityBill,
  getPrimeTrustToULink,
};

/**
 * Gets documents that Onfido supports for all countries
 *
 * @returns {Promise}
 */
function getKYCDocTypes() {
  return axios.get(`${apiUrl}/kyc/countries`);
}

/**
 * Gets Utility bill image
 *
 * @returns {Promise}
 */
function getUtilityBill() {
  return axios.get(`${apiUrl}/me/documents/utility_bill`);
}

/**
 * Sets utility bill image
 *
 * @param {Object} utilityBill
 * @returns {Promise}
 */
function setUtilityBill(utilityBill) {
  const formData = new FormData();
  formData.append("utility_bill_image", {
    name: "utility_bill_image.jpg",
    type: "image/jpg",
    uri: utilityBill.uri,
  });
  return axios.put(`${apiUrl}/user/profile/documents/utility_bill`, formData);
}

export default kycService;

/**
 * Gets Link for Primetrust KYC ToU
 *
 * @returns {Promise}
 */
function getPrimeTrustToULink() {
  return axios.get(`${apiUrl}/kyc/primetrust/custodial_agreement_preview`);
}
