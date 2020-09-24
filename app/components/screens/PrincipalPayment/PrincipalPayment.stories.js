import React from "react";
import _ from "lodash";

import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockLoansStore from "../../../../celsius-app-creds/mock-data/mockLoansStore";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import PrincipalPayment from "./PrincipalPayment";

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
  forms: {},
};

const regular = () => {
  const state = _.cloneDeep(initialState);

  return (
    <ScreenStoryWrapper
      screenName="PrincipalPayment"
      screen={PrincipalPayment}
      state={state}
    />
  );
};

export default {
  regular,
};
