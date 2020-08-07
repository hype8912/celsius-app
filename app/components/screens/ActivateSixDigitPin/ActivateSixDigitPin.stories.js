import React from "react";

import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import ActivateSixDigitPin from "./ActivateSixDigitPin";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
};

const regular = () => {
  return (
    <ScreenStoryWrapper
      screen={ActivateSixDigitPin}
      screenName="ActivateSixDigitPin"
      state={initialState}
    />
  );
};

export default {
  regular,
};
