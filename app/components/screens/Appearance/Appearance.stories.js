import React from "react";
import _ from "lodash";

import Appearance from "./Appearance";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
};

const regular = () => {
  const state = _.cloneDeep(initialState);

  return (
    <ScreenStoryWrapper
      screenName="Appearance"
      screen={Appearance}
      state={state}
    />
  );
};

export default {
  regular,
};
