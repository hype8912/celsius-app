import ACTIONS from "../../constants/ACTIONS";

function initialState() {
  return {
    simplexData: {},
    paymentRequest: undefined,
    payments: [],
    walletGemAddresses: [],
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
    case ACTIONS.GET_GEM_COIN_ADDRESS_SUCCESS:
      return {
        ...state,
        walletGemAddresses: action.walletGemAddresses,
      };

    default:
      return { ...state };
  }
}
