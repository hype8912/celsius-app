import ACTIONS from "../../constants/ACTIONS";
import transactionMapUtil from "../../utils/transaction-map-util";

const initialState = {
  transactionList: null,
  transactionDetails: null,
};

export default function transactionsReducer(state = initialState, action) {
  const newTransactions = {};
  let transactionDetails = {};
  switch (action.type) {
    case ACTIONS.GET_ALL_TRANSACTIONS_SUCCESS:
      action.transactions.forEach(t => {
        newTransactions[t.id] = transactionMapUtil.mapTransaction(t);
      });

      return {
        ...state,
        transactionList: {
          ...state.transactionList,
          ...newTransactions,
        },
      };
    case ACTIONS.GET_TRANSACTION_DETAILS_SUCCESS:
    case ACTIONS.CANCEL_WITHDRAWAL_TRANSACTION_SUCCESS:
    case ACTIONS.WITHDRAW_CRYPTO_SUCCESS:
      transactionDetails = transactionMapUtil.mapTransaction(
        action.transaction
      );
      return {
        ...state,
        transactionDetails: { ...transactionDetails },
      };
    default:
      return { ...state };
  }
}
