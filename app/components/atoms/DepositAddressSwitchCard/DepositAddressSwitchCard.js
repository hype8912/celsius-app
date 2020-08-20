import React from "react";

import Card from "../Card/Card";
import STYLES from "../../../constants/STYLES";
import CelButton from "../CelButton/CelButton";
import CelText from "../CelText/CelText";

const DepositAddressSwitchCard = ({
  coin,
  primaryAddress,
  alternateAddress,
  secondaryAddress,
  displayAddress,
  setAddress,
}) => {
  let explanationText;
  let buttonText;
  let addressToDisplay;

  if (coin === "LTC" && alternateAddress) {
    if (displayAddress === primaryAddress) {
      explanationText =
        "If your wallet doesn't support 3-format addresses you can use a M-format LTC address";
      buttonText = "Use M-format address";
      addressToDisplay = alternateAddress;
    }
    if (displayAddress === alternateAddress) {
      explanationText =
        "If your wallet doesn't support M-format addresses you can use a 3-format LTC address";
      buttonText = "Use 3-format address";
      addressToDisplay = primaryAddress;
    }
  }

  if (coin === "BCH" && alternateAddress) {
    if (displayAddress === primaryAddress) {
      explanationText =
        "If your wallet doesn't support Bitcoin-format addresses you can use a Cash Address-format BCH address";
      buttonText = "Use Cash format address";
      addressToDisplay = alternateAddress;
    }
    if (displayAddress === alternateAddress) {
      explanationText =
        "If your wallet doesn't support Cash Address-format addresses you can use a Bitcoin-format BCH address";
      buttonText = "Use Bitcoin format address";
      addressToDisplay = primaryAddress;
    }
  }

  if (coin === "BTC" && secondaryAddress) {
    if (displayAddress === primaryAddress) {
      explanationText =
        "If your wallet doesn't support Bitcoin-format addresses you can use a Segwit-format BTC address";
      buttonText = "Use Segwit format address";
      addressToDisplay = secondaryAddress;
    }
    if (displayAddress === secondaryAddress) {
      explanationText =
        "If your wallet doesn't support Segwit-format addresses you can use a Bitcoin-format BTC address";
      buttonText = "Use Bitcoin format address";
      addressToDisplay = primaryAddress;
    }
  }

  if (!addressToDisplay) return null;
  return (
    <Card color={STYLES.COLORS.CELSIUS_BLUE} padding="20 20 20 20">
      <CelText weight="300" alignItems="center" color="#FFFFFF">
        {explanationText}
      </CelText>

      <CelButton
        size={"medium"}
        margin="20 0 10 0"
        onPress={() => {
          setAddress(addressToDisplay);
        }}
        style={{
          borderWidth: 0.5,
          borderColor: "#FFFFFF",
        }}
      >
        {buttonText}
      </CelButton>
    </Card>
  );
};

export default DepositAddressSwitchCard;
