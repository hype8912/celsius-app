import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import ApiKeyRevokeModal from "./ApiKeyRevokeModal";

const ApiKeyRevokeModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Revoke API Key Modal:</CelText>
    <CelButton
      onPress={() => store.dispatch(openModal(MODALS.API_KEY_REVOKE_MODAL))}
    >
      Open ApiKeyRevokeModal
    </CelButton>
    <ApiKeyRevokeModal apiKey={"fake-api-key"} />
  </View>
);

export default ApiKeyRevokeModalStories;
