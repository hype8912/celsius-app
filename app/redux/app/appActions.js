import { Constants } from "expo";
import { Platform } from "react-native";
import store from '../../redux/store'

import * as actions from "../actions";
import {
  getSecureStoreKey,
  deleteSecureStoreKey
} from "../../utils/expo-storage";
import { KYC_STATUSES, TRANSFER_STATUSES } from "../../constants/DATA";
import ACTIONS from "../../constants/ACTIONS";
import { registerForPushNotificationsAsync } from "../../utils/push-notifications-util";
import appUtil from "../../utils/app-util";
import branchUtil from "../../utils/branch-util";
import { disableAccessibilityFontScaling } from "../../utils/styles-util";
import ASSETS from "../../constants/ASSETS";
import loggerUtil from "../../utils/logger-util";
import analytics from "../../utils/analytics";

const { SECURITY_STORAGE_AUTH_KEY } = Constants.manifest.extra;

export {
  initCelsiusApp,
  resetCelsiusApp,
  loadCelsiusAssets,
  handleAppStateChange,
  setInternetConnection,
  initAppData
};

/**
 * Initializes Celsius Application
 */
function initCelsiusApp() {
  return async (dispatch, getState) => {
    if (getState().app.appInitializing) return;

    try {
      dispatch({ type: ACTIONS.APP_INIT_START });
      await appUtil.logoutOnEnvChange();

      disableAccessibilityFontScaling();

      await appUtil.initInternetConnectivityListener();
      await appUtil.pollBackendStatus();

      await dispatch(initAppData());
      await dispatch(actions.initUserAppSettings());

      await dispatch(branchUtil.initBranch());

      dispatch({ type: ACTIONS.APP_INIT_DONE });
    } catch (e) {
      loggerUtil.err(e);
    }
  };
}

/**
 * Resets Celsius Application
 */
function resetCelsiusApp() {
  return async (dispatch) => {
    try {
      // Logout user
      await deleteSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);
      dispatch({ type: ACTIONS.RESET_APP });
      // Dev warning message
      dispatch(actions.showMessage("warning", "Reseting Celsius App!"));

      await dispatch(initCelsiusApp());
    } catch (e) {
      loggerUtil.err(e);
    }
  };
}

/**
 * Loads all Celsius App assets from ASSETS.js
 */
function loadCelsiusAssets() {
  return async dispatch => {
    dispatch({ type: ACTIONS.START_LOADING_ASSETS });

    const imageAssets = appUtil.cacheImages(ASSETS.CACHE_IMAGES);
    const fontAssets = appUtil.cacheFonts(ASSETS.FONTS);

    await Promise.all([...imageAssets, ...fontAssets]);

    dispatch({ type: ACTIONS.FINISH_LOADING_ASSETS });
  };
}



/**
 * Handles state change of the app
 * @param {string} nextAppState - one of active|inactive|background
 */
const ASK_FOR_PIN_AFTER = 30 * 60 * 100;
let pinTimeout;
let startOfBackgroundTimer;

function handleAppStateChange(nextAppState) {
  return (dispatch) => {
    const { profile } = store.getState().user;
    const { appState } = store.getState().app;
    const { activeScreen } = store.getState().nav;

    if (nextAppState === "active") {
      if (Platform.OS === "ios") {
        clearTimeout(pinTimeout);
      }

      if (Platform.OS === "android" && new Date().getTime() - startOfBackgroundTimer > ASK_FOR_PIN_AFTER) {
        startOfBackgroundTimer = null;
        dispatch(actions.navigateTo("VerifyProfile", { activeScreen }));
      }

      analytics.sessionStarted()
    }

    if (nextAppState.match(/inactive|background/) && profile && profile.has_pin && appState === "active") {
      if (Platform.OS === "ios") {
        pinTimeout = setTimeout(() => {
            dispatch(actions.navigateTo("VerifyProfile", { activeScreen }));
            clearTimeout(pinTimeout);
        }, ASK_FOR_PIN_AFTER)
      }

      if (Platform.OS === "android") {
        startOfBackgroundTimer = new Date().getTime();
      }

      analytics.sessionEnded()
    }

    dispatch({
      type: ACTIONS.SET_APP_STATE,
      appState: nextAppState
    });
  };
}


/**
 * Sets internet connection in the reducer
 * @param {boolean} connection
 */
function setInternetConnection(connection) {
  return {
    type: ACTIONS.SET_INTERNET_CONNECTION,
    internetConnected: connection
  };
}

/**
 * Initialize all data needed for the App
 */
function initAppData() {
  return async (dispatch, getState) => {

    await dispatch(actions.getInitialCelsiusData());

    // get user token
    const token = await getSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);

    // fetch user
    if (token) await dispatch(actions.getProfileInfo());

    // get expired session
    const { expiredSession } = getState().user;

    if (token && !expiredSession) {
      analytics.sessionStarted();
      registerForPushNotificationsAsync();
      dispatch(actions.claimAllBranchTransfers());

      // get all KYC document types and claimed transfers for non-verified users
      const { profile } = getState().user;
      if (profile) {
        if (!profile.kyc || (profile.kyc && profile.kyc.status !== KYC_STATUSES.passed)) {
          await dispatch(actions.getAllTransfers(TRANSFER_STATUSES.claimed));
        }

        // get wallet details for verified users
        if (profile.kyc && profile.kyc.status === KYC_STATUSES.passed) {
          await dispatch(actions.getWalletSummary());
          await dispatch(actions.getComplianceInfo());
        }
      }
    } else if (token) {
      // logout if expired session or no token
      await dispatch(actions.logoutUser());
    }

    // get general data for te app
    await dispatch(actions.getCurrencyRates());
    await dispatch(actions.getCurrencyGraphs());
  };
}
