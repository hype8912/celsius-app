import React from "react";
import _ from "lodash";

import LoanRequestDetails from "./LoanRequestDetails";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockLoansStore from "../../../../celsius-app-creds/mock-data/mockLoansStore";
import { LOAN_STATUS } from "../../../constants/DATA";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  loans: {
    allLoans: mockLoansStore.allLoans.postman13,
  },
};

const getStoryForStatus = status => {
  const state = _.cloneDeep(initialState);
  state.loans.activeLoan = state.loans.allLoans.find(l => l.status === status);

  return (
    <ScreenStoryWrapper
      screenName="LoanRequestDetails"
      screen={LoanRequestDetails}
      state={state}
    />
  );
};

export default {
  pending: () => getStoryForStatus(LOAN_STATUS.PENDING),
  approved: () => getStoryForStatus(LOAN_STATUS.APPROVED),
  active: () => getStoryForStatus(LOAN_STATUS.ACTIVE),
  completed: () => getStoryForStatus(LOAN_STATUS.COMPLETED),
  canceled: () => getStoryForStatus(LOAN_STATUS.CANCELED),
  rejected: () => getStoryForStatus(LOAN_STATUS.REJECTED),
  refinanced: () => getStoryForStatus(LOAN_STATUS.REFINANCED),
};
