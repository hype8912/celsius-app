// import ACTIONS from "../../constants/ACTIONS";
import { apiError, startApiCall } from "../api/apiActions";
import API from "../../constants/API";
import hodlService from "../../services/hodl-service";
import { navigateTo } from "../nav/navActions";
import { showMessage } from "../ui/uiActions";

export { beginHodlMode };

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

      // remove result
      dispatch(navigateTo("HODLViewCode", result));
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.BEGIN_HODL_MODE, err));
    }
  };
}
