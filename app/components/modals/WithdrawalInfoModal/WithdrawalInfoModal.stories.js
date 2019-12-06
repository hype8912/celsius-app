import React from "react";
import { View } from "react-native";
import { action } from "@storybook/addon-actions";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import WithdrawalInfoModal from "./WithdrawalInfoModal";

const WithdrawalInfoModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Withdraw Info modal:</CelText>
    <CelButton
      onPress={() => store.dispatch(openModal(MODALS.WITHDRAW_INFO_MODAL))}
    >
      Open WithdrawalInfoModal
    </CelButton>
    <WithdrawalInfoModal
      onPressConfirm={action("onPressConfirm")}
      withdrawalSettings={{ daily_withdrawal_limit: 20000 }}
    />
  </View>
);

export default WithdrawalInfoModalStories;
