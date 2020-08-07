import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import GetCoinsConfirmModal from "./GetCoinsConfirmModal";

const GetCoinsConfirmModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Get coins confirm modal:</CelText>
    <CelButton
      onPress={() => store.dispatch(openModal(MODALS.GET_COINS_CONFIRM_MODAL))}
    >
      Open GetCoinsConfirmModal
    </CelButton>
    <GetCoinsConfirmModal />
  </View>
);

export default GetCoinsConfirmModalStories;
