import ACTIONS from "../../constants/ACTIONS";

/**
 * TODO make it a function add JSDoc & desc for return
 */
const initialState = {
  activeScreen: "",
  previousScreen: undefined, // NOTE: used in VerifyProfile.js
  history: [],
};

export default function navReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_ACTIVE_SCREEN: {
      const { screenName } = action.payload;
      return {
        ...state,
        activeScreen: screenName,
        history: [screenName, ...state.history],
      };
    }

    case ACTIONS.GET_PREVIOUS_SCREEN_SUCCESS:
      return {
        ...state,
        previousScreen: action.screen,
      };

    default:
      return { ...state };
  }
}
