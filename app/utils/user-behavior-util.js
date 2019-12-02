import { Platform } from "react-native";
import moment from "moment";

import mixpanelService from "../services/mixpanel-service";
import store from "../redux/store";
import appUtil from "./app-util";
import loggerUtil from "./logger-util";

const userBehaviorUtil = {
  sendEvent,
  buttonPressed,
  navigated,
  sessionStarted,
  sessionEnded,
  registrationCompleted,
  kycProfileInfo,
  kycAddressInfo,
  kycDocumentsSubmitted,
  kycUtilityBillSubmitted,
  kycTaxPayerInfo,
  kycStarted,
  interestInCEL,
  loanType,
  loanAmount,
  loanCollateral,
  loanLTV,
  loanTerms,
  loanBankInfo,
  loanToUAgreed,
  changePassword,
  changePin,
  withdrawCompleted,
  celpayCompleted,
  loanApplied,
  setPin,
  apiError,
};

let userData = {};

let advertisingId;

let revisionId = "";
let version = "";
let sessionTime = new moment();

const appInfo = { os: Platform.OS };

/**
 * Send event attribution
 *
 * @param {string} event - name of the event
 * @param {Object} data - payload
 */
async function sendEvent(event, data = {}) {
  if (!advertisingId) {
    advertisingId = store.getState().app.advertisingId;
    appInfo.advertisingId = advertisingId;
  }
  if (!revisionId || !version) {
    try {
      const metadata = await appUtil.getRevisionId();
      version = metadata.codePushVersion.version;
      revisionId = metadata.codePushVersion.label;

      appInfo.revisionId = revisionId;
      appInfo.appVersion = version;
    } catch (error) {
      loggerUtil.err(error);
    }
  }
  if (!userData.id) {
    userData = store.getState().user.profile;
  }
  mixpanelService.track(event, {
    distinct_id: userData.id,
    ...appInfo,
    ...data,
  });
}

/**
 * Fires an event when a user fires NAVIGATE_TO or NAVIGATE_BACK actions
 *
 * @param {string} screen
 */
function navigated(screen) {
  sendEvent("Navigated to", { screen });
}

/**
 * Fires an event when a user presses a CelButton
 *
 * @param {string} buttonText - copy on the button
 */
function buttonPressed(button) {
  sendEvent("Button pressed", { button });
}

/**
 * Set data to the user selected by distinct_id
 */
async function sessionStarted(trigger) {
  sessionTime = new moment();
  if (!userData.id) {
    userData = store.getState().user.profile;
  }
  await sendEvent("$create_alias", { alias: userData.id });
  mixpanelService.engage(userData.id, {
    $email: userData.email,
    $first_name: userData.first_name,
    $last_name: userData.last_name,
    $created: userData.created_at,
    $phone: userData.cellphone,
    "Phone verified": userData.cellphone_verified,
    Citizenship: userData.citizenship,
    "Country of residence": userData.country,
    State: userData.state,
    $city: userData.city,
    "Two factor enabled": !!userData.two_factor_enabled,
    "Has pin": userData.has_pin,
    "KYC status": userData.kyc ? userData.kyc.status : "unknown",
    "Has referral link": !!userData.referral_link_id,
    "Is celsius member": userData.celsius_member,
    "Has SSN": !!userData.ssn,
  });
  sendEvent("Session started", { trigger });
}

/**
 * Fires an event when a user ends the session - logout|app state to background
 */
function sessionEnded(trigger) {
  userData = {};

  const x = new moment();
  const sessionDuration = moment
    .duration(x.diff(sessionTime))
    .as("milliseconds");
  const formatedDuration = moment.utc(sessionDuration).format("HH:mm:ss");
  sendEvent("Session ended", { trigger, "Session duration": formatedDuration });
}

/**
 * Fires an event when a users completes the registration process (sets PIN number)
 *
 * @param {object} user
 * @param {object} user.facebook_id - indicates user registered through facebook
 * @param {object} user.google_id - indicates user registered through google
 * @param {object} user.twitter_id - indicates user registered through twitter
 * @param {object} user.id
 * @param {object} user.referral_link_id - id of the person who referred the user
 */
async function registrationCompleted(user) {
  let method = "email";
  if (user.facebook_id) method = "facebook";
  if (user.google_id) method = "google";
  if (user.twitter_id) method = "twitter";

  await sendEvent("Registration completed", {
    method,
    referral_link_id: user.referral_link_id,
  });
}

/**
 * Fires an event when a user submit KYC personal details
 */
async function kycProfileInfo() {
  await sendEvent("KYC Personal Details Submitted");
}

/**
 * Fires an event when a user submit KYC address
 */
async function kycAddressInfo() {
  await sendEvent("KYC Address Submitted");
}

/**
 * Fires an event when a user submits KYC Document photos
 */
async function kycDocumentsSubmitted() {
  await sendEvent("KYC Documents Submitted");
}

/**
 * Fires an event when a user submits KYC utility bill photo
 */
async function kycUtilityBillSubmitted() {
  await sendEvent("KYC Address Submitted");
}

/**
 * Fires an event when a user submit KYC taxpayer info
 */
async function kycTaxPayerInfo() {
  await sendEvent("KYC Taxpayer info Submitted");
}

/**
 * Fires an event when a user starts KYC verification
 */
async function kycStarted() {
  await sendEvent("KYC verification started");
}

/**
 * Fires an event when a user change interest in coin
 *
 * @param {object} newInterest
 */
async function interestInCEL(newInterest) {
  await sendEvent("Interest in CEL", newInterest);
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
 * Fires an event when a user change his password
 */
async function changePassword() {
  await sendEvent("Password Changed");
}

/**
 * Fires an event when a user change his PIN
 */
async function changePin() {
  await sendEvent("PIN Changed");
}

/**
 * Fires an event when a user finishes a withdrawal
 *
 * @param {object} withdrawTransaction
 */
async function withdrawCompleted(withdrawTransaction) {
  const { currencyRatesShort } = store.getState().currencies;
  const amountUsd =
    withdrawTransaction.amount * currencyRatesShort[withdrawTransaction.coin];

  await sendEvent("Withdrawal initiated", {
    id: withdrawTransaction.id,
    coin: withdrawTransaction.coin,
    amount_crypto: withdrawTransaction.amount.toString(),
    amount_usd: amountUsd.toString(),
  });
}

/**
 * Fires an event when a user finishes a CelPay
 *
 * @param {object} celPayTransfer
 * @param {string} celPayTransfer.amount
 * @param {string} celPayTransfer.coin - eg. BTC|ETH
 * @param {uuid} celPayTransfer.id
 * @param {uuid} friendId
 */
async function celpayCompleted(celPayTransfer, friendId) {
  const { currencyRatesShort } = store.getState().currencies;

  const amountUsd =
    celPayTransfer.amount *
    currencyRatesShort[celPayTransfer.coin.toLowerCase()];

  await sendEvent("CelPay initiated", {
    id: celPayTransfer.id,
    coin: celPayTransfer.coin,
    amount_crypto: celPayTransfer.amount.toString(),
    amount_usd: amountUsd.toString(),
    friendId,
  });
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
/**
 * Fires an event when a user set a pin
 */
async function setPin() {
  await sendEvent("Set PIN");
}

async function apiError(data) {
  await sendEvent("Api Error", data);
}

export default userBehaviorUtil;
