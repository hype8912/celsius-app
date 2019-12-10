import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import moment from "moment";

import formatter from "../../../utils/formatter";
import CelModal from "../CelModal/CelModal.js";
import { LOAN_PAYMENT_REASONS, MODALS } from "../../../constants/UI";
import STYLES from "../../../constants/STYLES";
import CelText from "../../atoms/CelText/CelText";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";

class InterestDueModal extends Component {
  static propTypes = {
    navigateTo: PropTypes.func,
    closeModal: PropTypes.func,
    activeLoan: PropTypes.instanceOf(Object).required,
  };
  static defaultProps = {};

  render() {
    const { activeLoan, closeModal, navigateTo } = this.props;

    if (!activeLoan) return null;
    const instalmentsToBePaid = activeLoan.installments_to_be_paid;

    return (
      <CelModal name={MODALS.INTEREST_DUE_MODAL}>
        <CelText type="H2" align="center" weight="bold">
          Interest Payment
        </CelText>

        <CelText align="center" margin="10 0 10 0">
          Your interest due is
          <CelText weight="bold">
            {" "}
            {formatter.usd(instalmentsToBePaid.total)}
          </CelText>
        </CelText>

        <View
          style={{
            backgroundColor: STYLES.COLORS.LIGHT_GRAY,
            borderRadius: 5,
            padding: 10,
            margin: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <CelText type="H7" weight="bold">
              Payment Period
            </CelText>
            <CelText type="H7" weight="bold">
              Monthly Interest
            </CelText>
          </View>

          {instalmentsToBePaid.installments.map(installment => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
              key={installment.from}
            >
              <CelText weight="light">{`${moment(installment.from).format(
                "D MMM"
              )} - ${moment(installment.to).format("D MMM")}`}</CelText>
              <CelText weight="light">
                {formatter.usd(installment.amount)}
              </CelText>
            </View>
          ))}
        </View>

        <View
          style={{
            justifyContent: "flex-end",
            marginTop: 20,
            height: 50,
          }}
        >
          <CelModalButton
            onPress={() => {
              navigateTo("ChoosePaymentMethod", {
                reason: LOAN_PAYMENT_REASONS.MANUAL_INTEREST,
                id: activeLoan.id,
              });
              closeModal();
            }}
          >
            Pay Interest
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default InterestDueModal;
