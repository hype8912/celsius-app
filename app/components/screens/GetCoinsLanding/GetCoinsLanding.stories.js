import React from "react";

import GetCoinsLanding from "./GetCoinsLanding";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
import { KYC_STATUSES } from "../../../constants/DATA";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  compliance: mockComplianceStore.allowedAll,
  nav: { history: [] },
};

// const regular = () => {}

const noTransactions = () => {
  return (
    <ScreenStoryWrapper
      screenName="GetCoinsLanding"
      screen={GetCoinsLanding}
      state={initialState}
    />
  );
};

const notCompliant = () => {
  const state = { ...initialState };
  state.compliance.simplex.allowed = false;
  state.compliance.gem.allowed = false;

  return (
    <ScreenStoryWrapper
      screenName="GetCoinsLanding"
      screen={GetCoinsLanding}
      state={state}
    />
  );
};

const pendingVerification = () => {
  const state = { ...initialState };
  state.user.profile.kyc.status = KYC_STATUSES.pending;

  return (
    <ScreenStoryWrapper
      screenName="GetCoinsLanding"
      screen={GetCoinsLanding}
      state={state}
    />
  );
};

const notVerified = () => {
  const state = { ...initialState };
  state.user.profile.kyc.status = KYC_STATUSES.collecting;

  return (
    <ScreenStoryWrapper
      screenName="GetCoinsLanding"
      screen={GetCoinsLanding}
      state={state}
    />
  );
};

export default {
  // regular,
  noTransactions,
  notCompliant,
  pendingVerification,
  notVerified,
};
