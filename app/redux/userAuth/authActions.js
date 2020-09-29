import Constants from "../../../constants";
import ACTIONS from "../../constants/ACTIONS";
import API from "../../constants/API";
import { startApiCall, apiError } from "../api/apiActions";
import { navigateTo, resetToScreen } from "../nav/navActions";
import { showMessage } from "../ui/uiActions";
import {
  registerUserFacebook,
  registerUserGoogle,
  registerUserTwitter,
} from "./thirdPartyActions";
import {
  deleteSecureStoreKey,
  setSecureStoreKey,
} from "../../utils/storage-util";
import userAuthService from "../../services/user-auth-service";
import apiUtil from "../../utils/api-util";
import { setFormErrors } from "../forms/formsActions";
import branchUtil from "../../utils/branch-util";
import mixpanelAnalytics from "../../utils/mixpanel-analytics";
import { logoutUserMixpanel } from "../../utils/mixpanel-util";
import userSecurityService from "../../services/user-security-service";
import { getInitialCelsiusData } from "../generalData/generalDataActions";
import { SCREENS } from "../../constants/SCREENS";
import { STORAGE_KEYS } from "../../constants/DATA";

const { SECURITY_STORAGE_AUTH_KEY } = Constants;

export {
  createAccount,
  registerUser,
  loginUser,
  logoutUser,
  expireSession,
  sendResetLink,
  refreshAuthToken,
  logoutFormDevice,
};

/**
 * Logs the user in with email and password
 */
function loginUser() {
  return async (dispatch, getState) => {
    try {
      const { formData } = getState().forms;

      dispatch(startApiCall(API.LOGIN_USER));

      const res = await userAuthService.login({
        email: formData.email,
        password: formData.password,
        reCaptchaKey: formData.reCaptchaKey,
      });

      // add token to expo storage
      await setSecureStoreKey(
        STORAGE_KEYS.SECURITY_STORAGE_AUTH_KEY,
        res.data.auth0.id_token
      );

      dispatch({
        type: ACTIONS.LOGIN_USER_SUCCESS,
        callName: API.LOGIN_USER,
        tokens: res.data.auth0,
      });

      await dispatch(getInitialCelsiusData());
      dispatch(resetToScreen(SCREENS.HOME));
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
        reCaptchaKey: formData.reCaptchaKey,
      };
      dispatch(startApiCall(API.REGISTER_USER));
      const res = await userAuthService.register(user);

      // add token to expo storage
      await setSecureStoreKey(
        STORAGE_KEYS.SECURITY_STORAGE_AUTH_KEY,
        res.data.auth0.id_token
      );

      dispatch({
        type: ACTIONS.REGISTER_USER_SUCCESS,
        user: res.data.user,
        tokens: res.data.auth0,
      });

      dispatch(navigateTo(SCREENS.REGISTER_SET_PIN));
    } catch (err) {
      dispatch(apiError(API.REGISTER_USER, err));
      if (err.type === "Validation error") {
        return dispatch(setFormErrors(apiUtil.parseValidationErrors(err)));
      }
      // Don't show message if BitWala
      if (err.type === "BitWala") return;
      dispatch(showMessage("error", err.msg));
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
      await userAuthService.sendResetLink(formData.email);
      dispatch(showMessage("info", "Email sent!"));
      dispatch(navigateTo(SCREENS.LOGIN));
      dispatch({ type: ACTIONS.SEND_RESET_LINK_SUCCESS });
      mixpanelAnalytics.forgottenPassword();
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.SEND_RESET_LINK, err));
    }
  };
}

/**
 * Logs the user out of the app
 */
function logoutUser() {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.INVALIDATE_SESSION));
      dispatch(resetToScreen(SCREENS.WELCOME));
      await logoutUserMixpanel();
      await userSecurityService.invalidateSession();
      await deleteSecureStoreKey(STORAGE_KEYS.SECURITY_STORAGE_AUTH_KEY);
      mixpanelAnalytics.sessionEnded("Logout user");
      dispatch({
        type: ACTIONS.LOGOUT_USER,
      });
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.INVALIDATE_SESSION, err));
      mixpanelAnalytics.logError("logoutUser", err);
    }
  };
}

/**
 *
 */
function logoutFormDevice(type, reason, msg) {
  return async dispatch => {
    try {
      if (reason === "inactiveUser")
        await dispatch(
          resetToScreen(SCREENS.LOGIN_LANDING, {
            type,
            inactiveUser: reason,
            msg,
          })
        );
      else await dispatch(resetToScreen(SCREENS.WELCOME));

      await logoutUserMixpanel();
      await deleteSecureStoreKey(STORAGE_KEYS.SECURITY_STORAGE_AUTH_KEY);
      dispatch({
        type: ACTIONS.LOGOUT_USER,
      });
    } catch (err) {
      mixpanelAnalytics.logError("logoutFormDevice", err);
    }
  };
}

/**
 * Expires the session for the user
 */
function expireSession() {
  return {
    type: ACTIONS.EXPIRE_SESSION,
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
  };
}

/**
 * Refreshes auth token when it is about to expire
 */
function refreshAuthToken() {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.REFRESH_AUTH_TOKEN));
      const res = await userAuthService.refreshAuthToken();
      await setSecureStoreKey(
        STORAGE_KEYS.SECURITY_STORAGE_AUTH_KEY,
        res.data[SECURITY_STORAGE_AUTH_KEY]
      );

      dispatch({
        type: ACTIONS.REFRESH_AUTH_TOKEN_SUCCESS,
      });
    } catch (err) {
      dispatch(apiError(API.REFRESH_AUTH_TOKEN, err));
      return err;
    }
  };
}
