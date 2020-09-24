import { Platform } from "react-native";
import appsFlyer from "react-native-appsflyer";
import Constants from "../../constants";

import store from "../redux/store";
import appUtil from "./app-util";
import mixpanelAnalytics from "./mixpanel-analytics";
import loggerUtil from "./logger-util";

let advertisingId;

let revisionId = "";
let version = "";

const appInfo = { os: Platform.OS };
const {
  APPSFLYER_KEY_ANDROID,
  APPSFLYER_KEY_IOS,
  APPSFLYER_IOS_APP_ID,
  ENV,
} = Constants;

const appsFlyerUtil = {
  initSDK,
  setCustomerUserId,
  registrationCompleted,
  kycStarted,
  loanApplied,
};

/**
 * Initializes Appsflyer SDK only in Production
 * Staging is not setup
 */
async function initSDK() {
  if (ENV === "PRODUCTION") {
    const appsFlyerOptions = {
      devKey:
        Platform.OS === "android" ? APPSFLYER_KEY_ANDROID : APPSFLYER_KEY_IOS,
    };

    if (Platform.OS === "ios") {
      appsFlyerOptions.appId = APPSFLYER_IOS_APP_ID;
    }

    await appsFlyer.initSdk(
      appsFlyerOptions,
      result => {
        loggerUtil.log(result);
      },
      error => {
        mixpanelAnalytics.logError("appsflyerUtil.initSDK", error);
      }
    );
  }
}

/**
 * Sets CUID for user
 * Staging is not setup
 * https://support.appsflyer.com/hc/en-us/articles/217108646-React-Native-plugin#additional-apis-11-user-identifiers
 *
 * @param {string} userId
 */
async function setCustomerUserId(userId) {
  if (ENV === "PRODUCTION") {
    appsFlyer.setCustomerUserId(userId, () => {});
  }
}

/**
 * Send event attribution to appsflyer and forwared the event with response to mixpanel
 *
 * @param {string} event - name of the event
 * @param {Object} payload - payload
 */
async function appsFlyerEvent(event, payload) {
  if (ENV === "PRODUCTION") {
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
        mixpanelAnalytics.logError("appsflyerUtil.appsFlyerEvent", error);
      }
    }
    const response = await appsFlyer.trackEvent(event, {
      ...appInfo,
      ...payload,
    });
    mixpanelAnalytics.appsflyerEvent({
      event,
      payload,
      response,
    });
  }
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

  await appsFlyerEvent("ACHIEVE_LEVEL", {
    user_data: { developer_identity: user.id },
    method,
    referral_link_id: user.referral_link_id,
    action: "User completed registration",
    content_items: [
      {
        $og_description: method,
      },
    ],
  });
}

/**
 * Fires an event when a user starts KYC verification
 */
async function kycStarted() {
  const user = store.getState().user.profile;
  const userId = user.id;
  const description = "1";

  await appsFlyerEvent("COMPLETE_TUTORIAL", {
    user_data: { developer_identity: userId },
    products: {
      $og_description: description,
      description,
      action: "User started KYC",
      content_item: [
        {
          $sku: 1,
        },
      ],
    },
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
  await appsFlyerEvent("ADD_TO_CART", {
    transaction_id: transactionId,
    id: loan.id,
    type: loan.type,
    af_revenue: Number(loan.loan_amount),
    af_currency: "USD",
    revenue: Number(loan.loan_amount),
    currency: "USD",
    coin: loan.coin,
    amount_usd: loan.amount_collateral_usd.toString(),
    amount_crypto: loan.amount_collateral_crypto.toString(),
    ltv: loan.ltv.toString(),
    interest: loan.interest.toString(),
    monthly_payment: loan.monthly_payment.toString(),
    action: "Applied for loan",
    originating_date: loan.originating_date,
    collateral_usd_rate: loan.collateral_usd_rate,
    term_of_loan: loan.term_of_loan,
    total_interest: loan.total_interest,
  });
}

export default appsFlyerUtil;
