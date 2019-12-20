import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import BecomeCelMemberModal from "./BecomeCelMemberModal";

const BecomeCelMemberModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Become Celsius Member modal:</CelText>
    <CelButton
      onPress={() => store.dispatch(openModal(MODALS.BECAME_CEL_MEMBER_MODAL))}
    >
      Open BecomeCelMemberModal
    </CelButton>
    <BecomeCelMemberModal />
  </View>
);

export default BecomeCelMemberModalStories;
