import React from "react";
import { View } from "react-native";
import { action } from "@storybook/addon-actions";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import DepositInfoModal from "./DepositInfoModal";

let type = "";

const DepositInfoModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Deposit ERC20 token modal:</CelText>
    <CelButton
      style={{ marginBottom: 5 }}
      onPress={() => {
        type = "USDT ERC20";
        store.dispatch(openModal(MODALS.DEPOSIT_INFO_MODAL));
      }}
    >
      Open Multi DepositInfoModal
    </CelButton>
    <CelText margin="15 0 10 0">Deposit XRP token modal:</CelText>
    <CelButton
      onPress={() => {
        type = "XRP";
        store.dispatch(openModal(MODALS.DEPOSIT_INFO_MODAL));
      }}
    >
      Open Info DepositInfoModal
    </CelButton>
    <DepositInfoModal onPressConfirm={action("onPressConfirm")} type={type} />
  </View>
);

export default DepositInfoModalStories;
