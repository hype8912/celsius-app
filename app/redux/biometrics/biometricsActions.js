import ACTIONS from "../../constants/ACTIONS";
import { isBiometricsSensorAvailable } from "../../utils/biometrics-util";
import { BIOMETRIC_TYPES } from "../../constants/UI";
import biometricsService from "../../services/biometrics-service";
import { apiError, startApiCall } from "../api/apiActions";
import API from "../../constants/API";
import { showMessage } from "../ui/uiActions";
import store from "../store";

export {
  getBiometricType,
  checkBiometrics,
  activateBiometrics,
  disableBiometrics,
};

/**
 * Gets biometrics type available on device
 */
function getBiometricType() {
  return async dispatch => {
    const biometrics = await isBiometricsSensorAvailable();
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
    } else {
      dispatch({
        type: ACTIONS.IS_BIOMETRIC_AVAILABLE,
        biometrics: {
          ...biometrics,
        },
      });
    }
  };
}

function checkBiometrics(onSuccess, onError) {
  const formData = store.getState().forms.formData;
  return async dispatch => {
    try {
      dispatch(startApiCall(API.CHECK_BIOMETRICS));
      await biometricsService.checkBiometrics(
        formData.payload,
        formData.signature
      );
      dispatch({ type: ACTIONS.CHECK_BIOMETRICS_SUCCESS });
      if (onSuccess) onSuccess();
    } catch (e) {
      dispatch(showMessage("error", e.msg));
      dispatch(apiError(API.CHECK_BIOMETRICS, e));
      if (onError) onError();
    }
  };
}

function activateBiometrics(publicKey, type) {
  const formData = store.getState().forms.formData;
  const verification = {
    pin: formData.pin,
    twoFactorCode: formData.code,
  };
  return async dispatch => {
    try {
      dispatch(startApiCall(API.ACTIVATE_BIOMETRICS));
      await biometricsService.activateBiometrics(publicKey, type, verification);

      dispatch({
        type: ACTIONS.UPDATE_USER_BIOMETRICS_STATUS_SUCCESS,
        biometricsEnabled: true,
      });
    } catch (e) {
      dispatch(apiError(API.ACTIVATE_BIOMETRICS, e));
    }
  };
}

function disableBiometrics() {
  const formData = store.getState().forms.formData;
  const verification = {
    pin: formData.pin,
    twoFactorCode: formData.code,
  };
  return async dispatch => {
    try {
      dispatch(startApiCall(API.DEACTIVATE_BIOMETRICS));
      await biometricsService.deactivateBiometrics(verification);

      dispatch({
        type: ACTIONS.UPDATE_USER_BIOMETRICS_STATUS_SUCCESS,
        biometricsEnabled: false,
      });
    } catch (e) {
      dispatch(apiError(API.DEACTIVATE_BIOMETRICS, e));
    }
  };
}
