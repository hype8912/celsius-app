import React from "react";

import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import KYCFinalRejection from "./KYCFinalRejection";

const initialState = {
  user: {
    user: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
};

const regular = () => (
  <ScreenStoryWrapper
    screen={KYCFinalRejection}
    screenName="KYCFinalRejection"
    state={initialState}
  />
);

export default {
  regular,
};
