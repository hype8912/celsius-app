import { createSelector } from 'reselect/lib/index';


const getDepositCoins = (state) => state.compliance.deposit.coins;
const getCoinRates = (state) => state.currencies.rates;

export const getDepositEligibleCoins = createSelector(getDepositCoins, getCoinRates, (depositCoins, rates) => {
  const complianceDepositCoins = depositCoins;
  let eligibleCoins = [];

  if (rates) {
    eligibleCoins = rates.filter((coin) => {
      const filteredCoin = complianceDepositCoins.filter((complianceCoin) => (coin.short === complianceCoin));
      return filteredCoin && filteredCoin.length;
    }).map(c => ({ label:c.short, value: c.short }));
  }

  return [
    ...eligibleCoins
  ]
});

const getSearchFormData = (state) => state.forms.formData.search;
const getContacts = (state) => state.user.contacts;

export const getFilteredContacts = createSelector(getSearchFormData, getContacts, (searchTerm, contacts) => {
  let filteredContacts = {};

  if (searchTerm) {
    filteredContacts = {
      friendsWithApp: contacts.friendsWithApp.filter(c => c.name && c.name.toLowerCase().includes(searchTerm.toLowerCase())),
      friendsWithoutApp: contacts.friendsWithoutApp.filter(c => c.name && c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    };

    return filteredContacts
  }

  return contacts

});
