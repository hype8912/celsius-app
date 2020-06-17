import React from "react";

import RegisterInitial from "./RegisterInitial";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";

const initialState = {
  forms: {
    formData: {},
    formErrors: {},
  },
};

const empty = () => {
  return (
    <ScreenStoryWrapper
      screen={RegisterInitial}
      screenName="RegisterInitial"
      state={initialState}
    />
  );
};

const filled = () => {
  const state = {
    ...initialState,
    forms: {
      ...initialState.forms,
      formData: {
        firstName: "Dzej",
        lastName: "Ramadanovski",
        email: "dzej@crypto.dzej",
        password: "99Zena",
        termsOfUse: true,
      },
    },
  };

  return (
    <ScreenStoryWrapper
      screen={RegisterInitial}
      screenName="RegisterInitial"
      state={state}
    />
  );
};

const withErrors = () => {
  const state = {
    ...initialState,
    forms: {
      ...initialState.forms,
      formErrors: {
        firstName: "First name is Required!",
        lastName: "Last name is Required!",
        email: "Please enter a valid email!",
        password: "This is a very very long error with some explanations.",
      },
    },
  };

  return (
    <ScreenStoryWrapper
      screen={RegisterInitial}
      screenName="RegisterInitial"
      state={state}
    />
  );
};

const withReferral = () => {
  const state = {
    ...initialState,
    branch: { registeredLink: "YOMAMA" },
  };

  return (
    <ScreenStoryWrapper
      screen={RegisterInitial}
      screenName="RegisterInitial"
      state={state}
    />
  );
};

export default {
  empty,
  filled,
  withErrors,
  withReferral,
};
