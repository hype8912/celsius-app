import React from "react";
import _ from "lodash";

import WalletLanding from "./WalletLanding";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
import mockWalletStore from "../../../../celsius-app-creds/mock-data/mockWalletStore";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockLoyaltyStore from "../../../../celsius-app-creds/mock-data/mockLoyaltyStore";
import mockGeneralDataStore from "../../../../celsius-app-creds/mock-data/mockGeneralDataStore";
import walletUtil from "../../../utils/wallet-util/wallet-util";
import mockUIStore from "../../../../celsius-app-creds/mock-data/mockUIStore";
import { KYC_STATUSES } from "../../../constants/DATA";

const initialState = {
  wallet: {
    summary: walletUtil.mapWalletSummary(mockWalletStore.summary.postman13),
  },
  currencies: {
    rates: mockCurrenciesStore.rates,
    graphs: mockCurrenciesStore.graphs,
    currencyRatesShort: mockCurrenciesStore.currencyRatesShort,
  },
  compliance: mockComplianceStore.allowedAll,
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  ui: mockUIStore.noBannerNoAnimations,
  loyalty: mockLoyaltyStore.loyalty.postman13,
  generalData: mockGeneralDataStore,
};

const grid = () => {
  const state = _.cloneDeep(initialState);
  return (
    <ScreenStoryWrapper
      screenName="WalletLanding"
      screen={WalletLanding}
      state={state}
    />
  );
};

const list = () => {
  const state = _.cloneDeep(initialState);
  state.user.appSettings.default_wallet_view = "list";

  return (
    <ScreenStoryWrapper
      screenName="WalletLanding"
      screen={WalletLanding}
      state={state}
    />
  );
};

const notVerified = () => {
  const state = _.cloneDeep(initialState);
  state.user.profile.kyc.status = KYC_STATUSES.collecting;

  return (
    <ScreenStoryWrapper
      screenName="WalletLanding"
      screen={WalletLanding}
      state={state}
    />
  );
};

const pendingVerification = () => {
  const state = _.cloneDeep(initialState);
  state.user.profile.kyc.status = KYC_STATUSES.pending;

  return (
    <ScreenStoryWrapper
      screenName="WalletLanding"
      screen={WalletLanding}
      state={state}
    />
  );
};

const rejeceted = () => {
  const state = _.cloneDeep(initialState);
  state.user.profile.kyc.status = KYC_STATUSES.rejected;

  return (
    <ScreenStoryWrapper
      screenName="WalletLanding"
      screen={WalletLanding}
      state={state}
    />
  );
};

const loanReferralBanner = () => {
  const state = _.cloneDeep(initialState);
  state.ui.isBannerVisible = true;

  return (
    <ScreenStoryWrapper
      screenName="WalletLanding"
      screen={WalletLanding}
      state={state}
    />
  );
};

const noSSN = () => {
  const state = _.cloneDeep(initialState);
  state.user.profile.ssn = null;
  state.user.profile.country = "United States";

  return (
    <ScreenStoryWrapper
      screenName="WalletLanding"
      screen={WalletLanding}
      state={state}
    />
  );
};

const noAddress = () => {
  const state = _.cloneDeep(initialState);
  state.user.profile.country = null;

  return (
    <ScreenStoryWrapper
      screenName="WalletLanding"
      screen={WalletLanding}
      state={state}
    />
  );
};

export default {
  grid,
  list,
  notVerified,
  pendingVerification,
  rejeceted,
  loanReferralBanner,
  noSSN,
  noAddress,
};
