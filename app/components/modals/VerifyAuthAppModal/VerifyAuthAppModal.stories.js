import React from "react";
import { View } from "react-native";
import { action } from "@storybook/addon-actions";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import VerifyAuthAppModal from "./VerifyAuthAppModal";

const VerifyAuthAppModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Lose Celsius Membership modal:</CelText>
    <CelButton
      onPress={() => store.dispatch(openModal(MODALS.VERIFY_AUTHAPP_MODAL))}
    >
      Open VerifyAuthAppModal
    </CelButton>
    <VerifyAuthAppModal onVerify={action("onVerify prop fn")} />
  </View>
);

export default VerifyAuthAppModalStories;
