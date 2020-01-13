import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { LOAN_ALERTS, MODALS } from "../../../../constants/UI";
import * as appActions from "../../../../redux/actions";
import InfoModal from "../../../molecules/InfoModal/InfoModal";
import formatter from "../../../../utils/formatter";

@connect(
  state => ({
    allLoans: state.loans.allLoans,
    loanAlerts: state.loans.loanAlerts,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class LoanAlertsModal extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    const activeAlert =
      nextProps.loanAlerts && nextProps.loanAlerts.length
        ? nextProps.loanAlerts[0]
        : null;
    const loan =
      activeAlert && nextProps.allLoans.find(l => l.id === activeAlert.id);

    return { activeAlert, loan };
  }

  constructor(props) {
    super(props);

    const activeAlert = this.getFirstAlert(props.loanAlerts);
    const loan =
      activeAlert && props.allLoans.find(l => l.id === activeAlert.id);

    this.state = { activeAlert, loan };
  }

  getFirstAlert = loanAlerts => {
    if (!loanAlerts || !loanAlerts.length) return null;

    let activeAlert;
    loanAlerts.forEach(la => {
      if (la.type === LOAN_ALERTS.MARGIN_CALL_ALERT) activeAlert = la;
    });

    return activeAlert || loanAlerts[0];
  };

  payPrincipal = () => {
    const { loan } = this.state;
    const { actions } = this.props;

    actions.navigateTo("VerifyProfile", {
      onSuccess: () => actions.payPrincipal(loan.id),
    });
    actions.closeModal();
  };

  lockAdditionalCollateral = () => {
    const { actions } = this.props;
    const { loan } = this.state;

    actions.navigateTo("VerifyProfile", {
      onSuccess: () =>
        actions.lockMarginCallCollateral(
          loan.id,
          loan.margin_call.collateral_coin
        ),
    });
    actions.closeModal();
  };

  depositCoin = () => {
    const { actions } = this.props;
    const { loan } = this.state;
    actions.navigateTo("Deposit", {
      coin: loan.margin_call.collateral_coin,
      loan,
      isMarginWarning: true,
    });
    actions.closeModal();
  };

  renderPrincipalPaymentAlert = () => {
    const { loan } = this.state;

    const amountToPay = formatter.crypto(
      loan.loan_amount,
      loan.coin_loan_asset,
      { noPrecision: true }
    );
    const copy = `You have a principal balance of  ${amountToPay} remaining. You can use the funds held in your Celsius wallet to complete this repayment.`;

    return (
      <InfoModal
        name={MODALS.LOAN_ALERT_MODAL}
        heading="Your loan repayment is almost complete! "
        paragraphs={[copy]}
        yesCopy="Repay Principal"
        onYes={() => this.payPrincipal()}
      />
    );
  };

  renderMarginCallCollateralAlert = () => {
    const { loan } = this.state;
    let copy;
    let yesCopy;
    let onYes;

    if (loan.margin_call && loan.margin_call.hasEnoughOriginalCoin) {
      copy = `The value of your collateral has dropped significantly. To match the value with the current
              market prices, we will need to lock an additional ${formatter.crypto(
                loan.margin_call.margin_call_amount,
                loan.margin_call.collateral_coin
              )} from your wallet balance. You can also deposit more funds from your wallet.`;
      yesCopy = `Lock ${formatter.crypto(
        loan.margin_call.margin_call_amount,
        loan.margin_call.collateral_coin
      )}`;
      onYes = this.lockAdditionalCollateral;
    }

    if (
      loan.margin_call &&
      !loan.margin_call.hasEnoughOriginalCoin &&
      loan.margin_call.hasEnoughOtherCoins
    ) {
      copy = `The value of your collateral dropped significantly. To match the value with the market prices please deposit enough coins to use as collateral.`;
      yesCopy = `Deposit coins`;
      onYes = this.depositCoin;
    }

    return (
      <InfoModal
        name={MODALS.LOAN_ALERT_MODAL}
        picture={require("../../../../../assets/images/alert.png")}
        heading="Margin Call Warning!"
        paragraphs={[copy]}
        yesCopy={yesCopy}
        onYes={onYes}
      />
    );
  };

  render() {
    const { activeAlert } = this.state;
    if (!activeAlert) return null;

    switch (activeAlert.type) {
      case LOAN_ALERTS.PRINCIPAL_ALERT:
        return this.renderPrincipalPaymentAlert();
      case LOAN_ALERTS.MARGIN_CALL_ALERT:
        return this.renderMarginCallCollateralAlert();
    }
  }
}

export default LoanAlertsModal;
