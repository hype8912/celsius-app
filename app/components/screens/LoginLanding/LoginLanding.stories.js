import React from "react";

import LoginLanding from "./LoginLanding";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";

const navigationProps = {
  type: "login",
};

const login = () => (
  <ScreenStoryWrapper
    screen={LoginLanding}
    screenName="LoginLanding"
    navigationProps={navigationProps}
  />
);

const register = () => (
  <ScreenStoryWrapper screen={LoginLanding} screenName="LoginLanding" />
);

export default {
  login,
  register,
};
