import ACTIONS from "../../constants/ACTIONS";

/**
 * TODO make it a function add JSDoc & desc for return
 */
const initialState = {
  deepLinkData: {},
};

export default function formsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.ADD_DEEPLINK_DATA:
      return {
        ...state,
        deepLinkData: action.deepLinkData,
      };

    case ACTIONS.CLEAR_DEEPLINK_DATA:
      return {
        ...state,
        deepLinkData: null,
      };

    default:
      return { ...state };
  }
}
