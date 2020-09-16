import ACTIONS from "../../constants/ACTIONS";
import { isBiometricsSensorAvailable } from "../../utils/biometrics-util";
import { BIOMETRIC_TYPES } from "../../constants/UI";
import biometricsService from "../../services/biometrics-service";
import { startApiCall } from "../api/apiActions";
import API from "../../constants/API";
import { showMessage } from "../ui/uiActions";
import store from "../store";
import logger from "../../utils/logger-util";

export { getBiometricType, checkBiometrics, activateBiometrics };

/**
 * Gets biometrics type available on device
 */
function getBiometricType() {
  return async dispatch => {
    const biometrics = await isBiometricsSensorAvailable();
    // console.log('biometrics: ', biometrics)
    if (biometrics.available) {
      const biometricType =
        biometrics.biometryType ===
        (BIOMETRIC_TYPES.BIOMETRICS || BIOMETRIC_TYPES.TOUCH_ID)
          ? BIOMETRIC_TYPES.TOUCH_ID
          : BIOMETRIC_TYPES.FACE_ID;

      dispatch({
        type: ACTIONS.IS_BIOMETRIC_AVAILABLE,
        biometrics: {
          ...biometrics,
          biometryType: biometricType,
        },
      });
    }
  };
}

function checkBiometrics(onSuccess, onError) {
  const formData = store.getState().forms.formData;
  return async dispatch => {
    try {
      dispatch(startApiCall(ACTIONS.CHECK_BIOMETRICS));
      await biometricsService.checkBiometrics(
        formData.payload,
        formData.signature
      );
      dispatch({ type: ACTIONS.CHECK_BIOMETRICS_SUCCESS });
      if (onSuccess) onSuccess();
    } catch (e) {
      dispatch(showMessage("error", e.msg));
      if (onError) onError();
    }
  };
}

function activateBiometrics(publicKey, type) {
  const user = store.getState().user.profile;
  const formData = store.getState().forms.formData;
  const verification = {
    type: user.two_factor_enabled ? "twoFactorCode" : "pin",
    value: user.two_factor_enabled ? formData.code : formData.pin,
  };
  return async dispatch => {
    try {
      dispatch(startApiCall(API.ACTIVATE_BIOMETRICS));
      await biometricsService.activateBiometrics(publicKey, type, verification);

      dispatch({
        type: ACTIONS.UPDATE_USER_BIOMETRICS_STATUS_SUCCESS, // TODO when disabling, dispatch this too - biometricsEnabled: false
        biometricsEnabled: true,
      });
    } catch (e) {
      await logger.err(e);
    }
  };
}
