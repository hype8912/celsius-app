import axios from "axios";
import apiUrl from "./api-url";
import { mocks } from "../../dev-settings";
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
  getAmortizationTable,
  sendBankDetailsEmail,
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
  if (mocks.USE_MOCK_LOAN_INFO) {
    return {
      data: { loan: require("../mock-data/loans.mock").default.CONFIRM_LOAN },
    };
  }
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
  let loans;
  if (mocks.USE_MOCK_LOANS) {
    loans = Object.values(require("../mock-data/loans.mock").default.ALL_LOANS);
  } else {
    const res = await axios.get(`${apiUrl}/loans`);
    loans = res.data;
  }
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
function prepayInterest(numberOfInstallments, coin, id, verification) {
  return axios.post(`${apiUrl}/loans/${id}/payment/prepayment`, {
    numberOfInstallments,
    coin,
    ...verification,
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
function payPrincipal(id, verification) {
  return axios.post(
    `${apiUrl}/loans/${id}/payment/receiving_principal_back`,
    verification
  );
}

/**
 * @param {Number} id - loan id
 * @param {string} coin - selected collateral coin
 * @param {string} verification.pin - eg '1234'
 * @param {string} verification.twoFactorCode - eg '123456'
 */
function lockMarginCallCollateral(id, coin, verification) {
  return axios.post(`${apiUrl}/loans/${id}/payment/margin_call_collateral`, {
    ...verification,
    coin,
  });
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
function payMonthlyInterest(id, coin, verification) {
  return axios.post(`${apiUrl}/loans/${id}/payment/monthly_interest`, {
    ...verification,
    coin,
  });
}

/**
 *
 * @param id
 * @returns {Promise}
 */
// TODO: remove
function getAmortizationTable(id) {
  return axios.get(`${apiUrl}/loans/${id}/amortization-table`);
}

/**
 * Makes you receive email with wiring bank info
 *
 * @returns {Promise}
 */
function sendBankDetailsEmail() {
  return axios.get(`${apiUrl}/loans/bank-details`);
}

export default loansService;
