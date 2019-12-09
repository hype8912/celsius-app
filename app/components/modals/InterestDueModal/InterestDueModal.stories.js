import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import InterestDueModal from "./InterestDueModal";

const InterestDueModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Interest Due modal:</CelText>
    <CelButton
      onPress={() => store.dispatch(openModal(MODALS.INTEREST_DUE_MODAL))}
    >
      Open InterestDueModal
    </CelButton>
    <InterestDueModal
      activeLoan={{
        id: "hello",
      }}
      navigateTo={() => {}}
      closeModal={() => {}}
    />
  </View>
);

export default InterestDueModalStories;
