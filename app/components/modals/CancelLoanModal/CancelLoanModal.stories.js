import React from "react";
import { View } from "react-native";
import { action } from "@storybook/addon-actions";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import CancelLoanModal from "./CancelLoanModal";

const CancelLoanModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Cancel Loan modal:</CelText>
    <CelButton
      onPress={() => store.dispatch(openModal(MODALS.LOAN_CANCEL_MODAL))}
    >
      Open CancelLoanModal
    </CelButton>
    <CancelLoanModal onPressConfirm={action("onPressConfirm")} />
  </View>
);

export default CancelLoanModalStories;
