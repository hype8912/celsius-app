import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import RegisterPromoCodeModal from "./RegisterPromoCodeModal";

const RegisterPromoCodeModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Register Promo code modal:</CelText>
    <CelButton
      onPress={() =>
        store.dispatch(openModal(MODALS.REGISTER_PROMO_CODE_MODAL))
      }
    >
      Open RegisterPromoCodeModal
    </CelButton>
    <RegisterPromoCodeModal />
  </View>
);

export default RegisterPromoCodeModalStories;
