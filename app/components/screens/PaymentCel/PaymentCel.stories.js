import React from "react";
import _ from "lodash";

import PaymentCel from "./PaymentCel";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
import { THEMES } from "../../../constants/UI";
import mockLoyaltyStore from "../../../../celsius-app-creds/mock-data/mockLoyaltyStore";
import mockLoansStore from "../../../../celsius-app-creds/mock-data/mockLoansStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.testcelsiusapp,
    appSettings: {
      ...mockUserStore.appSettings.testcelsiusapp,
      theme: THEMES.UNICORN,
    },
  },
  loans: {
    allLoans: mockLoansStore.allLoans.postman13,
  },
  loyalty: mockLoyaltyStore.loyalty.platinum,
  forms: {
    formData: {},
    formErrors: {},
  },
  compliance: mockComplianceStore.allowedAll,
};

const state = _.cloneDeep(initialState);
const navigationProps = {
  id: 1018,
};
const regular = () => {
  return (
    <ScreenStoryWrapper
      screenName="PaymentCel"
      screen={PaymentCel}
      state={state}
      navigationProps={navigationProps}
    />
  );
};

export default {
  regular,
};
