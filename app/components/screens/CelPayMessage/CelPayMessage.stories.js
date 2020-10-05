import React from "react";

import CelPayMessage from "./CelPayMessage";
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
    formData: {},
    formErrors: {},
  },
};
const regular = () => {
  return (
    <ScreenStoryWrapper
      screenName="CelPayMessage"
      screen={CelPayMessage}
      state={initialState}
    />
  );
};

export default {
  regular,
};
