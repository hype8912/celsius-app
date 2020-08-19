import React from "react";

import Card from "../Card/Card";
import STYLES from "../../../constants/STYLES";
import CelButton from "../CelButton/CelButton";

// const DepositAddressSwitchCard = ({ coin, primaryAddress, alternateAddress, secondaryAddress, displayAddress }) => {
const DepositAddressSwitchCard = () => {
  // todo add copy by coin and displayAddress
  // todo add button copy by coin and displayAddress

  return (
    <Card color={STYLES.COLORS.CELSIUS_BLUE}>
      <CelButton
        size={"medium"}
        white
        onPress={() => {
          this.setState({
            useAlternateAddress: !this.state.useAlternateAddress,
          });
        }}
        style={{
          borderWidth: 0.5,
          borderColor: "#FFFFFF",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        Add text
      </CelButton>
    </Card>
  );
};

export default DepositAddressSwitchCard;
