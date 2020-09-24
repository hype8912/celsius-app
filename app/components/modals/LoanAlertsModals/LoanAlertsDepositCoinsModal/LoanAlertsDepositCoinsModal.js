import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import InfoModal from "../../InfoModalNew/InfoModal";
import {
  COIN_CARD_TYPE,
  LOAN_PAYMENT_REASONS,
  MODALS,
} from "../../../../constants/UI";
import * as appActions from "../../../../redux/actions";
import loanPaymentUtil from "../../../../utils/loanPayment-util";
import { SCREENS } from "../../../../constants/SCREENS";

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
    const payment = loanPaymentUtil.calculateAdditionalPayment(
      loan,
      COIN_CARD_TYPE.PRINCIPAL_PAYMENT_COIN_CARD
    );
    actions.navigateTo(SCREENS.DEPOSIT, {
      coin: loan.coin_loan_asset,
      reason: LOAN_PAYMENT_REASONS.PRINCIPAL,
      amountUsd: payment.additionalUsdAmount,
      additionalCryptoAmount: payment.additionalCryptoAmount,
    });
    actions.closeModal();
  };

  render() {
    const { loan } = this.props;

    if (!loan) return;

    return (
      <InfoModal
        name={MODALS.LOAN_ALERT_MODAL}
        heading={"You Are Almost Done With Your Loan Payout!"}
        paragraphs={[
          `You have a principle of ${loan.loan_amount} ${loan.coin_loan_asset}, but there are not enough funds in your wallet. Please deposit more ${loan.coin_loan_asset} to pay out your principle.`,
        ]}
        yesCopy={`Deposit ${loan && loan.coin_loan_asset}`}
        onYes={this.depositCoin}
      />
    );
  }
}

LoanAlertsDepositCoinsModal.propTypes = {
  loan: PropTypes.instanceOf(Object),
};

export default LoanAlertsDepositCoinsModal;
