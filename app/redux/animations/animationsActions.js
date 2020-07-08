import ACTIONS from "../../constants/ACTIONS";

export {
  changeWalletHeaderContent,
  changeCoinDetailsHeaderContent,
  changeInterestHeaderContent,
};

function changeWalletHeaderContent(change = false) {
  return {
    type: ACTIONS.CHANGE_WALLET_HEADER_CONTENT,
    changeWalletHeader: change,
  };
}

function changeCoinDetailsHeaderContent(change = false) {
  return {
    type: ACTIONS.CHANGE_COIN_DETAILS_HEADER_CONTENT,
    changeCoinDetailsHeader: change,
  };
}

function changeInterestHeaderContent(change = false) {
  return {
    type: ACTIONS.CHANGE_INTEREST_HEADER_CONTENT,
    changeInterestHeader: change,
  };
}
