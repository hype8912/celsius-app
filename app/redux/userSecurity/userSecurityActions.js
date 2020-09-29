import ACTIONS from "../../constants/ACTIONS";
import API from "../../constants/API";
import { apiError, startApiCall } from "../api/apiActions";
import { showMessage, toggleKeypad } from "../ui/uiActions";
import { updateFormField, updateFormFields } from "../forms/formsActions";
import { navigateTo, navigateBack } from "../nav/navActions";
import userSecurityService from "../../services/user-security-service";
import userAuthService from "../../services/user-auth-service";
import mixpanelAnalytics from "../../utils/mixpanel-analytics";
import { logoutUser } from "../userAuth/authActions";
import { setSecureStoreKey } from "../../utils/storage-util";
import { SCREENS } from "../../constants/SCREENS";
import { STORAGE_KEYS } from "../../constants/DATA";

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
  fromFixNow,
  toFixNow,
  clearToFixNow,
  updateFixNowContent,
  fixNowNextItem,
};

/**
 * gets two factor secret for user
 * @param {string} pin
 */
function getTwoFactorSecret(pin) {
  return async dispatch => {
    try {
      const res = await userSecurityService.beginTwoFactorActivation(pin);
      const secretData = res.data;
      return secretData;
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
      const formData = getState().forms.formData;
      const verification = {
        pin: formData.pin,
        twoFactorCode: formData.code,
        payload: formData.payload,
        signature: formData.signature,
      };

      dispatch(startApiCall(API.DISABLE_TWO_FACTOR));
      await userSecurityService.disableTwoFactor(verification);
      dispatch({ type: ACTIONS.DISABLE_TWO_FACTOR_SUCCESS });
      dispatch(navigateTo(SCREENS.SECURITY_SETTINGS));
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
      dispatch(toggleKeypad());

      await userSecurityService.checkPin(pin);

      dispatch({ type: ACTIONS.CHECK_PIN_SUCCESS });
      if (onSuccess) onSuccess();
    } catch (err) {
      if (onError) onError();
      if (err.status !== 429) {
        dispatch(showMessage("error", err.msg));
        dispatch(updateFormField("pin", ""));
        dispatch(toggleKeypad());
      }
      dispatch(apiError(API.CHECK_PIN, err));
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
      dispatch(toggleKeypad());

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
function changePin(onSuccess) {
  return async (dispatch, getState) => {
    const { formData } = getState().forms;
    const { profile } = getState().user;

    const verification = {
      pin: formData.pin,
      twoFactorCode: formData.code,
      payload: formData.payload,
      signature: formData.signature,
      new_pin: formData.newPin,
      new_pin_confirm: formData.newPinConfirm,
    };

    dispatch(toggleKeypad());

    if (profile.two_factor_enabled) {
      await dispatch(
        navigateTo(SCREENS.VERIFY_PROFILE, {
          hideBack: true,
          onSuccess: async () => {
            dispatch(updateFormField("loading", true));
            await dispatch(completePinChange(verification, onSuccess));
          },
        })
      );
    } else {
      dispatch(updateFormField("loading", true));
      dispatch(completePinChange(verification, onSuccess));
    }
  };
}

function completePinChange(pinData, onSuccess) {
  return async (dispatch, getState) => {
    const { formData } = getState().forms;
    const { securityOverview } = getState().security;

    try {
      dispatch(startApiCall(API.CHANGE_PIN));
      await userSecurityService.changePin(pinData);

      dispatch({ type: ACTIONS.CHANGE_PIN_SUCCESS });
      dispatch({ type: ACTIONS.CLEAR_FORM });

      dispatch({ type: ACTIONS.SET_SIX_DIGIT_PIN });
      mixpanelAnalytics.changePin();
      dispatch(showMessage("success", "Successfully changed PIN number"));
      if (formData.upgradeToSixDigitPin) {
        onSuccess();
        return;
      }

      if (securityOverview.fromFixNow) {
        dispatch(toFixNow());
        dispatch(updateFormField("loading", false));
        return;
      }

      dispatch(navigateTo(SCREENS.SECURITY_SETTINGS));
      dispatch(updateFormField("loading", false));
      return;
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.CHANGE_PIN, err));
      dispatch(
        updateFormFields({
          pinCreated: false,
          newPinConfirm: "",
          newPin: "",
          loading: false,
        })
      );
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
  return async (dispatch, getState) => {
    dispatch(startApiCall(API.RESET_PASSWORD));
    try {
      const { securityOverview } = getState().security;
      const { data } = await userAuthService.resetPassword(
        currentPassword,
        newPassword
      );
      const {
        auth0: { id_token: newAuthToken },
      } = data;

      await setSecureStoreKey(
        STORAGE_KEYS.SECURITY_STORAGE_AUTH_KEY,
        newAuthToken
      );

      dispatch(showMessage("success", "Password successfully changed."));
      if (securityOverview.fromFixNow) {
        dispatch(toFixNow());
      } else {
        dispatch(navigateTo(SCREENS.SECURITY_SETTINGS));
      }
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
      await userSecurityService.invalidateSession();
      await mixpanelAnalytics.loggedOutOfAllSessions();
      dispatch({
        type: ACTIONS.LOGOUT_FROM_ALL_DEVICES_SUCCESS,
      });
      dispatch(
        showMessage("success", "Successfully logged out from all devices.")
      );
      await dispatch(logoutUser());
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.LOGOUT_FROM_ALL_DEVICES, err));
      mixpanelAnalytics.logError("logoutFromAllDevices", err);
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

      const content = res.data.score_parameters.filter(
        c => c.fixable && c.name !== "hodl_mode"
      );
      const index = 0;
      const item = content[index];

      const overview = {
        ...res.data,
        fixNowContent: {
          content,
          index,
          item,
        },
      };
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

/**
 *
 * fromFixNow flag, used in navigation handling. If true, on end of fixable flow app will go back to fixNowScreen.
 */
function fromFixNow() {
  return {
    type: ACTIONS.FROM_FIX_NOW,
    fromFixNow: true,
  };
}

/**
 *
 * When app navigate back to fix now screen, clean fromFixNow flag
 */
function clearFromFixNow() {
  return {
    type: ACTIONS.CLEAR_FROM_FIX_NOW,
    fromFixNow: false,
  };
}

/**
 *
 * toFixNow flag, used in navigation handling. Fires when app went back to fixNow screen.
 */
function toFixNow() {
  return dispatch => {
    dispatch({
      type: ACTIONS.TO_FIX_NOW,
      toFixNow: true,
    });
    dispatch(navigateTo(SCREENS.SECURITY_FIX_NOW));
    dispatch(clearFromFixNow());
  };
}

/**
 *
 * When next fix now element is opened , clean fromFixNow flag
 */
function clearToFixNow() {
  return {
    type: ACTIONS.CLEAR_TO_FIX_NOW,
    toFixNow: false,
  };
}

/**
 *
 * Check is 2fa activated. If it is and PIN is fixable, remove PIN from flow
 */
function updateFixNowContent() {
  return (dispatch, getState) => {
    try {
      const twoFAStatus = getState().security.twoFAStatus;
      const currentContent = getState().security.securityOverview.fixNowContent
        .content;
      if (
        twoFAStatus.isActive &&
        currentContent &&
        currentContent.find(c => c.name === "pin")
      ) {
        const content = currentContent.filter(c => c.name !== "pin");
        dispatch({
          type: ACTIONS.UPDATE_FIX_NOW_CONTENT,
          content,
        });
      }
    } catch (err) {
      dispatch(showMessage(`error`, err.msg));
    }
  };
}

/**
 *
 * Next fixNow element handler
 */
function fixNowNextItem() {
  return (dispatch, getState) => {
    try {
      const content = getState().security.securityOverview.fixNowContent
        .content;
      const index = getState().security.securityOverview.fixNowContent.index;

      dispatch(clearToFixNow());

      if (index === content.length - 1) {
        dispatch(navigateBack(SCREENS.SECURITY_OVERVIEW));
        return;
      }

      if (index < content.length) {
        dispatch({
          type: ACTIONS.NEXT_FIX_NOW_ITEM,
          content: {
            index: index + 1,
            item: content[index + 1],
          },
        });
      }
    } catch (err) {
      dispatch(showMessage(`error`, err.msg));
    }
  };
}
