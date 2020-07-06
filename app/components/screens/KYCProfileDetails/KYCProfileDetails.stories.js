import React from "react";

import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import KYCProfileDetails from "./KYCProfileDetails";

const initialState = {
  user: {
    user: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
};

const regular = () => (
  <ScreenStoryWrapper
    screen={KYCProfileDetails}
    screenName="KYCProfileDetails"
    state={initialState}
  />
);

export default {
  regular,
};
