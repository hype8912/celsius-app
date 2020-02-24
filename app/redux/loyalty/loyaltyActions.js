import API from "../../constants/API";
import { startApiCall, apiError } from "../api/apiActions";
import { showMessage } from "../ui/uiActions";
import ACTIONS from "../../constants/ACTIONS";
import userDataService from "../../services/user-data-service";
import interestUtil from "../../utils/interest-util";

export { getLoyaltyInfo };

/**
 * TODO add JSDoc
 */
function getLoyaltyInfo() {
  return async (dispatch, getState) => {
    try {
      const interestRates = getState().generalData.interestRates;
      dispatch(startApiCall(API.GET_LOYALTY_INFO));
      const res = await userDataService.getLoyaltyInfo();
      const loyaltyInfo = res.data;

      // NOTE(fj) BE returns cel_rate as "0" every time
      Object.keys(interestRates).forEach(coinShort => {
        const baseRate = interestUtil.getBaseCelRate(coinShort);
        interestRates[coinShort].cel_rate = interestUtil.calculateBonusRate(
          baseRate,
          loyaltyInfo.earn_interest_bonus
        );
        interestRates[coinShort].compound_rate = interestUtil.calculateAPY(
          interestRates[coinShort].rate
        );
        interestRates[coinShort].compound_cel_rate = interestUtil.calculateAPY(
          interestRates[coinShort].cel_rate
        );
      });

      dispatch(getLoyaltyInfoSuccess(loyaltyInfo, interestRates));
    } catch (err) {
      dispatch(showMessage(`error`, err.msg));
      dispatch(apiError(API.GET_LOYALTY_INFO, err));
    }
  };
}

/**
 * TODO add JSDoc
 */
function getLoyaltyInfoSuccess(loyaltyInfo, interestRates) {
  return {
    type: ACTIONS.GET_LOYALTY_INFO_SUCCESS,
    callName: API.GET_LOYALTY_INFO,
    loyaltyInfo,
    interestRates,
  };
}
