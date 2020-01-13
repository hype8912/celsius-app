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

    kycDocTypes: undefined, // TODO move to kycReducer
    backendStatus: undefined, // TODO move to appReducer ?
    loanTermsOfUse: undefined,
    pdf: undefined,
  };
}

export default function generalDataReducer(state = initialState(), action) {
  let interestRates;

  switch (action.type) {
    case ACTIONS.GET_KYC_DOC_TYPES_SUCCESS:
      return {
        ...state,
        kycDocTypes: action.kycDocTypes,
      };

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
      });

      return {
        ...state,
        interestRates,
        minimumLoanAmount: action.minimumLoanAmount,
        celUtilityTiers: action.celUtilityTiers,
        withdrawalSettings: action.withdrawalSettings,
        automaticLoanLimit: action.automaticLoanLimit,
      };

    case ACTIONS.GET_LOYALTY_INFO_SUCCESS:
      interestRates = { ...state.interestRates };

      // NOTE(fj) BE returns cel_rate as "0" every time
      Object.keys(state.interestRates).forEach(coinShort => {
        interestRates[coinShort].cel_rate = (
          (1 + Number(action.loyaltyInfo.earn_interest_bonus)) *
          state.interestRates[coinShort].rate
        ).toString();
      });

      return {
        ...state,
        interestRates,
      };

    default:
      return state;
  }
}
