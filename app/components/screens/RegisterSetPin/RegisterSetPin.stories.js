import React from "react";

import RegisterSetPin from "./RegisterSetPin";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";

const initialState = {
  forms: {
    formData: {},
  },
};

const createPin = () => {
  return (
    <ScreenStoryWrapper
      screen={RegisterSetPin}
      screenName="RegisterSetPin"
      state={initialState}
    />
  );
};

const confirmPin = () => {
  const state = {
    ...initialState,
    forms: {
      formData: {
        pin: "1234",
      },
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
