import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import CelPayInfoModal from "./CelPayInfoModal";

const CelPayInfoModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">CelPay Info modal:</CelText>
    <CelButton onPress={() => store.dispatch(openModal(MODALS.CELPAY_INFO_MODAL))}>
      Open CelPayInfoModal
    </CelButton>
    <CelPayInfoModal/>
  </View>
);

export default CelPayInfoModalStories;
