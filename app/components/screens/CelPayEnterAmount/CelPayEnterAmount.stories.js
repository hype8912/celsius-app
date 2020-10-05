import React from "react";
import _ from "lodash";

import CelPayEnterAmount from "./CelPayEnterAmount";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockWalletStore from "../../../../celsius-app-creds/mock-data/mockWalletStore";
import walletUtil from "../../../utils/wallet-util/wallet-util";
import mockGeneralDataStore from "../../../../celsius-app-creds/mock-data/mockGeneralDataStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  wallet: {
    summary: walletUtil.mapWalletSummary(mockWalletStore.summary.postman13),
  },
  compliance: {
    celpay: mockComplianceStore.allowedAll.celpay,
    deposit: mockComplianceStore.allowedAll.deposit,
  },
  currencies: {
    rates: mockCurrenciesStore.rates,
  },
  generalData: mockGeneralDataStore,
  forms: {
    formData: {
      coin: "BTC",
      isUsd: false,
      amountCrypto: "",
    },
    formErrors: {},
  },
};

const state = _.cloneDeep(initialState);
const noAmount = () => {
  return (
    <ScreenStoryWrapper
      screenName="CelPayEnterAmount"
      screen={CelPayEnterAmount}
      state={initialState}
    />
  );
};

const cryptoAmount = () => {
  state.forms.formData = {
    coin: "BTC",
    isUsd: false,
    amountCrypto: 0.01033,
    amountUsd: 94.51,
  };
  return (
    <ScreenStoryWrapper
      screenName="CelPayEnterAmount"
      screen={CelPayEnterAmount}
      state={state}
    />
  );
};

const usdAmount = () => {
  state.forms.formData = {
    coin: "BTC",
    isUsd: true,
    amountUsd: 94.51,
    amountCrypto: 0.01033,
  };
  return (
    <ScreenStoryWrapper
      screenName="CelPayEnterAmount"
      screen={CelPayEnterAmount}
      state={state}
    />
  );
};

export default {
  noAmount,
  cryptoAmount,
  usdAmount,
};
