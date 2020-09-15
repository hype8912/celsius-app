import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { LOAN_PAYMENT_REASONS, MODALS } from "../../../constants/UI";
import InfoModal from "../InfoModalNew/InfoModal";
import * as appActions from "../../../redux/actions";
import { SCREENS } from "../../../constants/SCREENS";

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

    actions.resetToScreen(SCREENS.CHOOSE_PAYMENT_METHOD, {
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
    const { actions } = this.props;
    const { yesLoading } = this.state;

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
        onYes={() => actions.closeModal()}
        yesloading={yesLoading}
      />
    );
  }
}

export default LoanApplicationSuccessModal;
