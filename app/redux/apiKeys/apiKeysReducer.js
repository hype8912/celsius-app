import ACTIONS from "../../constants/ACTIONS";

/**
 * TODO make it a function add JSDoc & desc for return
 */
function initialState() {
  return {
    keys: [],
    lastGeneratedKey: undefined,
  };
}

export default function apiKeysReducer(state = initialState(), action) {

  switch (action.type) {
    case ACTIONS.GET_API_KEYS_SUCCESS:
        return {
          ...state,
          keys: action.apiKeys,
        };

    case ACTIONS.CREATE_API_KEY_SUCCESS:
        return {
          ...state,
          lastGeneratedKey: action.apiKey,
        };

    case ACTIONS.DELETE_API_KEY_SUCCESS:
        return {
          ...state,
          keys: state.keys.filter(ak => ak.id !== action.keyId),
        };

    default:
      return { ...state };
  }
}
