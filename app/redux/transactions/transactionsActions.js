import ACTIONS from "../../constants/ACTIONS";
import API from "../../constants/API";
import { apiError, startApiCall } from "../api/apiActions";
import { showMessage } from "../ui/uiActions";
import { clearForm } from "../forms/formsActions";
import transactionsService from "../../services/transactions-service";
import { navigateTo } from "../nav/navActions";
import { getWalletSummary } from "../wallet/walletActions";
import mixpanelAnalytics from "../../utils/mixpanel-analytics";
import { SCREENS } from "../../constants/SCREENS";

export {
  getAllTransactions,
  getTransactionDetails,
  withdrawCrypto,
  cancelWithdrawal,
  sendCsvEmail,
};

/**
 * Sends csv file to your mail with all transactions
 */

function sendCsvEmail() {
  return async (dispatch, getState) => {
    try {
      const user = getState().user.profile;
      dispatch(startApiCall(API.GET_CSV_EMAIL));
      await transactionsService.sendCsvEmail();
      dispatch(
        showMessage(
          "info",
          `Check your mail. We've started creating your CSV file and will email it to ${user.email} when it's ready. This could take a few minutes.`
        )
      );
      dispatch({ type: ACTIONS.GET_CSV_EMAIL_SUCCESS });
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_CSV_EMAIL, err));
    }
  };
}

/**
 * Gets transactions
 * @param {Object} query
 * @param {string} query.type - one of received|withdraw|interest
 * @param {string} query.coin - eg. BTC|ETH|XRP...
 */
function getAllTransactions(query = {}) {
  return async dispatch => {
    try {
      const { type, coin, period } = query;
      dispatch(startApiCall(API.GET_ALL_TRANSACTIONS));

      const response = await transactionsService.getAll({ type, coin, period });

      dispatch({
        type: ACTIONS.GET_ALL_TRANSACTIONS_SUCCESS,
        transactions: response.data,
      });
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_ALL_TRANSACTIONS, err));
    }
  };
}

/**
 * Gets single transaction by id
 * @param {string} id
 */
function getTransactionDetails(id = "") {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_TRANSACTION_DETAILS));

      const res = await transactionsService.getTransaction(id);
      dispatch(getTransactionDetailsSuccess(res.data.transaction));
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_TRANSACTION_DETAILS, err));
    }
  };
}

/**
 * cancels transaction by supplying transaction id
 * @param {string} withdrawalId
 */
function cancelWithdrawal(withdrawalId) {
  return async dispatch => {
    dispatch(startApiCall(API.CANCEL_WITHDRAWAL_TRANSACTION));

    try {
      const response = await transactionsService.cancelWithdrawalService(
        withdrawalId
      );
      dispatch({
        type: ACTIONS.CANCEL_WITHDRAWAL_TRANSACTION_SUCCESS,
        callName: API.CANCEL_WITHDRAWAL_TRANSACTION,
        transaction: response.data.transaction,
      });

      dispatch(showMessage("success", "Withdrawal canceled"));
      dispatch(getWalletSummary());
    } catch (error) {
      dispatch(showMessage(`error`, error.msg));
      dispatch(apiError(API.CANCEL_WITHDRAWAL_TRANSACTION, error));
    }
  };
}

/**
 * transaction details success actions
 * @param {string} transaction
 * */
function getTransactionDetailsSuccess(transaction) {
  return {
    type: ACTIONS.GET_TRANSACTION_DETAILS_SUCCESS,
    callName: API.GET_TRANSACTION_DETAILS,
    transaction,
  };
}

/**
 * Withdraws crypto for the user
 */
function withdrawCrypto() {
  return async (dispatch, getState) => {
    try {
      const { formData } = getState().forms;
      const {
        coin,
        amountCrypto,
        pin,
        code,
        payload,
        signature,
        withdrawAll,
      } = formData;
      dispatch(startApiCall(API.WITHDRAW_CRYPTO));

      const res = await transactionsService.withdrawCrypto(
        coin,
        amountCrypto,
        withdrawAll,
        {
          pin,
          twoFactorCode: code,
          payload,
          signature,
        }
      );

      dispatch({
        type: ACTIONS.WITHDRAW_CRYPTO_SUCCESS,
        transaction: res.data.transaction,
      });

      dispatch(
        navigateTo(SCREENS.TRANSACTION_INTERSECTION, {
          id: res.data.transaction.id,
          hideBack: true,
        })
      );

      dispatch(showMessage("success", "An email verification has been sent."));
      dispatch(clearForm());

      mixpanelAnalytics.withdrawCompleted(res.data.transaction);
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.WITHDRAW_CRYPTO, err));
    }
  };
}
