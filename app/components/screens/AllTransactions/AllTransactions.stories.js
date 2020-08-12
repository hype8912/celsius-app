import React from "react";
import _ from "lodash";

import AllTransactions from "./AllTransactions";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";

import mockTransactionsStore from "../../../../celsius-app-creds/mock-data/mockTransactionsStore";
import { TRANSACTION_TYPES } from "../../../constants/DATA";

const getDifferentTransactions = () => {
  const allTypes = Object.keys(TRANSACTION_TYPES);
  const allTransactions = Object.values(
    mockTransactionsStore.mt.transactionList
  );

  const diffTransactions = {};
  allTypes
    .map(tt => {
      return allTransactions.find(t => t.type === tt && t.uiProps);
    })
    .filter(tx => !!tx)
    .forEach(tx => {
      diffTransactions[tx.id] = tx;
    });

  return diffTransactions;
};

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
    transactionList: getDifferentTransactions(),
  },
};

const navigationProps = {
  coin: "",
  type: "",
  additionalFilter: {},
};

const regular = () => {
  const state = _.cloneDeep(initialState);

  return (
    <ScreenStoryWrapper
      screenName="AllTransactions"
      screen={AllTransactions}
      state={state}
      navigationProps={navigationProps}
    />
  );
};

const noTransactions = () => {
  const state = _.cloneDeep(initialState);
  state.transactions.transactionList = {};

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
