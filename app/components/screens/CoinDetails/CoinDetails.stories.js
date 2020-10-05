import React from "react";
import _ from "lodash";

import CoinDetails from "./CoinDetails";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
import mockWalletStore from "../../../../celsius-app-creds/mock-data/mockWalletStore";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockLoyaltyStore from "../../../../celsius-app-creds/mock-data/mockLoyaltyStore";
import mockGeneralDataStore from "../../../../celsius-app-creds/mock-data/mockGeneralDataStore";
import mockGraphStore from "../../../../celsius-app-creds/mock-data/mockGraphStore";

import walletUtil from "../../../utils/wallet-util/wallet-util";

const initialState = {
  wallet: {
    summary: walletUtil.mapWalletSummary(mockWalletStore.summary.postman13),
  },
  currencies: {
    rates: mockCurrenciesStore.rates,
  },
  compliance: mockComplianceStore.allowedAll,
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  loyalty: mockLoyaltyStore.loyalty.postman13,
  generalData: mockGeneralDataStore,
};

const coinDetails = coin => {
  const state = _.cloneDeep(initialState);
  state.graph = mockGraphStore[coin.toLowerCase()];

  return (
    <ScreenStoryWrapper
      screenName="CoinDetails"
      screen={CoinDetails}
      state={state}
      navigationProps={{ coin }}
    />
  );
};

const btc = () => coinDetails("BTC");
const omg = () => coinDetails("OMG");

export default {
  btc,
  omg,
};
