import Constants from "../../../constants";
import ACTIONS from "../../constants/ACTIONS";
import { apiError, startApiCall } from "../api/apiActions";
import API from "../../constants/API";
import { deleteSecureStoreKey } from "../../utils/expo-storage";
import { showMessage } from "../ui/uiActions";
import complianceService from "../../services/compliance-service";
import { navigateTo } from "../nav/navActions";

const { SECURITY_STORAGE_AUTH_KEY } = Constants;

export { getComplianceInfo };

/**
 * Gets all relevant compliance settings for user
 */
function getComplianceInfo() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_COMPLIANCE_INFO));

    try {
      const complianceInfoRes = await complianceService.getComplianceInfo();
      dispatch(
        getComplianceInfoSuccess(complianceInfoRes.data.allowed_actions)
      );
      if (!complianceInfoRes.data.allowed_actions.app.allowed)
        dispatch(navigateTo("Maintenance"));
    } catch (err) {
      if (err.status === 422) {
        deleteSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);
      }
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_COMPLIANCE_INFO, err));
    }
  };
}

/**
 * if data is successfully retrieved, sends complianceInfo to reducer with appropriate action type
 */
function getComplianceInfoSuccess(complianceInfo) {
  return {
    type: ACTIONS.GET_COMPLIANCE_INFO_SUCCESS,
    callName: API.GET_COMPLIANCE_INFO,
    complianceInfo,
  };
}
