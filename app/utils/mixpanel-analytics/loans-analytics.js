import { sendEvent } from "../mixpanel-util";

const loansAnalytics = {
  loanType,
  loanAmount,
  loanCollateral,
  loanLTV,
  loanTerms,
  loanBankInfo,
  loanToUAgreed,
  loanApplied,
}

/**
 * Fires an event when a user choose loan type
 *
 * @param {string} loanTypeData
 */
async function loanType(loanTypeData) {
  await sendEvent("Loan Type Chosen", { loanType: loanTypeData });
}

/**
 * Fires an event when a user enter loan amount
 *
 * @param {object} loanData
 */
async function loanAmount(loanData) {
  await sendEvent("Loan Coin and Amount Entered", loanData);
}

/**
 * Fires an event when a user select collateral coin
 *
 * @param {string} coin
 */
async function loanCollateral(coin) {
  await sendEvent("Collateral Coin Chosen", { coin });
}

/**
 * Fires an event when a user choose LTV
 *
 * @param {string} ltv
 */
async function loanLTV(ltv) {
  await sendEvent("LTV Chosen", { ltv });
}

/**
 * Fires an event when a user choose term of loan
 * @param {string} termOfLoan
 */
async function loanTerms(termOfLoan) {
  await sendEvent("Term of Loan Chosen", { termOfLoan });
}

/**
 * Fires an event when a user submit loan bank info
 */
async function loanBankInfo() {
  await sendEvent("Bank Details Submitted");
}

/**
 * Fires an event when a user agreed loan ToU
 */
async function loanToUAgreed() {
  await sendEvent("Loan ToU Agreed");
}

/**
 * Fires an event when a user applies for a loan
 *
 * @param {object} loanData
 * @param {object} loanData.loan
 * @param {uuid} loanData.transaction_id
 */
async function loanApplied({ loan, transaction_id: transactionId }) {
  await sendEvent("Loan applied", {
    transactionId,
    id: loan.id,
    type: loan.type,
    coin: loan.coin,
    amount_crypto: loan.amount_collateral_crypto.toString(),
    amount_usd: loan.amount_collateral_usd.toString(),
    ltv: loan.ltv.toString(),
    interest: loan.interest.toString(),
    total_interest: loan.total_interest,
    monthly_payment: loan.monthly_payment.toString(),
    term_of_loan: loan.term_of_loan,
    originating_date: loan.originating_date,
    collateral_usd_rate: loan.collateral_usd_rate,
  });
}

export default loansAnalytics
