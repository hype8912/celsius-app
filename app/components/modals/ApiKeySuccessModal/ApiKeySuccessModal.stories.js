import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import ApiKeySuccessModal from "./ApiKeySuccessModal";
import ACTIONS from "../../../constants/ACTIONS";

const ApiKeySuccessModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Create API Key Success Modal:</CelText>
    <CelButton
      onPress={() => {
        store.dispatch(openModal(MODALS.GENERATE_API_KEY_MODAL));
        store.dispatch({
          type: ACTIONS.CREATE_API_KEY_SUCCESS,
          apiKey: "1234-5678-1234-5678",
        });
      }}
    >
      Open ApiKeySuccessModal
    </CelButton>
    <ApiKeySuccessModal />
  </View>
);

export default ApiKeySuccessModalStories;
