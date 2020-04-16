import BigNumber from "bignumber.js";

const walletUtil = {
  mapWalletSummary,
};

/**
 * Maps wallet summary from server
 *
 * @param {Object} wallet summary
 * @returns {Object}
 */
function mapWalletSummary(summary) {
  return {
    ...summary,
    total_amount_usd: new BigNumber(summary.total_amount_usd),
    daily_diff: new BigNumber(summary.daily_diff),
    total_interest_earned: new BigNumber(summary.total_interest_earned),
    coins: summary.coins.map(c => {
      return {
        ...c,
        amount: new BigNumber(c.amount),
        amount_usd: new BigNumber(c.amount_usd),
        interest_earned: new BigNumber(c.interest_earned),
        interest_earned_usd: new BigNumber(c.interest_earned_usd),
        interest_earned_cel: new BigNumber(c.interest_earned_cel),
      };
    }),
  };
}

// TODO: move to formatter
/**
 * Returns number of decimals
 *
 * @param {String} Number of decimals
 * @returns {Number}
 */
// function setDecimalPlaces(coin) {
//   switch (coin) {
//     case "USD":
//       return 4
//     case "ETH":
//       return 2
//     case "BTC":
//       return 5
//     case "DASH":
//       return 2
//     case "BCH":
//       return 2
//     case "LTC" :
//       return 2
//     case "ZEC":
//       return 2
//     case "XLM":
//       return 0
//     case "XRP":
//       return 0
//     case "OMG":
//       return 2
//     case "TUSD":
//       return 2
//     case "GUSD" :
//       return 2
//     case "PAX":
//       return 2
//     case "USDC":
//       return 2
//     case "DAI":
//       return 2
//     case "MCDAI":
//       return 2
//     case "CEL":
//       return 0
//     case "ZRX":
//       return 2
//     case "ORBS":
//       return 0
//     case "USDT ERC20":
//       return 2
//     case "TGBP":
//       return 2
//     case "TAUD":
//       return 2
//     case "THKD":
//       return 2
//     case "TCAD":
//       return 2
//     case "EOS":
//       return 2
//     case "SGA":
//       return 2
//     default:
//       return 2
//   }
// }

export default walletUtil;
