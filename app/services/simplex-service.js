import axios from "axios";
import apiUrl from "./api-url";

const simplexService = {
  getQuote,
  createPaymentRequest,
  getAllPayments,
};

/**
 * Gets all Simplex payment requests for user
 *
 * @returns {Promise}
 */
function getAllPayments() {
  return axios.get(`${apiUrl}/simplex/payment`);
}

/**
 * Gets Simplex quote for a user
 * @param {string} coin
 * @param {string} fiatCurrency
 * @param {string} requestedCurrency
 * @param {string} amount
 * @returns {Promise}
 */
function getQuote( coin, fiatCurrency, requestedCurrency, amount) {
  return axios.post(`${apiUrl}/simplex/quote`, {
    coin,
    fiat_currency: fiatCurrency,
    requested_currency: requestedCurrency,
    amount,
  });
}

/**
 * Creates Payment Request for Simplex
 * @param {object} args
 * @param {object} verification
 * @returns {Promise}
 */
function createPaymentRequest(args, verification) {
  return axios.post(`${apiUrl}/simplex/payment`, {
    ...args,
    ...verification,
  });
}

export default simplexService;
