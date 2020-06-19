import ACTIONS from "../../constants/ACTIONS";

/**
 * TODO make it a function add JSDoc & desc for return
 */
const initialState = {
  loyaltyInfo: null, // TODO move to loyaltyReducer
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_APP_BOOTSTRAP_SUCCESS:
    case ACTIONS.GET_LOYALTY_INFO_SUCCESS:
      return {
        ...state,
        loyaltyInfo: {
          ...action.loyaltyInfo,
        },
      };

    default:
      return state;
  }
};
