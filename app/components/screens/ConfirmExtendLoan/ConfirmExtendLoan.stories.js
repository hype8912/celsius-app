import React from "react";
import _ from "lodash";

import ConfirmExtendLoan from "./ConfirmExtendLoan";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
// import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";

const initialState = {
  user: {
    // profile: mockUserStore.profile.postman13,
    // appSettings: mockUserStore.appSettings.postman13,
  },
  forms: {
    formData: {},
    }
};

const state = _.cloneDeep(initialState);

const regular = () => {

  return (
    <ScreenStoryWrapper
      screenName="ConfirmExtendLoan"
      screen={ ConfirmExtendLoan }
      state={ state }
    />
  );
};

export default {
  regular,
};
