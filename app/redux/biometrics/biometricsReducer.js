import ACTIONS from "../../constants/ACTIONS";

const initialState = {
  biometrics: null,
};

export default function biometricsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.IS_BIOMETRIC_AVAILABLE:
      return {
        ...state,
        biometrics: action.biometrics,
      };
    default:
      return state;
  }
}
