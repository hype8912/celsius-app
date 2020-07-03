import React from "react";

import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";

import mockTransactionsStore from "../../../../celsius-app-creds/mock-data/mockTransactionsStore";
import TransactionsIntersection from "./TransactionsIntersection";
import { TRANSACTION_TYPES } from "../../../constants/DATA";
import walletUtil from "../../../utils/wallet-util";
import mockWalletStore from "../../../../celsius-app-creds/mock-data/mockWalletStore";

const initialState = {
  wallet: {
    summary: walletUtil.mapWalletSummary(mockWalletStore.summary.postman13),
  },
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
    transactionList: {
      ...mockTransactionsStore.postman13.transactionList,
      ...mockTransactionsStore.testcelsiusapp.transactionList,
      ...mockTransactionsStore.mt.transactionList,
    },
  },
};

const getDifferentTransactions = () => {
  const allTypes = Object.keys(TRANSACTION_TYPES);
  const allTransactions = Object.values(
    initialState.transactions.transactionList
  );

  const diffTransactions = allTypes
    .map(tt => {
      return allTransactions.find(t => t.type === tt);
    })
    .filter(tx => !!tx);

  // "DEPOSIT_PENDING"
  // "DEPOSIT_CONFIRMED"
  // "WITHDRAWAL_PENDING"
  // "WITHDRAWAL_CONFIRMED"
  // "WITHDRAWAL_CANCELED"
  // "WITHDRAWAL_PENDING_VERIFICATION"
  // "WITHDRAWAL_PENDING_REVIEW"
  // "LOAN_INTEREST"
  // "LOAN_PRINCIPAL_RECEIVED"
  // "INTEREST"
  // "BONUS_TOKEN"
  // "CELPAY_CLAIMED"
  // "CELPAY_SENT"
  // "CELPAY_RECEIVED"
  // "CELPAY_RETURNED"
  // "CELPAY_CANCELED"
  // "COLLATERAL_PENDING"
  // "COLLATERAL_LOCKED"
  // "COLLATERAL_UNLOCKED"
  // "PROMO_CODE_BONUS"
  // "REFERRED_HODL"
  // "REFERRED_PENDING"
  // "REFERRER_HODL"
  // "REFERRER"
  // "REFERRER_PENDING"
  // "CANCELED"
  return diffTransactions;
};

function getTransaction(type) {
  return getDifferentTransactions().find(tx => tx.type === type);
}

const transactionStory = type => {
  const state = { ...initialState };
  state.transactions.transactionDetails = getTransaction(type);
  return (
    <ScreenStoryWrapper
      screenName="TransactionsIntersection"
      screen={TransactionsIntersection}
      state={state}
    />
  );
};

export default {
  depositPending: () => transactionStory(TRANSACTION_TYPES.DEPOSIT_PENDING),
  depositConfirmed: () => transactionStory(TRANSACTION_TYPES.DEPOSIT_CONFIRMED),
  withdrawalPending: () =>
    transactionStory(TRANSACTION_TYPES.WITHDRAWAL_PENDING),
  withdrawalConfirmed: () =>
    transactionStory(TRANSACTION_TYPES.WITHDRAWAL_CONFIRMED),
  withdrawalCanceled: () =>
    transactionStory(TRANSACTION_TYPES.WITHDRAWAL_CANCELED),
  withdrawalPendingVerification: () =>
    transactionStory(TRANSACTION_TYPES.WITHDRAWAL_PENDING_VERIFICATION),
  withdrawalPendingReview: () =>
    transactionStory(TRANSACTION_TYPES.WITHDRAWAL_PENDING_REVIEW),
  loanInterest: () => transactionStory(TRANSACTION_TYPES.LOAN_INTEREST),
  loanPrincipalReceived: () =>
    transactionStory(TRANSACTION_TYPES.LOAN_PRINCIPAL_RECEIVED),
};
