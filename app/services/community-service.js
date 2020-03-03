import axios from 'axios';
import apiUrl from './api-url';

const communityService = {
  getCommunityStatistics, // TODO add JSDoc
};

function getCommunityStatistics() {
  return axios.get(`${apiUrl}/community`);
}


export default communityService;
