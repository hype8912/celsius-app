import formatter from "./formatter";
import store from "../redux/store";

const interestUtil = {
  getUserInterestForCoin,
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

  let interestRate = 0;
  let interestRateDisplay;
  let inCEL = false;
  let eligible = false;
  if (interestRates[coinShort] && appSettings.interest_in_cel_per_coin) {
    eligible = true;
    inCEL =
      (appSettings.interest_in_cel_per_coin[coinShort] ||
        (appSettings.interest_in_cel &&
          appSettings.interest_in_cel_per_coin[coinShort] === null)) &&
      coinShort !== "CEL";
    interestRateDisplay = !inCEL
      ? formatter.percentageDisplay(interestRates[coinShort].rate)
      : formatter.percentageDisplay(interestRates[coinShort].cel_rate);
    interestRate = !inCEL
      ? interestRates[coinShort].rate
      : interestRates[coinShort].cel_rate;
  }

  return {
    coin: coinShort,
    rate: interestRate,
    display: interestRateDisplay,
    inCEL,
    eligible,
  };
}

export default interestUtil;
