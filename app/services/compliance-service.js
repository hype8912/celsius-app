import axios from 'axios';
import apiUrl from './api-url';

const complianceService = {
  getComplianceInfo,
};

/**
 * Gets compliance info for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#7d62f0f6-ae30-4abf-b36a-792dc785a88a
 *
 * @return {Promise}
 */
function getComplianceInfo () {
  return axios.get(`${apiUrl}/me/compliance`)
}


export default complianceService;
