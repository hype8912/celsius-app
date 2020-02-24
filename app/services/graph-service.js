import axios from "axios";
import apiUrl from "./api-url";

const graphService = {
  getTotalWalletBalance,
  getCoinWalletBalance,
  getInterestGraph,
  getCoinInterestGraph,
};

/**
 * Gets dataset for wallet balance graph
 * @see https://documenter.getpostman.com/view/4207695/S11RLvpb?version=latest#fc9f11d5-2c97-4d60-94fa-90e7368756bf
 * @param {time} interval - eg. 1d
 *
 * @returns {Promise}
 */
function getTotalWalletBalance(interval) {
  return axios.get(`${apiUrl}/graphs/wallet/${interval}`);
}

/**
 * Gets dataset for coin balance graph
 * @see https://documenter.getpostman.com/view/4207695/S11RLvpb?version=latest#1e9a458a-7acf-4d23-9bed-a8686d3d404a
 * @param {string} coin
 * @param {time} interval - eg. 1d
 *
 * @returns {Promise}
 */
function getCoinWalletBalance(coin, interval) {
  return axios.get(`${apiUrl}/graphs/wallet/${coin}/${interval}`);
}

/**
 * Gets dataset total interest
 * @see https://documenter.getpostman.com/view/4207695/S11RLvpb?version=latest#0172f534-7045-4c68-a5f1-1cdf9d3aff7c
 * @param {time} interval - eg. 1d
 *
 * @returns {Promise}
 */
function getInterestGraph(interval) {
  return axios.get(`${apiUrl}/graphs/interest/${interval}`);
}

/**
 * Gets dataset for coin balance graph
 * @see https://documenter.getpostman.com/view/4207695/S11RLvpb?version=latest#6cd858dc-2877-4c0a-91d2-84e6dde8c615
 * @param {string} coin
 * @param {time} interval - eg. 1d
 *
 * @returns {Promise}
 */
function getCoinInterestGraph(coin, interval) {
  return axios.get(`${apiUrl}/graphs/interest/${coin}/${interval}`);
}

export default graphService;
