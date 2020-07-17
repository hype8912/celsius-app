import ACTIONS from "../../constants/ACTIONS";

/**
 * TODO make it a function add JSDoc & desc for return
 */
const initialState = {
  securityOverview: {},
  twoFAStatus: {},
  fromFixNow: false,
  toFixNow: false,
  fixNowContent: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_USER_SECURITY_OVERVIEW_SUCCESS:
      return {
        ...state,
        securityOverview: {
          ...action.overview,
        },
      };

    case ACTIONS.FROM_FIX_NOW:
    case ACTIONS.CLEAR_FROM_FIX_NOW:
      return {
        ...state,
        securityOverview: {
          ...state.securityOverview,
          fromFixNow: action.fromFixNow,
        },
      };
    case ACTIONS.POLL_USER_DATA_SUCCESS:
      return {
        ...state,
        twoFAStatus: action.twoFAStatus,
        hasSixDigitPin: action.hasSixDigitPin,
      };
    case ACTIONS.CLEAR_TO_FIX_NOW:
    case ACTIONS.TO_FIX_NOW:
      return {
        ...state,
        securityOverview: {
          ...state.securityOverview,
          toFixNow: action.toFixNow,
        },
      };
    case ACTIONS.UPDATE_FIX_NOW_CONTENT:
      return {
        ...state,
        securityOverview: {
          ...state.securityOverview,
          fixNowContent: {
            ...state.securityOverview.fixNowContent,
            content: action.content,
          },
        },
      };
    case ACTIONS.NEXT_FIX_NOW_ITEM:
      return {
        ...state,
        securityOverview: {
          ...state.securityOverview,
          fixNowContent: {
            ...state.securityOverview.fixNowContent,
            index: action.content.index,
            item: action.content.item,
          },
        },
      };

    default:
      return state;
  }
};
