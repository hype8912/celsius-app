import React from "react";

import WithdrawAddressOverview from "./WithdrawAddressOverview";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockWalletStore from "../../../../celsius-app-creds/mock-data/mockWalletStore";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import { THEMES } from "../../../constants/UI";

const initialState = {
  user: {
    profile: mockUserStore.profile.testcelsiusapp,
    appSettings: {
      ...mockUserStore.appSettings.testcelsiusapp,
      theme: THEMES.UNICORN,
    },
  },
  wallet: {
    withdrawalAddresses: mockWalletStore.withdrawalAddresses.postman13,
    noWithdrawalAddresses: mockWalletStore.noWithdrawalAddresses,
  },
  currencies: mockCurrenciesStore,
  forms: {
    formData: {},
    formErrors: {},
  },
};
const regular = () => {
  return (
    <ScreenStoryWrapper
      screenName="WithdrawAddressOverview"
      screen={WithdrawAddressOverview}
      state={initialState}
    />
  );
};

export default {
  regular,
};
