import React from "react";

import Welcome from "./Welcome";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";

const regular = () => (
  <ScreenStoryWrapper screen={Welcome} screenName="Welcome" />
);

export default {
  regular,
};
