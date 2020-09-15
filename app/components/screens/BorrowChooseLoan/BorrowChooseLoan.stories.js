import React from "react";
import _ from "lodash";

import BorrowChooseLoan from "./BorrowChooseLoan";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
import { THEMES } from "../../../constants/UI";

const initialState = {
  user: {
    profile: mockUserStore.profile.testcelsiusapp,
    appSettings: {
      ...mockUserStore.appSettings.testcelsiusapp,
      theme: THEMES.UNICORN,
    },
  },
  forms: {
    formData: {},
    formErrors: {},
  },
  compliance: mockComplianceStore.allowedAll,
};

const state = _.cloneDeep(initialState);

const stableAndUsd = () => {
  return (
    <ScreenStoryWrapper
      screenName="BorrowChooseLoan"
      screen={BorrowChooseLoan}
      state={initialState}
    />
  );
};

const stable = () => {
  state.compliance.loan = {
    loan_coins: ["GUSD", "MCDAI", "PAX", "TUSD", "USDC", "USDT ERC20"],
  };
  return (
    <ScreenStoryWrapper
      screenName="BorrowChooseLoan"
      screen={BorrowChooseLoan}
      state={state}
    />
  );
};

const usd = () => {
  state.compliance.loan = { loan_coins: ["USD"] };

  return (
    <ScreenStoryWrapper
      screenName="BorrowChooseLoan"
      screen={BorrowChooseLoan}
      state={state}
    />
  );
};

export default {
  stable,
  usd,
  stableAndUsd,
};
