// import ACTIONS from "../../constants/ACTIONS";
import { apiError, startApiCall } from "../api/apiActions";
import API from "../../constants/API";
import hodlService from "../../services/hodl-service";
import { navigateTo } from "../nav/navActions";
import { showMessage } from "../ui/uiActions";
import ACTIONS from "../../constants/ACTIONS";

export { beginHodlMode, activateHodlMode, deactivateHodlMode };

function beginHodlMode() {
  return async (dispatch, getState) => {
    dispatch(startApiCall(API.BEGIN_HODL_MODE));

    const { formData } = getState().forms;

    // console.log("formData.pin", formData.pin);

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
      // console.log("err", err)
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.BEGIN_HODL_MODE, err));
    }
  };
}

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
      // console.log("err", err)
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.ACTIVATE_HODL_MODE, err));
    }
  };
}

function deactivateHodlMode() {
  return async (dispatch, getState) => {
    dispatch(startApiCall(API.BEGIN_HODL_MODE));

    const { formData } = getState().forms;

    try {
      const verification = {
        pin: formData.pin,
        twoFactorCode: formData.code,
      };
      await hodlService.deactivateHodlMode(verification);
      dispatch(navigateTo("CheckYourEmail"));
    } catch (err) {
      // console.log("err", err)
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.BEGIN_HODL_MODE, err));
    }
  };
}
