import React from "react";
import _ from "lodash";

import LoanPaymentHistory from "./LoanPaymentHistory";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockLoansStore from "../../../../celsius-app-creds/mock-data/mockLoansStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  loans: {
    allLoans: mockLoansStore.allLoans.postman13,
  },
};

const navigationProps = {
  id: initialState.loans.allLoans[9].id,
};

const regular = () => {
  const state = _.cloneDeep(initialState);

  return (
    <ScreenStoryWrapper
      screenName="LoanPaymentHistory"
      screen={LoanPaymentHistory}
      state={state}
      navigationProps={navigationProps}
    />
  );
};

export default {
  regular,
};
