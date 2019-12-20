import React from "react";
import { View } from "react-native";
import { action } from "@storybook/addon-actions";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import PrepayDollarInterestModal from "./PrepayDollarInterestModal";

const PrepayDollarInterestModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Prepay Dollar interest modal:</CelText>
    <CelButton
      onPress={() =>
        store.dispatch(openModal(MODALS.PREPAY_DOLLAR_INTEREST_MODAL))
      }
    >
      Open PrepayDollarInterestModal
    </CelButton>
    <PrepayDollarInterestModal onPressConfirm={action("onPressConfirm")} />
  </View>
);

export default PrepayDollarInterestModalStories;
