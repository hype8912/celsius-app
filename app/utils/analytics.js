import { Constants, Segment } from "expo";
import { Platform } from "react-native";
import j from "jsrsasign";
import store from "../redux/store";
import { getSecureStoreKey } from "./expo-storage";

const { revisionId, version, extra } = Constants.manifest;
const { SECURITY_STORAGE_AUTH_KEY } = extra;

const appInfo = {
  revisionId,
  appVersion: version,
  os: Platform.OS,
}

// TODO probably destroy
const analytics = {
  identifyUser,
  logoutUser,
  registrationCompleted,
  kycStarted,
  withdrawCompleted,
  celpayCompleted,
  loanApplied,
  sessionStarted,
  sessionEnded,
  buttonPressed,
  navigated,
}

/**
 * Identifies the user on Segment -> Mixpanel, Branch
 */
async function identifyUser() {
  try {
    const user = store.getState().user.profile
    if (!user || !user.id) return

    const token = await getSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);
    const tokenHash = new j.KJUR.crypto.MessageDigest({alg: "sha1"});
    tokenHash.updateString(token)
    const tokenHex = tokenHash.digest()

    Segment.identifyWithTraits(user.id, {
      email: user.email,
      tokenHex,
    })
  } catch(err) {
    // console.log({ err })
  }
}

/**
 * Logs the user out of Segment
 */
async function logoutUser() {
  await Segment.reset();
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
  let method = 'email'
  if (user.facebook_id) method = 'facebook'
  if (user.google_id) method = 'google'
  if (user.twitter_id) method = 'twitter'

  await Segment.trackWithProperties('ACHIEVE_LEVEL', {
    ...appInfo,
    user_data: { developer_identity: user.id },
    method,
    referral_link_id: user.referral_link_id,
    action: 'User completed registration'
  })
}


/**
 * Fires an event when a user starts KYC verification
 */
async function kycStarted() {
  const user = store.getState().user.profile;
  const userId = user.id;
  const description = '1';

  await Segment.trackWithProperties('COMPLETE_TUTORIAL', {
    ...appInfo,
    user_data: { developer_identity: userId },
    products: {
      $og_description: description,
      description,
      action: 'User started KYC'
    }
  })
}


/**
 * Fires an event when a user finishes a withdrawal
 * @todo: check if needs moving to BE?
 *
 * @param {object} withdrawTransaction
 */
async function withdrawCompleted(withdrawTransaction) {
  const { currencyRatesShort } = store.getState().currencies;
  const payload = {
    ...withdrawTransaction,
    amountUsd: withdrawTransaction.amount * currencyRatesShort[withdrawTransaction.coin],
  }

  await Segment.trackWithProperties('ADD_TO_WISHLIST', {
    ...appInfo,
    revenue: Number(payload.amountUsd),
    currency: 'USD',
    amount_usd: payload.amountUsd.toString(),
    amount_crypto: payload.amount.toString(),
    coin: payload.coin,
    action: 'Withdraw',
    id: payload.id,
  });
}


/**
 * Fires an event when a user finishes a CelPay
 *
 * @param {object} celPayTransfer
 * @param {string} celPayTransfer.amount
 * @param {string} celPayTransfer.coin - eg. BTC|ETH
 * @param {uuid} celPayTransfer.id
 */
async function celpayCompleted(celPayTransfer) {
  const { currencyRatesShort } = store.getState().currencies;
  const amountUsd = celPayTransfer.amount * currencyRatesShort[celPayTransfer.coin]
  await Segment.trackWithProperties('SPEND_CREDITS', {
    ...appInfo,
    revenue: Number(amountUsd),
    currency: 'USD',
    amount_usd: amountUsd.toString(),
    amount_crypto: celPayTransfer.amount.toString(),
    coin: celPayTransfer.coin,
    id: celPayTransfer.id,
    action: 'CelPay',
  });
}


/**
 * Fires an event when a user applies for a loan
 *
 * @param {object} loanData
 */
async function loanApplied(loanData) {
  await Segment.trackWithProperties('Product Added', { // ADD_TO_CART
    ...appInfo,
    revenue: Number(loanData.loan_amount),
    currency: "USD",
    coin: loanData.coin,
    amount_usd: loanData.amount_collateral_usd.toString(),
    amount_crypto: loanData.amount_collateral_crypto.toString(),
    ltv: loanData.ltv.toString(),
    interest: loanData.interest.toString(),
    monthly_payment: loanData.monthly_payment.toString(),
    id: loanData.id,
    action: 'Applied for loan',
  })
}


/**
 * Fires an event when a user starts a session - login|register|app open|app state to active
 */
async function sessionStarted() {
  await identifyUser()
  await Segment.trackWithProperties('Session started', appInfo)
}


/**
 * Fires an event when a user ends the session - logout|app state to background
 */
async function sessionEnded() {
  await Segment.trackWithProperties('Session ended', appInfo)
  await logoutUser()
}


/**
 * Fires an event when a user fires NAVIGATE_TO or NAVIGATE_BACK actions
 *
 * @param {string} screen
 */
async function navigated(screen) {
  await Segment.trackWithProperties('Navigated to', {
    ...appInfo,
    screen,
  })
}


/**
 * Fires an event when a user presses a CelButton
 *
 * @param {string} buttonText - copy on the button
 */
async function buttonPressed(buttonText) {
  await Segment.trackWithProperties('Button pressed', {
    ...appInfo,
    button: buttonText,
  })
}

export default analytics
