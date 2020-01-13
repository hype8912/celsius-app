import axios from "axios";
import apiUrl from "./api-url";

const generalDataService = {
  getBackendStatus,
  getCelsiusInitialData,
  getLoanTermsOfUse,
  getPDFLoanTermsOfUse,
};

/**
 * Gets application status from backend
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#089ffaed-d892-4fca-9b19-d0638b31325f
 *
 * @returns {Promise}
 */
function getBackendStatus() {
  return axios.get(`${apiUrl}/status`);
}

/**
 * Gets all general data needed for Celsius app (loan LTVs, interest rates...)
 * @see https://documenter.getpostman.com/view/4207695/S11RLvpb#3e4af1fd-7b92-41de-bfc8-63927fd8792b
 *
 * @returns {Promise}
 */
function getCelsiusInitialData() {
  return axios.get(`${apiUrl}/initial_data`);
}

function getLoanTermsOfUse() {
  return axios.get(`${apiUrl}/web/document/loan-terms-and-conditions/md`);
}

function getPDFLoanTermsOfUse() {
  return `${apiUrl}/web/document/loan-terms-and-conditions/pdf`;
}

export default generalDataService;
