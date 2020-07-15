import React from "react";

import Support from "./Support";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.testcelsiusapp,
    appSettings: mockUserStore.appSettings.testcelsiusapp,
    email: mockUserStore.profile.postman13.email,
  },
};

const regular = () => {
  return (
    <ScreenStoryWrapper
      screenName="Support"
      screen={Support}
      state={initialState}
    />
  );
};

export default {
  regular,
};
