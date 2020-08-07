import React from "react";
import _ from "lodash";

import InterestPaymentSettings from "./InterestPaymentSettings";
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
  },
};

const manualInterest = () => {
  const state = _.cloneDeep(initialState);
  state.loans.loanSettings = mockLoansStore.loanSettings.manualInterest;

  return (
    <ScreenStoryWrapper
      screenName="InterestPaymentSettings"
      screen={InterestPaymentSettings}
      state={state}
    />
  );
};

const automaticInterest = () => {
  const state = _.cloneDeep(initialState);
  state.loans.loanSettings = mockLoansStore.loanSettings.interestInCEL;

  return (
    <ScreenStoryWrapper
      screenName="InterestPaymentSettings"
      screen={InterestPaymentSettings}
      state={state}
    />
  );
};

export default {
  manualInterest,
  automaticInterest,
};
