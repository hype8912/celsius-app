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

  handlePrepayModal = () => {
    const { actions, loanId } = this.props;

    actions.resetToScreen(SCREENS.CHOOSE_PAYMENT_METHOD, {
      id: loanId,
      reason: LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT,
    });
    actions.closeModal();
  };

  render() {
    const { actions } = this.props;

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
      />
    );
  }
}

export default LoanApplicationSuccessModal;
