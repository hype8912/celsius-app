import React from "react";

import BorrowCollateral from "./BorrowCollateral";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockGeneralDataStore from "../../../../celsius-app-creds/mock-data/mockGeneralDataStore";
import mockLoyaltyStore from "../../../../celsius-app-creds/mock-data/mockLoyaltyStore";
import mockWalletStore from "../../../../celsius-app-creds/mock-data/mockWalletStore";

import walletUtil from "../../../utils/wallet-util/wallet-util";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
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
      coinsInCel: {
        BCH: false,
        BSV: false,
        BTC: true,
        CEL: false,
        DAI: false,
        DASH: false,
        EOS: false,
        ETC: false,
        ETH: false,
        GUSD: false,
        LTC: false,
        MCDAI: false,
        OMG: false,
        ORBS: false,
        PAX: false,
        SGA: false,
        TAUD: false,
        TCAD: false,
        TGBP: false,
        THKD: false,
        TUSD: false,
        USDC: false,
        "USDT ERC20": false,
        XAUT: false,
        XLM: false,
        XRP: false,
        ZEC: false,
        ZRX: false,
      },
      coin: "USDC",
    },
  },
};

const regular = () => {
  return (
    <ScreenStoryWrapper
      screenName="BorrowCollateral"
      screen={BorrowCollateral}
      state={initialState}
    />
  );
};

export default {
  regular,
};
