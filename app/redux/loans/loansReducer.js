import ACTIONS from "../../constants/ACTIONS";

/**
 * TODO make it a function add JSDoc & desc for return
 */
function initialState() {
  return {
    ltvs: undefined,
    allLoans: [],
    activeLoan: null,
    loanInfo: null,
    marginCalls: [],
    loan: undefined,
    loanSettings: undefined,
    amortizationTable: [],
    loanAlerts: [],
  };
}

export default function loansReducer(state = initialState(), action) {
  switch (action.type) {
    case ACTIONS.GET_INITIAL_CELSIUS_DATA_SUCCESS:
      return {
        ...state,
        ltvs: action.ltvs,
      };

    case ACTIONS.SET_ACTIVE_LOAN:
      return {
        ...state,
        activeLoan: state.allLoans.find(l => l.id === action.loanId),
      };

    case ACTIONS.APPLY_FOR_LOAN_PREVIEW_DATA_SUCCESS:
      return {
        ...state,
        loan: action.loan,
      };

    case ACTIONS.GET_LOAN_SETTINGS_SUCCESS:
    case ACTIONS.UPDATE_LOAN_SETTINGS_SUCCESS:
      return {
        ...state,
        loanSettings: action.loanSettings,
      };

    case ACTIONS.GET_ALL_LOANS_SUCCESS:
      return {
        ...state,
        allLoans: action.allLoans,
      };

    case ACTIONS.GET_LOAN_SUCCESS:
      return {
        ...state,
        allLoans: state.allLoans.map(l =>
          l.id === action.loan.id ? action.loan : l
        ),
        activeLoan: action.loan,
      };
    case ACTIONS.GET_CONFIRM_LOAN_INFO_SUCCESS:
      return {
        ...state,
        loanInfo: action.loanInfo,
      };
    case ACTIONS.GET_MARGIN_CALLS_SUCCESS:
      return {
        ...state,
        marginCalls: action.marginCalls,
      };

    case ACTIONS.GET_AMORTIZATION_TABLE_SUCCESS:
      return {
        ...state,
        amortizationTable: action.amortizationTable,
      };

    case ACTIONS.CHECK_LOAN_ALERTS:
      return {
        ...state,
        loanAlerts: action.loanAlerts,
      };

    default:
      return { ...state };
  }
}
