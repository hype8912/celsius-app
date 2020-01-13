import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { closeModal, openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import ReCaptchaModal from "./ReCaptchaModal";

const ReCaptchaModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">ReCaptcha modal:</CelText>
    <CelButton
      onPress={() => store.dispatch(openModal(MODALS.RECAPTCHA_MODAL))}
    >
      Open ReCaptcha modal
    </CelButton>
    <ReCaptchaModal closeModal={() => store.dispatch(closeModal())} />
  </View>
);

export default ReCaptchaModalStories;
