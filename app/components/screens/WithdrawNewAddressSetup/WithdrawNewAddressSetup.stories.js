import React from "react";

import WithdrawNewAddressSetup from "./WithdrawNewAddressSetup";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockWalletStore from "../../../../celsius-app-creds/mock-data/mockWalletStore";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.testcelsiusapp,
    appSettings: mockUserStore.appSettings.testcelsiusapp,
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
      screenName="WithdrawNewAddressSetup"
      screen={WithdrawNewAddressSetup}
      state={initialState}
    />
  );
};

export default {
  regular,
};
