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
class LoanAlertsMarginCallDepositCoinsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  depositCoin = () => {
    const { actions, loan } = this.props;
    actions.navigateTo("Deposit", {
      coin: loan.margin_call.collateral_coin
        ? loan.margin_call.collateral_coin
        : "DAI",
      loan,
      isMarginWarning: true,
    });
    actions.closeModal();
  };

  render() {
    const { yesCopy } = this.props;
    return (
      <InfoModal
        name={MODALS.LOAN_ALERT_MODAL}
        picture={require("../../../../../assets/images/alert-icon.png")}
        pictureDimensions={{ width: 30, height: 30 }}
        heading={"Margin Call Warning!"}
        paragraphs={[
          "The value of your collateral has dropped by 30%. To match the value with the current market prices, you can transfer more funds or choose other coins from your wallet.",
        ]}
        yesCopy={yesCopy}
        onYes={this.depositCoin}
      />
    );
  }
}

LoanAlertsMarginCallDepositCoinsModal.propTypes = {
  onYes: PropTypes.func,
};

export default LoanAlertsMarginCallDepositCoinsModal;
