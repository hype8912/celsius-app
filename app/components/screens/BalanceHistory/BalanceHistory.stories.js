import React from "react";

import BalanceHistory from "./BalanceHistory";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockWalletStore from "../../../../celsius-app-creds/mock-data/mockWalletStore";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockGraphStore from "../../../../celsius-app-creds/mock-data/mockGraphStore";
import walletUtil from "../../../utils/wallet-util/wallet-util";

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
  graph: mockGraphStore.wallet,
};

const regular = () => {
  return (
    <ScreenStoryWrapper
      screenName="BalanceHistory"
      screen={BalanceHistory}
      state={initialState}
    />
  );
};

export default {
  regular,
};
