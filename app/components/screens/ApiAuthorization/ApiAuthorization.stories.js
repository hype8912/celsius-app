import React from "react";
import _ from "lodash";

import ApiAuthorization from "./ApiAuthorization";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockApiKeysStore from "../../../../celsius-app-creds/mock-data/mockApiKeysStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  apiKeys: {
    keys: mockApiKeysStore.keys.postman13,
  },
};

const regular = () => {
  const state = _.cloneDeep(initialState);

  return (
    <ScreenStoryWrapper
      screenName="ApiAuthorization"
      screen={ApiAuthorization}
      state={state}
    />
  );
};

export default {
  regular,
};
