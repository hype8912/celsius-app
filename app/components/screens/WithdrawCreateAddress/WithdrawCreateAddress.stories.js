import React from "react";
import _ from "lodash";

import WithdrawCreateAddress from "./WithdrawCreateAddress";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockWalletStore from "../../../../celsius-app-creds/mock-data/mockWalletStore";
import { THEMES } from "../../../constants/UI";

const initialState = {
  user: {
    profile: mockUserStore.profile.testcelsiusapp,
    appSettings: {
      ...mockUserStore.appSettings.testcelsiusapp,
      theme: THEMES.UNICORN,
    },
    email: mockUserStore.profile.postman13.email,
  },
  wallet: {
    summary: mockWalletStore.summary.postman13,
  },
  forms: {
    formData: {
      coin: "USDC",
      amountUsd: 1000,
      amountCrypto: 1000,
    },
  },
};

const state = _.cloneDeep(initialState);

const regular = () => {
  state.forms.formData.coin = "ETH";
  return (
    <ScreenStoryWrapper
      screenName="WithdrawCreateAddress"
      screen={WithdrawCreateAddress}
      state={state}
    />
  );
};

const xrp = () => {
  state.forms.formData.coin = "XRP";
  return (
    <ScreenStoryWrapper
      screenName="WithdrawCreateAddress"
      screen={WithdrawCreateAddress}
      state={state}
    />
  );
};

const xlm = () => {
  state.forms.formData.coin = "XLM";
  return (
    <ScreenStoryWrapper
      screenName="WithdrawCreateAddress"
      screen={WithdrawCreateAddress}
      state={state}
    />
  );
};
const eos = () => {
  state.forms.formData.coin = "EOS";
  return (
    <ScreenStoryWrapper
      screenName="WithdrawCreateAddress"
      screen={WithdrawCreateAddress}
      state={state}
    />
  );
};

export default {
  regular,
  xrp,
  xlm,
  eos,
};
