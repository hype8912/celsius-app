import ACTIONS from "../../constants/ACTIONS";
import { isBiometricsSensorAvailable } from "../../utils/biometrics-util";
import biometricsService from "../../services/biometrics-service";
import { apiError, startApiCall } from "../api/apiActions";
import API from "../../constants/API";
import { showMessage } from "../ui/uiActions";
import store from "../store";
import mixpanelAnalytics from "../../utils/mixpanel-analytics";

export {
  getBiometricType,
  checkBiometrics,
  activateBiometrics,
  disableBiometrics,
};

/**
 * Set biometrics type available on device
 */
function getBiometricType() {
  return async dispatch => {
    const biometrics = await isBiometricsSensorAvailable();
    if (biometrics.available) {
      dispatch({
        type: ACTIONS.IS_BIOMETRIC_AVAILABLE,
        biometrics: {
          ...biometrics,
          biometryType: biometrics.biometryType,
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

/**
 * Check biometrics for a user
 */
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

/**
 * Activate biometrics for a user
 */
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
        type: ACTIONS.ACTIVATE_BIOMETRICS_SUCCESS,
        biometricsEnabled: true,
      });
      mixpanelAnalytics.biometricsActivated(type);
    } catch (e) {
      dispatch(showMessage("error", e.msg));
      dispatch(apiError(API.ACTIVATE_BIOMETRICS, e));
    }
  };
}

/**
 * Deactivate biometrics for a user
 */
function disableBiometrics() {
  const formData = store.getState().forms.formData;
  const verification = {
    pin: formData.pin,
    twoFactorCode: formData.code,
    payload: formData.payload,
    signature: formData.signature,
  };
  return async dispatch => {
    try {
      dispatch(startApiCall(API.DEACTIVATE_BIOMETRICS));
      await biometricsService.deactivateBiometrics(verification);

      dispatch({
        type: ACTIONS.DEACTIVATE_BIOMETRICS_SUCCESS,
        biometricsEnabled: false,
      });
      mixpanelAnalytics.biometricsDeactivated();
    } catch (e) {
      dispatch(showMessage("error", e.msg));
      dispatch(apiError(API.DEACTIVATE_BIOMETRICS, e));
    }
  };
}
