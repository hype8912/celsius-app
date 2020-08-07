import React from "react";

import Welcome from "./Welcome";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";

const initialState = {
  user: {
    user: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
};

const regular = () => (
  <ScreenStoryWrapper
    screen={Welcome}
    screenName="Welcome"
    state={initialState}
  />
);

export default {
  regular,
};
