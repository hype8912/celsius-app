import ACTIONS from "../../constants/ACTIONS";

/**
 * TODO make it a function add JSDoc & desc for return
 */
function initialState() {
  return {
    appInitialized: false,
    appInitializing: false,
    geolocation: null,

    // App states: active|inactive|background
    appState: "active",
    internetConnected: true,
    assetsLoaded: false,
    showVerifyScreen: false, // TODO move to security
    advertisingId: null,
    appsFlyerUID: null,
    lastTenActions: [],
  };
}

export default function appReducer(state = initialState(), action) {
  // last ten actions for sending mixpanel event
  const newState = { ...state };
  newState.lastTenActions.unshift(action.type);
  newState.lastTenActions = newState.lastTenActions.slice(0, 10);

  switch (action.type) {
    case ACTIONS.APP_INIT_START:
      return {
        ...newState,
        appInitialized: false,
        appInitializing: true,
      };

    case ACTIONS.REGISTER_USER_SUCCESS:
    case ACTIONS.LOGIN_USER_SUCCESS:
    case ACTIONS.REGISTER_USER_FACEBOOK_SUCCESS:
    case ACTIONS.REGISTER_USER_GOOGLE_SUCCESS:
    case ACTIONS.REGISTER_USER_TWITTER_SUCCESS:
    case ACTIONS.LOGIN_USER_GOOGLE_SUCCESS:
    case ACTIONS.LOGIN_USER_FACEBOOK_SUCCESS:
    case ACTIONS.LOGIN_USER_TWITTER_SUCCESS:
    case ACTIONS.CHECK_TWO_FACTOR_SUCCESS:
    case ACTIONS.CHECK_PIN_SUCCESS:
    case ACTIONS.APP_INIT_DONE:
      return {
        ...newState,
        appInitialized: true,
        appInitializing: false,
      };

    case ACTIONS.RESET_APP:
      return {
        ...newState,
        appInitialized: false,
      };

    case ACTIONS.SET_APP_STATE:
      return {
        ...newState,
        appState: action.appState,
      };

    case ACTIONS.FINISH_LOADING_ASSETS:
      return {
        ...newState,
        assetsLoaded: true,
      };

    case ACTIONS.SET_INTERNET_CONNECTION:
      return {
        ...newState,
        internetConnected: action.internetConnected,
      };
    case ACTIONS.SHOW_VERIFY_SCREEN:
      return {
        ...newState,
        showVerifyScreen: action.showVerifyScreen,
      };
    case ACTIONS.SET_GEOLOCATION:
      return {
        ...newState,
        geolocation: {
          geoLat: action.geoLat,
          geoLong: action.geoLong,
        },
      };
    case ACTIONS.SET_ADVERTISING_ID:
      return {
        ...newState,
        advertisingId: action.advertisingId,
      };
    case ACTIONS.SET_DEVICE_APPSFLYER_UID:
      return {
        ...newState,
        appsFlyerUID: action.appsFlyerUID,
      };
    default:
      return { ...newState };
  }
}
