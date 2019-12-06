import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import CelPayReceivedModal from "./CelPayReceivedModal";

const CelPayReceivedModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">CelPay Received modal:</CelText>
    <CelButton
      onPress={() => store.dispatch(openModal(MODALS.CELPAY_RECEIVED_MODAL))}
    >
      Open CelPayReceivedModal
    </CelButton>
    <CelPayReceivedModal
      transfer={{
        from: { name: "Pera Peric" },
        amount: "150",
        coin: "ETH",
      }}
    />
  </View>
);

export default CelPayReceivedModalStories;
