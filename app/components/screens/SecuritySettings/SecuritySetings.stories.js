import React from "react";

import SecuritySettings from "./SecuritySettings";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  forms: {},
};
const securitySettings = () => {
  return (
    <ScreenStoryWrapper
      screenName="VerifyProfile"
      screen={SecuritySettings}
      state={initialState}
    />
  );
};

export default {
  securitySettings,
};
