import React from "react";
import _ from "lodash";

import Deposit from "./Deposit";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockWalletStore from "../../../../celsius-app-creds/mock-data/mockWalletStore";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockLoyaltyStore from "../../../../celsius-app-creds/mock-data/mockLoyaltyStore";
import mockGeneralDataStore from "../../../../celsius-app-creds/mock-data/mockGeneralDataStore";
import addressUtil from "../../../utils/address-util";
import walletUtil from "../../../utils/wallet-util/wallet-util";
import { KYC_STATUSES } from "../../../constants/DATA";

const initialState = {
  forms: { formData: { coin: "ETH" } },
  wallet: {
    summary: walletUtil.mapWalletSummary(mockWalletStore.summary.postman13),
    addresses: mockWalletStore.addresses,
  },
  currencies: {
    rates: mockCurrenciesStore.rates,
    currencyRatesShort: mockCurrenciesStore.currencyRatesShort,
  },
  compliance: mockComplianceStore.allowedAll,
  user: {
    profile: mockUserStore.profile.postman13,
    appSettings: mockUserStore.appSettings.postman13,
  },
  loyalty: mockLoyaltyStore.loyalty.postman13,
  generalData: mockGeneralDataStore,
};

const depositCoin = coinShort => {
  const state = _.cloneDeep(initialState);
  const { addresses } = state.wallet;
  const coinAddress = addresses[`${coinShort}Address`];
  state.forms = {
    formData: {
      selectedCoin: coinShort,
      displayAddress:
        coinAddress && addressUtil.splitAddressTag(coinAddress).base,
    },
  };

  return (
    <ScreenStoryWrapper screen={Deposit} screenName="Deposit" state={state} />
  );
};

const loadingAddress = () => {
  const state = _.cloneDeep(initialState);
  state.forms = {
    formData: {
      selectedCoin: "SGA",
    },
  };

  return (
    <ScreenStoryWrapper screen={Deposit} screenName="Deposit" state={state} />
  );
};

const notVerified = () => {
  const state = _.cloneDeep(initialState);
  state.user.profile.kyc.status = KYC_STATUSES.collecting;

  return (
    <ScreenStoryWrapper screen={Deposit} screenName="Deposit" state={state} />
  );
};

const pendingVerification = () => {
  const state = _.cloneDeep(initialState);
  state.user.profile.kyc.status = KYC_STATUSES.pending;

  return (
    <ScreenStoryWrapper screen={Deposit} screenName="Deposit" state={state} />
  );
};

const notCompliant = () => {
  const state = _.cloneDeep(initialState);
  state.compliance.deposit.allowed = false;

  return (
    <ScreenStoryWrapper screen={Deposit} screenName="Deposit" state={state} />
  );
};

const eth = () => depositCoin("ETH");
const bch = () => depositCoin("BCH");
const cel = () => depositCoin("CEL");
const xrp = () => depositCoin("XRP");
const xlm = () => depositCoin("XLM");

export default {
  loadingAddress,
  notVerified,
  pendingVerification,
  notCompliant,
  eth,
  bch,
  cel,
  xrp,
  xlm,
  // btc,
  // omg,
  // eos,
};
