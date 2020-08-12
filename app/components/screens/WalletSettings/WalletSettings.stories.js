import React from "react";
import _ from "lodash";

import WalletSettings from "./WalletSettings";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockGeneralDataStore from "../../../../celsius-app-creds/mock-data/mockGeneralDataStore";
import mockLoyaltyStore from "../../../../celsius-app-creds/mock-data/mockLoyaltyStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
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
  },
  loyalty: {
    loyaltyInfo: mockLoyaltyStore.loyalty.postman13.loyaltyInfo,
  },
  compliance: mockComplianceStore.allowedAll,
  forms: {
    formData: {},
  },
};

const state = _.cloneDeep(initialState);
const eligibleForInterestInCEL = () => {
  state.forms.formData = {
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
  };

  return (
    <ScreenStoryWrapper
      screenName="WalletSettings"
      screen={WalletSettings}
      state={state}
    />
  );
};

const notEligibleForInterestInCEL = () => {
  state.forms.formData = { coinsInCel: null };

  return (
    <ScreenStoryWrapper
      screenName="WalletSettings"
      screen={WalletSettings}
      state={initialState}
    />
  );
};

export default {
  eligibleForInterestInCEL,
  notEligibleForInterestInCEL,
};
