import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import LoseTierModal from "./LoseTierModal";

const LoseTierModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Lose Celsius Tier modal:</CelText>
    <CelButton
      onPress={() => store.dispatch(openModal(MODALS.LOSE_TIER_MODAL))}
    >
      Open LoseTierModal
    </CelButton>
    <LoseTierModal tierTitle={"PLATINUM"} />
  </View>
);

export default LoseTierModalStories;
