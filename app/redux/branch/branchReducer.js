import ACTIONS from "../../constants/ACTIONS";

/**
 * TODO make it a function add JSDoc & desc for return
 */
const initialState = {
  registeredLink: null,
  promoCode: null,
  transferHash: null,
};

export default function branchReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.BRANCH_LINK_REGISTERED:
      return {
        ...state,
        registeredLink: action.link,
        transferHash: action.link.hash,
      };
    case ACTIONS.SUBMIT_PROMO_CODE_SUCCESS:
    case ACTIONS.GET_LINK_BY_URL_SUCCESS:
      return {
        ...state,
        registeredLink: {
          ...state.registeredLink,
          ...action.branchLink,
        },
      };

    case ACTIONS.CHECK_PROFILE_PROMO_CODE_SUCCESS:
      return {
        ...state,
        promoCode: action.code,
      };

    default:
      return state;
  }
}
