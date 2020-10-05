import React from "react";
import _ from "lodash";

import WalletInterest from "./WalletInterest";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockWalletStore from "../../../../celsius-app-creds/mock-data/mockWalletStore";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockGraphStore from "../../../../celsius-app-creds/mock-data/mockGraphStore";
import walletUtil from "../../../utils/wallet-util/wallet-util";
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
  const state = _.cloneDeep(initialState);

  return (
    <ScreenStoryWrapper
      screenName="WalletInterest"
      screen={WalletInterest}
      state={state}
    />
  );
};

const nonCompliant = () => {
  const state = _.cloneDeep(initialState);
  state.compliance = mockComplianceStore.interestBlocked;
  state.compliance.interest.allowed = false;
  state.forms = {
    formData: {
      coin: "ETH",
      amountCrypto: "15",
      amountUsd: "1500",
    },
  };

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
