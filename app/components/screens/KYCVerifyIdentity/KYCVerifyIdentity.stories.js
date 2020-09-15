import React from "react";
import _ from "lodash";

import KYCVerifyIdentity from "./KYCVerifyIdentity";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockKYCStore from "../../../../celsius-app-creds/mock-data/mockKYCStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
    kycDocuments: mockUserStore.profile.postman13.kyc,
  },
  kyc: {
    kycDocTypes: mockKYCStore.kyc.kycDocTypes,
  },
  forms: {
    formData: {},
    formErrors: {},
  },
};

const passport = () => {
  const state = _.cloneDeep(initialState);

  state.user.profile = { citizenship: "Burkina Faso" };
  return (
    <ScreenStoryWrapper
      screenName="KYCVerifyIdentity"
      screen={KYCVerifyIdentity}
      state={state}
    />
  );
};

const passportAndDrivingLicence = () => {
  const state = _.cloneDeep(initialState);

  state.user.profile = { citizenship: "United Kingdom" };
  return (
    <ScreenStoryWrapper
      screenName="KYCVerifyIdentity"
      screen={KYCVerifyIdentity}
      state={state}
    />
  );
};

const all = () => {
  const state = _.cloneDeep(initialState);

  state.user.profile = { citizenship: "Serbia" };
  state.forms.formData = { nesto: "govno" };
  return (
    <ScreenStoryWrapper
      screenName="KYCVerifyIdentity"
      screen={KYCVerifyIdentity}
      state={state}
    />
  );
};

export default {
  passport,
  passportAndDrivingLicence,
  all,
};
