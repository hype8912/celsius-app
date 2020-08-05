import React from "react";
import _ from "lodash";

import ApiAuthorizationPermissions from "./ApiAuthorizationPermissions";
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
  forms: {
    formData: {
      readWithdrawals: true,
      readDeposits: true,
    },
  },
};

const regular = () => {
  const state = _.cloneDeep(initialState);
  // state.appSettings.postman13.
  return (
    <ScreenStoryWrapper
      screenName="ApiAuthorizationPermissions"
      screen={ApiAuthorizationPermissions}
      state={state}
    />
  );
};

export default {
  regular,
};
