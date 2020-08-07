import React from "react";
import _ from "lodash";

import LoanPaymentCoin from "./LoanPaymentCoin";
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

const navigationProps = {
  id: initialState.loans.allLoans[0].id,
};

const regular = () => {
  const state = _.cloneDeep(initialState);

  return (
    <ScreenStoryWrapper
      screenName="LoanPaymentCoin"
      screen={LoanPaymentCoin}
      state={state}
      navigationProps={navigationProps}
    />
  );
};

export default {
  regular,
};
