import API from "../../constants/API";
import { startApiCall, apiError } from "../api/apiActions";
import { showMessage } from "../ui/uiActions";
import ACTIONS from "../../constants/ACTIONS";
import userDataService from "../../services/user-data-service";
import interestUtil from "../../utils/interest-util";

export { getLoyaltyInfo };

function getLoyaltyInfo() {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_LOYALTY_INFO));
      const res = await userDataService.getLoyaltyInfo();
      const loyaltyInfo = res.data;

      // NOTE(fj) BE returns cel_rate as "0" every time
      const interestRates = interestUtil.getLoyaltyRates(loyaltyInfo);

      dispatch(getLoyaltyInfoSuccess(loyaltyInfo, interestRates));
    } catch (err) {
      dispatch(showMessage(`error`, err.msg));
      dispatch(apiError(API.GET_LOYALTY_INFO, err));
    }
  };
}

function getLoyaltyInfoSuccess(loyaltyInfo, interestRates) {
  return {
    type: ACTIONS.GET_LOYALTY_INFO_SUCCESS,
    callName: API.GET_LOYALTY_INFO,
    loyaltyInfo,
    interestRates,
  };
}
