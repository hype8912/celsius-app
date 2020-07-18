import React from "react";
import _ from "lodash";

import CelPayChooseFriend from "./CelPayChooseFriend";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockWalletStore from "../../../../celsius-app-creds/mock-data/mockWalletStore";
import walletUtil from "../../../utils/wallet-util";
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

const regular = () => {
  return (
    <ScreenStoryWrapper
      screenName="CelPayChooseFriend"
      screen={CelPayChooseFriend}
      state={state}
    />
  );
};

export default {
  regular,
};
