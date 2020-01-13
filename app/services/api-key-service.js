import axios from "axios";
import apiUrl from "./api-url";

const apiKeyService = {
  getAll,
  create,
  remove,
};

/**
 * Gets all API keys for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#cbc9474a-981a-424f-99c1-24c12e0c83cc
 *
 * @returns {Promise}
 */
function getAll() {
  return axios.get(`${apiUrl}/api_key`);
}

/**
 * Creates API key for user from permissions
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#95240b60-f2dc-4ad4-ab99-c825f32ecdbf
 *
 * @param {Object} permissions
 * @param {boolean} permissions.read_balance
 * @param {boolean} permissions.read_transactions
 * @param {boolean} permissions.read_deposit_address
 * @param {boolean} permissions.withdraw
 * @returns {Promise}
 */
function create(permissions) {
  return axios.post(`${apiUrl}/api_key`, permissions);
}

/**
 * Deletes users API key
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#34180ffb-2008-462e-9492-0835c4e8f5e6
 *
 * @param {string} keyId - uuid
 * @returns {Promise}
 */
function remove(keyId) {
  return axios.delete(`${apiUrl}/api_key/${keyId}`);
}

export default apiKeyService;
