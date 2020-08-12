import { BigNumber } from "bignumber.js";
import store from "../redux/store";

const getCoinsUtil = {
  getBuyLimitsPerCrypto,
  getBuyLimitsPerFiatCurrency,
  isCryptoAmountInScope,
  isFiatAmountInScope,
  isAmountInScope,
};

/**
 * Get buy coins limits for each crypto coin
 *
 * @param {String} coin - ETH|BTC
 * @returns {Object}
 */
function getBuyLimitsPerCrypto(coin) {
  const buyCoinsSettings = store.getState().generalData.buyCoinsSettings;
  return buyCoinsSettings.limit_per_crypto_currency[coin];
}

/**
 * Get buy coins limits for each fiat currency
 *
 * @param {String} fiat - USD|CAD
 * @returns {Object}
 */
function getBuyLimitsPerFiatCurrency(fiat) {
  const buyCoinsSettings = store.getState().generalData.buyCoinsSettings;
  return buyCoinsSettings.limit_per_fiat_currency[fiat];
}

/**
 *Check if fiat amount is between min and max
 *
 * @param {String | Number} amount
 * @param {String} curr
 * @returns {Boolean}
 */
function isFiatAmountInScope(amount, curr) {
  if (!curr) return true;

  const isOverMin = new BigNumber(amount).isGreaterThanOrEqualTo(
    getBuyLimitsPerFiatCurrency(curr).min
  );
  const isBelowMax = new BigNumber(amount).isLessThanOrEqualTo(
    getBuyLimitsPerFiatCurrency(curr).max
  );

  return isOverMin && isBelowMax;
}

/**
 * Check if crypto amount is between min and max
 *
 * @param {String | Number} amount
 * @param {String} coin
 * @returns {Boolean}
 */
function isCryptoAmountInScope(amount, coin) {
  if (!coin) return true;

  const isOverMin = new BigNumber(amount).isGreaterThanOrEqualTo(
    getBuyLimitsPerCrypto(coin).min
  );
  const isBelowMax = new BigNumber(amount).isLessThanOrEqualTo(
    getBuyLimitsPerCrypto(coin).max
  );

  return isOverMin && isBelowMax;
}

/**
 * Check if entered amount is between min and max
 *
 * @returns {Boolean}
 */
function isAmountInScope() {
  const { formData } = store.getState().forms;
  const { isFiat, amountFiat, fiatCoin, amountCrypto, cryptoCoin } = formData;

  if (isFiat && fiatCoin) {
    return isFiatAmountInScope(amountFiat, fiatCoin);
  }

  if (!isFiat && cryptoCoin) {
    return isCryptoAmountInScope(amountCrypto, cryptoCoin);
  }

  return true;
}

export default getCoinsUtil;
