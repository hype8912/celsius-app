import ACTIONS from "../../constants/ACTIONS";
import { INITIAL_ROUTE } from "../../constants/UI";

const initialState = {
  activeScreen: INITIAL_ROUTE,
  previousScreen: undefined, // NOTE: used in VerifyProfile.js
  history: [INITIAL_ROUTE],
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
