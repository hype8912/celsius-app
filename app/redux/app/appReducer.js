import ACTIONS from "../../constants/ACTIONS";

/**
 * TODO make it a function add JSDoc & desc for return
 */
function initialState() {
  return {
    geolocation: null,

    // App states: active|inactive|background
    appState: "active",
    internetConnected: true,
    assetsLoaded: false,
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
