import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import InfoModal from "../../InfoModalNew/InfoModal";
import { MODALS } from "../../../../constants/UI";
import * as appActions from "../../../../redux/actions";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class LoanAlertsPayoutPrincipalModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  payPrincipal = () => {
    const { actions, loan } = this.props;

    actions.navigateTo("VerifyProfile", {
      onSuccess: () => actions.payPrincipal(loan.id),
    });
    actions.closeModal();
  };

  render() {
    const { loan } = this.props;
    const principle =
      loan && loan.loan_amount && loan.coin_loan_asset
        ? `${loan.loan_amount} ${loan.coin_loan_asset}`
        : "123 DAI";
    return (
      <InfoModal
        name={MODALS.LOAN_ALERT_MODAL}
        heading={"You Are Almost Done With Your Loan Payout!"}
        paragraphs={[
          `You have a principle of ${principle} which you can payout from your wallet.`,
        ]}
        yesCopy={"Pay Principal"}
        onYes={this.payPrincipal}
      />
    );
  }
}

LoanAlertsPayoutPrincipalModal.propTypes = {
  amount: PropTypes.string,
  coin: PropTypes.string,
  onYes: PropTypes.func,
};

export default LoanAlertsPayoutPrincipalModal;
