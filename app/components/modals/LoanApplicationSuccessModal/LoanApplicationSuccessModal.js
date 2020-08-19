import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View } from "react-native";

import { LOAN_PAYMENT_REASONS, MODALS, THEMES } from "../../../constants/UI";
import InfoModal from "../InfoModalNew/InfoModal";
import * as appActions from "../../../redux/actions";
import MultistepModal from "../MultistepModal/MultistepModal";
import LoanApplicationSuccessModalStyle from "./LoanApplicationSuccessModal.styles";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import CelText from "../../atoms/CelText/CelText";
import multiStepUtil from "../../../utils/multistep-modal-util";
import { getTheme } from "../../../utils/styles-util";

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

  constructor(props) {
    super(props);

    this.state = {
      noLoading: false,
      yesLoading: false,
    };
  }

  handlePrepayModal = () => {
    const { actions, loanId } = this.props;

    actions.resetToScreen("ChoosePaymentMethod", {
      id: loanId,
      reason: LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT,
    });
    actions.closeModal();
  };

  // setupAutomaticInterestPayment = async m => {
  //   const { actions, loanId } = this.props;
  //   let automatic = true;
  //   if (m === "manual") {
  //     automatic = false;
  //     this.setState({
  //       noLoading: true,
  //     });
  //   } else {
  //     this.setState({
  //       yesLoading: true,
  //     });
  //   }
  //   await actions.updateLoanSettings(loanId, {
  //     automatic_interest_payment: automatic,
  //   });
  //   actions.closeModal();
  // };

  render() {
    const style = LoanApplicationSuccessModalStyle();
    const { actions, yesLoading } = this.state;
    const theme = getTheme();

    // NOTE: (srdjan) commented after client asked to kick automatic approve loan feature

    // if (
    //   Number(formData.loanAmount) < Number(automaticLoanLimit) &&
    //   formData.coin !== "USD"
    // )
    if (false) {
      return (
        <MultistepModal
          style={style.container}
          name={MODALS.LOAN_APPLICATION_SUCCESS_MODAL}
          top={30}
          imagesArray={[
            require("../../../../assets/images/checkmark.png"),
            theme === THEMES.LIGHT
              ? require("../../../../assets/images/coin-stack-icon.png")
              : require("../../../../assets/images/coin-stack-icon-dark.png"),
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
              <CelModalButton
                buttonStyle={"secondary"}
                position={"single"}
                onPress={() => multiStepUtil.goToNextStep()}
              >
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
    }
    return (
      <InfoModal
        name={MODALS.LOAN_APPLICATION_SUCCESS_MODAL}
        picture={require("../../../../assets/images/checkmark.png")}
        heading={"Loan Successfully Initiated"}
        pictureDimensions={{ height: 25, width: 25 }}
        paragraphs={[
          "Thank you for initiating your loan with Celsius. Once approved, your funds will be transferred to your Celsius wallet.",
        ]}
        yesCopy={"Yes"}
        onYes={() => actions.closeModal()}
        yesloading={yesLoading}
      />
    );
  }
}

export default LoanApplicationSuccessModal;
