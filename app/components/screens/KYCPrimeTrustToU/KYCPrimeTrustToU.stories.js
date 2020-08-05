import React from "react";

import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import KYCPrimeTrustToU from "./KYCPrimeTrustToU";
import mockKYCStore from "../../../../celsius-app-creds/mock-data/mockKYCStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  forms: {
    formData: {},
    formErrors: {},
  },
  kyc: {
    primeTrustToULink: mockKYCStore.kyc.kycDocTypes["United States"],
  },
};
const regular = () => {
  return (
    <ScreenStoryWrapper
      screen={KYCPrimeTrustToU}
      screenName="KYCProfileDetails"
      state={initialState}
    />
  );
};

export default {
  regular,
};
