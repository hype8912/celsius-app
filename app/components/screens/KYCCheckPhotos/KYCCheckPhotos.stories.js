import React from "react";
import _ from "lodash";

import KYCCheckPhotos from "./KYCCheckPhotos";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockSecurityStore from "../../../../celsius-app-creds/mock-data/mockSecurityStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  security: {
    securityOverview: mockSecurityStore.security.securityOverview,
  },
  forms: {
    formData: {},
    formErrors: {},
  },
};

const singlePhoto = () => {
  const state = _.cloneDeep(initialState);
  state.forms.formData = { documentType: "passport" };

  return (
    <ScreenStoryWrapper
      screenName="KYCCheckPhotos"
      screen={KYCCheckPhotos}
      state={state}
    />
  );
};

const multiplePhotos = () => {
  return (
    <ScreenStoryWrapper
      screenName="KYCCheckPhotos"
      screen={KYCCheckPhotos}
      state={initialState}
    />
  );
};

export default {
  singlePhoto,
  multiplePhotos,
};
