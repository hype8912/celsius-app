import React from "react";
import _ from "lodash";

import ChoosePaymentMethod from "./ChoosePaymentMethod";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockLoyaltyStore from "../../../../celsius-app-creds/mock-data/mockLoyaltyStore";
import { LOAN_PAYMENT_REASONS } from "../../../constants/UI";
import mockLoansStore from "../../../../celsius-app-creds/mock-data/mockLoansStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  loans: {
    loanSettings: mockLoansStore.loanSettings.interestInCEL,
  },
  loyalty: mockLoyaltyStore.loyalty.gold,
};

const prepayment = () => {
  const state = _.cloneDeep(initialState);

  const navigationProps = {
    reason: LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT,
  };

  return (
    <ScreenStoryWrapper
      screenName="ChoosePaymentMethod"
      screen={ChoosePaymentMethod}
      state={state}
      navigationProps={navigationProps}
    />
  );
};

const interestCEL = () => {
  const state = _.cloneDeep(initialState);

  const navigationProps = {
    reason: LOAN_PAYMENT_REASONS.INTEREST,
  };

  return (
    <ScreenStoryWrapper
      screenName="ChoosePaymentMethod"
      screen={ChoosePaymentMethod}
      state={state}
      navigationProps={navigationProps}
    />
  );
};

const interestUSD = () => {
  const state = _.cloneDeep(initialState);
  state.loans.loanSettings.interest_payment_asset = "USD";

  const navigationProps = {
    reason: LOAN_PAYMENT_REASONS.INTEREST,
  };

  return (
    <ScreenStoryWrapper
      screenName="ChoosePaymentMethod"
      screen={ChoosePaymentMethod}
      state={state}
      navigationProps={navigationProps}
    />
  );
};

const interestCrytpo = () => {
  const state = _.cloneDeep(initialState);
  state.loans.loanSettings.interest_payment_asset = "BTC";

  const navigationProps = {
    reason: LOAN_PAYMENT_REASONS.INTEREST,
  };

  return (
    <ScreenStoryWrapper
      screenName="ChoosePaymentMethod"
      screen={ChoosePaymentMethod}
      state={state}
      navigationProps={navigationProps}
    />
  );
};

export default {
  prepayment,
  interestCEL,
  interestUSD,
  interestCrytpo,
};
