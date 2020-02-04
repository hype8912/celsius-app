import axios from "axios";
import apiUrl from "./api-url";

const simplexService = {
  getQuote,
  createPaymentRequest,
};

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
    amount
  });
}

/**
 * Creates Payment Request for Simplex
 *
 * @param {string} quoteId
 * @param {string} coin
 * @param {string} amount
 * @param {string} fiatCurrency
 * @param {string} fiatTotalAmount
 * @param {string} fiatBaseAmount
 * @returns {Promise}
 */
function createPaymentRequest(quoteId, coin, amount, fiatTotalAmount, fiatCurrency, fiatBaseAmount) {
  return axios.post(`${apiUrl}/simplex/payment`, {
    quote_id: quoteId,
    coin,
    amount,
    fiat_amount: fiatTotalAmount,
    fiat_currency: fiatCurrency,
    fiat_base_amount: fiatBaseAmount,
  });
}

export default simplexService;
