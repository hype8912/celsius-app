// import { Platform } from "react-native";
import { IDFA } from "react-native-idfa";
import Geolocation from "@react-native-community/geolocation";
import { RESULTS } from "react-native-permissions";

import * as actions from "../actions";
import ACTIONS from "../../constants/ACTIONS";
import appUtil from "../../utils/app-util";
import ASSETS from "../../constants/ASSETS";
import {
  requestForPermission,
  ALL_PERMISSIONS,
} from "../../utils/device-permissions";
import mixpanelAnalytics from "../../utils/mixpanel-analytics";
import { navigateBack, navigateTo } from "../nav/navActions";
import { SCREENS } from "../../constants/SCREENS";
import {
  startRecording,
  stopRecordingAndUploadData,
} from "../../utils/uxcam-util";

export {
  loadCelsiusAssets,
  handleAppStateChange,
  setInternetConnection,
  getGeolocation,
  setAdvertisingId,
  setAppsFlyerUID,
  setDeviceId,
  toggleMaintenanceMode,
};

/**
 * Loads all Celsius App assets from ASSETS.js
 */
function loadCelsiusAssets() {
  return async dispatch => {
    dispatch({ type: ACTIONS.START_LOADING_ASSETS });

    // await appUtil.cacheFonts(ASSETS.FONTS);
    await appUtil.cacheImages(ASSETS.CACHE_IMAGES);

    dispatch({ type: ACTIONS.FINISH_LOADING_ASSETS });
  };
}

/**
 * Handles state change of the app
 * @param {string} nextAppState - one of active|inactive|background
 */

function handleAppStateChange(nextAppState) {
  return async (dispatch, getState) => {
    const { profile } = getState().user;
    const { appState } = getState().app;

    if (profile && profile.has_pin) {
      if (nextAppState === "active") {
        await appUtil.pollBackendStatus();
        await dispatch(actions.getLoyaltyInfo());
        dispatch(actions.getUserStatus());
        dispatch(actions.getInitialCelsiusData());
        dispatch(actions.getCurrencyRates());
        dispatch(actions.closeModal());
        dispatch(actions.getBiometricType()); // Get biometric type on Biometric authentication screen when app state changes

        mixpanelAnalytics.sessionStarted("Foreground");
        startRecording();
      }

      if (
        nextAppState.match(/inactive|background/) &&
        profile &&
        profile.has_pin &&
        appState === "active"
      ) {

        mixpanelAnalytics.sessionEnded("Background");
        stopRecordingAndUploadData();
      }
    }

    dispatch({
      type: ACTIONS.SET_APP_STATE,
      appState: nextAppState,
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
    internetConnected: connection,
  };
}

/**
 * Set advertising id for Apps Flyer
 */
function setAdvertisingId() {
  return async dispatch => {
    try {
      const userAID = await IDFA.getIDFA();
      dispatch({
        type: ACTIONS.SET_ADVERTISING_ID,
        advertisingId: userAID,
      });
    } catch (e) {
      mixpanelAnalytics.logError("setAdvertisingId", e)
      dispatch({
        type: ACTIONS.SET_ADVERTISING_ID,
        advertisingId: null,
      });
    }
  };
}

/**
 * Set Device ID
 */
function setDeviceId(deviceId) {
 return {
    type: ACTIONS.SET_DEVICE_ID,
    deviceId,
  };
}

/**
 * Set Apps Flyer device UID
 */
function setAppsFlyerUID(appsFlyerUID) {
 return {
    type: ACTIONS.SET_DEVICE_APPSFLYER_UID,
    appsFlyerUID,
  };
}


/**
 * Gets geolocation for device
 */
function getGeolocation() {
  return async dispatch => {
    const permission = await requestForPermission(ALL_PERMISSIONS.LOCATION);

    if (permission !== RESULTS.GRANTED) return;

    Geolocation.getCurrentPosition(location => {
      if (location && location.coords) {
        dispatch({
          type: ACTIONS.SET_GEOLOCATION,
          geoLat: location.coords.latitude,
          geoLong: location.coords.longitude,
        });
      }
    });
  };
}

/**
 * Sets app into maintenance mode
 *
 * @param {string} title
 * @param {string} explanation
 */
function toggleMaintenanceMode(title, explanation) {
  return (dispatch, getState) => {
    const { backendStatus } = getState().generalData;

    dispatch({
      type: ACTIONS.TOGGLE_MAINTENANCE_MODE,
      maintenance: !!title,
      title,
      explanation,
    });

    if (backendStatus && backendStatus.maintenance && !title) {
      dispatch(navigateBack());
    } else {
      dispatch(navigateTo(SCREENS.MAINTENANCE));
    }
  };
}
