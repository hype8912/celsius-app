import ACTIONS from "../../constants/ACTIONS";

/**
 * TODO make it a function add JSDoc & desc for return
 */
const initialState = {
  tokens: undefined,
  expiredSession: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.EXPIRE_SESSION:
      return {
        ...state,
        expiredSession: true,
      };

    // TODO check tokens on third party login/register actions
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

