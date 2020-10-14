import React from "react";
import { Linking } from "react-native";

import cryptoUtil from "../../../utils/crypto-util/crypto-util";
import CelButton from "../CelButton/CelButton";

const LinkToBuy = ({ coin, navigateTo }) => {
  if (!coin) return null;
  if (cryptoUtil.buyInApp(coin).gem || cryptoUtil.buyInApp(coin).simplex) {
    return (
      <CelButton
        margin="20 0 20 0"
        basic
        onPress={() => {
          navigateTo(cryptoUtil.simplexOrGem(coin), {
            coinToBuy: coin,
          });
        }}
      >
        {cryptoUtil.provideText(coin)}
      </CelButton>
    );
  }
  if (cryptoUtil.provideLink(coin)) {
    return (
      <CelButton
        margin="20 0 20 0"
        basic
        onPress={() => Linking.openURL(cryptoUtil.provideLink(coin), {})}
      >
        {cryptoUtil.provideText(coin)}
      </CelButton>
    );
  }

  return null;
};

export default LinkToBuy;
