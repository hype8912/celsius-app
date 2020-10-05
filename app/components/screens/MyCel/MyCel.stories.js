import React from "react";
import _ from "lodash";

import MyCel from "./MyCel";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockLoyaltyStore from "../../../../celsius-app-creds/mock-data/mockLoyaltyStore";
import walletUtil from "../../../utils/wallet-util/wallet-util";
import mockWalletStore from "../../../../celsius-app-creds/mock-data/mockWalletStore";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";

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
  loyalty: mockLoyaltyStore.loyalty.gold,
  ui: { activeTab: "OVERVIEW" },
};

const setTab = tab => {
  const state = _.cloneDeep(initialState);
  state.ui = { activeTab: tab };

  return <ScreenStoryWrapper screenName="MyCel" screen={MyCel} state={state} />;
};

const setTier = tier => {
  const state = _.cloneDeep(initialState);
  state.loyalty = mockLoyaltyStore.loyalty[tier];

  return <ScreenStoryWrapper screenName="MyCel" screen={MyCel} state={state} />;
};

export default {
  none: () => setTier("none"),
  silver: () => setTier("silver"),
  gold: () => setTier("gold"),
  platinum: () => setTier("platinum"),
  overview: () => setTab("OVERVIEW"),
  interest: () => setTab("EARNINGS"),
  loans: () => setTab("LOANS"),
};
