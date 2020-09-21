import React from "react";

import cryptoUtil from "../../../utils/crypto-util/crypto-util";
import { SCREENS } from "../../../constants/SCREENS";
import CelButton from "../CelButton/CelButton";

const LinkToBuy = ({ coin, navigateTo }) => {
  if (!coin) return null;

  if (cryptoUtil.buyInApp(coin)) {
    return (
      <CelButton
        margin="20 0 20 0"
        basic
        onPress={() => navigateTo(SCREENS.GET_COINS_LANDING)}
      >
        {cryptoUtil.provideText(coin)}
      </CelButton>
    );
  }

  return null;
};

export default LinkToBuy;
