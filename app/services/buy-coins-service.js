import axios from "axios";
import apiUrl from "./api-url";

const buyCoinsService = {
  getAllPayments,
  getSimplexQuote,
  createSimplexPayment,
  createGemPayment,
  createChangellyPayment,
  getGemCoinAddresses,
};

/**
 * Gets all Buy coins payments for user
 *
 * @returns {Promise}
 */
function getAllPayments() {
  return axios.get(`${apiUrl}/buy_coins/payments`);
}

/**
 * Gets Simplex quote for a payment
 *
 * @param {string} coin
 * @param {string} fiatCurrency
 * @param {string} requestedCurrency
 * @param {string} amount
 *
 * @returns {Promise}
 */
function getSimplexQuote(coin, fiatCurrency, requestedCurrency, amount) {
  return axios.post(`${apiUrl}/buy_coins/simplex/quote`, {
    coin,
    fiat_currency: fiatCurrency,
    requested_currency: requestedCurrency,
    amount: !amount ? "0" : amount,
  });
}

/**
 * Creates Payment Request for Simplex
 *
 * @param {object} payment
 * @param {string} payment.quote_id - id from simplex quote
 * @param {string} payment.coin - BTC|ETH
 * @param {number} payment.amount - amount in crypto from simplex quote
 * @param {number} payment.fiat_amount - total amount in fiat
 * @param {string} payment.fiat_currency - USD
 * @param {number} payment.fiat_base_amount - fiat amount without fees
 * @param {object} verification
 * @param {string} verification.pin
 * @param {string} verification.twoFactorCode
 *
 * @returns {Promise}
 */
function createSimplexPayment(payment, verification) {
  return axios.post(`${apiUrl}/buy_coins/payment/simplex`, {
    ...payment,
    ...verification,
  });
}

/**
 * Creates Payment Request for GEM
 *
 * @param {object} payment
 * @param {string} payment.user_id - user id on GEM platform
 * @param {string} payment.transaction_id - transaction id on GEM platform
 *
 * @returns {Promise}
 */
function createGemPayment(payment) {
  return axios.post(`${apiUrl}/buy_coins/payment/gem`, payment);
}

/**
 * Creates Payment Request for Changelly
 *
 * @param {object} payment
 * @param {string} payment.from - BTC|ETH
 * @param {string} payment.to - ETH|BTC
 * @param {string} payment.amount - crypto amount
 *
 * @returns {Promise}
 */
function createChangellyPayment(payment) {
  return axios.post(`${apiUrl}/changelly/transactions`, payment);
}

/**
 * Gets deposit address for coin for user
 *
 * @return {Promise}
 */
function getGemCoinAddresses() {
  return axios.get(`${apiUrl}/buy_coins/deposit-addresses/gem`);
}

export default buyCoinsService;
