import ACTIONS from "../../constants/ACTIONS";
import API from "../../constants/API";
import { showMessage, closeModal, openModal } from "../ui/uiActions";
import { apiError, startApiCall } from "../api/apiActions";
import { navigateTo } from "../nav/navActions";
import loansService from "../../services/loans-service";
import formatter from "../../utils/formatter";
import loanUtil from "../../utils/loan-util";
import { MODALS, LOAN_ALERTS } from "../../constants/UI";
import mixpanelAnalytics from "../../utils/mixpanel-analytics";
import appsFlyerUtil from "../../utils/appsflyer-util";
import loggerUtil from "../../utils/logger-util";
import analyticsService from "../../services/analytics-service";
import { SCREENS } from "../../constants/SCREENS";

export {
  applyForALoan,
  getAllLoans,
  getLoanById,
  confirmLoanInfo,
  setActiveLoan,
  cancelLoan,
  lockMarginCollateral,
  updateLoanSettings,
  loanApplyPreviewData,
  getLoanSettings,
  payPrincipal,
  prepayInterest,
  payMonthlyInterest,
  checkForLoanAlerts,
  sendBankDetailsEmail,
  lockMarginCallCollateral,
  getLoanAlerts,
  startedLoanApplication,
  extendLoan,
  setLoanAlert,
};

/**
 * Applies the user for a loan
 */
function applyForALoan() {
  return async (dispatch, getState) => {
    const { formData } = getState().forms;
    const { automaticLoanLimit } = getState().generalData;

    startApiCall(API.APPLY_FOR_LOAN);

    const loanApplication = {
      coin: formData.collateralCoin,
      ltv: formData.ltv,
      interest: formData.interest,
      loan_amount: formData.loanAmount,
      term_of_loan: formData.termOfLoan,
      bank_info_id: formData.bankInfo ? formData.bankInfo.id : undefined,
      loan_asset_short: formData.coin,
    };
    try {
      const verification = {
        pin: formData.pin,
        twoFactorCode: formData.code,
        payload: formData.payload,
        signature: formData.signature,
      };

      const res = await loansService.apply(loanApplication, verification);
      dispatch({ type: ACTIONS.APPLY_FOR_LOAN_SUCCESS });

      dispatch(
        navigateTo(SCREENS.LOAN_REQUEST_DETAILS, {
          id: res.data.loan.id,
          hideBack: true,
        })
      );
      dispatch(showMessage("success", "Loan created successfully!"));

      const allLoans = await loansService.getAllLoans();

      dispatch({
        type: ACTIONS.GET_ALL_LOANS_SUCCESS,
        callName: API.GET_ALL_LOANS,
        allLoans,
      });

      dispatch(setActiveLoan(res.data.loan.id));
      dispatch(
        navigateTo(SCREENS.LOAN_REQUEST_DETAILS, {
          id: res.data.loan.id,
          hideBack: true,
        })
      );
      dispatch(showMessage("success", "Loan created successfully!"));

      if (
        Number(formData.loanAmount) <= Number(automaticLoanLimit) &&
        formData.coin !== "USD"
      ) {
        dispatch(openModal(MODALS.LOAN_APPLICATION_SUCCESS_MODAL));
      }

      appsFlyerUtil.loanApplied(res.data);
      mixpanelAnalytics.loanApplied(res.data);
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.APPLY_FOR_LOAN, err));
    }
  };
}

/**
 * Applies the user for a loan
 */
function loanApplyPreviewData() {
  return async (dispatch, getState) => {
    const { formData } = getState().forms;
    dispatch(startApiCall(API.APPLY_FOR_LOAN_PREVIEW_DATA));

    const loanApplication = {
      coin: formData.collateralCoin,
      ltv: formData.ltv,
      interest: formData.interest,
      loan_amount: formData.loanAmount,
      term_of_loan: formData.termOfLoan,
      bank_info_id: formData.bankInfo ? formData.bankInfo.id : undefined,
      loan_asset_short: formData.coin,
    };

    try {
      const res = await loansService.loanApplyPreviewData(loanApplication);
      dispatch({
        type: ACTIONS.APPLY_FOR_LOAN_PREVIEW_DATA_SUCCESS,
        loan: loanUtil.mapLoan(res.data),
      });
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.APPLY_FOR_LOAN_PREVIEW_DATA, err));
    }
  };
}

/**
 * Get all loans for user
 */
function getAllLoans() {
  return async dispatch => {
    try {
      startApiCall(API.GET_ALL_LOANS);
      const allLoans = await loansService.getAllLoans();

      dispatch({
        type: ACTIONS.GET_ALL_LOANS_SUCCESS,
        callName: API.GET_ALL_LOANS,
        allLoans,
      });
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_ALL_LOANS, err));
    }
  };
}

/**
 * Get loans by id
 */
function getLoanById(id) {
  return async dispatch => {
    try {
      startApiCall(API.GET_LOAN);
      const res = await loansService.getLoanById(id);

      dispatch({
        type: ACTIONS.GET_LOAN_SUCCESS,
        loan: loanUtil.mapLoan(res.data),
      });
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_ALL_LOANS, err));
    }
  };
}

