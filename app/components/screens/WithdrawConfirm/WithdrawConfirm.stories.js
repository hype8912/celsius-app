import React from "react";

import WithdrawConfirm from "./WithdrawConfirm";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockGeneralDataStore from "../../../../celsius-app-creds/mock-data/mockGeneralDataStore";
import mockLoyaltyStore from "../../../../celsius-app-creds/mock-data/mockLoyaltyStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
import { THEMES } from "../../../constants/UI";
import walletUtil from "../../../utils/wallet-util/wallet-util";
import mockWalletStore from "../../../../celsius-app-creds/mock-data/mockWalletStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.testcelsiusapp,
    appSettings: {
      ...mockUserStore.appSettings.testcelsiusapp,
      theme: THEMES.UNICORN,
    },
    email: mockUserStore.profile.postman13.email,
  },
  wallet: {
    summary: walletUtil.mapWalletSummary(mockWalletStore.summary.postman13),
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
  compliance: mockComplianceStore.allowedAll,
  forms: {
    formData: {
      amountUsd: 1000,
      amountCrypto: 0.1,
      coin: "BTC",
      withdrawAddress:
        mockWalletStore.withdrawalAddresses.postman13.BTC.address,
    },
  },
};
const regular = () => {
  return (
    <ScreenStoryWrapper
      screenName="WithdrawConfirm"
      screen={WithdrawConfirm}
      state={initialState}
    />
  );
};

export default {
  regular,
};
