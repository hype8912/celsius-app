import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import CalculateLoyaltyLevelModal from "./CalculateLoyaltyLevelModal";

const CalculateLoyaltyLevelModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Calculate Celsius Loyalty Level modal:</CelText>
    <CelButton
      onPress={() =>
        store.dispatch(openModal(MODALS.MY_CEL_LOYALTY_CALCULATOR_MODAL))
      }
    >
      Open CalculateLoyaltyLevelModal
    </CelButton>
    <CalculateLoyaltyLevelModal />
  </View>
);

export default CalculateLoyaltyLevelModalStories;
