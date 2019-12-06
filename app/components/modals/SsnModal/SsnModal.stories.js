import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import SsnModal from "./SsnModal";

const SsnModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">SSN Modal modal:</CelText>
    <CelButton onPress={() => store.dispatch(openModal(MODALS.SSN_MODAL))}>
      Open SsnModal
    </CelButton>
    <SsnModal />
  </View>
);

export default SsnModalStories;
