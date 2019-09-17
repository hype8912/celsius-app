import ACTIONS from '../../constants/ACTIONS';
import API from '../../constants/API';
import { openModal, showMessage } from "../ui/uiActions";
import { apiError, startApiCall } from "../api/apiActions";
import { navigateTo } from "../nav/navActions";
import loansService from "../../services/loans-service";
// import analytics from "../../utils/analytics";
import { MODALS } from "../../constants/UI";
import formatter from "../../utils/formatter";
import loanUtil from "../../utils/loan-util";

export {
  applyForALoan,
  getAllLoans,
  confirmLoanInfo,
  setActiveLoan,
  cancelLoan,
  getMarginCalls,
  lockMarginCollateral,
  updateLoanSettings,
  loanApplyPreviewData,
  getLoanSettings,
  payPrincipal,
  prepayInterest,
  payMonthlyInterest,
  getAmortizationTable,
}

/**
 * Applies the user for a loan
 */
function applyForALoan() {
  return async (dispatch, getState) => {
    const { formData } = getState().forms;
    startApiCall(API.APPLY_FOR_LOAN);

    const loanApplication = {
      coin: formData.collateralCoin,
      ltv: formData.ltv,
      interest: formData.interest,
      loan_amount: formData.loanAmount,
      term_of_loan: formData.termOfLoan,
      bank_info_id: formData.bankInfo ? formData.bankInfo.id : undefined,
      loan_asset_short: formData.coin
    };

    try {
      const verification = {
        pin: formData.pin,
        twoFactorCode: formData.code
      };

      const res = await loansService.apply(loanApplication, verification);
      dispatch({ type: ACTIONS.APPLY_FOR_LOAN_SUCCESS });

      const allLoans = await loansService.getAllLoans();

      dispatch({
        type: ACTIONS.GET_ALL_LOANS_SUCCESS,
        callName: API.GET_ALL_LOANS,
        allLoans
      });

      dispatch(navigateTo("LoanRequestDetails", { id: res.data.loan.id, hideBack: true }));
      dispatch(openModal(MODALS.LOAN_APPLICATION_SUCCESS_MODAL));
      dispatch(showMessage('success', 'Loan created successfully!'))

      // analytics.loanApplied(res.data);
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.APPLY_FOR_LOAN, err));
    }
  }
}

/**
 * Applies the user for a loan
 */
function loanApplyPreviewData() {
  return async (dispatch, getState) => {
    const { formData } = getState().forms;
    startApiCall(API.APPLY_FOR_LOAN_PREVIEW_DATA);

    const loanApplication = {
      coin: formData.collateralCoin,
      ltv: formData.ltv,
      interest: formData.interest,
      loan_amount: formData.loanAmount,
      term_of_loan: formData.termOfLoan,
      bank_info_id: formData.bankInfo ? formData.bankInfo.id : undefined,
      loan_asset_short: formData.coin
    };

    try {
      const res = await loansService.loanApplyPreviewData(loanApplication);
      dispatch({
        type: ACTIONS.APPLY_FOR_LOAN_PREVIEW_DATA_SUCCESS,
        loan: loanUtil.mapLoan(res.data)
      });
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.APPLY_FOR_LOAN_PREVIEW_DATA, err));
    }
  }
}

/**
 * Get all loans for user
 */
function getAllLoans() {
  return async (dispatch) => {
    try {
      const allLoans = await loansService.getAllLoans();

      dispatch({
        type: ACTIONS.GET_ALL_LOANS_SUCCESS,
        callName: API.GET_ALL_LOANS,
        allLoans
      });

    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_ALL_LOANS, err));
    }
  }
}

/**
 * Get loan information for confirmation for user
 */
function confirmLoanInfo(data) {
  return async (dispatch) => {
    try {
      startApiCall(API.GET_CONFIRM_LOAN_INFO);
      const res = await loansService.setConfirmLoanInfo(data);
      const loanInfo = res.data

      dispatch({
        type: ACTIONS.GET_CONFIRM_LOAN_INFO_SUCCESS,
        callName: API.GET_CONFIRM_LOAN_INFO,
        loanInfo,
      });

    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_ALL_LOANS, err));
    }
  }
}

/**
 * Get margin call warnings
 */
function getMarginCalls() {
  return async (dispatch) => {
    try {
      startApiCall(API.GET_MARGIN_CALLS);

      const marginCalls = await loansService.getMarginCalls();

      dispatch({
        type: ACTIONS.GET_MARGIN_CALLS_SUCCESS,
        callName: API.GET_MARGIN_CALLS,
        marginCalls,
      });
    } catch (err) {

      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_MARGIN_CALLS, err));
    }
  }
}

/**
 * Add collateral on margin call
 *
 * @param {String} marginCallID
 * @param {Object} marginCallData
 * @param {String} marginCallData.coin
 * @param {String} marginCallData.amount_collateral_usd
 * @param {String} marginCallData.amount_collateral_crypto
 *
 * @returns {Promise}
 */
