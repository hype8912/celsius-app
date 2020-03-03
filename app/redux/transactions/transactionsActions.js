import ACTIONS from '../../constants/ACTIONS'
import API from '../../constants/API'
import { apiError, startApiCall } from '../api/apiActions'
import { showMessage } from '../ui/uiActions'
import { clearForm } from '../forms/formsActions'
import transactions from '../../services/transactions-service'
import walletService from '../../services/wallet-service'
import { navigateTo } from '../nav/navActions'
import analytics from '../../utils/analytics'
import celUtilityUtil from '../../utils/cel-utility-util'
import { getWalletSummary } from "../wallet/walletActions";

export {
  getAllTransactions,
  getTransactionDetails,
  withdrawCrypto,
  cancelWithdrawal,
}

/**
 * Gets transactions
 * @param {Object} query
 * @param {number} query.limit
 * @param {string} query.type - one of received|withdraw|interest
 * @param {string} query.coin - eg. BTC|ETH|XRP...
 */
function getAllTransactions (query = {}) {
  return async dispatch => {
    try {
      const { limit, type, coin } = query
      dispatch(startApiCall(API.GET_ALL_TRANSACTIONS))
      const response = await transactions.getAll({ limit, type, coin })

      dispatch({
        type: ACTIONS.GET_ALL_TRANSACTIONS_SUCCESS,
        transactions: response.data
      })
    } catch (err) {
      dispatch(showMessage('error', err.msg))
      dispatch(apiError(API.GET_ALL_TRANSACTIONS, err))
    }
  }
}

/**
 * Gets single transaction by id
 * @param {string} id
 */
function getTransactionDetails (id = '') {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_TRANSACTION_DETAILS))

      const res = await transactions.getTransaction(id)
      dispatch(getTransactionDetailsSuccess(res.data.transaction))
    } catch (err) {
      dispatch(showMessage('error', err.msg))
      dispatch(apiError(API.GET_TRANSACTION_DETAILS, err))
    }
  }
}

/**
 * TODO add JSDoc
 */
function cancelWithdrawal(withdrawalId){
  return async (dispatch) => {
    dispatch(startApiCall(API.CANCEL_WITHDRAWAL_TRANSACTION))

    try {
      const response = await transactions.cancelWithdrawalService(withdrawalId)
        dispatch({
          type: ACTIONS.CANCEL_WITHDRAWAL_TRANSACTION_SUCCESS,
          callName: API.CANCEL_WITHDRAWAL_TRANSACTION,
          transaction: response.data.transaction
        })

      dispatch(showMessage('success', 'Withdrawal canceled'))
      dispatch(getWalletSummary())
    } catch (error) {
      dispatch(showMessage(`error`, error.msg));
      dispatch(apiError(API.CANCEL_WITHDRAWAL_TRANSACTION, error))
    }
  }
}



/**
 * TODO add JSDoc
 */
function getTransactionDetailsSuccess (transaction) {
  return {
    type: ACTIONS.GET_TRANSACTION_DETAILS_SUCCESS,
    callName: API.GET_TRANSACTION_DETAILS,
    transaction
  }
}

/**
 * Withdraws crypto for the user
 */
function withdrawCrypto () {
  return async (dispatch, getState) => {
    try {
      const { formData } = getState().forms
      const { coin, amountCrypto, pin, code } = formData
      dispatch(startApiCall(API.WITHDRAW_CRYPTO))

      const res = await walletService.withdrawCrypto(coin, amountCrypto, {
        pin,
        twoFactorCode: code
      })

      dispatch({
        type: ACTIONS.WITHDRAW_CRYPTO_SUCCESS,
        transaction: res.data.transaction
      })

      await celUtilityUtil.refetchMembershipIfChanged(coin.toUpperCase())

      dispatch(
        navigateTo('TransactionDetails', { id: res.data.transaction.id })
      )

      dispatch(showMessage('success', 'An email verification has been sent.'))
      dispatch(clearForm())

      analytics.withdrawCompleted(res.data.transaction)
    } catch (err) {
      dispatch(showMessage('error', err.msg))
      dispatch(apiError(API.WITHDRAW_CRYPTO, err))
    }
  }
}
