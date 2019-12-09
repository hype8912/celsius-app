import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import RejectionReasonsModal from "./RejectionReasonsModal";

const RejectionReasonsModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">KYC Rejection Reasons modal:</CelText>
    <CelButton
      onPress={() =>
        store.dispatch(openModal(MODALS.KYC_REJECTION_REASONS_MODAL))
      }
    >
      Open RejectionReasonsModal
    </CelButton>
    <RejectionReasonsModal />
  </View>
);

export default RejectionReasonsModalStories;
