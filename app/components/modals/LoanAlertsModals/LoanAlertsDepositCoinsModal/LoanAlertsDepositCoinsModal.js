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
class LoanAlertsDepositCoinsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  depositCoin = () => {
    const { actions, loan } = this.props;
    actions.navigateTo("Deposit", {
      coin: loan.coin_loan_asset ? loan.coin_loan_asset : "DAI",
      loan,
      isMarginWarning: true,
    });
    actions.closeModal();
  };

  render() {
    const { loan } = this.props;
    return (
      <InfoModal
        name={MODALS.LOAN_ALERT_MODAL}
        heading={"You Are Almost Done With Your Loan Payout!"}
        paragraphs={[
          `You have a principle of ${
            loan && loan.loanAmount ? loan.loanAmount : "123"
          } ${
            loan && loan.coin_loan_asset ? loan.coin_loan_asset : "DAI"
          }, but there are not enough funds in your wallet. Please deposit more ${
            loan && loan.coin_loan_asset ? loan.coin_loan_asset : "DAI"
          } to pay out your principle.`,
        ]}
        yesCopy={`Deposit ${
          loan && loan.coin_loan_asset ? loan.coin_loan_asset : "DAI"
        }`}
        onYes={this.depositCoin}
      />
    );
  }
}

LoanAlertsDepositCoinsModal.propTypes = {
  amount: PropTypes.string,
  coin: PropTypes.string,
  onYes: PropTypes.func,
};

export default LoanAlertsDepositCoinsModal;
