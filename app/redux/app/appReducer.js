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
    showVerifyScreen: false // TODO move to security
  };
}

export default function appReducer(state = initialState(), action) {

  switch (action.type) {
    case ACTIONS.APP_INIT_START:
      return {
        ...state,
        appInitialized: false,
        appInitializing: true
      };

    case ACTIONS.REGISTER_USER_SUCCESS:
    case ACTIONS.LOGIN_USER_SUCCESS:
    case ACTIONS.REGISTER_USER_FACEBOOK_SUCCESS:
    case ACTIONS.REGISTER_USER_GOOGLE_SUCCESS:
    case ACTIONS.REGISTER_USER_TWITTER_SUCCESS:
    case ACTIONS.LOGIN_USER_GOOGLE_SUCCESS:
    case ACTIONS.LOGIN_USER_FACEBOOK_SUCCESS:
    case ACTIONS.LOGIN_USER_TWITTER_SUCCESS:
    case ACTIONS.APP_INIT_DONE:
      return {
        ...state,
        appInitialized: true,
        appInitializing: false
      };

    case ACTIONS.RESET_APP:
      return {
        ...state,
        appInitialized: false
      };

    case ACTIONS.SET_APP_STATE:
      return {
        ...state,
        appState: action.appState
      };

    case ACTIONS.FINISH_LOADING_ASSETS:
      return {
        ...state,
        assetsLoaded: true
      };

    case ACTIONS.SET_INTERNET_CONNECTION:
      return {
        ...state,
        internetConnected: action.internetConnected
      };
    case ACTIONS.SHOW_VERIFY_SCREEN:
      return {
        ...state,
        showVerifyScreen: action.showVerifyScreen
      };
    case ACTIONS.SET_GEOLOCATION:
      return {
        ...state,
        geolocation: {
          geoLat: action.geoLat,
          geoLong: action.geoLong,
        }
      };

    default:
      return { ...state };
  }
}
