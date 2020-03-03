import axios from 'axios';
import apiUrl from './api-url';

const currenciesService = {
  getRates,
  getGraphs,
};


/**
 * Gets all supported currency rates from db
 * @see https://documenter.getpostman.com/view/4207695/S11RLvpb#1a737a0a-7d75-4428-a3b5-8e7eeac2e84a
 *
 * @returns {Promise}
 */
function getRates() {
  return axios.get(`${apiUrl}/currencies/rates`);
}

/**
 * Gets graph data for all supported currencies
 * @see https://documenter.getpostman.com/view/4207695/S11RLvpb#ba974530-d4b2-4c9b-88a4-4849e5c2797e
 *
 * @returns {Promise}
 */
function getGraphs() {
  return axios.get(`${apiUrl}/currencies/graphs`);
}

export default currenciesService;
