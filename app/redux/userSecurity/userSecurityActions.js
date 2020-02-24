import ACTIONS from "../../constants/ACTIONS";
import API from "../../constants/API";
import { apiError, startApiCall } from "../api/apiActions";
import { showMessage, toggleKeypad } from "../ui/uiActions";
import { updateFormField } from "../forms/formsActions";
import { navigateTo } from "../nav/navActions";
import userSecurityService from "../../services/user-security-service";
import userAuthService from "../../services/user-auth-service";
import mixpanelAnalytics from "../../utils/mixpanel-analytics";
import logger from "../../utils/logger-util";
import { logoutUser } from "../userAuth/authActions";
import { setSecureStoreKey } from "../../utils/expo-storage";
import Constants from "../../../constants";

const { SECURITY_STORAGE_AUTH_KEY } = Constants;

export {
  getTwoFactorSecret,
  enableTwoFactor,
  disableTwoFactor,
  checkPIN,
  checkTwoFactor,
  setPin,
  changePin,
  resetPassword,
  logoutFromAllDevices,
  getSecurityOverview,
};

/**
 * gets two factor secret for user
 * @param {string} pin
 */
function getTwoFactorSecret(pin) {
  return async dispatch => {
    try {
      const secret = await userSecurityService.beginTwoFactorActivation(pin);

      return secret;
    } catch (error) {
      dispatch(showMessage("error", error.msg));
      return false;
    }
  };
}

/**
 * Enables two factor authentication for user
 * @param {string} code - eg. 111111
 */
function enableTwoFactor(code) {
  return async dispatch => {
    try {
      const success = await userSecurityService.enableTwoFactor(code);
      return success;
    } catch (error) {
      dispatch(showMessage("error", error.msg));
    }
  };
}

/**
 * Disables two factor for user, pin is fallback
 */
function disableTwoFactor() {
  return async (dispatch, getState) => {
    try {
      const { code } = getState().forms.formData;
      dispatch(startApiCall(API.DISABLE_TWO_FACTOR));
      await userSecurityService.disableTwoFactor(code);
      dispatch({ type: ACTIONS.DISABLE_TWO_FACTOR_SUCCESS });
      dispatch(navigateTo("SecuritySettings"));
      dispatch(
        showMessage(
          "success",
          "In order to completely remove Two-Factor Verification check your email."
        )
      );
    } catch (error) {
      dispatch(apiError(API.DISABLE_TWO_FACTOR));
      dispatch(showMessage("error", error.msg));
    }
  };
}

/**
 * Checks user pin code
 * @param {Function} onSuccess - what to do if pin is correct
 * @param {Function} onError - what to do if pin is wrong
 */
function checkPIN(onSuccess, onError) {
  return async (dispatch, getState) => {
    try {
      const { pin } = getState().forms.formData;

      dispatch(startApiCall(API.CHECK_PIN));

      await userSecurityService.checkPin(pin);

      dispatch({ type: ACTIONS.CHECK_PIN_SUCCESS });
      if (onSuccess) onSuccess();
    } catch (err) {
      if (onError) onError();
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.CHECK_PIN, err));
      dispatch(updateFormField("pin", ""));
      dispatch(toggleKeypad());
    }
  };
}

/**
 * TODO add JSDoc
 */
function checkTwoFactor(onSuccess, onError) {
  return async (dispatch, getState) => {
    try {
      const { code } = getState().forms.formData;

      dispatch(startApiCall(API.CHECK_TWO_FACTOR));

      await userSecurityService.checkTwoFactor(code);

      dispatch({ type: ACTIONS.CHECK_TWO_FACTOR_SUCCESS });
      if (onSuccess) onSuccess();
    } catch (err) {
      if (onError) onError();
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.CHECK_TWO_FACTOR, err));
      dispatch(updateFormField("code", ""));
      dispatch(toggleKeypad());
    }
  };
}

/**
 * Sets the PIN number during registration
 */
function setPin() {
  return async (dispatch, getState) => {
    try {
      const { formData } = getState().forms;
      dispatch(startApiCall(API.SET_PIN));
      await userSecurityService.setPin({
        pin: formData.pin,
        pin_confirm: formData.pinConfirm,
      });
      dispatch({ type: ACTIONS.SET_PIN_SUCCESS });
      dispatch({ type: ACTIONS.CLEAR_FORM });
      mixpanelAnalytics.setPin();
      return true;
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.SET_PIN, err));
      dispatch({ type: ACTIONS.CLEAR_FORM });
      return false;
    }
  };
}

/**
 * Changes PIN for user
 */
function changePin() {
  return async (dispatch, getState) => {
    try {
      const { formData } = getState().forms;

      const pinData = {
        pin: formData.pin,
        new_pin: formData.newPin,
        new_pin_confirm: formData.newPinConfirm,
      };

      dispatch(toggleKeypad());
      dispatch(startApiCall(API.CHANGE_PIN));
      await userSecurityService.changePin(pinData);

      dispatch({ type: ACTIONS.CHANGE_PIN_SUCCESS });
      dispatch({ type: ACTIONS.CLEAR_FORM });
      dispatch(showMessage("success", "Successfully changed PIN number"));
      dispatch(navigateTo("SecuritySettings"));
      mixpanelAnalytics.changePin();
      return true;
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.CHANGE_PIN, err));
      dispatch(updateFormField("newPinConfirm", ""));
      dispatch(updateFormField("newPin", ""));
      return false;
    }
  };
}

/**
 * Resets password for user
 * @param {string} currentPassword
 * @param {string} newPassword
 */
function resetPassword(currentPassword, newPassword) {
  return async dispatch => {
    dispatch(startApiCall(API.RESET_PASSWORD));
    try {
      const { data } = await userAuthService.resetPassword(
        currentPassword,
        newPassword
      );
      const {
        auth0: { id_token: newAuthToken },
      } = data;

      await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, newAuthToken);

      dispatch(showMessage("success", "Password successfully changed."));
      dispatch(resetPasswordSuccess());
      mixpanelAnalytics.changePassword();
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.RESET_PASSWORD, err));
    }
  };
}

/**
 * @TODO write JSDoc
 */
function resetPasswordSuccess() {
  return {
    type: ACTIONS.RESET_PASSWORD_SUCCESS,
    callName: API.RESET_PASSWORD,
  };
}

/**
 * Logs the user out from all devices
 */
function logoutFromAllDevices() {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.LOGOUT_FROM_ALL_DEVICES));
      await userAuthService.invalidateSession();
      await mixpanelAnalytics.loggedOutOfAllSessions();
      dispatch({
        type: ACTIONS.LOGOUT_FROM_ALL_DEVICES_SUCCESS,
      });
      dispatch(
        showMessage("success", "Successfully logged out from all devices.")
      );
      await dispatch(logoutUser());
    } catch (err) {
      logger.err(err);
    }
  };
}

/**
 * TODO add JSDoc
 */
function getSecurityOverview() {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_USER_SECURITY_OVERVIEW));
      const res = await userSecurityService.getUserSecurityOverview();
      const overview = res.data;
      dispatch(getSecurityOverviewSuccess(overview));
    } catch (err) {
      dispatch(showMessage(`error`, err.msg));
      dispatch(apiError(API.GET_USER_SECURITY_OVERVIEW, err));
    }
  };
}

/**
 * TODO add JSDoc
 */
function getSecurityOverviewSuccess(overview) {
  return {
    type: ACTIONS.GET_USER_SECURITY_OVERVIEW_SUCCESS,
    overview,
  };
}
