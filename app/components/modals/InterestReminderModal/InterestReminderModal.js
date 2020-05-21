import React from "react";
import { View } from "react-native";

import InterestReminderModalStyle from "./InterestReminderModal.styles";
import { MODALS } from "../../../constants/UI";
import CelModal from "../CelModal/CelModal";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import CelText from "../../atoms/CelText/CelText";

const InterestReminderModal = props => {
  const { closeModal } = props;
  const style = InterestReminderModalStyle();
  const noPaymentSelected = false;

  // make component smart and check for additional flows
  return (
    <CelModal name={MODALS.INTEREST_REMINDER_MODAL}>
      {!noPaymentSelected && (
        <View>
          <CelText align="center" type="H3" margin="0 25 32 25" weight="bold">
            Reminder: Interest Payment Due in 7 Days
          </CelText>
          <CelText align="center" type="H5" margin="0 25 24 25">
            Please add
          </CelText>
          <CelText align="center" weight={"700"} type="H1" margin="0 25 24 25">
            XXXXX BTC
          </CelText>
          <CelText align="center" type="H5" margin="0 25 24 25">
            to your balance to cover the payment
          </CelText>
        </View>
      )}

      {noPaymentSelected && (
        <View>
          <CelText align="center" type="H3" margin="0 25 32 25" weight="bold">
            Interest Payment Reminder
          </CelText>
          <CelText align="center" type="H5" margin="0 25 24 25">
            Interest Payment for Loan #1234 due on March XX. Choose how you want
            to pay and make sure you have enough funds in your wallet.
          </CelText>
        </View>
      )}
      <View style={style.buttonsWrapper}>
        <CelModalButton onPress={closeModal}>Deposit More</CelModalButton>
      </View>
    </CelModal>
  );
};

export default InterestReminderModal;
