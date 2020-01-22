import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import ConfirmCelPayModal from "./ConfirmCelPayModal";

const ConfirmCelPayModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Confirm CelPay modal:</CelText>
    <CelButton onPress={() => store.dispatch(openModal(MODALS.CONFIRM_CELPAY_MODAL))}>
      Open ConfirmCelPayModalStories
    </CelButton>
    <ConfirmCelPayModal/>
  </View>
)

export default ConfirmCelPayModalStories;
