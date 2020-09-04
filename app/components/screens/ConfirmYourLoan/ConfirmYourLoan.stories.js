import React from "react";
import _ from "lodash";

import ConfirmYourLoan from "./ConfirmYourLoan";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockLoansStore from "../../../../celsius-app-creds/mock-data/mockLoansStore";
import { LOAN_TYPES } from "../../../constants/DATA";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  loans: {
    allLoans: [],
    loan: {},
  },
  forms: {
    formData: {},
  },
};

const stableCoin = () => {
  const state = _.cloneDeep(initialState);
  state.loans.loan = mockLoansStore.loan.stableCoin;
  state.forms.formData.loanType = LOAN_TYPES.STABLE_COIN_LOAN;

  return (
    <ScreenStoryWrapper
      screenName="ConfirmYourLoan"
      screen={ConfirmYourLoan}
      state={state}
    />
  );
};

const usdUS = () => {
  const state = _.cloneDeep(initialState);
  state.loans.loan = mockLoansStore.loan.USDUSBank;
  state.forms.formData.loanType = LOAN_TYPES.USD_LOAN;

  return (
    <ScreenStoryWrapper
      screenName="ConfirmYourLoan"
      screen={ConfirmYourLoan}
      state={state}
    />
  );
};

const usdNonUS = () => {
  const state = _.cloneDeep(initialState);
  state.loans.loan = mockLoansStore.loan.USDnonUSBank;
  state.forms.formData.loanType = LOAN_TYPES.USD_LOAN;

  return (
    <ScreenStoryWrapper
      screenName="ConfirmYourLoan"
      screen={ConfirmYourLoan}
      state={state}
    />
  );
};

export default {
  stableCoin,
  usdUS,
  usdNonUS,
};
