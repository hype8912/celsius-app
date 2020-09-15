import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import moment from "moment";

import formatter from "../../../utils/formatter";
import CelModal from "../CelModal/CelModal.js";
import { LOAN_PAYMENT_REASONS, MODALS } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import InterestDueModalStyle from "./InterestDueModal.styles";
import { SCREENS } from "../../../constants/SCREENS";
// import CelButton from "../../atoms/CelButton/CelButton";

class InterestDueModal extends Component {
  static propTypes = {
    navigateTo: PropTypes.func,
    closeModal: PropTypes.func,
    activeLoan: PropTypes.instanceOf(Object).required,
    alert: PropTypes.bool,
  };
  static defaultProps = {};

  seeLoanDetails = () => {
    const { closeModal, navigateTo, activeLoan } = this.props;

    closeModal();
    navigateTo(SCREENS.LOAN_REQUEST_DETAILS, { id: activeLoan.id });
  };

  render() {
    const { activeLoan, closeModal, navigateTo, alert } = this.props;

    const style = InterestDueModalStyle();
    if (!activeLoan || !activeLoan.installments_to_be_paid) return null;
    const instalmentsToBePaid = activeLoan.installments_to_be_paid;
    const modalName = alert
      ? MODALS.LOAN_ALERT_MODAL
      : MODALS.INTEREST_DUE_MODAL;

    return (
      <CelModal name={modalName}>
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

        <View style={style.installmentsWrapper}>
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

        {/* TODO: to be fixed in CN-6810 */}
        {/* {alert && (*/}
        {/*  <CelButton basic onPress={this.seeLoanDetails}>*/}
        {/*    See Loan Details*/}
        {/*  </CelButton>*/}
        {/* )}*/}

        <View
          style={{
            justifyContent: "flex-end",
            marginTop: 20,
            height: 50,
          }}
        >
          <CelModalButton
            onPress={() => {
              navigateTo(SCREENS.CHOOSE_PAYMENT_METHOD, {
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
