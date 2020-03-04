// import ACTIONS from "../../constants/ACTIONS";
import { apiError, startApiCall } from "../api/apiActions";
import API from "../../constants/API";
import hodlService from "../../services/hodl-service";
import { navigateTo } from "../nav/navActions";
import { showMessage } from "../ui/uiActions";

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

      // console.log("result", result)

      // remove result
      dispatch(navigateTo("HODLViewCode", result));
    } catch (err) {
      // console.log("err", err)
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.BEGIN_HODL_MODE, err));
    }
  };
}

function activateHodlMode() {
  return async (dispatch, getState) => {
    dispatch(startApiCall(API.BEGIN_HODL_MODE));

    const { formData } = getState().forms;

    // console.log("formData.pin", formData.pin);

    try {
      const verification = {
        pin: formData.pin,
        twoFactorCode: formData.code,
      };
      const result = await hodlService.activateHodlMode(verification);

      // console.log("result", result)

      // remove result
      dispatch(navigateTo("HODLViewCode", result));
    } catch (err) {
      // console.log("err", err)
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.BEGIN_HODL_MODE, err));
    }
  };
}

function deactivateHodlMode() {
  return async (dispatch, getState) => {
    dispatch(startApiCall(API.BEGIN_HODL_MODE));

    const { formData } = getState().forms;

    // console.log("formData.pin", formData.pin);

    try {
      const verification = {
        pin: formData.pin,
        twoFactorCode: formData.code,
      };
      const result = await hodlService.deactivateHodlMode(verification);

      // console.log("result", result)

      // remove result
      dispatch(navigateTo("HODLViewCode", result));
    } catch (err) {
      // console.log("err", err)
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.BEGIN_HODL_MODE, err));
    }
  };
}
