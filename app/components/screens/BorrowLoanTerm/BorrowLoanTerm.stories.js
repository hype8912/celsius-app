import React from "react";
import _ from "lodash";

import BorrowLoanTerm from "./BorrowLoanTerm";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
import { THEMES } from "../../../constants/UI";
import { LOAN_TYPES } from "../../../constants/DATA";

const initialState = {
  user: {
    profile: mockUserStore.profile.testcelsiusapp,
    appSettings: {
      ...mockUserStore.appSettings.testcelsiusapp,
      theme: THEMES.UNICORN,
    },
  },
  forms: {
    formData: {
      loanAmount: 2000,
      monthlyPayment: 12,
      termOfLoan: 18,
    },
    formErrors: {},
  },
  compliance: mockComplianceStore.allowedAll,
};

const stable = () => {
  const state = _.cloneDeep(initialState);
  state.forms.formData.loanType = LOAN_TYPES.STABLE_COIN_LOAN;

  return (
    <ScreenStoryWrapper
      screenName="BorrowLoanTerm"
      screen={BorrowLoanTerm}
      state={state}
    />
  );
};

const usd = () => {
  const state = _.cloneDeep(initialState);
  state.forms.formData.loanType = LOAN_TYPES.USD_LOAN;

  return (
    <ScreenStoryWrapper
      screenName="BorrowLoanTerm"
      screen={BorrowLoanTerm}
      state={state}
    />
  );
};

export default {
  stable,
  usd,
};
