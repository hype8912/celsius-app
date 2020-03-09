import ACTIONS from "../../constants/ACTIONS";

const initialState = {
  hodlCode: undefined,
};

export default function hodlReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.BEGIN_HODL_MODE:
      return {
        ...state,
        hodlCode: action.hodlCode,
      };

    default:
      return { ...state };
  }
}
