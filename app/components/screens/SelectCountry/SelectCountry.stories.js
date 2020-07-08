import React from "react";

import SelectCountry from "./SelectCountry";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  forms: {
    formData: {
      firstName: "",
      middleName: null,
      lastName: "",
      citizenship: {
        name: "Romania",
      },
      gender: "male",
      month: "01",
      day: "01",
      year: "2000",
      street: "ju",
      flatNumber: "13",
      city: "bu",
      zip: "32123",
      country: {
        name: "Romania",
      },
      state: "",
    },
  },
};

const noCodes = () => (
  <ScreenStoryWrapper
    screen={SelectCountry}
    screenName="Select Country"
    state={initialState}
    navigationProps={{
      field: "country",
    }}
  />
);

const withCodes = () => (
  <ScreenStoryWrapper
    screen={SelectCountry}
    screenName="Select Country"
    state={initialState}
    navigationProps={{
      field: "country",
      hideCallingCodes: true,
    }}
  />
);

export default {
  noCodes,
  withCodes,
};
