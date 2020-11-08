import React from "react";
import _ from "lodash";

import { ExtendLoanScreen } from "./ExtendLoanScreen";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockLoansStore from "../../../../celsius-app-creds/mock-data/mockLoansStore";

const initialState = {
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
    bankAccountInfo: mockUserStore.bankAccountInfo.postman13
  },
  currencies: {
    rates: mockCurrenciesStore.rates,
    currencyRatesShort: mockCurrenciesStore.currencyRatesShort,
  },
  loans: {
    allLoans: mockLoansStore.allLoans.enimalnowlt3,
  },
  forms: {
    formData: {
      collateralCoin: "BTC",
      ltv: "0.33",
      interest:  "0.0395",
      loanAmount:"1500",
      termOfLoan: 6,
      bankInfo: "7bcd5ccb-0f01-4676-9fec-286b1637288a",
      coin: "USDC",
      loanType:"STABLE_COIN_LOAN" ,
      loanId: 1096
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
      screenName="ExtendLoanScreen"
      screen={ ExtendLoanScreen }
      state={ state }
      navigationProps={navigationProps}
    />
  );
};

export default {
  regular,
};
