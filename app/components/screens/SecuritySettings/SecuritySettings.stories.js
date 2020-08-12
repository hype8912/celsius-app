import React from "react";
import _ from "lodash";

import SecuritySettings from "./SecuritySettings";
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
// "weak", "fair", "good", "strong"

const weak = () => {
  const state = _.cloneDeep(initialState);
  state.security.securityOverview.overall_score_strength = "weak";

  return (
    <ScreenStoryWrapper
      screenName="VerifyProfile"
      screen={SecuritySettings}
      state={state}
    />
  );
};

const fair = () => {
  const state = _.cloneDeep(initialState);
  state.security.securityOverview.overall_score_strength = "fair";

  return (
    <ScreenStoryWrapper
      screenName="VerifyProfile"
      screen={SecuritySettings}
      state={state}
    />
  );
};

const good = () => {
  const state = _.cloneDeep(initialState);
  state.security.securityOverview.overall_score_strength = "good";
  state.security.securityOverview.is_2fa_set = true;

  return (
    <ScreenStoryWrapper
      screenName="VerifyProfile"
      screen={SecuritySettings}
      state={state}
    />
  );
};

const strong = () => {
  const state = _.cloneDeep(initialState);
  state.security.securityOverview.overall_score_strength = "strong";
  state.security.securityOverview.is_2fa_set = true;

  return (
    <ScreenStoryWrapper
      screenName="VerifyProfile"
      screen={SecuritySettings}
      state={state}
    />
  );
};

export default {
  weak,
  fair,
  good,
  strong,
};
