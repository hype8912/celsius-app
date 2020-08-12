import React from "react";

import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import KYCAddressProof from "./KYCAddressProof";

const initialState = {
  user: {
    user: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
};

const regular = () => (
  <ScreenStoryWrapper
    screen={KYCAddressProof}
    screenName="KYCAddressProof"
    state={initialState}
  />
);

export default {
  regular,
};
