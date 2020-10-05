import React from "react";
import _ from "lodash";

import BorrowEnterAmount from "./BorrowEnterAmount";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import walletUtil from "../../../utils/wallet-util/wallet-util";
import mockWalletStore from "../../../../celsius-app-creds/mock-data/mockWalletStore";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
import mockGeneralDataStore from "../../../../celsius-app-creds/mock-data/mockGeneralDataStore";

const initialState = {
  wallet: {
    summary: walletUtil.mapWalletSummary(mockWalletStore.summary.postman13),
  },
  currencies: {
    rates: mockCurrenciesStore.rates,
  },
  compliance: mockComplianceStore.allowedAll,
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  forms: {
    formData: {
      maxAmount: "12000",
    },
  },
  generalData: mockGeneralDataStore,
};

const crypto = () => {
  const state = _.cloneDeep(initialState);
  state.forms.formData = {
    ...state.forms.formData,
    coin: "USDC",
    loanAmount: 1234,
  };

  return (
    <ScreenStoryWrapper
      screenName="BorrowEnterAmount"
      screen={BorrowEnterAmount}
      state={state}
    />
  );
};

const usd = () => {
  const state = _.cloneDeep(initialState);
  state.forms.formData = {
    ...state.forms.formData,
    coin: "USD",
    loanAmount: 1234,
    loanType: "USD_LOAN",
  };

  return (
    <ScreenStoryWrapper
      screenName="BorrowEnterAmount"
      screen={BorrowEnterAmount}
      state={state}
    />
  );
};

const noAmount = () => {
  const state = _.cloneDeep(initialState);
  state.forms.formData = {
    ...state.forms.formData,
    coin: "PAX",
  };

  return (
    <ScreenStoryWrapper
      screenName="BorrowEnterAmount"
      screen={BorrowEnterAmount}
      state={state}
    />
  );
};

export default {
  crypto,
  usd,
  noAmount,
};
