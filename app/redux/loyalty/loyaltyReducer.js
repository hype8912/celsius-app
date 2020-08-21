import ACTIONS from "../../constants/ACTIONS";

const initialState = {
  loyaltyInfo: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_APP_BOOTSTRAP_SUCCESS:
    case ACTIONS.GET_LOYALTY_INFO_SUCCESS:
      return {
        ...state,
        loyaltyInfo: {
          ...action.loyaltyInfo,
        },
      };

    default:
      return state;
  }
};
