import React from "react";

import Login from "./Login";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";

const initialState = undefined;

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
