import React from "react";

import Login from "./Login";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";

const initialState = {
  user: {
    user: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
};

const LoginStories = () => {
  return (
    <ScreenStoryWrapper
      screen={Login}
      screenName="Login"
      state={initialState}
    />
  );
};

export default {
  regular: LoginStories,
};
