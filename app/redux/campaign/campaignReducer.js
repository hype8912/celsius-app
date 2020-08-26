import ACTIONS from "../../constants/ACTIONS";

const initialState = {
  registeredLink: null,
  promoCode: null,
  transferHash: null,
};

export default function campaignReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.BRANCH_LINK_REGISTERED:
      return {
        ...state,
        registeredLink: action.link,
        transferHash: action.link.hash,
      };
    case ACTIONS.GET_LINK_BY_URL_SUCCESS:
      return {
        ...state,
        registeredLink: {
          ...state.registeredLink,
          ...action.branchLink,
        },
      };

    case ACTIONS.SUBMIT_PROMO_CODE_SUCCESS:
      return {
        ...state,
        code: action.code,
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