/**
 * Get loan information for confirmation for user
 */
function confirmLoanInfo(data) {
  return async dispatch => {
    try {
      startApiCall(API.GET_CONFIRM_LOAN_INFO);
      const res = await loansService.setConfirmLoanInfo(data);
      const loanInfo = res.data;

      dispatch({
        type: ACTIONS.GET_CONFIRM_LOAN_INFO_SUCCESS,
        callName: API.GET_CONFIRM_LOAN_INFO,
        loanInfo,
      });
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_ALL_LOANS, err));
    }
  };
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
  return async dispatch => {
    try {
      startApiCall(API.LOCK_MARGIN_CALL_COLLATERAL);

      await loansService.lockMarginCollateral(marginCallID, marginCallData);

      dispatch({
        type: ACTIONS.LOCK_MARGIN_CALL_COLLATERAL_SUCCESS,
        callName: API.LOCK_MARGIN_CALL_COLLATERAL,
      });

      dispatch(
        showMessage(
          "success",
          `You have successfully locked on additional ${formatter.crypto(
            marginCallData.amount_collateral_crypto,
            marginCallData.coin
          )} as collateral.`
        )
      );
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.LOCK_MARGIN_CALL_COLLATERAL, err));
    }
  };
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
  };
}

/**
 * Cancels desired pending loan
 */
function cancelLoan() {
  return async (dispatch, getState) => {
    try {
      const { loanId } = getState().forms.formData;
      startApiCall(API.CANCEL_LOAN);
      await loansService.cancelLoan(loanId);

      dispatch(showMessage("success", "Loan successfully canceled!"));
      dispatch(closeModal());
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.CANCEL_LOAN, err));
    }
  };
}

/**
 *  Update Loan Settings
 *
 *  param {String} loanId
 *  param {Object} loan.setting true/false
 */

function updateLoanSettings(id, value) {
  return async dispatch => {
    try {
      startApiCall(API.UPDATE_LOAN_SETTINGS);
      const res = await loansService.updateLoanSettings(id, value);
      const loanSettings = res.data;

      dispatch({
        type: ACTIONS.UPDATE_LOAN_SETTINGS_SUCCESS,
        callName: API.UPDATE_LOAN_SETTINGS,
        loanSettings,
      });
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.UPDATE_LOAN_SETTINGS, err));
    }
  };
}

/**
 *
 * @param {Number} id
 * @returns {Function}
 */

function getLoanSettings(id) {
  return async dispatch => {
    try {
      startApiCall(API.GET_LOAN_SETTINGS);
      const res = await loansService.getLoanSettings(id);
      const loanSettings = res.data;

      dispatch({
        type: ACTIONS.GET_LOAN_SETTINGS_SUCCESS,
        callName: API.GET_LOAN_SETTINGS,
        loanSettings,
      });
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_LOAN_SETTINGS, err));
    }
  };
}

/**
 *
 * @param {Number} loanId
 * @returns {Function}
 */

function prepayInterest(id) {
  return async (dispatch, getState) => {
    startApiCall(API.PREPAY_LOAN_INTEREST);

    try {
      const { formData } = getState().forms;

      const res = await loansService.prepayInterest(
        formData.prepaidPeriod,
        formData.coin,
        id
      );
      const transactionId = res.data.transaction_id;

      dispatch({
        type: ACTIONS.PREPAY_LOAN_INTEREST_SUCCESS,
      });
      dispatch(
        navigateTo(SCREENS.TRANSACTION_INTERSECTION, {
          id: transactionId,
          loanPayment: true,
          hideBack: true,
        })
      );
      dispatch(openModal(MODALS.PREPAYMENT_SUCCESSFUL_MODAL));
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.PREPAY_LOAN_INTEREST, err));
      dispatch(navigateTo(SCREENS.BORROW_LANDING));
    }
  };
}

/**
 * Pays principal for the selected loan
 *
 * @param {Number} id
 */

function payPrincipal(id) {
  return async dispatch => {
    startApiCall(API.PAY_LOAN_PRINCIPAL);

    return;

    // eslint-disable-next-line no-unreachable
    try {
      const res = await loansService.payPrincipal(id);

      const transactionId = res.data.transaction_id;
      dispatch(showMessage("success", "Payment successful"));
      dispatch(
        navigateTo(SCREENS.TRANSACTION_INTERSECTION, {
          id: transactionId,
          loanPayment: true,
          hideBack: true,
        })
      );
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.PAY_LOAN_PRINCIPAL, err));
    }
  };
}

function lockMarginCallCollateral(id, coin) {
  return async dispatch => {
    let apiCallName;
    try {
      apiCallName = API.PAY_MARGIN_CALL;
      startApiCall(apiCallName);
      const res = await loansService.lockMarginCallCollateral(id, coin);

      dispatch(closeModal());
      const transactionId = res.data.transaction_id;
      dispatch(
        navigateTo(SCREENS.TRANSACTION_INTERSECTION, {
          id: transactionId,
          hideBack: true,
        })
      );

      apiCallName = API.GET_ALL_LOANS;
      startApiCall(API.GET_ALL_LOANS);
      const allLoans = await loansService.getAllLoans();

      dispatch({
        type: ACTIONS.GET_ALL_LOANS_SUCCESS,
        callName: API.GET_ALL_LOANS,
        allLoans,
      });
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(apiCallName, err));
    }
  };
}

