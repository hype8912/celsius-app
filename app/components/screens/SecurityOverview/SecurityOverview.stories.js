import React from "react";
import _ from "lodash";

import SecurityOverview from "./SecurityOverview";
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
    twoFAStatus: mockSecurityStore.security.twoFAStatus,
    securityOverview: mockSecurityStore.security.securityOverview,
  },
  hodl: {
    twoFAStatus: mockHodlStore.hodl,
    hodlStatus: mockHodlStore,
  },
  forms: {
    formData: {},
    formErrors: {},
  },
};

const state = _.cloneDeep(initialState);

const weak = () => {
  state.security.securityOverview = {
    ...initialState.security.securityOverview,
    is_2fa_set: true,
    overall_score_strength: "weak",
  };

  return (
    <ScreenStoryWrapper
      screenName="SecurityOverview"
      screen={SecurityOverview}
      state={state}
    />
  );
};

const fair = () => {
  state.security.securityOverview = {
    ...initialState.security.securityOverview,
    is_2fa_set: true,
    overall_score_strength: "fair",
  };

  return (
    <ScreenStoryWrapper
      screenName="SecurityOverview"
      screen={SecurityOverview}
      state={initialState}
    />
  );
};

const good = () => {
  state.security.securityOverview = {
    ...initialState.security.securityOverview,
    is_2fa_set: true,
    overall_score_strength: "good",
  };

  return (
    <ScreenStoryWrapper
      screenName="SecurityOverview"
      screen={SecurityOverview}
      state={state}
    />
  );
};

const strong = () => {
  state.security.securityOverview = {
    ...initialState.security.securityOverview,
    is_2fa_set: true,
    overall_score_strength: "strong",
  };

  return (
    <ScreenStoryWrapper
      screenName="SecurityOverview"
      screen={SecurityOverview}
      state={state}
    />
  );
};

const disabledCards = () => {
  state.security.securityOverview = {
    ...initialState.security.securityOverview,
    overall_score_strength: "weak",
  };
  return (
    <ScreenStoryWrapper
      screenName="SecurityOverview"
      screen={SecurityOverview}
      state={state}
    />
  );
};

const enabledCards = () => {
  state.security.twoFAStatus = { isActive: true };
  state.security.securityOverview = {
    ...initialState.security.securityOverview,
    overall_score_strength: "strong",
    hodl_mode_active: true,
  };
  return (
    <ScreenStoryWrapper
      screenName="SecurityOverview"
      screen={SecurityOverview}
      state={state}
    />
  );
};

export default {
  weak,
  fair,
  good,
  strong,
  disabledCards,
  enabledCards,
};
