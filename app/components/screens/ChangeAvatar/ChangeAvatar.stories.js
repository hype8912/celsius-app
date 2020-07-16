import React from "react";

import ChangeAvatar from "./ChangeAvatar";
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
      screenName="ChangeAvatar"
      screen={ChangeAvatar}
      state={initialState}
    />
  );
};

export default {
  regular,
};
