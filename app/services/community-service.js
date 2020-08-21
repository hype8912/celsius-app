import axios from "axios";
import apiUrl from "./api-url";

const communityService = {
  getCommunityStatistics,
};

/**
 * Gets community stats (
 * @see https://documenter.getpostman.com/view/4207695/celsius/RW1aHzQg?version=latest#a3837440-00d1-4d30-b5f9-eeb42bc01643
 *
 * @return {Promise}
 */
function getCommunityStatistics() {
  return axios.get(`${apiUrl}/community`);
}

export default communityService;
