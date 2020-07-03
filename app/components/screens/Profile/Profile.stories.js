import React from "react";

import Profile from "./Profile";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import { KYC_STATUSES } from "../../../constants/DATA";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
};

const regular = () => {
  return (
    <ScreenStoryWrapper
      screenName="Profile"
      screen={Profile}
      state={initialState}
    />
  );
};

const notVerified = () => {
  const state = { ...initialState };
  state.user.profile.kyc.status = KYC_STATUSES.collecting;

  return (
    <ScreenStoryWrapper screenName="Profile" screen={Profile} state={state} />
  );
};

const pendingVerification = () => {
  const state = { ...initialState };
  state.user.profile.kyc.status = KYC_STATUSES.pending;

  return (
    <ScreenStoryWrapper screenName="Profile" screen={Profile} state={state} />
  );
};

const rejeceted = () => {
  const state = { ...initialState };
  state.user.profile.kyc.status = KYC_STATUSES.rejected;

  return (
    <ScreenStoryWrapper screenName="Profile" screen={Profile} state={state} />
  );
};

export default {
  regular,
  notVerified,
  pendingVerification,
  rejeceted,
};
