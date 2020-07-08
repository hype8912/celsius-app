import axios from "axios";
import apiUrl from "./api-url";

const generalDataService = {
  getCelsiusInitialData,
  getLoanTermsOfUse,
  getPDFLoanTermsOfUse,
};

/**
 * Gets all general data needed for Celsius app (loan LTVs, interest rates...)
 * @see https://documenter.getpostman.com/view/4207695/S11RLvpb#3e4af1fd-7b92-41de-bfc8-63927fd8792b
 *
 * @returns {Promise}
 */
function getCelsiusInitialData() {
  return axios.get(`${apiUrl}/initial_data`);
}

/**
 * Gets markdown loan terms of use
 * @see https://documenter.getpostman.com/view/4207695/S11RLvpb?version=latest#fcdf7994-2d4a-45c7-88aa-4530a13d4b48
 *
 * @returns {Promise}
 */
function getLoanTermsOfUse() {
  return axios.get(`${apiUrl}/web/document/loan-terms-and-conditions/md`);
}

/**
 * Gets pdf loan terms of use
 *
 * @returns {Promise}
 */
function getPDFLoanTermsOfUse() {
  return `${apiUrl}/web/document/loan-terms-and-conditions/pdf`;
}

export default generalDataService;
