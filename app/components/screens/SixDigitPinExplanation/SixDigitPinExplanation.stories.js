import React from "react";

import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import SixDigitPinExplanation from "./SixDigitPinExplanation";

const initialState = {
  user: {
    user: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
};

const regular = () => (
  <ScreenStoryWrapper
    screen={SixDigitPinExplanation}
    screenName="SixDigitPinExplanation"
    state={initialState}
  />
);

export default {
  regular,
};
