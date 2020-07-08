import React from "react";

import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import WalletSettings from "./WalletSettings";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockGeneralDataStore from "../../../../celsius-app-creds/mock-data/mockGeneralDataStore";
import mockLoyaltyStore from "../../../../celsius-app-creds/mock-data/mockLoyaltyStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  currencies: {
    rates: mockCurrenciesStore.rates,
  },
  generalData: mockGeneralDataStore,
  loyalty: mockLoyaltyStore.loyalty.postman13,
  forms: {
    formData: {
      interestInCel: mockUserStore.appSettings.postman13.interest_in_cel,
      coinsInCel: {
        ...mockUserStore.appSettings.postman13.interest_in_cel_per_coin,
      },
    },
  },
};

const regular = () => (
  <ScreenStoryWrapper
    screen={WalletSettings}
    screenName="WalletSettings"
    state={initialState}
  />
);

export default {
  regular,
};
