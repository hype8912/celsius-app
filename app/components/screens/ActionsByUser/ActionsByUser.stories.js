import React from "react";
import _ from "lodash";

import ActionsByUser from "./ActionsByUser";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockSecurityStore from "../../../../celsius-app-creds/mock-data/mockSecurityStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
    is2FAEnabled: mockUserStore.profile.postman13.two_factor_enabled,
  },
  security: {
    securityOverview: mockSecurityStore.security.securityOverview,
  },
  forms: {
    formData: {},
    formErrors: {},
  },
};

const regular = () => {
  const state = _.cloneDeep(initialState);
  state.security.securityOverview.overall_score_strength = "weak";

  return (
    <ScreenStoryWrapper
      screenName="VerifyProfile"
      screen={ActionsByUser}
      state={state}
    />
  );
};

export default {
  regular,
};
