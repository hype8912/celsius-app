import ACTIONS from "../../constants/ACTIONS";

function initialState() {
  return {
    simplexData: {},
    paymentRequest: undefined,
    payments: [],
  };
}

export default function buyCoinsReducer(state = initialState(), action) {
  switch (action.type) {
    case ACTIONS.GET_SIMPLEX_QUOTE_SUCCESS:
      return {
        ...state,
        simplexData: action.quote,
      };

    case ACTIONS.CREATE_SIMPLEX_PAYMENT_SUCCESS:
      return {
        ...state,
        paymentRequest: action.paymentRequest,
      };

    case ACTIONS.GET_PAYMENT_REQUESTS_SUCCESS:
      return {
        ...state,
        payments: action.payments,
      };

    default:
      return { ...state };
  }
}
