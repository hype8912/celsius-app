import React from "react";

import HodlLanding from "./HodlLanding";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockSecurityStore from "../../../../celsius-app-creds/mock-data/mockSecurityStore";
import mockHodlStore from "../../../../celsius-app-creds/mock-data/mockHodlStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
    is2FAEnabled: mockUserStore.profile.postman13.two_factor_enabled,
  },
  security: {
    securityOverview: mockSecurityStore.security.securityOverview,
  },
  kyc: {
    kycStatus: mockUserStore.profile.postman13.kyc,
  },
  hodl: {
    hodlStatus: mockHodlStore,
  },
  forms: {
    formData: {},
    formErrors: {},
  },
};
const regular = () => {
  return (
    <ScreenStoryWrapper
      screenName="HodlLanding"
      screen={HodlLanding}
      state={initialState}
    />
  );
};

export default {
  regular,
};
