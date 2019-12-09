import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import LoseMembershipModal from "./LoseMembershipModal";

const LoseMembershipModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Lose Celsius Membership modal:</CelText>
    <CelButton
      onPress={() => store.dispatch(openModal(MODALS.LOSE_MEMBERSHIP_MODAL))}
    >
      Open LoseMembershipModal
    </CelButton>
    <LoseMembershipModal />
  </View>
);

export default LoseMembershipModalStories;
