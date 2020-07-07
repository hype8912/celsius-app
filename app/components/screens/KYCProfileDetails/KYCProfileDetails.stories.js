import React from "react";
import _ from "lodash";

import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import KYCProfileDetails from "./KYCProfileDetails";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  forms: {
    formData: {},
    formErrors: {},
  },
};

const empty = () => {
  const state = _.cloneDeep(initialState);

  return (
    <ScreenStoryWrapper
      screen={KYCProfileDetails}
      screenName="KYCProfileDetails"
      state={state}
    />
  );
};

const prefilled = () => {
  const state = _.cloneDeep(initialState);
  const user = state.user.profile;

  state.forms.formData = {
    firstName: user.first_name,
    middleName: user.middle_name,
    lastName: user.last_name,
    citizenship: { name: user.citizenship },
    gender: user.gender ? user.gender.toLowerCase() : "",
    month: "02",
    day: "23",
    year: "1984",
  };

  return (
    <ScreenStoryWrapper
      screen={KYCProfileDetails}
      screenName="KYCProfileDetails"
      state={state}
    />
  );
};

const withErrors = () => {
  const state = _.cloneDeep(initialState);
  state.forms.formErrors = {
    first_name: "First Name is required!",
    last_name: "Last Name is required!",
    dateOfBirth: "Date of Birth not valid!",
    citizenship: "Citizenship is required!",
    gender: "Gender is required!",
  };

  return (
    <ScreenStoryWrapper
      screen={KYCProfileDetails}
      screenName="KYCProfileDetails"
      state={state}
    />
  );
};

export default {
  empty,
  prefilled,
  withErrors,
};
