import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import ConfirmWithdrawalAddressModal from "./ConfirmWithdrawalAddressModal";
import { updateFormField } from "../../../redux/forms/formsActions";

const ConfirmWithdrawalAddressModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Confirm Withdrawal Address modal:</CelText>
    <CelButton
      onPress={() => {
        store.dispatch(
          updateFormField(
            "withdrawAddress",
            "2Mawkjflkwjafk394LfIOEslwdksaKJLdKJkl"
          )
        );
        store.dispatch(updateFormField("coin", "BTC"));
        store.dispatch(openModal(MODALS.CONFIRM_WITHDRAWAL_ADDRESS_MODAL));
      }}
    >
      Open ConfirmWithdrawalAddressModal
    </CelButton>
    <ConfirmWithdrawalAddressModal />
  </View>
);

export default ConfirmWithdrawalAddressModalStories;
