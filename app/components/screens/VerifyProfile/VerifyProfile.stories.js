import React from "react";
import _ from "lodash";

import VerifyProfile from "./VerifyProfile";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  forms: {},
};

const navigationProps = {
  hasSixDigitPin: true,
}

const pin = () => {
  const state = _.cloneDeep(initialState);

  return (
    <ScreenStoryWrapper
      screenName="VerifyProfile"
      screen={VerifyProfile}
      state={state}
      navigationProps={navigationProps}
    />
  );
};

const twoFA = () => {
  const state = _.cloneDeep(initialState);
  state.user.profile.two_factor_enabled = true;

  return (
    <ScreenStoryWrapper
      screenName="VerifyProfile"
      screen={VerifyProfile}
      state={state}
    />
  );
};

export default {
  pin,
  twoFA,
};
