import React from "react";

import AllTransactions from "./AllTransactions";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";

import mockTransactionsStore from "../../../../celsius-app-creds/mock-data/mockTransactionsStore";

const initialState = {
  currencies: {
    rates: mockCurrenciesStore.rates,
    currencyRatesShort: mockCurrenciesStore.currencyRatesShort,
  },
  compliance: mockComplianceStore.allowedAll,
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  transactions: {
    transactionList: mockTransactionsStore.postman13.transactionList,
  },
  // loyalty: mockLoyaltyStore.loyalty.postman13,
  // generalData: mockGeneralDataStore,
};

const navigationProps = {
  coin: "",
  type: "",
  additionalFilter: {},
};

const regular = () => {
  return (
    <ScreenStoryWrapper
      screenName="AllTransactions"
      screen={AllTransactions}
      state={initialState}
      navigationProps={navigationProps}
    />
  );
};

const noTransactions = () => {
  const state = { ...initialState };
  state.transactions.transactionList = [];

  return (
    <ScreenStoryWrapper
      screenName="AllTransactions"
      screen={AllTransactions}
      state={state}
      navigationProps={navigationProps}
    />
  );
};

export default {
  regular,
  noTransactions,
};
