import React from "react";
import _ from "lodash";

import KYCTaxpayer from "./KYCTaxpayer";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  kyc: {
    kycStatus: mockUserStore.profile.postman13.kyc,
  },
  forms: {
    formData: {},
    formErrors: {},
  },
};
const state = _.cloneDeep(initialState);

const ssn = () => {
  state.forms.formData.citizenship = { name: "United States" };
  state.forms.formData.country = { name: "United States" };
  state.user.profile = { citizenship: "United States" };
  state.user.profile = { country: "United States" };
  return (
    <ScreenStoryWrapper
      screenName="KYCTaxpayer"
      screen={KYCTaxpayer}
      state={state}
    />
  );
};

const taxPayer = () => {
  state.forms.formData.citizenship = { name: "Germany" };
  state.forms.formData.country = { name: "Germany" };
  state.user.profile = { citizenship: "Germany" };
  state.user.profile = { country: "Germany" };
  return (
    <ScreenStoryWrapper
      screenName="KYCTaxpayer"
      screen={KYCTaxpayer}
      state={state}
    />
  );
};

export default {
  ssn,
  taxPayer,
};
