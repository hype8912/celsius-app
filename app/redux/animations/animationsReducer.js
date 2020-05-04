import ACTIONS from "../../constants/ACTIONS";

const initialState = {
  changeWalletHeader: false,
  changeCoinDetailsHeader: false,
  changeInterestHeader: false,
};

export default function animationsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.CHANGE_WALLET_HEADER_CONTENT:
      return {
        ...state,
        changeWalletHeader: action.changeWalletHeader,
      };

    case ACTIONS.CHANGE_INTEREST_HEADER_CONTENT:
      return {
        ...state,
        changeInterestHeader: action.changeInterestHeader,
      };

    case ACTIONS.CHANGE_COIN_DETAILS_HEADER_CONTENT:
      return {
        ...state,
        changeCoinDetailsHeader: action.changeCoinDetailsHeader,
      };

    default:
      return { ...state };
  }
}