function lockMarginCollateral(marginCallID, marginCallData) {
  return async (dispatch) => {
    try {
      startApiCall(API.LOCK_MARGIN_CALL_COLLATERAL);

      await loansService.lockMarginCollateral(marginCallID, marginCallData);

      dispatch({
        type: ACTIONS.LOCK_MARGIN_CALL_COLLATERAL_SUCCESS,
        callName: API.LOCK_MARGIN_CALL_COLLATERAL
      });

      dispatch(showMessage("success", `You have successfully locked on additional ${formatter.crypto(marginCallData.amount_collateral_crypto, marginCallData.coin)} as collateral.`))
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.LOCK_MARGIN_CALL_COLLATERAL, err));
    }
  }
}

/**
 * Sets active loan in the reducer
 *
 * @param {uuid} - loanId
 */
function setActiveLoan(loanId) {
  return {
    type: ACTIONS.SET_ACTIVE_LOAN,
    loanId,
  }
}

/**
 * Cancels desired pending loan
 * @param id
 */
function cancelLoan(loanId) {
  return async (dispatch) => {
    try {
      startApiCall(API.CANCEL_LOAN)
      await loansService.cancelLoan(loanId)
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.CANCEL_LOAN, err));
    }
  }
}

/**
 *  Update Loan Settings
 *
 *  param {String} loanId
 *  param {Object} loan.setting true/false
 */

function updateLoanSettings(id, value) {
  return async (dispatch) => {

    try {
      startApiCall(API.UPDATE_LOAN_SETTINGS)
      const res = await loansService.updateLoanSettings(id, value);
      const loanSettings = res.data;

      dispatch({
        type: ACTIONS.UPDATE_LOAN_SETTINGS_SUCCESS,
        callName: API.UPDATE_LOAN_SETTINGS,
        loanSettings
      });

    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.UPDATE_LOAN_SETTINGS, err));
    }
  }
}

/**
 *
 * @param {Number} id
 * @returns {Function}
 */

function getLoanSettings(id){
    return async (dispatch) => {
      try {
        startApiCall(API.GET_LOAN_SETTINGS);
        const res = await loansService.getLoanSettings(id);
        const loanSettings = res.data;

        dispatch({
          type: ACTIONS.GET_LOAN_SETTINGS_SUCCESS,
          callName: API.GET_LOAN_SETTINGS,
          loanSettings
        });

      } catch(err) {
        dispatch(showMessage('error', err.msg));
        dispatch(apiError(API.GET_LOAN_SETTINGS, err));
      }
    }
}

/**
 *
 * @param {Number} loanId
 * @returns {Function}
 */

function prepayInterest(id) {
  return async (dispatch, getState) => {
    startApiCall(API.PREPAY_LOAN_INTEREST)

    try {
      const { formData } = getState().forms
      const res = await loansService.prepayInterest(formData.prepaidPeriod, formData.coin, id)
      const transactionId = res.data.transaction_id;

      dispatch({
        type: ACTIONS.PREPAY_LOAN_INTEREST_SUCCESS
      })
      dispatch(navigateTo('TransactionDetails', { id: transactionId }));

    } catch(err){
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.PREPAY_LOAN_INTEREST, err));
    }
  }
}

/**
 * Pays principal for the selected loan
 *
 * @param {Number} id
 */

function payPrincipal(id) {
  return async (dispatch) => {
    startApiCall(API.PAY_LOAN_PRINCIPAL)

    try {
      const res = await loansService.payPrincipal(id);
      const transactionId = res.data;

      dispatch(navigateTo('TransactionDetails', { id: transactionId }));

    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.PAY_LOAN_PRINCIPAL, err));
    }
  }
}

/**
 * Pay monthly interest for specific loan
 *
 * @param {UUID} id - loan id
 */
function payMonthlyInterest(id) {
  return async (dispatch) => {
    startApiCall(API.PAY_LOAN_INTEREST)

    try {
      const res = await loansService.payPrincipal(id);
      const transactionId = res.data.transaction_id;
      dispatch({ type: ACTIONS.PAY_LOAN_INTEREST_SUCCESS })
      dispatch(navigateTo('TransactionDetails', { id: transactionId }));
    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.PAY_LOAN_PRINCIPAL, err));
    }
  }
}

function getAmortizationTable(id) {
  return async (dispatch) => {
    startApiCall(API.GET_AMORTIZATION_TABLE)

    try {
      const res = await loansService.getAmortizationTable(id);
      const amortizationTable = res.data;

      dispatch({
        type: ACTIONS.GET_AMORTIZATION_TABLE_SUCCESS,
        callName: API.GET_AMORTIZATION_TABLE,
        amortizationTable
      });

    } catch(err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_AMORTIZATION_TABLE, err));
    }
  }
}
