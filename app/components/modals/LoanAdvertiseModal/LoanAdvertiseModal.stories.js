import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import LoanAdvertiseModal from "./LoanAdvertiseModal";

const LoanAdvertiseModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Loan Advertise modal:</CelText>
    <CelButton
      onPress={() => store.dispatch(openModal(MODALS.LOAN_ADVERTISE_MODAL))}
    >
      Open LoanAdvertiseModal
    </CelButton>
    <LoanAdvertiseModal
      closeModal={() => {}}
      updateFormField={() => {}}
      formData={{}}
      setUserAppSettings={() => {}}
    />
  </View>
);

export default LoanAdvertiseModalStories;
