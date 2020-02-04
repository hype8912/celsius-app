import ACTIONS from "../../constants/ACTIONS";

/**
 * TODO make it a function add JSDoc & desc for return
 */
function initialState() {
  return {
    simplexData: {}
  };
}

export default function simplexReducer(state = initialState(), action) {
  switch (action.type) {
    case ACTIONS.GET_QUOTE_SUCCESS:
      return {
        ...state,
        simplexData: action.quote,
      };

    case ACTIONS.CREATE_PAYMENT_REQUEST_SUCCESS:
      return {
        ...state,
        simplexData: {
          ...state.simplexData,
          ...action.paymentRequest
        },
      };

    default:
      return { ...state };
  }
}
