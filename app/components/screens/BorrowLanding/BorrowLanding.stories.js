import React from "react";
import _ from "lodash";

import BorrowLanding from "./BorrowLanding";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockLoansStore from "../../../../celsius-app-creds/mock-data/mockLoansStore";
import walletUtil from "../../../utils/wallet-util/wallet-util";
import mockWalletStore from "../../../../celsius-app-creds/mock-data/mockWalletStore";
import { KYC_STATUSES, LOAN_STATUS } from "../../../constants/DATA";
import mockGeneralDataStore from "../../../../celsius-app-creds/mock-data/mockGeneralDataStore";
import mockLoyaltyStore from "../../../../celsius-app-creds/mock-data/mockLoyaltyStore";

const allLoans = [];
Object.values(LOAN_STATUS).forEach(ls => {
  const loan = mockLoansStore.allLoans.postman13.find(l => l.status === ls);
  allLoans.push(loan);
});

const initialState = {
  wallet: {
    summary: walletUtil.mapWalletSummary(mockWalletStore.summary.postman13),
  },
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  compliance: mockComplianceStore.allowedAll,
  currencies: {
    rates: mockCurrenciesStore.rates,
    currencyRatesShort: mockCurrenciesStore.currencyRatesShort,
  },
  loans: {
    allLoans,
    ltvs: mockLoansStore.ltvs,
    activeLoan: mockLoansStore.allLoans.enimalnowlt3[0],
  },
  forms: {
    formData: {},
  },
  nav: {
    activeScreen: "BorrowLanding",
  },
  loyalty: mockLoyaltyStore.loyalty.postman13,
  generalData: mockGeneralDataStore,
};

const withLoans = () => {
  const state = _.cloneDeep(initialState);

  return (
    <ScreenStoryWrapper
      screenName="BorrowLanding"
      screen={BorrowLanding}
      state={state}
    />
  );
};

const noLoans = () => {
  const state = _.cloneDeep(initialState);
  state.loans.allLoans = [];

  return (
    <ScreenStoryWrapper
      screenName="BorrowLanding"
      screen={BorrowLanding}
      state={state}
    />
  );
};

const notCompliant = () => {
  const state = _.cloneDeep(initialState);
  state.compliance.loan.allowed = false;
  state.loans.allLoans = [];
  state.forms.formData = {
    coin: "BTC",
    termOfLoan: 6,
    amount: 1000,
    ltv: state.loans.ltvs[0],
  };

  return (
    <ScreenStoryWrapper
      screenName="BorrowLanding"
      screen={BorrowLanding}
      state={state}
    />
  );
};

const notVerified = () => {
  const state = _.cloneDeep(initialState);
  state.user.profile.kyc.status = KYC_STATUSES.collecting;
  state.loans.allLoans = [];
  state.forms.formData = {
    coin: "BTC",
    termOfLoan: 6,
    amount: 1000,
    ltv: state.loans.ltvs[0],
  };

  return (
    <ScreenStoryWrapper
      screenName="BorrowLanding"
      screen={BorrowLanding}
      state={state}
    />
  );
};

export default {
  withLoans,
  noLoans,
  notCompliant,
  notVerified,
};
