import React from "react";
import _ from "lodash";

import LoanSettings from "./LoanSettings";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockLoansStore from "../../../../celsius-app-creds/mock-data/mockLoansStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  loans: {
    allLoans: mockLoansStore.allLoans.enimalnowlt3,
    loanSettings: mockLoansStore.loanSettings.interestInCEL,
  },
};

const regular = () => {
  const state = _.cloneDeep(initialState);

  return (
    <ScreenStoryWrapper
      screenName="LoanSettings"
      screen={LoanSettings}
      state={state}
    />
  );
};

export default {
  regular,
};
