import React from "react";

import WithdrawEnterAmount from "./WithdrawEnterAmount";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockWalletStore from "../../../../celsius-app-creds/mock-data/mockWalletStore";
import walletUtil from "../../../utils/wallet-util";
import { KYC_STATUSES } from "../../../constants/DATA";
import mockHodlStore from "../../../../celsius-app-creds/mock-data/mockHodlStore";

const initialState = {
  forms: { formData: { coin: "BTC" } },
  wallet: {
    summary: walletUtil.mapWalletSummary(mockWalletStore.summary.postman13),
    addresses: mockWalletStore.addresses,
    withdrawalAddresses: mockWalletStore.withdrawalAddresses.postman13,
  },
  user: {
    profile: mockUserStore.profile.postman13,
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
  const state = { ...initialState };
  state.forms.formData = {
    coin: "BTC",
    amountCrypto: 0.1,
    amountUsd: 1000,
  };
  return (
    <ScreenStoryWrapper
      screenName="WithdrawEnterAmount"
      screen={WithdrawEnterAmount}
      state={initialState}
    />
  );
};

const withoutAmount = () => {
  return (
    <ScreenStoryWrapper
      screenName="WithdrawEnterAmount"
      screen={WithdrawEnterAmount}
      state={initialState}
    />
  );
};

const notCompliant = () => {
  const state = { ...initialState };
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
  const state = { ...initialState };
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
  const state = { ...initialState };
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
  const state = { ...initialState };
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
  const state = { ...initialState };
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
