import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import InterestDueModal from "./InterestDueModal";

const InterestDueModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Interest Due modal:</CelText>
    <CelButton
      onPress={() => store.dispatch(openModal(MODALS.INTEREST_DUE_MODAL))}
    >
      Open Interest Due modal
    </CelButton>
    <InterestDueModal
      activeLoan={{
        id: "hello",
        installments_to_be_paid: {
          total: 1400,
          installments: [
            {
              from: new Date("12-20-2019"),
              to: new Date("01-20-2020"),
              amount: 700,
            },
            {
              from: new Date("01-20-2020"),
              to: new Date("02-20-2020"),
              amount: 700,
            },
          ],
        },
      }}
      navigateTo={() => {}}
      closeModal={() => {}}
    />
  </View>
);

export default InterestDueModalStories;
