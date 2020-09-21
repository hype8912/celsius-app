import React from "react";
import _ from "lodash";

import SelectState from "./SelectState";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.testcelsiusapp,
    appSettings: mockUserStore.appSettings.testcelsiusapp,
  },
};

const regular = () => {
  return (
    <ScreenStoryWrapper
      screenName="SelectState"
      screen={SelectState}
      state={initialState}
    />
  );
};

const selected = () => {
  const state = _.cloneDeep(initialState);
  state.forms = {
    formData: { state: "California" },
  };

  return (
    <ScreenStoryWrapper
      screenName="SelectState"
      screen={SelectState}
      state={state}
    />
  );
};

export default {
  regular,
  selected,
};
