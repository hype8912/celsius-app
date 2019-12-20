import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import WithdrawWarningModal from "./WithdrawWarningModal";

const WithdrawWarningModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Withdraw Warning modal:</CelText>
    <CelButton
      onPress={() => store.dispatch(openModal(MODALS.WITHDRAW_WARNING_MODAL))}
    >
      Open WithdrawWarningModal
    </CelButton>
    <WithdrawWarningModal />
  </View>
);

export default WithdrawWarningModalStories;
