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

const initialState = {
  forms: { formData: { coin: "ETH" } },
  wallet: {
    summary: mockWalletStore.summary.postman13,
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
  state.forms = { formData: { selectedCoin: coinShort } };
  return (
    <ScreenStoryWrapper screen={Deposit} screenName="Deposit" state={state} />
  );
};

const btc = () => depositCoin("BTC");
const bch = () => depositCoin("BCH");
const eth = () => depositCoin("ETH");
const cel = () => depositCoin("CEL");
const omg = () => depositCoin("OMG");
const xrp = () => depositCoin("XRP");
const xlm = () => depositCoin("XLM");
const eos = () => depositCoin("EOS");

export default {
  eth,
  xrp,
  btc,
  bch,
  cel,
  omg,
  xlm,
  eos,
};
