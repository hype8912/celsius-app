import React from "react";

import Profile from "./Profile";
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
      screenName="Profile"
      screen={Profile}
      state={initialState}
    />
  );
};

export default {
  regular,
};
