import store from "../redux/store";

export default {
  isLosingTier,
};

/**
 * get if the user will lose cel his current tier
 *
 * @param {String} coin
 * @param {String} newBalance - new coin balance after transaction
 * @returns {boolean}
 */
function isLosingTier(coin, newBalance) {
  if (coin !== "CEL") return false;

  const {
    min_for_tier: minForTier,
    tier,
  } = store.getState().loyalty.loyaltyInfo;

  const celRatio = calculateCelRatio(newBalance);

  return celRatio < minForTier && tier.title !== "NONE";
}

/**
 * Gets CEL ratio
 *
 * @param {Number} newCelBalance - celsius balance after a transaction
 * @returns {Boolean}
 */
function calculateCelRatio(newCelBalance) {
  const walletSummary = store.getState().wallet.summary;
  const celRate = store.getState().currencies.currencyRatesShort.cel;

  const celBalance =
    newCelBalance * celRate
  const otherCoinsBalance =
    walletSummary.total_amount_usd.toNumber() -
    walletSummary.coins.find(c => c.short === "CEL").amount_usd.toNumber();
  const celRatio = otherCoinsBalance ? celBalance / otherCoinsBalance : 1;

  return celRatio;
}
