import React from "react";
import _ from "lodash";

import LoyaltyProgram from "./LoyaltyProgram";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockLoyaltyStore from "../../../../celsius-app-creds/mock-data/mockLoyaltyStore";
import walletUtil from "../../../utils/wallet-util";
import mockWalletStore from "../../../../celsius-app-creds/mock-data/mockWalletStore";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockGeneralDataStore from "../../../../celsius-app-creds/mock-data/mockGeneralDataStore";

const initialState = {
  wallet: {
    summary: walletUtil.mapWalletSummary(mockWalletStore.summary.postman13),
  },
  currencies: {
    rates: mockCurrenciesStore.rates,
  },
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  generalData: {
    celUtilityTiers: mockGeneralDataStore.celUtilityTiers,
  },
  loyalty: mockLoyaltyStore.loyalty.none,
  ui: { activeTab: "OVERVIEW" },
};

const none = () => {
  const state = _.cloneDeep(initialState);
  state.loyalty = {
    ...mockLoyaltyStore.loyalty.none,
  };
  return (
    <ScreenStoryWrapper
      screenName="LoyaltyProgram"
      screen={LoyaltyProgram}
      state={state}
    />
  );
};

const bronze = () => {
  const state = _.cloneDeep(initialState);
  state.loyalty = {
    ...mockLoyaltyStore.loyalty.silver,
  };
  return (
    <ScreenStoryWrapper
      screenName="LoyaltyProgram"
      screen={LoyaltyProgram}
      state={state}
    />
  );
};

const silver = () => {
  const state = _.cloneDeep(initialState);
  state.loyalty = {
    ...mockLoyaltyStore.loyalty.silver,
  };
  return (
    <ScreenStoryWrapper
      screenName="LoyaltyProgram"
      screen={LoyaltyProgram}
      state={state}
    />
  );
};

const gold = () => {
  const state = _.cloneDeep(initialState);
  state.loyalty = {
    ...mockLoyaltyStore.loyalty.gold,
  };
  return (
    <ScreenStoryWrapper
      screenName="LoyaltyProgram"
      screen={LoyaltyProgram}
      state={state}
    />
  );
};

const platinum = () => {
  const state = _.cloneDeep(initialState);
  state.loyalty = {
    ...mockLoyaltyStore.loyalty.platinum,
  };
  return (
    <ScreenStoryWrapper
      screenName="LoyaltyProgram"
      screen={LoyaltyProgram}
      state={state}
    />
  );
};

export default {
  none,
  bronze,
  silver,
  gold,
  platinum,
};
