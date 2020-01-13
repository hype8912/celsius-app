import ACTIONS from "../../constants/ACTIONS";

/**
 * TODO make it a function add JSDoc & desc for return
 */
function initialState() {
  return {
    transfers: {},
  };
}

export default function transfersReducer(state = initialState(), action) {
  const transfers = {};

  switch (action.type) {
    case ACTIONS.GET_ALL_TRANSFERS_SUCCESS:
      action.transfers.forEach(t => {
        if (t.hash) transfers[t.hash] = t;
      });
      return {
        ...state,
        transfers: {
          ...state.transfers,
          ...transfers,
        },
      };

    case ACTIONS.GET_TRANSFER_SUCCESS:
      return {
        ...state,
        transfers: action.transfer
          ? {
              ...state.transfers,
              [action.transfer.hash]: action.transfer,
            }
          : {
              ...state.transfers,
            },
      };

    case ACTIONS.CLAIM_TRANSFER_SUCCESS:
    case ACTIONS.CANCEL_TRANSFER_SUCCESS:
    case ACTIONS.CREATE_TRANSFER_SUCCESS:
      return {
        ...state,
        transfers: {
          ...state.transfers,
          [action.transfer.hash]: action.transfer,
        },
      };

    default:
      return { ...state };
  }
}
