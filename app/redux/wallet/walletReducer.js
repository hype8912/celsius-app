import ACTIONS from '../../constants/ACTIONS';


/**
 * TODO make it a function add JSDoc & desc for return
 */
function initialState() {
  return {
    summary: undefined,
    addresses: {},
    withdrawalAddresses: {},
    walletAddressLabels: {}
  };
}

export default function walletReducer(state = initialState(), action) {
  switch (action.type) {
    case ACTIONS.GET_WALLET_SUMMARY_SUCCESS:
      return {
        ...state,
        summary: action.wallet,
      }
    case ACTIONS.GET_COIN_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: {
          ...state.addresses,
          ...action.address
        }
      };
    case ACTIONS.SET_COIN_WITHDRAWAL_ADDRESS_SUCCESS:
    case ACTIONS.SET_COIN_WITHDRAWAL_ADDRESS_LABEL_SUCCESS:
      return {
        ...state,
        withdrawalAddresses: {
          ...state.withdrawalAddresses,
          ...action.address,
        }
      };
    case ACTIONS.GET_ALL_COIN_WITHDRAWAL_ADDRESSES_SUCCESS:
      return {
        ...state,
        withdrawalAddresses: {
          ...state.withdrawalAddresses,
          ...action.allWalletAddresses,
        }
      };

    case ACTIONS.SET_COIN_WITHDRAWAL_ADDRESS_LABELS:
    return {
      ...state,
      walletAddressLabels: action.walletAddressLabels
    };
    default:
      return state;
  }
}
