import React from "react";
import _ from "lodash";

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
  const state = _.cloneDeep(initialState);

  return <ScreenStoryWrapper screen={Login} screenName="Login" state={state} />;
};

export default {
  regular: LoginStories,
};
