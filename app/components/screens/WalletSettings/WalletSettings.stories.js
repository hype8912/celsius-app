import React from "react";

import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import WalletSettings from "./WalletSettings";

const initialState = {
  user: {
    user: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
    email: mockUserStore.profile.postman13.email,
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
