import React from "react";
import _ from "lodash";

import CameraScreen from "./CameraScreen";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockCameraStore from "../../../../celsius-app-creds/mock-data/mockCameraStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
};

const profile = () => {
  const state = _.cloneDeep(initialState);
  state.camera = mockCameraStore.profile;

  return (
    <ScreenStoryWrapper
      screenName="CameraScreen"
      screen={CameraScreen}
      state={state}
      screenTap
    />
  );
};

const utility = () => {
  const state = _.cloneDeep(initialState);
  state.camera = mockCameraStore.utilityBill;

  return (
    <ScreenStoryWrapper
      screenName="CameraScreen"
      screen={CameraScreen}
      state={state}
      screenTap
    />
  );
};

export default {
  profile,
  utility,
};
