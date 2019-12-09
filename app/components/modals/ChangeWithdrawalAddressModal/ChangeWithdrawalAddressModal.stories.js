import React from "react";
import { View } from "react-native";
import { action } from "@storybook/addon-actions";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import ChangeWithdrawalAddressModal from "./ChangeWithdrawalAddressModal";

const ChangeWithdrawalAddressModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Change Withdrawal Address modal:</CelText>
    <CelButton
      onPress={() =>
        store.dispatch(openModal(MODALS.CHANGE_WITHDRAWAL_ADDRESS_MODAL))
      }
    >
      Open ChangeWithdrawalAddressModal
    </CelButton>
    <ChangeWithdrawalAddressModal onPressConfirm={action("onPressConfirm")} />
  </View>
);

export default ChangeWithdrawalAddressModalStories;
