import React from "react";
import _ from "lodash";

import BorrowBankAccount from "./BorrowBankAccount";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
import { THEMES } from "../../../constants/UI";

const initialState = {
  user: {
    profile: mockUserStore.profile.testcelsiusapp,
    appSettings: {
      ...mockUserStore.appSettings.testcelsiusapp,
      theme: THEMES.UNICORN,
    },
  },
  forms: {
    formData: {},
    formErrors: {},
  },
  compliance: mockComplianceStore.allowedAll,
};

const state = _.cloneDeep(initialState);

const regular = () => {
  return (
    <ScreenStoryWrapper
      screenName="BorrowBankAccount"
      screen={BorrowBankAccount}
      state={state}
    />
  );
};

export default {
  regular,
};
