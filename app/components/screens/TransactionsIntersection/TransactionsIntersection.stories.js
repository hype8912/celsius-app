import React from "react";
import _ from "lodash";

import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";

import mockTransactionsStore from "../../../../celsius-app-creds/mock-data/mockTransactionsStore";
import TransactionsIntersection from "./TransactionsIntersection";
import { TRANSACTION_TYPES } from "../../../constants/DATA";
import walletUtil from "../../../utils/wallet-util/wallet-util";
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

  return diffTransactions;
};

function getTransaction(type) {
  return getDifferentTransactions().find(tx => tx.type === type);
}

const transactionStory = type => {
  const state = _.cloneDeep(initialState);
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
  interest: () => transactionStory(TRANSACTION_TYPES.INTEREST),
  bonusToken: () => transactionStory(TRANSACTION_TYPES.BONUS_TOKEN),
  celpayClaimed: () => transactionStory(TRANSACTION_TYPES.CELPAY_CLAIMED),
  celpaySent: () => transactionStory(TRANSACTION_TYPES.CELPAY_SENT),
  celpayReceived: () => transactionStory(TRANSACTION_TYPES.CELPAY_RECEIVED),
  celpayReturned: () => transactionStory(TRANSACTION_TYPES.CELPAY_RETURNED),
  celpayCanceled: () => transactionStory(TRANSACTION_TYPES.CELPAY_CANCELED),
  collateralPending: () =>
    transactionStory(TRANSACTION_TYPES.COLLATERAL_PENDING),
  collateralLocked: () => transactionStory(TRANSACTION_TYPES.COLLATERAL_LOCKED),
  collateralUnlocked: () =>
    transactionStory(TRANSACTION_TYPES.COLLATERAL_UNLOCKED),
  promoCodeBonus: () => transactionStory(TRANSACTION_TYPES.PROMO_CODE_BONUS),
  referredHodl: () => transactionStory(TRANSACTION_TYPES.REFERRED_HODL),
  referredPending: () => transactionStory(TRANSACTION_TYPES.REFERRED_PENDING),
  referrerHodl: () => transactionStory(TRANSACTION_TYPES.REFERRER_HODL),
  referrer: () => transactionStory(TRANSACTION_TYPES.REFERRER),
  referrerPending: () => transactionStory(TRANSACTION_TYPES.REFERRER_PENDING),
  canceled: () => transactionStory(TRANSACTION_TYPES.CANCELED),
};
