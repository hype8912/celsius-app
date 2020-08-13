import ACTIONS from "../../constants/ACTIONS";

const initialState = {
  tokens: undefined,
  expiredSession: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.EXPIRE_SESSION:
      return {
        ...state,
        expiredSession: true,
      };

    case ACTIONS.LOGIN_USER_SUCCESS:
    case ACTIONS.REGISTER_USER_SUCCESS:
      return {
        ...state,
        tokens: action.tokens,
      };

    default:
      return state;
  }
};
