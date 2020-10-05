import React from "react";
import _ from "lodash";

import WithdrawConfirmAddress from "./WithdrawConfirmAddress";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockGeneralDataStore from "../../../../celsius-app-creds/mock-data/mockGeneralDataStore";
import mockLoyaltyStore from "../../../../celsius-app-creds/mock-data/mockLoyaltyStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
import mockWalletStore from "../../../../celsius-app-creds/mock-data/mockWalletStore";

import walletUtil from "../../../utils/wallet-util/wallet-util";
import { THEMES } from "../../../constants/UI";

const initialState = {
  user: {
    profile: mockUserStore.profile.testcelsiusapp,
    appSettings: {
      ...mockUserStore.appSettings.testcelsiusapp,
      theme: THEMES.UNICORN,
    },
    email: mockUserStore.profile.postman13.email,
  },
  currencies: mockCurrenciesStore,
  generalData: {
    celUtilityTiers: mockGeneralDataStore.celUtilityTiers,
    interestRates: mockGeneralDataStore.interestRates,
    withdrawalSettings: mockGeneralDataStore.withdrawalSettings,
  },
  loyalty: {
    loyaltyInfo: mockLoyaltyStore.loyalty.postman13.loyaltyInfo,
  },
  wallet: {
    summary: walletUtil.mapWalletSummary(mockWalletStore.summary.postman13),
    withdrawalAddresses: mockWalletStore.withdrawalAddresses.postman13,
  },
  compliance: mockComplianceStore.allowedAll,
  forms: {
    formData: {
      coin: "USDC",
      amountUsd: 1000,
      amountCrypto: 1000,
    },
  },
};

const regular = () => {
  return (
    <ScreenStoryWrapper
      screenName="WithdrawConfirmAddress"
      screen={WithdrawConfirmAddress}
      state={initialState}
    />
  );
};

const withTag = () => {
  const state = _.cloneDeep(initialState);
  state.forms.formData = { coin: "XRP" };
  return (
    <ScreenStoryWrapper
      screenName="WithdrawConfirmAddress"
      screen={WithdrawConfirmAddress}
      state={state}
    />
  );
};

export default {
  regular,
  withTag,
};
