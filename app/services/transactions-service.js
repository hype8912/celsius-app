import axios from "axios";
import apiUrl from "./api-url";

const transactionsService = {
  getAll,
  getTransaction,
  cancelWithdrawalService,
  sendCsvEmail,
  withdrawCrypto,
};

/**
 * Initiates sending of csv of transactions through mail
 *
 * @returns {Promise}
 */
function sendCsvEmail() {
  return axios.get(`${apiUrl}/transactions/export/csv`);
}

/**
 * Gets all filtered transactions for user
 * @see https://documenter.getpostman.com/view/4207695/S11RLvpb#af790115-ee70-45a8-8693-93bbad0d2327
 *
 * @param {Object} query
 * @param {string} query.type - one of withdraw|received|in progress
 * @param {string} query.coin - eg. eth
 * @returns {Promise}
 */
function getAll(query) {
  return axios.get(`${apiUrl}/transactions`, { params: query });
}

/**
 * Gets transaction details by id
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#1ba8f93d-04fc-4a13-96d8-e351ea3b960a
 *
 * @param {string} transactionId - uuid
 * @returns {Promise}
 */
function getTransaction(transactionId) {
  return axios.get(`${apiUrl}/wallet/transactions/${transactionId}`);
}

function cancelWithdrawalService(withdrawalId) {
  return axios.post(`${apiUrl}/wallet/withdrawal/cancel/${withdrawalId}`);
}

/**
 * Withdraws crypto for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#2a5b14c9-f0a9-41b6-9c2f-a7195ec7022a
 *
 * @param {string} coin - eg. eth|ETH
 * @param {string} amount
 * @param {Object} verification
 * @param {string} verification.pin - eg '1234'
 * @param {string} verification.twoFactorCode - eg '123456'
 * @param {boolean} withdrawAll
 * @return {Promise}
 */
function withdrawCrypto(coin, amount, withdrawAll, verification) {
  return axios.post(`${apiUrl}/wallet/${coin.toLowerCase()}/withdraw`, {
    amount,
    withdraw_all: withdrawAll,
    ...verification,
  });
}

export default transactionsService;
