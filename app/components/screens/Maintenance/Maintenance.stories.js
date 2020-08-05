import React from "react";
import _ from "lodash";

import Maintenance from "./Maintenance";
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
};

const regular = () => {
  const state = _.cloneDeep(initialState);
  state.generalData = {
    backendStatus: {
      title: "Title",
      explanation: "Explanation",
    },
  };
  return (
    <ScreenStoryWrapper
      screenName="Maintenance"
      screen={Maintenance}
      state={state}
    />
  );
};

export default {
  regular,
};
