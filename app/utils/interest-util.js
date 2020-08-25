import formatter from "./formatter";
import store from "../redux/store";
import { isUSCitizen } from "./user-util";

const interestUtil = {
  getUserInterestForCoin,
  getLoyaltyRates,
  calculateAPY,
  calculateBonusRate,
  getBaseCelRate,
};

/**
 * Gets interest rate for user for a single coin
 *
 * @param {string} coinShort - BTC|ETH
 * @returns {object}
 * @returns {string} coin - BTC|ETH
 * @returns {string} rate - "0.12"
 * @returns {string} display - "12.00%"
 * @returns {boolean} inCEL - or in kind
 * @returns {boolean} eligible - if there are rates for coin
 */
function getUserInterestForCoin(coinShort) {
  const interestRates = store.getState().generalData.interestRates;
  const appSettings = store.getState().user.appSettings;
  const walletSummary = store.getState().wallet.summary;

  let interestRate = 0;
  let interestRateDisplay;
  let inCEL = false;
  let eligible = false;
  let isBelowThreshold;

  if (
    interestRates &&
    interestRates[coinShort] &&
    appSettings.interest_in_cel_per_coin
  ) {
    eligible = true;
    inCEL =
      (appSettings.interest_in_cel_per_coin[coinShort] ||
        (appSettings.interest_in_cel &&
          appSettings.interest_in_cel_per_coin[coinShort] === null)) &&
      coinShort !== "CEL";

    interestRateDisplay = !inCEL
      ? formatter.percentageDisplay(interestRates[coinShort].compound_rate)
      : formatter.percentageDisplay(interestRates[coinShort].compound_cel_rate);

    interestRate = !inCEL
      ? interestRates[coinShort].compound_rate
      : interestRates[coinShort].compound_cel_rate;
  }

  const coinBalance = walletSummary.coins.find(c => c.short === coinShort)
    .amount;

  if (
    interestRates[coinShort] &&
    interestRates[coinShort].threshold_on_first_n_coins &&
    !isUSCitizen()
  ) {
    isBelowThreshold = coinBalance.isLessThan(
      interestRates[coinShort].threshold_on_first_n_coins
    );
  }

  let rateInCel;
  rateInCel =
    typeof isBelowThreshold !== "undefined" && !isBelowThreshold
      ? interestRates[coinShort].cel_rate
      : interestRates[coinShort].compound_cel_rate;

  if (isUSCitizen()) {
    isBelowThreshold = coinBalance.isLessThan(
      interestRates[coinShort].threshold_us
    );
    rateInCel =
      typeof isBelowThreshold !== "undefined" && !isBelowThreshold
        ? interestRates[coinShort].compound_rate
        : interestRates[coinShort].rate_us;
  }

  return {
    ...interestRates[coinShort],
    // Quickfix for ORBS and DAI crashes
    baseRate: interestRates[coinShort] ? interestRates[coinShort].rate : 0,
    coin: coinShort,
    rate: interestRate,
    display: interestRateDisplay,
    isBelowThreshold,
    inCEL,
    eligible,
    rateInCel,
  };
}

/**
 * Calculates APY from APR value
 *
 * param {Object} loyaltyInfo - loyaltyInfo response
 */
function getLoyaltyRates(loyaltyInfo) {
  const interestRates = store.getState().generalData.interestRates;

  Object.keys(interestRates).forEach(coinShort => {
    const baseRate = interestUtil.getBaseCelRate(coinShort);
    interestRates[coinShort].cel_rate = interestUtil.calculateBonusRate(
      baseRate,
      loyaltyInfo.earn_interest_bonus
    );
    interestRates[coinShort].compound_rate = interestUtil.calculateAPY(
      interestRates[coinShort].rate
    );
    interestRates[coinShort].compound_cel_rate = interestUtil.calculateAPY(
      interestRates[coinShort].cel_rate
    );
  });

  return interestRates;
}

/**
 * Calculates APY from APR value
 *
 * param {number} apr - value set in BO or with tier bonus
 */
function calculateAPY(apr) {
  return Math.pow(1 + apr / 52, 52) - 1;
}

/**
 * Calculates bonus apr rate
 *
 * param {number|string} apr - value set in BO
 * param {number|string} bonusRate - bonus rate for a specific tier level
 */
function calculateBonusRate(apr, bonusRate) {
  return (1 + Number(bonusRate)) * Number(apr);
}

/**
 * Gets base rate for calculating interest in cel
 * over 1BTC has different rate than under 1BTC
 *
 * param {string} coin - BTC
 * param {string} base rate for calculating rate in CEL
 */
function getBaseCelRate(coin) {
  const walletSummary = store.getState().wallet.summary;
  const interestRates = store.getState().generalData.interestRates;

  let baseRate = interestRates[coin].rate;

  if (interestRates[coin].threshold_on_first_n_coins && walletSummary) {
    const coinBalance = walletSummary.coins.find(c => c.short === coin).amount;

    const shouldUseSpecialRate = coinBalance.isLessThan(
      interestRates[coin].threshold_on_first_n_coins
    );
    baseRate = shouldUseSpecialRate
      ? interestRates[coin].rate_on_first_n_coins
      : baseRate;
  }

  return baseRate;
}

export default interestUtil;
