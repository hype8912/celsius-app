import React from "react";
import _ from "lodash";

import RegisterSetPin from "./RegisterSetPin";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";

const initialState = {
  forms: {
    formData: {},
  },
};

const createPin = () => {
  const state = _.cloneDeep(initialState);
  return (
    <ScreenStoryWrapper
      screen={RegisterSetPin}
      screenName="RegisterSetPin"
      state={state}
    />
  );
};

const confirmPin = () => {
  const state = _.cloneDeep(initialState);
  state.forms = {
    formData: {
      pin: "1234",
    },
  };

  return (
    <ScreenStoryWrapper
      screen={RegisterSetPin}
      screenName="RegisterSetPin"
      state={state}
    />
  );
};

export default {
  createPin,
  confirmPin,
};
