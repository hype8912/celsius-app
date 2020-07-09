import React from "react";

import WalletSettings from "./WalletSettings";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockGeneralDataStore from "../../../../celsius-app-creds/mock-data/mockGeneralDataStore";
import mockLoyaltyStore from "../../../../celsius-app-creds/mock-data/mockLoyaltyStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.testcelsiusapp,
    appSettings: mockUserStore.appSettings.testcelsiusapp,
    email: mockUserStore.profile.postman13.email,
  },
  currencies: mockCurrenciesStore,
  generalData: {
    celUtilityTiers: mockGeneralDataStore.celUtilityTiers,
    interestRates: mockGeneralDataStore.interestRates,
  },
  loyalty: {
    loyaltyInfo: mockLoyaltyStore.loyalty.postman13.loyaltyInfo,
  },
  compliance: {
    interest: {
      allowed: true,
      coins: [
        "ETH",
        "BTC",
        "DASH",
        "BCH",
        "LTC",
        "ZEC",
        "XRP",
        "XLM",
        "OMG",
        "TUSD",
        "GUSD",
        "PAX",
        "USDC",
        "MCDAI",
        "CEL",
        "ZRX",
        "USDT ERC20",
        "EOS",
        "SGA",
        "XAUT",
        "ETC",
      ],
      block_reason: null,
    },
  },
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
    },
  },
};
const regular = () => {
  return (
    <ScreenStoryWrapper
      screenName="WalletSettings"
      screen={WalletSettings}
      state={initialState}
    />
  );
};

export default {
  regular,
};
