import { BigNumber } from "bignumber.js";
import store from "../redux/store";

const getCoinsUtil = {
  getBuyLimitsPerCrypto,
  getBuyLimitsPerFiatCurrency,
  checkIfCryptoAmountIsInScope,
  checkIfFiatAmountIsInScope,
};

/**
 * Get buy coins limits for each crypto coin
 *
 * @param {String} coin
 * @returns {Object}
 */
function getBuyLimitsPerCrypto(coin) {
  const currencyRates = store.getState().currencies.currencyRatesShort;
  const buyCoinsSettings = store.getState().generalData.buyCoinsSettings;

  const min =
    coin &&
    new BigNumber(1)
      .dividedBy(currencyRates[coin.toLowerCase()])
      .multipliedBy(buyCoinsSettings.min_payment_amount);
  const max =
    coin &&
    new BigNumber(1)
      .dividedBy(currencyRates[coin.toLowerCase()])
      .multipliedBy(buyCoinsSettings.max_payment_amount);
  return {
    min,
    max,
  };
}

/**
 * Get buy coins limits for each fiat currency
 *
 * @param {String} fiat
 * @returns {Object}
 */
function getBuyLimitsPerFiatCurrency(fiat) {
  const buyCoinsSettings = store.getState().generalData.buyCoinsSettings;
  const fiatUsdRatio = new BigNumber(
    buyCoinsSettings.max_payment_amount
  ).dividedBy(buyCoinsSettings.limit_per_fiat_currency[fiat].max);

  const min =
    fiat &&
    new BigNumber(1)
      .dividedBy(fiatUsdRatio)
      .multipliedBy(buyCoinsSettings.min_payment_amount);
  const max =
    fiat &&
    new BigNumber(1)
      .dividedBy(fiatUsdRatio)
      .multipliedBy(buyCoinsSettings.max_payment_amount);

  return {
    min,
    max,
  };
}

/**
 *Check if fiat amount is between min and max
 *
 * @param {String | Number} amount
 * @param {String} curr
 * @returns {Boolean}
 */
function checkIfFiatAmountIsInScope(amount, curr) {
  if (
    new BigNumber(amount).isGreaterThanOrEqualTo(
      getBuyLimitsPerFiatCurrency(curr).min
    ) &&
    new BigNumber(amount).isLessThanOrEqualTo(
      getBuyLimitsPerFiatCurrency(curr).max
    )
  ) {
    return true;
  }
  return false;
}

/**
 *Check if crypto amount is between min and max
 *
 * @param {String | Number} amount
 * @param {String} coin
 * @returns {Boolean}
 */
function checkIfCryptoAmountIsInScope(amount, coin) {
  if (
    new BigNumber(amount).isGreaterThanOrEqualTo(
      getBuyLimitsPerCrypto(coin).min
    ) &&
    new BigNumber(amount).isLessThanOrEqualTo(getBuyLimitsPerCrypto(coin).max)
  ) {
    return true;
  }
  return false;
}

export default getCoinsUtil;
