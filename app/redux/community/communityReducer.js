import ACTIONS from "../../constants/ACTIONS";

/**
 * TODO make it a function add JSDoc & desc for return
 */
const initialState = {
  stats: undefined,
};

export default function communityReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.GET_COMMUNITY_STATISTICS_SUCCESS:
      return {
        ...state,
        stats: action.stats,
      };

    default:
      return { ...state };
  }
}
