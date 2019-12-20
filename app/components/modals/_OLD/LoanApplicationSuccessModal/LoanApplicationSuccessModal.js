import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LoanApplicationSuccessModalStyle from "./LoanApplicationSuccessModal.styles";
import CelText from "../../../atoms/CelText/CelText";
import { LOAN_PAYMENT_REASONS, MODALS } from "../../../../constants/UI";
import CelModal from "../../../organisms/CelModal/CelModal";
import CelButton from "../../../atoms/CelButton/CelButton";
import STYLES from "../../../../constants/STYLES";
import * as appActions from "../../../../redux/actions";

@connect(
  () => ({}),
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
      currentStep: 0,
      steps: [
        {
          title: "Loan successfully initiated",
          description: "Thank you for initiating your loan with Celsius",
          buttonText: "Next",
        },
        {
          title: `Prepay your interest`,
          description:
            "Stay ahead of schedule and submit your first interest payments in advance.",
          buttonText: "Make a payment",
        },
      ],
    };
  }

  closeModalHandler = () => {
    const { actions, loanId } = this.props;
    const { steps, currentStep } = this.state;

    if (steps[currentStep].buttonText === "Next") {
      this.setState({ currentStep: 1 });
    } else {
      actions.resetToFlow("ChoosePaymentMethod", {
        id: loanId,
        reason: LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT,
      });
      actions.closeModal();
      this.setState({ currentStep: 0 });
    }
  };

  render() {
    const { actions } = this.props;
    const { steps, currentStep } = this.state;
    const style = LoanApplicationSuccessModalStyle();

    return (
      <CelModal
        name={MODALS.LOAN_APPLICATION_SUCCESS_MODAL}
        picture={require("../../../../../assets/images/illustrations-v3/monkey-success/monkey-success.png")}
      >
        <CelText type="H2" align={"center"} weight="bold" style={style.title}>
          {steps[currentStep].title}
        </CelText>
        <CelText
          type="H4"
          weight={"300"}
          color={STYLES.COLORS.DARK_GRAY}
          align={"center"}
          style={style.description}
        >
          {steps[currentStep].description}
        </CelText>
        <CelButton margin={"20 0 10 0"} onPress={this.closeModalHandler}>
          {steps[currentStep].buttonText}
        </CelButton>
        {currentStep > 0 && (
          <View>
            <CelButton
              basic
              onPress={() => {
                actions.closeModal();
              }}
            >
              Close
            </CelButton>
          </View>
        )}
      </CelModal>
    );
  }
}

export default LoanApplicationSuccessModal;
