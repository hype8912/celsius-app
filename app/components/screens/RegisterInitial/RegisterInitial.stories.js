import React from "react";
import _ from "lodash";

import RegisterInitial from "./RegisterInitial";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";

const initialState = {
  forms: {
    formData: {},
    formErrors: {},
  },
};

const empty = () => {
  const state = _.cloneDeep(initialState);

  return (
    <ScreenStoryWrapper
      screen={RegisterInitial}
      screenName="RegisterInitial"
      state={state}
    />
  );
};

const filled = () => {
  const state = _.cloneDeep(initialState);
  state.forms.formData = {
    firstName: "Dzej",
    lastName: "Ramadanovski",
    email: "dzej@crypto.dzej",
    password: "99Zena",
    termsOfUse: true,
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
  const state = _.cloneDeep(initialState);
  state.forms.formErrors = {
    firstName: "First name is Required!",
    lastName: "Last name is Required!",
    email: "Please enter a valid email!",
    password: "This is a very very long error with some explanations.",
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
  const state = _.cloneDeep(initialState);
  state.branch = { registeredLink: "YOMAMA" };

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
