import ACTIONS from "../../constants/ACTIONS";

/**
 * TODO make it a function add JSDoc & desc for return
 */
const initialState = {

  securityOverview: {},
  showVerifyScreen: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case ACTIONS.GET_USER_SECURITY_OVERVIEW_SUCCESS:
      return {
        ...state,
        securityOverview: {
          ...action.overview,
        },
      };
    case ACTIONS.SHOW_VERIFY_SCREEN:
      return {
        ...state,
        showVerifyScreen: action.showVerifyScreen,
      };

    default:
      return state;
  }
};
