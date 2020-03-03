import axios from 'axios';
import apiUrl from './api-url';

const transactionsService = {
  getAll,
  getTransaction,
  cancelWithdrawalService,
};


/**
 * Gets all filtered transactions for user
 * @see https://documenter.getpostman.com/view/4207695/S11RLvpb#af790115-ee70-45a8-8693-93bbad0d2327
 *
 * @param {Object} query
 * @param {number} query.limit
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

/**
 * TODO add JSDoc
 */
function cancelWithdrawalService(withdrawalId) {
  return axios.post(`${apiUrl}/wallet/withdrawal/cancel/${withdrawalId}`)
}

export default transactionsService;
