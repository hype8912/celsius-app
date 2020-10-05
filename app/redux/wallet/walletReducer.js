import ACTIONS from "../../constants/ACTIONS";
import walletUtil from "../../utils/wallet-util/wallet-util";

function initialState() {
  return {
    summary: undefined,
    addresses: {},
    withdrawalAddresses: {},
    noWithdrawalAddresses: {},
    walletAddressLabels: {},
  };
}

export default function walletReducer(state = initialState(), action) {
  switch (action.type) {
    case ACTIONS.GET_WALLET_SUMMARY_SUCCESS:
      return {
        ...state,
        summary: walletUtil.mapWalletSummary(action.wallet),
      };
    case ACTIONS.GET_COIN_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: {
          ...state.addresses,
          ...action.address,
        },
      };
    case ACTIONS.SET_COIN_WITHDRAWAL_ADDRESS_SUCCESS:
    case ACTIONS.SET_COIN_WITHDRAWAL_ADDRESS_LABEL_SUCCESS:
      return {
        ...state,
        withdrawalAddresses: {
          ...state.withdrawalAddresses,
          ...action.address,
        },
      };
    case ACTIONS.GET_ALL_COIN_WITHDRAWAL_ADDRESSES_SUCCESS:
      return {
        ...state,
        withdrawalAddresses: {
          ...state.withdrawalAddresses,
          ...action.allWalletAddresses,
        },
      };

    case ACTIONS.GET_COINS_WITHOUT_WITHDRAWAL_ADDRESS:
      return {
        ...state,
        noWithdrawalAddresses: action.noWithdrawalAddresses,
      };

    case ACTIONS.SET_COIN_WITHDRAWAL_ADDRESS_LABELS:
      return {
        ...state,
        walletAddressLabels: action.walletAddressLabels,
      };
    default:
      return state;
  }
}