/**
 * Pay monthly interest for specific loan
 *
 * @param {UUID} id - loan id
 * @param {string} coin - BTC|ETH coin in which interest should be paid
 */
function payMonthlyInterest(id, coin) {
  return async dispatch => {
    startApiCall(API.PAY_LOAN_INTEREST);

    try {
      const res = await loansService.payMonthlyInterest(id, coin);
      const transactionId = res.data.transaction_id;
      dispatch({ type: ACTIONS.PAY_LOAN_INTEREST_SUCCESS });
      dispatch(showMessage("success", "Payment successful"));
      dispatch(
        navigateTo(SCREENS.TRANSACTION_INTERSECTION, {
          id: transactionId,
          loanPayment: true,
          hideBack: true,
        })
      );
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.PAY_LOAN_PRINCIPAL, err));
    }
  };
}

/**
 * Opens initial modal for loan payment warning (interest, principal, margin call)
 *
 */
function checkForLoanAlerts() {
  return (dispatch, getState) => {
    const { allLoans } = getState().loans;

    const loanAlerts = [];
    allLoans.forEach(l => {
      // const currentDay = moment.utc();
      if (
        l.installments_to_be_paid &&
        Number(l.installments_to_be_paid.total)
      ) {
        loanAlerts.push({ id: l.id, type: LOAN_ALERTS.INTEREST_ALERT });
      }

      if (l.margin_call_activated) {
        loanAlerts.push({ id: l.id, type: LOAN_ALERTS.MARGIN_CALL_ALERT });
      }

      // if (
      //   (l.can_pay_principal && l.coin_loan_asset !== "USD") ||
      //   (l.can_pay_principal &&
      //     l.coin_loan_asset !== "USD" &&
      //     moment(l.maturity_date)
      //       .utc()
      //       .isSame(currentDay.add(7, "days"), "day"))
      // ) {
      //   loanAlerts.push({ id: l.id, type: LOAN_ALERTS.PRINCIPAL_ALERT });
      // }
      // if (l.can_pay_principal && l.coin_loan_asset !== "USD") {
      //   loanAlerts.push({ id: l.id, type: LOAN_ALERTS.PRINCIPAL_ALERT });
      // }
    });

    dispatch({
      type: ACTIONS.CHECK_LOAN_ALERTS,
      loanAlerts,
    });

    if (loanAlerts.length) {
      dispatch(openModal(MODALS.LOAN_ALERT_MODAL));
    }
  };
}

/**
 * Sets loan alert for which you wish to open modal
 */

function setLoanAlert(loanId, alertType) {
  return dispatch => {
    const loanAlerts = [];

    loanAlerts.push({ id: loanId, type: alertType });

    dispatch({
      type: ACTIONS.CHECK_LOAN_ALERTS,
      loanAlerts,
    });
    dispatch(openModal(MODALS.LOAN_ALERT_MODAL));
  };
}

/**
 * Gets all loan payment alerts for user (interest, principal, margin call)
 */
function getLoanAlerts() {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_LOAN_ALERTS));

      const alertsRes = await loansService.getLoanAlerts();

      dispatch({
        type: ACTIONS.GET_LOAN_ALERTS_SUCCESS,
        allLoans: alertsRes.data,
      });
      dispatch(checkForLoanAlerts());
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_LOAN_ALERTS, err));
    }
  };
}

function sendBankDetailsEmail() {
  return async dispatch => {
    try {
      startApiCall(API.SEND_BANK_WIRING_INFO_DETAIL);

      await loansService.sendBankDetailsEmail();
      dispatch(
        showMessage(
          "success",
          "You should receive email with wiring bank info shortly"
        )
      );
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.SEND_BANK_WIRING_INFO_DETAIL, err));
    }
  };
}

/**
 * When user opens BorrowEnterAmount screen this action is called. It's related with analytics
 *
 */
function startedLoanApplication() {
  return async (dispatch, getState) => {
    const user = getState().user.profile;
    const userData = {
      first_name: user.first_name,
      last_name: user.last_name,
      country: user.country,
      state: user.state,
      email: user.email,
    };
    try {
      startApiCall(API.STARTED_LOAN_APPLICATION);

      await analyticsService.startedLoanApplicationService(userData);
    } catch (e) {
      loggerUtil.log(e);
    }
  };
}

function extendLoan(id, numberOfMonths) {
  return async dispatch => {
    dispatch(startApiCall(API.EXTEND_LOAN));
    try {
      await loansService.extendLoan(id, numberOfMonths);
      getAllLoans();
      dispatch(navigateTo(SCREENS.BORROW_LANDING));
      dispatch(
        showMessage(
          "success",
          `You have successfully extended loan for additional ${numberOfMonths} months`
        )
      );
      dispatch({ type: ACTIONS.EXTEND_LOAN_SUCCESS });
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.EXTEND_LOAN, err));
    }
  };
}
