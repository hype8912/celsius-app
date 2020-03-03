import axios from 'axios';
import apiUrl from './api-url';

const transfersService = {
  getAll,
  get,
  claim,
  cancel,
  create
};


/**
 * Gets all CelPay transfers with specific status
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#3e9240d2-cba2-41e4-953f-9435f9bbef72
 *
 * @param {string} status - one of claimed|pending|returned|cleared @todo: doublecheck
 * @returns {Promise}
 */
function getAll(status) {
  return axios.get(`${apiUrl}/transfers/${status}`);
}


/**
 * Gets specific CelPay transfer by id
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#83ccfd72-2b32-4289-8dea-30383159f1b6
 *
 * @param {string} transferHash - hash from db
 * @returns {Promise}
 */
function get(transferHash) {
  return axios.get(`${apiUrl}/transfer/${transferHash}`);
}


/**
 * Claims specific CelPay transfer by id
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#373baf14-4dd8-4842-99ff-c0d2c69c285a
 *
 * @param {string} transferHash - hash from db
 * @returns {Promise}
 */
function claim(transferHash) {
  return axios.post(`${apiUrl}/transfer/${transferHash}/claim`);
}


/**
 * Cancels specific CelPay transfer by id
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#b3e2278e-74cf-46a8-9ab7-b2d8db5f662f
 *
 * @param {string} transferHash - hash from db
 * @returns {Promise}
 */
function cancel(transferHash) {
  return axios.post(`${apiUrl}/transfer/${transferHash}/cancel`);
}

/**
 * Creates a CelPay transfer and link on /transfer
 *
 * @param {Object} transfer
 * @param {string} transfer.amount
 * @param {string} transfer.coin - eg. ETH
 * @param {string} transfer.friend_id - uuid
 * @param {string} transfer.message
 * @param {Object} verification
 * @param {string} verification.pin - eg '1234'
 * @param {string} verification.twoFactorCode - eg '123456'
 *
 * @returns {Promise}
 *
 */
function create(transfer, verification) {
  return axios.post(`${apiUrl}/transfer`, {
    ...transfer,
    ...verification,
  });
}

export default transfersService;
