import ACTIONS from "../../constants/ACTIONS";
import { mocks } from "../../../dev-settings";
import transactionMapUtil from "../../utils/transaction-map-util";

/**
 * TODO make it a function add JSDoc & desc for return
 */
const initialState = {
  transactionList: null,
  transactionDetails: null,
};

export default function transactionsReducer(state = initialState, action) {
  const newTransactions = {};
  let transactionDetails = {};
  switch (action.type) {
    case ACTIONS.GET_ALL_TRANSACTIONS_SUCCESS:
      if (mocks.USE_MOCK_TRANSACTIONS) {
        Object.values(
          require("../../mock-data/transactions.mock").default
        ).forEach(t => {
          newTransactions[t.id] = transactionMapUtil.mapTransaction(t);
        });
      } else {
        action.transactions.forEach(t => {
          newTransactions[t.id] = transactionMapUtil.mapTransaction(t);
        });
      }

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
