import React from "react";
import _ from "lodash";

import LoanTermsOfUse from "./LoanTermsOfUse";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockLoansStore from "../../../../celsius-app-creds/mock-data/mockLoansStore";
import mockGeneralDataStore from "../../../../celsius-app-creds/mock-data/mockGeneralDataStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  generalData: {
    pdf: mockGeneralDataStore.pdf,
    loanTermsOfUse: mockGeneralDataStore.loanTermsOfUse,
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
      screenName="LoanTermsOfUse"
      screen={LoanTermsOfUse}
      state={state}
    />
  );
};

export default {
  regular,
};
