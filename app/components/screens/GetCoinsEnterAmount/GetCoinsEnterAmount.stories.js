import React from "react";
import _ from "lodash";

import GetCoinsEnterAmount from "./GetCoinsEnterAmount";
import ScreenStoryWrapper from "../../../../storybook/stories/ScreenStoryWrapper/ScreenStoryWrapper";
import mockUserStore from "../../../../celsius-app-creds/mock-data/mockUserStore";
import mockComplianceStore from "../../../../celsius-app-creds/mock-data/mockComplianceStore";
import mockCurrenciesStore from "../../../../celsius-app-creds/mock-data/mockCurrenciesStore";
import mockWalletStore from "../../../../celsius-app-creds/mock-data/mockWalletStore";
import walletUtil from "../../../utils/wallet-util/wallet-util";
import mockGeneralDataStore from "../../../../celsius-app-creds/mock-data/mockGeneralDataStore";

const initialState = {
  forms: { formData: { coin: "BTC" } },
  wallet: {
    summary: _.cloneDeep(
      walletUtil.mapWalletSummary(mockWalletStore.summary.postman13)
    ),
    addresses: mockWalletStore.addresses,
    withdrawalAddresses: mockWalletStore.withdrawalAddresses.postman13,
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
  generalData: mockGeneralDataStore,
};

const regular = () => {
  const state = _.cloneDeep(initialState);
  state.forms.formData = {
    cryptoCoin: "CEL",
    fiatCoin: "JPY",
    amountCrypto: 1710.123,
    amountFiat: 163054.32,
  };
  return (
    <ScreenStoryWrapper
      screenName="GetCoinsEnterAmount"
      screen={GetCoinsEnterAmount}
      state={state}
    />
  );
};

const withoutAmount = () => {
  const state = _.cloneDeep(initialState);
  state.forms.formData = {
    cryptoCoin: "XRP",
    fiatCoin: "USD",
    amountCrypto: 0,
    amountFiat: 0,
  };

  return (
    <ScreenStoryWrapper
      screenName="GetCoinsEnterAmount"
      screen={GetCoinsEnterAmount}
      state={state}
    />
  );
};

const notInRange = () => {
  const state = _.cloneDeep(initialState);
  state.forms.formData = {
    cryptoCoin: "CEL",
    fiatCoin: "JPY",
    amountCrypto: 170.123,
    amountFiat: 1654.32,
  };

  return (
    <ScreenStoryWrapper
      screenName="GetCoinsEnterAmount"
      screen={GetCoinsEnterAmount}
      state={state}
    />
  );
};

const inFiat = () => {
  const state = _.cloneDeep(initialState);
  state.forms.formData = {
    cryptoCoin: "CEL",
    fiatCoin: "JPY",
    amountCrypto: 1170.123,
    amountFiat: 12654.32,
    isFiat: true,
  };

  return (
    <ScreenStoryWrapper
      screenName="GetCoinsEnterAmount"
      screen={GetCoinsEnterAmount}
      state={state}
    />
  );
};

export default {
  regular,
  withoutAmount,
  notInRange,
  inFiat,
};
