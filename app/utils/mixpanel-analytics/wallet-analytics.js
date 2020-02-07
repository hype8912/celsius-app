import { sendEvent } from "../mixpanel-util";
import store from "../../redux/store";

const walletAnalytics = {
  interestInCEL,
  withdrawCompleted,
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

export default walletAnalytics
