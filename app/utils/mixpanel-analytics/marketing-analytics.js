import { sendEvent } from "../mixpanel-util";

const marketingAnalytics = {
  userReferring,
  userReferred,
  userStartingReferral,
  userInitiatingLoanOnWallet,
  userInitiatingLoanOnWithdraw,
  userInitiatingLoanOnWithdrawConfirm,
}


/**
 * Fires an event when a user copies slug/shares a unique link for referral purposes
 */
async function userReferring() {
  await sendEvent("Referral code shared/copied");
}

/**
 * Fires an event when a user has been referred
 * @param {string} owner of referral link
 */
async function userReferred(owner) {
  await sendEvent(`Referral code received from ${owner}`);
}

/**
 * FIres event when user a user starts loan process on wallet screen
 */
async function userInitiatingLoanOnWallet() {
  await sendEvent(`Started loan process from banner on Wallet screen`);
}

/**
 * FIres event when user a user starts loan process on Withdraw screen
 */
async function userInitiatingLoanOnWithdraw() {
  await sendEvent(`Started loan process from banner on Withdraw screen`);
}

/**
 * FIres event when user a user starts loan process on Withdraw Confirm screen
 */
async function userInitiatingLoanOnWithdrawConfirm() {
  await sendEvent(
    `Started loan process from banner on Withdraw Confirm screen`
  );
}

/**
 * Fires an event when a user clicks on banner on Wallet screen
 */
async function userStartingReferral() {
  await sendEvent("Referral process started from banner on Wallet screen");
}

export default marketingAnalytics
