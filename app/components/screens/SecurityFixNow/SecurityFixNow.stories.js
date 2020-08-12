import React from "react";
import _ from "lodash";

import SecurityFixNow from "./SecurityFixNow";
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

const twoFA = () => {
  const navigationProps = {
    title: "Two-Factor Authentication",
    fixNowContentLength: 3,
    currentStep: 1,
  };
  return (
    <ScreenStoryWrapper
      screenName="SecurityFixNow"
      screen={SecurityFixNow}
      state={state}
      navigationProps={navigationProps}
    />
  );
};

const pin = () => {
  const navigationProps = {
    title: "Change your PIN",
    currentStep: 2,
    fixNowContentLength: 3,
  };
  state.security.securityOverview.fixNowContent = {
    ...mockSecurityStore.security.securityOverview.fixNowContent,
    index: 1,
    item: {
      name: "pin",
      fixable: true,
    },
  };
  return (
    <ScreenStoryWrapper
      screenName="SecurityFixNow"
      screen={SecurityFixNow}
      state={state}
      navigationProps={navigationProps}
    />
  );
};

const withdrawalAddresses = () => {
  const navigationProps = {
    title: "Whitelist Withdrawal Addresses",
    currentStep: 3,
    fixNowContentLength: 3,
  };
  state.security.securityOverview.fixNowContent = {
    ...mockSecurityStore.security.securityOverview.fixNowContent,
    index: 1,
    item: {
      name: "withdrawal_addresses",
      fixable: true,
    },
  };
  return (
    <ScreenStoryWrapper
      screenName="SecurityFixNow"
      screen={SecurityFixNow}
      state={state}
      navigationProps={navigationProps}
    />
  );
};

export default {
  twoFA,
  pin,
  withdrawalAddresses,
};
