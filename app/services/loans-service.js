import axios from "axios";
import apiUrl from "./api-url";
import loanUtil from "../utils/loan-util";

const loansService = {
  apply,
  getAllLoans,
  getLoanById,
  setConfirmLoanInfo,
  cancelLoan,
  lockMarginCallCollateral,
  updateLoanSettings,
  loanApplyPreviewData,
  getLoanSettings,
  prepayInterest,
  payPrincipal,
  payMonthlyInterest,
  sendBankDetailsEmail,
  getLoanAlerts,
  extendLoan,
};

/**
 * Applies the user for a loan on /loans/apply and takes collateral
 *
 * @param {Object} loanApplication
 * @param {string} loanApplication.coin - eg. ETH
 * @param {number} loanApplication.amount_collateral_usd
 * @param {number} loanApplication.amount_collateral_crypto
 * @param {number} loanApplication.ltv - loan to value, eg. 0.5
 * @param {number} loanApplication.interest - annual interest percentage, eg. 0.05
 * @param {string} loanApplication.loan_amount - amount to borrow in USD
 * @param {number} loanApplication.term_of_loan - in months, eg. 12
 * @param {string} loanApplication.bank_info_id - uuid of users bank_info
 * @param {Object} verification
 * @param {string} verification.pin - eg '1234'
 * @param {string} verification.twoFactorCode - eg '123456'
 * @param {string} verification.payload - biometric payload string
 * @param {string} verification.signature - biometric signature string
 *
 * @returns {Promise}
 *
 */
function apply(loanApplication, verification) {
  return axios.post(`${apiUrl}/loans/apply`, {
    ...loanApplication,
    ...verification,
  });
}

/**
 * Applies the user for a loan on /loans/apply and takes collateral
 *
 * @param {Object} loanApplication
 * @param {string} loanApplication.coin - eg. ETH
 * @param {number} loanApplication.amount_collateral_usd
 * @param {number} loanApplication.amount_collateral_crypto
 * @param {number} loanApplication.ltv - loan to value, eg. 0.5
 * @param {number} loanApplication.interest - annual interest percentage, eg. 0.05
 * @param {string} loanApplication.loan_amount - amount to borrow in USD
 * @param {number} loanApplication.term_of_loan - in months, eg. 12
 * @param {string} loanApplication.bank_info_id - uuid of users bank_info
 *
 * @returns {Promise}
 *
 */

function loanApplyPreviewData(loanApplication) {
  return axios.post(`${apiUrl}/loans/apply_preview`, {
    ...loanApplication,
  });
}

/**
 * Gets all loans for user from BackOffice db
 *
 * @returns {Promise}
 */
function setConfirmLoanInfo(loanData) {
  return axios.post(`${apiUrl}/loans/new-loan-preview`, {
    loanData,
  });
}

/**
 * Gets confirm loan information
 *
 * @returns {Promise}
 */
async function getAllLoans() {
  const res = await axios.get(`${apiUrl}/loans`);
  const loans = res.data;

  return loans.map(l => loanUtil.mapLoan(l));
}

/**
 * Get loan by id
 *
 * @param {Number} id
 * @returns {Promise}
 */
async function getLoanById(id) {
  return axios.get(`${apiUrl}/loans/${id}`);
}

/**
 * Cancels desired pending loan
 *
 * @param {String} id
 * @returns {Promise}
 */
function cancelLoan(id) {
  return axios.put(`${apiUrl}/loans/${id}/cancel`);
}

/**
 *
 * Update Loan Settings
 *
 * @param {String} loanId
 * @returns {Promise}
 */
function updateLoanSettings(loanId, value) {
  return axios.put(`${apiUrl}/loans/${loanId}/settings`, value);
}

/**
 *
 * @param {Number}loanId
 * @returns {Promise}
 */
function getLoanSettings(loanId) {
  return axios.get(`${apiUrl}/loans/${loanId}/settings`);
}

/**
 * Prepay interest for a loan
 *
 * @param {Number} numberOfInstallments - number of months to prepay
 * @param {String} coin - BTC|XRP
 * @param {UUID} id - id of the loan
 * @param {string} verification.pin - eg '1234'
 * @param {string} verification.twoFactorCode - eg '123456'

 * @returns {Promise}
 */
function prepayInterest(numberOfInstallments, coin, id) {
  return axios.post(`${apiUrl}/loans/${id}/loan-payment/prepayment`, {
    numberOfInstallments,
    coin,
  });
}

/**
 * Creates the principal payment for specific loan, and finishes the loan
 *
 * @param {Number} id - loan id
 * @param {string} verification.pin - eg '1234'
 * @param {string} verification.twoFactorCode - eg '123456'

 * @returns {Promise}
 */
function payPrincipal(id) {
  return axios.post(
    `${apiUrl}/loans/${id}/loan-payment/receiving_principal_back`
  );
}

/**
 * @param {Number} id - loan id
 * @param {string} coin - selected collateral coin
 * @param {string} verification.pin - eg '1234'
 * @param {string} verification.twoFactorCode - eg '123456'
 */
function lockMarginCallCollateral(id, coin) {
  return axios.post(
    `${apiUrl}/loans/${id}/loan-payment/margin_call_collateral`,
    {
      coin,
    }
  );
}

/**
 * Creates the monthly interest payment for specific loan
 *
 * @param {Number} id - loan id
 * @param {string} coin - BTC|ETH coin in which interest should be paid
 * @param {string} verification.pin - eg '1234'
 * @param {string} verification.twoFactorCode - eg '123456'

 * @returns {Promise}
 */
function payMonthlyInterest(id, coin) {
  return axios.post(`${apiUrl}/loans/${id}/loan-payment/monthly_interest`, {
    coin,
  });
}

/**
 * Makes you receive email with wiring bank info
 *
 * @returns {Promise}
 */
function sendBankDetailsEmail() {
  return axios.get(`${apiUrl}/loans/bank-details`);
}

/**
 * Gets all loan payment alerts for user (interest, principal, margin call)
 *
 * @returns {Promise}
 */
function getLoanAlerts() {
  return axios.get(`${apiUrl}/loans/alerts`);
}

/**
 *
 * @param id
 * @returns {Promise}
 */
function extendLoan(id, numberOfMonths) {
  return axios.put(`${apiUrl}/loans/${id}/extend-loan`, {
    months: numberOfMonths,
  });
}

export default loansService;
