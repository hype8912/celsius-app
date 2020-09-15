import React from "react";
import _ from "lodash";

import Community from "./Community";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockCommunityStore from "../../../../celsius-app-creds/mock-data/mockCommunityStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  community: mockCommunityStore,
};

const regular = () => {
  const state = _.cloneDeep(initialState);

  return (
    <ScreenStoryWrapper
      screenName="Community"
      screen={Community}
      state={state}
    />
  );
};

export default {
  regular,
};
