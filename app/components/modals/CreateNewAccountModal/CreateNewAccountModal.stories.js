import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import CreateNewAccountModal from "./CreateNewAccountModal";

const CreateNewAccountModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Create New Account modal:</CelText>
    <CelButton
      onPress={() => store.dispatch(openModal(MODALS.CREATE_NEW_ACCOUNT_MODAL))}
    >
      Open CreateNewAccountModal
    </CelButton>
    <CreateNewAccountModal />
  </View>
);

export default CreateNewAccountModalStories;
