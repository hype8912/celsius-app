import React from "react";

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

const pin = () => {
  return (
    <ScreenStoryWrapper
      screenName="VerifyProfile"
      screen={VerifyProfile}
      state={initialState}
    />
  );
};

const twoFA = () => {
  const state = { ...initialState };
  state.user.profile.two_factor_enabled = true;

  return (
    <ScreenStoryWrapper
      screenName="VerifyProfile"
      screen={VerifyProfile}
      state={initialState}
    />
  );
};

export default {
  pin,
  twoFA,
};
