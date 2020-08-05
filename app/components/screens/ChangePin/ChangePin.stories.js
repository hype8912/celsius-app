import React from "react";

import ChangePin from "./ChangePin";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.testcelsiusapp,
    appSettings: mockUserStore.appSettings.postman13,
  },
  forms: {
    formData: {
      loading: false,
    },
  },
};

const regular = () => {
  return (
    <ScreenStoryWrapper
      screenName="ChangePin"
      screen={ChangePin}
      state={initialState}
    />
  );
};

export default {
  regular,
};
