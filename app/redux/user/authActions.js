import Branch from "react-native-branch";

import Constants from "../../../constants";
import ACTIONS from "../../constants/ACTIONS";
import API from "../../constants/API";
import { startApiCall, apiError } from "../api/apiActions";
import { navigateTo } from "../nav/navActions";
import { showMessage, toggleKeypad } from "../ui/uiActions";
import { initAppData, showVerifyScreen } from "../app/appActions";
import {
  registerUserFacebook,
  registerUserGoogle,
  registerUserTwitter,
} from "./thirdPartyActions";
import { claimAllBranchTransfers } from "../transfers/transfersActions";
import {
  deleteSecureStoreKey,
  setSecureStoreKey,
} from "../../utils/expo-storage";
import usersService from "../../services/users-service";
import apiUtil from "../../utils/api-util";
import logger from "../../utils/logger-util";
import { setFormErrors, updateFormField } from "../forms/formsActions";
import meService from "../../services/me-service";
import appsFlyerUtil from "../../utils/appsflyer-util";
import branchUtil from "../../utils/branch-util";
import userBehaviorUtil from "../../utils/user-behavior-util";

const { SECURITY_STORAGE_AUTH_KEY } = Constants;

// TODO move to security
// TODO move to security
// TODO move to security
// TODO move to security
export {
  createAccount,
  registerUser,
  loginUser,
  logoutUser,
  expireSession,
  sendResetLink,
  setPin,
  changePin,
  resetPassword,
  logoutFromAllDevices,
};

/**
 * Logs the user in with email and password
 */
function loginUser() {
  return async (dispatch, getState) => {
    try {
      const { formData } = getState().forms;

      dispatch(startApiCall(API.LOGIN_USER));
      const res = await usersService.login({
        email: formData.email,
        password: formData.password,
        reCaptchaKey: formData.reCaptchaKey,
      });

      // add token to expo storage
      await setSecureStoreKey(
        SECURITY_STORAGE_AUTH_KEY,
        res.data.auth0.id_token
      );

      const userRes = await usersService.getPersonalInfo();
      const user = userRes.data;

      const { showVerifyScreen: showVerifyScreenValue } = getState().app;
      if (!showVerifyScreenValue) {
        await dispatch(initAppData());
        dispatch(claimAllBranchTransfers());
      }

      dispatch({
        type: ACTIONS.LOGIN_USER_SUCCESS,
        callName: API.LOGIN_USER,
        tokens: res.data.auth0,
        user,
      });

      if (!user.has_pin) {
        dispatch(navigateTo("RegisterSetPin"));
      } else {
        dispatch(navigateTo("WalletFab"));
      }
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.LOGIN_USER, err));
    }
  };
}

/**
 * Registers a user signed up with email
 */
function registerUser() {
  return async (dispatch, getState) => {
    try {
      const { formData } = getState().forms;
      const referralLinkId = branchUtil.getReferralId();

      const user = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        referral_link_id: referralLinkId || undefined,
      };

      dispatch(startApiCall(API.REGISTER_USER));
      const res = await usersService.register(user);

      // add token to expo storage
      await setSecureStoreKey(
        SECURITY_STORAGE_AUTH_KEY,
        res.data.auth0.id_token
      );
      await dispatch(initAppData());

      userBehaviorUtil.sessionStarted("User registred");
      dispatch(claimAllBranchTransfers());
      dispatch({
        type: ACTIONS.REGISTER_USER_SUCCESS,
        user: res.data.user,
      });
      dispatch(navigateTo("RegisterSetPin"));
    } catch (err) {
      if (err.type === "Validation error") {
        dispatch(setFormErrors(apiUtil.parseValidationErrors(err)));
      } else {
        dispatch(showMessage("error", err.msg));
      }
      dispatch(apiError(API.REGISTER_USER, err));
    }
  };
}

/**
 * Sends an email with the reset password link
 */
function sendResetLink() {
  return async (dispatch, getState) => {
    try {
      const { formData } = getState().forms;
      dispatch(startApiCall(API.SEND_RESET_LINK));
      await usersService.sendResetLink(formData.email);
      dispatch(showMessage("info", "Email sent!"));
      dispatch(navigateTo("Login"));
      dispatch({ type: ACTIONS.SEND_RESET_LINK_SUCCESS });
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.SEND_RESET_LINK, err));
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
      const { data } = await usersService.resetPassword(
        currentPassword,
        newPassword
      );
      const {
        auth0: { id_token: newAuthToken },
      } = data;

      await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, newAuthToken);

      dispatch(showMessage("success", "Password successfully changed."));
      dispatch(resetPasswordSuccess());
      userBehaviorUtil.changePassword();
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
 * Logs the user out of the app
 */
function logoutUser() {
  return async dispatch => {
    try {
      await deleteSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);
      await deleteSecureStoreKey("HIDE_MODAL_INTEREST_IN_CEL");
      if (Constants.appOwnership === "standalone") Branch.logout();
      dispatch({
        type: ACTIONS.LOGOUT_USER,
      });
      await dispatch(navigateTo("Welcome"));
      dispatch(showVerifyScreen(false));

      userBehaviorUtil.sessionEnded("Logout user");
    } catch (err) {
      logger.err(err);
    }
  };
}

/**
 * Logs the user out from all devices
 */
function logoutFromAllDevices() {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.LOGOUT_FROM_ALL_DEVICES));
      await usersService.invalidateSession();
      dispatch({
        type: ACTIONS.LOGOUT_FROM_ALL_DEVICES_SUCCESS,
      });

      await dispatch(logoutUser());
      dispatch(
        showMessage("success", "Successfully logged out from all devices.")
      );
    } catch (err) {
      logger.err(err);
    }
  };
}

/**
 * Expires the session for the user
 */
function expireSession() {
  return async dispatch => {
    try {
      dispatch({
        type: ACTIONS.EXPIRE_SESSION,
      });
    } catch (err) {
      logger.err(err);
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
      await meService.setPin({
        pin: formData.pin,
        pin_confirm: formData.pinConfirm,
      });
      dispatch({ type: ACTIONS.SET_PIN_SUCCESS });
      dispatch({ type: ACTIONS.CLEAR_FORM });
      userBehaviorUtil.setPin();
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
      await meService.changePin(pinData);

      dispatch({ type: ACTIONS.CHANGE_PIN_SUCCESS });
      dispatch({ type: ACTIONS.CLEAR_FORM });
      dispatch(showMessage("success", "Successfully changed PIN number"));
      dispatch(navigateTo("SecuritySettings"));
      userBehaviorUtil.changePin();
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
 * Creates an account for user no matter the registration method
 */
function createAccount() {
  return async (dispatch, getState) => {
    const { formData } = getState().forms;

    if (formData.googleId) {
      await dispatch(registerUserGoogle());
    }

    if (formData.facebookId) {
      await dispatch(registerUserFacebook());
    }

    if (formData.twitterId) {
      await dispatch(registerUserTwitter());
    }

    if (!formData.googleId && !formData.facebookId && !formData.twitterId) {
      await dispatch(registerUser());
    }

    const user = getState().user.profile;
    if (user.id) {
      appsFlyerUtil.registrationCompleted(user);
      userBehaviorUtil.registrationCompleted(user);
    }
  };
}
