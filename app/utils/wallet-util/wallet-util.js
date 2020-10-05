import BigNumber from "bignumber.js";

const walletUtil = {
  mapWalletSummary,
};

/**
 * Maps wallet summary from server
 *
 * @param {Object} summary - wallet summary
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

export default walletUtil;
