import React from "react";
import _ from "lodash";

import WithdrawEnterAmount from "./WithdrawEnterAmount";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockWalletStore from "../../../../celsius-app-creds/mock-data/mockWalletStore";
import walletUtil from "../../../utils/wallet-util/wallet-util";
import { KYC_STATUSES } from "../../../constants/DATA";
import mockHodlStore from "../../../../celsius-app-creds/mock-data/mockHodlStore";

const initialState = {
  forms: { formData: { coin: "BTC" } },
  wallet: {
    summary: _.cloneDeep(
      walletUtil.mapWalletSummary(mockWalletStore.summary.postman13)
    ),
    addresses: mockWalletStore.addresses,
    withdrawalAddresses: mockWalletStore.withdrawalAddresses.unlocked,
  },
  user: {
    profile: _.cloneDeep(mockUserStore.profile.postman13),
    appSettings: mockUserStore.appSettings.postman13,
  },
  currencies: {
    currencyRatesShort: mockCurrenciesStore.currencyRatesShort,
    rates: mockCurrenciesStore.rates,
  },
  compliance: mockComplianceStore.allowedAll,
  ui: { isKeypadOpen: false },
};

const regular = () => {
  const state = _.cloneDeep(initialState);
  state.forms.formData = {
    coin: "BTC",
    amountCrypto: 0.1,
    amountUsd: 1000,
  };
  return (
    <ScreenStoryWrapper
      screenName="WithdrawEnterAmount"
      screen={WithdrawEnterAmount}
      state={state}
    />
  );
};

const withoutAmount = () => {
  const state = _.cloneDeep(initialState);

  return (
    <ScreenStoryWrapper
      screenName="WithdrawEnterAmount"
      screen={WithdrawEnterAmount}
      state={state}
    />
  );
};

const notCompliant = () => {
  const state = _.cloneDeep(initialState);
  state.compliance.withdraw.allowed = false;
  return (
    <ScreenStoryWrapper
      screenName="WithdrawEnterAmount"
      screen={WithdrawEnterAmount}
      state={state}
    />
  );
};

const pendingVerification = () => {
  const state = _.cloneDeep(initialState);
  state.user.profile.kyc.status = KYC_STATUSES.pending;
  return (
    <ScreenStoryWrapper
      screenName="WithdrawEnterAmount"
      screen={WithdrawEnterAmount}
      state={state}
    />
  );
};

const notVerified = () => {
  const state = _.cloneDeep(initialState);
  state.user.profile.kyc.status = KYC_STATUSES.collecting;
  return (
    <ScreenStoryWrapper
      screenName="WithdrawEnterAmount"
      screen={WithdrawEnterAmount}
      state={state}
    />
  );
};

const hodlModeActive = () => {
  const state = _.cloneDeep(initialState);
  state.hodl = mockHodlStore.active;

  return (
    <ScreenStoryWrapper
      screenName="WithdrawEnterAmount"
      screen={WithdrawEnterAmount}
      state={state}
    />
  );
};

const lockedAddress = () => {
  const state = _.cloneDeep(initialState);
  state.forms.formData = {
    coin: "CEL",
    amountCrypto: 0.1,
    amountUsd: 1000,
  };

  return (
    <ScreenStoryWrapper
      screenName="WithdrawEnterAmount"
      screen={WithdrawEnterAmount}
      state={state}
    />
  );
};

export default {
  regular,
  withoutAmount,
  notCompliant,
  pendingVerification,
  notVerified,
  hodlModeActive,
  lockedAddress,
};
