import axios from "axios";
import apiUrl from "./api-url";

const analyticsService = {
  startedLoanApplicationService,
};
/**
 *
 * Sends start loan process event to backend
 *
 * @returns {Promise}
 */
function startedLoanApplicationService(user) {
  return axios.post(`${apiUrl}/me/analytics/loan-application-started`, user);
}

export default analyticsService;
