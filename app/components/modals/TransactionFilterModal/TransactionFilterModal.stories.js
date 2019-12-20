import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import TransactionFilterModal from "./TransactionFilterModal";

const TransactionFilterModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Transactions Filter modal:</CelText>
    <CelButton
      onPress={() => store.dispatch(openModal(MODALS.TRANSACTION_FILTER_MODAL))}
    >
      Open TransactionFilterModal
    </CelButton>
    <TransactionFilterModal />
  </View>
);

export default TransactionFilterModalStories;
