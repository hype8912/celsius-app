import React from "react";

import LoginLanding from "./LoginLanding";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
};

const navigationProps = {
  type: "login",
};

const login = () => (
  <ScreenStoryWrapper
    screen={LoginLanding}
    screenName="LoginLanding"
    state={initialState}
    navigationProps={navigationProps}
  />
);

const register = () => (
  <ScreenStoryWrapper
    screen={LoginLanding}
    screenName="LoginLanding"
    state={initialState}
  />
);

export default {
  login,
  register,
};
