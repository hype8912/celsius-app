import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import DestinationInfoTagModal from "./DestinationInfoTagModal";

const DestinationInfoTagModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Memo Id modal:</CelText>
    <CelButton
      onPress={() => store.dispatch(openModal(MODALS.DESTINATION_TAG_MODAL))}
    >
      Open DestinationTagInfoModal
    </CelButton>
    <DestinationInfoTagModal />
  </View>
);

export default DestinationInfoTagModalStories;
