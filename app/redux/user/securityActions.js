import API from "../../constants/API";
import { startApiCall, apiError } from "../api/apiActions";
import usersService from "../../services/users-service";
import { showMessage } from "../ui/uiActions";
import ACTIONS from "../../constants/ACTIONS";

export { getSecurityOverview };

/**
 * TODO add JSDoc
 */
function getSecurityOverview() {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_USER_SECURITY_OVERVIEW));
      const res = await usersService.getUserSecurityOverview();
      const overview = res.data;
      dispatch(getSecurityOverviewSuccess(overview));
    } catch (err) {
      dispatch(showMessage(`error`, err.msg));
      dispatch(apiError(API.GET_USER_SECURITY_OVERVIEW, err));
    }
  };
}

/**
 * TODO add JSDoc
 */
function getSecurityOverviewSuccess(overview) {
  return {
    type: ACTIONS.GET_USER_SECURITY_OVERVIEW_SUCCESS,
    overview,
  };
}
