import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import RemoveAuthAppModal from "./RemoveAuthAppModal";

const RemoveAuthAppModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Remove 2FA from app modal:</CelText>
    <CelButton
      onPress={() => store.dispatch(openModal(MODALS.REMOVE_AUTHAPP_MODAL))}
    >
      Open RemoveAuthAppModal
    </CelButton>
    <RemoveAuthAppModal />
  </View>
);

export default RemoveAuthAppModalStories;
