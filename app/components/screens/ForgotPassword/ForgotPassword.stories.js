import React from "react";

import ForgotPassword from "./ForgotPassword";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
};

const regular = () => {
  return (
    <ScreenStoryWrapper
      screenName="ForgotPassword"
      screen={ForgotPassword}
      state={initialState}
    />
  );
};

export default {
  regular,
};
