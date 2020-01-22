import { createSelector } from "reselect/lib/index";

const getDepositCoins = state => state.compliance.deposit.coins;
const getCoinRates = state => state.currencies.rates;

export const getDepositEligibleCoins = createSelector(
  getDepositCoins,
  getCoinRates,
  (depositCoins, rates) => {
    const complianceDepositCoins = depositCoins;
    let eligibleCoins = [];

    if (rates) {
      eligibleCoins = rates
        .filter(coin => {
          const filteredCoin = complianceDepositCoins.filter(
            complianceCoin => coin.short === complianceCoin
          );
          return filteredCoin && filteredCoin.length;
        })
        .map(c => ({ label: c.short, value: c.short }));
    }

    return [...eligibleCoins];
  }
);
