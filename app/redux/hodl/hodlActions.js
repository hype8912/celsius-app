// import ACTIONS from "../../constants/ACTIONS";
import { apiError, startApiCall } from "../api/apiActions";
import API from "../../constants/API";
import hodlService from "../../services/hodl-service";
import { navigateTo } from "../nav/navActions";
import { showMessage } from "../ui/uiActions";
import ACTIONS from "../../constants/ACTIONS";

export { beginHodlMode, activateHodlMode, deactivateHodlMode, pollHodlStatus };

/**
 * act of intention to star hodl mode
 */

function beginHodlMode() {
  return async (dispatch, getState) => {
    dispatch(startApiCall(API.BEGIN_HODL_MODE));

    const { formData } = getState().forms;

    try {
      const verification = {
        pin: formData.pin,
        twoFactorCode: formData.code,
      };
      const result = await hodlService.beginHodlMode(verification);

      dispatch(navigateTo("HODLViewCode"));

      dispatch({
        type: ACTIONS.BEGIN_HODL_MODE,
        hodlCode: result.data,
      });
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.BEGIN_HODL_MODE, err));
    }
  };
}

/**
 * activation of hodlMode
 */

function activateHodlMode() {
  return async (dispatch, getState) => {
    dispatch(startApiCall(API.ACTIVATE_HODL_MODE));

    const { formData } = getState().forms;

    try {
      const verification = {
        pin: formData.pin,
        twoFactorCode: formData.code,
      };
      await hodlService.activateHodlMode(verification);

      dispatch(navigateTo("CheckYourEmail"));
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.ACTIVATE_HODL_MODE, err));
    }
  };
}

/**
 * hodl mode deactivation
 */

function deactivateHodlMode() {
  return async (dispatch, getState) => {
    dispatch(startApiCall(API.DEACTIVATE_HODL_MODE));

    const { formData } = getState().forms;

    try {
      // const hodlCode = formData.hodlCode;
      const verification = {
        pin: formData.pin,
        twoFactorCode: formData.code,
        code: formData.hodlCode,
      };

      await hodlService.deactivateHodlMode(verification);
      dispatch(navigateTo("CheckYourEmail"));
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.DEACTIVATE_HODL_MODE, err));
    }
  };
}

/**
 * polling of hodlStatus
 */

function pollHodlStatus() {
  return async dispatch => {
    dispatch(startApiCall(API.POLL_HODL_STATUS));

    try {
      const res = await hodlService.pollHodlStatus();
      const hodlStatus = res.data.hodlModeStatus;

      dispatch({
        type: ACTIONS.POLL_HODL_STATUS_SUCCESS,
        hodlStatus,
      });
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.POLL_HODL_STATUS, err));
    }
  };
}
