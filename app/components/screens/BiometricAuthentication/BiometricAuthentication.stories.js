import React from "react";
import _ from "lodash";

import BiometricAuthentication from "./BiometricAuthentication";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockGeneralDataStore from "../../../../celsius-app-creds/mock-data/mockGeneralDataStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  generalData: {
    backendStatus: mockGeneralDataStore,
  },
  forms: {
    formData: {},
    formErrors: {},
  },
};

const touchId = () => {
  const state = _.cloneDeep(initialState);
  state.generalData = {
    backendStatus: {
      title: "Title",
      explanation: "Explanation",
    },
  };
  state.biometrics = {
    biometrics: {
      available: true,
      biometryType: "TouchID",
    },
  };
  return (
    <ScreenStoryWrapper
      screenName="BiometricAuthentication"
      screen={BiometricAuthentication}
      state={state}
    />
  );
};

const faceId = () => {
  const state = _.cloneDeep(initialState);
  state.generalData = {
    backendStatus: {
      title: "Title",
      explanation: "Explanation",
    },
  };
  state.biometrics = {
    biometrics: {
      available: true,
      biometryType: "FaceID",
    },
  };
  return (
    <ScreenStoryWrapper
      screenName="BiometricAuthentication"
      screen={BiometricAuthentication}
      state={state}
    />
  );
};

export default {
  touchId,
  faceId,
};
