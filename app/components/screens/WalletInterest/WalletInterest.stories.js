import React from "react";

import WalletInterest from "./WalletInterest";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockWalletStore from "../../../../celsius-app-creds/mock-data/mockWalletStore";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockGraphStore from "../../../../celsius-app-creds/mock-data/mockGraphStore";
import walletUtil from "../../../utils/wallet-util";
import mockLoyaltyStore from "../../../../celsius-app-creds/mock-data/mockLoyaltyStore";
import mockGeneralDataStore from "../../../../celsius-app-creds/mock-data/mockGeneralDataStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
import mockTransactionsStore from "../../../../celsius-app-creds/mock-data/mockTransactionsStore";

const initialState = {
  wallet: {
    summary: walletUtil.mapWalletSummary(mockWalletStore.summary.postman13),
  },
  currencies: {
    rates: mockCurrenciesStore.rates,
    currencyRatesShort: mockCurrenciesStore.currencyRatesShort,
  },
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  transactions: {
    transactionList: mockTransactionsStore.testcelsiusapp.transactionList,
  },
  graph: mockGraphStore.interest,
  loyalty: mockLoyaltyStore.loyalty.postman13,
  generalData: mockGeneralDataStore,
};

const regular = () => {
  return (
    <ScreenStoryWrapper
      screenName="WalletInterest"
      screen={WalletInterest}
      state={initialState}
    />
  );
};

const nonCompliant = () => {
  const state = { ...initialState };
  state.compliance = mockComplianceStore.interestBlocked;
  state.forms = { formData: { coin: "ETH" } };

  return (
    <ScreenStoryWrapper
      screenName="WalletInterest"
      screen={WalletInterest}
      state={state}
    />
  );
};

export default {
  regular,
  nonCompliant,
};
