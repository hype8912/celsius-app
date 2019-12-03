import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LoanApplicationSuccessModalStyle from "./LoanApplicationSuccessModal.styles";
import MultistepModal from "../MultistepModal/MultistepModal.js";
import CelText from "../../atoms/CelText/CelText";
import { LOAN_PAYMENT_REASONS, MODALS } from "../../../constants/UI";
import InfoModal from "../InfoModalNew/InfoModal";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import * as appActions from "../../../redux/actions";

@connect(
  state => ({
    formData: state.forms.formData,
    automaticLoanLimit: state.generalData.automaticLoanLimit,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class LoanApplicationSuccessModal extends Component {
  static propTypes = {
    loanId: PropTypes.number.isRequired,
  };
  static defaultProps = {};

  handlePrepayModal = () => {
    const { actions, loanId } = this.props;

    actions.resetToFlow("ChoosePaymentMethod", {
      id: loanId,
      reason: LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT,
    });
    actions.closeModal();
  };

  render() {
    const { actions, formData, automaticLoanLimit } = this.props;
    const style = LoanApplicationSuccessModalStyle();

    if (
      Number(formData.loanAmount) <= Number(automaticLoanLimit) &&
      formData.coin !== "USD"
    )
      return (
        <MultistepModal
          style={style.container}
          name={MODALS.LOAN_APPLICATION_SUCCESS_MODAL}
          top={30}
          imagesArray={[
            require("../../../../assets/images/checkmark.png"),
            require("../../../../assets/images/coin-stack-icon.png"),
          ]}
          imageHeight={25}
          imageWidth={25}
        >
          <View style={style.modalWrapper}>
            <CelText
              type={"H3"}
              align={"center"}
              margin={"0 20 5 20"}
              weight={"700"}
            >
              Loan Successfully Initiated
            </CelText>
            <CelText align={"center"} margin={"5 20 0 20"}>
              Thank you for initiating your loan with Celsius. Once approved,
              your funds will be transferred to your Celsius wallet.
            </CelText>
            <View style={style.buttonsWrapper}>
              <CelModalButton buttonStyle={"secondary"} position={"single"}>
                Next
              </CelModalButton>
            </View>
          </View>
          <View style={style.modalWrapper}>
            <CelText
              type={"H3"}
              align={"center"}
              margin={"0 20 5 20"}
              weight={"700"}
            >
              Prepay Your Interest
            </CelText>
            <CelText align={"center"} margin={"5 20 0 20"}>
              Your first interest payment will be due next month. Stay ahead of
              schedule and submit your first interest payment in advance.
            </CelText>
            <View style={style.buttonsWrapper}>
              <CelModalButton
                buttonStyle={"basic"}
                position={"single"}
                onPress={this.handlePrepayModal}
              >
                Make a Payment
              </CelModalButton>
            </View>
          </View>
        </MultistepModal>
      );

    return (
      <InfoModal
        name={MODALS.LOAN_APPLICATION_SUCCESS_MODAL}
        picture={require("../../../../assets/images/checkmark.png")}
        heading={"Loan Successfully Initiated"}
        pictureDimensions={{ height: 25, width: 25 }}
        paragraphs={[
          "Thank you for initiating your loan with Celsius. Once approved, your funds will be transferred to your Celsius wallet.",
        ]}
        yesCopy={"Continue"}
        onYes={actions.closeModal}
      />
    );
  }
}

export default LoanApplicationSuccessModal;
