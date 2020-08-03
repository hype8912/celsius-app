import ACTIONS from "../../constants/ACTIONS";

function initialState() {
  return {
    interestRates: undefined,
    minimumLoanAmount: undefined,
    automaticLoanLimit: undefined,
    celUtilityTiers: undefined,
    withdrawalSettings: undefined,
    buyCoinsSettings: undefined,
    backendStatus: undefined,
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

    case ACTIONS.TOGGLE_MAINTENANCE_MODE:
      return {
        ...state,
        backendStatus: {
          maintenance: action.maintenance,
          title: action.title,
          explanation: action.explanation,
        },
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
        buyCoinsSettings: {
          ...state.buyCoinsSettings,
          ...action.buyCoinsSettings,
        },
      };

    case ACTIONS.GET_APP_BOOTSTRAP_SUCCESS:
    case ACTIONS.GET_LOYALTY_INFO_SUCCESS:
      return {
        ...state,
        interestRates: action.interestRates,
      };

    default:
      return state;
  }
}
