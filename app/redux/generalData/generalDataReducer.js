import ACTIONS from "../../constants/ACTIONS";

/**
 * TODO make it a function add JSDoc & desc for return
 */
function initialState() {
  return {
    interestRates: undefined,
    minimumLoanAmount: undefined,
    automaticLoanLimit: undefined,
    celUtilityTiers: undefined,
    withdrawalSettings: undefined,
    buyCoinsSettings: undefined,
    backendStatus: undefined, // TODO move to appReducer ?
    loanTermsOfUse: undefined,
    pdf: undefined,
  };
}

export default function generalDataReducer(state = initialState(), action) {
  let interestRates;

  switch (action.type) {
    case ACTIONS.GET_LOAN_TERMS_OF_USE_SUCCESS:
      return {
        ...state,
        loanTermsOfUse: action.lToU,
        pdf: action.pdf,
      };

    case ACTIONS.GET_BACKEND_STATUS_SUCCESS:
      return {
        ...state,
        backendStatus: action.backendStatus,
      };

    case ACTIONS.GET_INITIAL_CELSIUS_DATA_SUCCESS:
      // NOTE(fj) BE returns cel_rate as "0" every time
      interestRates = { ...state.interestRates } || {};
      Object.keys(action.interestRates).forEach(coinShort => {
        interestRates[coinShort] = interestRates[coinShort] || {};
        interestRates[coinShort].rate = action.interestRates[coinShort].rate;
        interestRates[coinShort].rate_on_first_n_coins =
          action.interestRates[coinShort].rate_on_first_n_coins;
        interestRates[coinShort].threshold_on_first_n_coins =
          action.interestRates[coinShort].threshold_on_first_n_coins;
      });

      return {
        ...state,
        interestRates,
        minimumLoanAmount: action.minimumLoanAmount,
        celUtilityTiers: action.celUtilityTiers,
        withdrawalSettings: action.withdrawalSettings,
        celPaySettings: action.celPaySettings,
        automaticLoanLimit: action.automaticLoanLimit,
        buyCoinsSettings: action.buyCoinsSettings,
      };

    case ACTIONS.GET_LOYALTY_INFO_SUCCESS:
      return {
        ...state,
        interestRates: action.interestRates,
      };

    default:
      return state;
  }
}
