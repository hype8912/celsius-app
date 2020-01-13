import ACTIONS from "../../constants/ACTIONS";
import API from "../../constants/API";
import { apiError, startApiCall } from "../api/apiActions";
import { showMessage } from "../ui/uiActions";
import community from "../../services/community-service";

export { getCommunityStatistics };

/**
 * TODO add JSDoc
 */
function getCommunityStatistics() {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_COMMUNITY_STATISTICS));
      const stats = await community.getCommunityStatistics();
      dispatch(getCommunityStatisticsSuccess(stats.data));
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_COMMUNITY_STATISTICS, err));
    }
  };
}

/**
 * TODO add JSDoc
 */
function getCommunityStatisticsSuccess(stats) {
  return {
    type: ACTIONS.GET_COMMUNITY_STATISTICS_SUCCESS,
    stats,
  };
}
