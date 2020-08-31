import React from "react";

import Card from "../Card/Card";
import STYLES from "../../../constants/STYLES";
import CelButton from "../CelButton/CelButton";
import CelText from "../CelText/CelText";

const DepositAddressSwitchCard = ({
  coin,
  primaryAddress,
  secondaryAddress,
  displayAddress,
  setAddress,
}) => {
  let explanationText;
  let buttonText;
  let addressToDisplay;

  if (coin === "LTC" && secondaryAddress) {
    if (displayAddress === primaryAddress) {
      explanationText =
        "If your wallet doesn't support Segwit-format addresses you can use legacy format LTC address";
      buttonText = "Use legacy format address";
      addressToDisplay = secondaryAddress;
    }
    if (displayAddress === secondaryAddress) {
      explanationText = "You can also use Segwit-format LTC address";
      buttonText = "Use Segwit-format address";
      addressToDisplay = primaryAddress;
    }
  }

  if (coin === "BTC" && secondaryAddress) {
    if (displayAddress === primaryAddress) {
      explanationText =
        "If your wallet doesn't support Segwit-format addresses you can use legacy format BTC address";
      buttonText = "Use legacy format address";
      addressToDisplay = secondaryAddress;
    }
    if (displayAddress === secondaryAddress) {
      explanationText = "You can also use Segwit-format BTC address";
      buttonText = "Use Segwit-format address";
      addressToDisplay = primaryAddress;
    }
  }

  if (coin === "BCH" && secondaryAddress) {
    if (displayAddress === primaryAddress) {
      explanationText =
        "If your wallet doesn't support Segwit-format addresses you can use legacy format BCH address";
      buttonText = "Use legacy format address";
      addressToDisplay = secondaryAddress;
    }
    if (displayAddress === secondaryAddress) {
      explanationText = "You can also use Segwit-format BCH address";
      buttonText = "Use Segwit-format address";
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
