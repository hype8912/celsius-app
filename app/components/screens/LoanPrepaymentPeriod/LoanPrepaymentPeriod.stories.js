import React from "react";
import _ from "lodash";

import LoanPrepaymentPeriod from "./LoanPrepaymentPeriod";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockLoansStore from "../../../../celsius-app-creds/mock-data/mockLoansStore";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  loans: {
    allLoans: mockLoansStore.allLoans.enimalnowlt3,
  },
  currencies: {
    currencyRates: mockCurrenciesStore,
  },
  forms: {
    formData: {
      coin: "ETH",
    },
  },
};

const navigationProps = {
  id: initialState.loans.allLoans[0].id,
};

const regular = () => {
  const state = _.cloneDeep(initialState);

  return (
    <ScreenStoryWrapper
      screenName="LoanPrepaymentPeriod"
      screen={LoanPrepaymentPeriod}
      state={state}
      navigationProps={navigationProps}
    />
  );
};

export default {
  regular,
};
