import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { LOAN_ALERTS } from "../../../constants/UI";
import * as appActions from "../../../redux/actions";
import LoanAlertsPayoutPrincipalModal from "./LoanAlertsPayoutPrincipalModal/LoanAlertsPayoutPrincipalModal";
import LoanAlertsDepositCoinsModal from "./LoanAlertsDepositCoinsModal/LoanAlertsDepositCoinsModal";
import LoanAlertsMarginCallLockCoinModal from "./LoanAlertsMarginCallLockCoinModal/LoanAlertsMarginCallLockCoinModal";
import LoanAlertsMarginCallDepositCoinsModal from "./LoanAlertsMarginCallDepositCoinsModal/LoanAlertsMarginCallDepositCoinsModal";
import InterestDueModal from "../InterestDueModal/InterestDueModal";

@connect(
  state => ({
    allLoans: state.loans.allLoans,
    loanAlerts: state.loans.loanAlerts,
    walletSummary: state.wallet.summary,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class LoanAlertsModalWrapper extends Component {
  static getDerivedStateFromProps(nextProps) {
    let activeAlert;

    if (nextProps.loanAlerts && nextProps.loanAlerts.length) {
      activeAlert = nextProps.loanAlerts.find(
        la => la.type === LOAN_ALERTS.INTEREST_ALERT
      );
      activeAlert =
        activeAlert ||
        nextProps.loanAlerts.find(
          la => la.type === LOAN_ALERTS.PRINCIPAL_ALERT
        );
      activeAlert =
        activeAlert ||
        nextProps.loanAlerts.find(
          la => la.type === LOAN_ALERTS.MARGIN_CALL_ALERT
        );
    } else {
      activeAlert = null;
    }

    const loan = LoanAlertsModalWrapper.getLoan(
      activeAlert,
      nextProps.allLoans
    );
    if (loan) {
      const principalCoinWallet = LoanAlertsModalWrapper.getPrincipalCoinWallet(
        nextProps.walletSummary,
        loan
      );
      const collateralCoinWallet = LoanAlertsModalWrapper.getCollateralCoinWallet(
        nextProps.walletSummary,
        loan
      );
      return { activeAlert, loan, principalCoinWallet, collateralCoinWallet };
    }
    return { activeAlert, loan };
  }

  static getLoan = (activeAlert, allLoans) => {
    const loan = activeAlert && allLoans.find(l => l.id === activeAlert.id);
    return loan;
  };
  static getPrincipalCoinWallet = (walletSummary, loan) => {
    const principalCoinWallet = walletSummary.coins.find(
      p => p.short === loan.coin_loan_asset
    );
    return principalCoinWallet;
  };

  static getCollateralCoinWallet = (walletSummary, loan) => {
    const collateralCoinWallet = walletSummary.coins.find(
      c => c.short === loan.coin
    );
    return collateralCoinWallet;
  };

  constructor(props) {
    super(props);
    const activeAlert = this.getFirstAlert(props.loanAlerts);
    const loan = LoanAlertsModalWrapper.getLoan(activeAlert, props.allLoans);
    this.state = { activeAlert, loan };
  }

  componentDidMount() {
    const { walletSummary } = this.props;
    const { loan } = this.state;
    if (loan) {
      const principalCoinWallet = LoanAlertsModalWrapper.getPrincipalCoinWallet(
        walletSummary,
        loan
      );
      const collateralCoinWallet = LoanAlertsModalWrapper.getCollateralCoinWallet(
        walletSummary,
        loan
      );
      this.setState({ loan, principalCoinWallet, collateralCoinWallet });
    }
  }

  getFirstAlert = loanAlerts => {
    if (!loanAlerts || !loanAlerts.length) return null;
    let activeAlert;
    loanAlerts.forEach(la => {
      if (la.type === LOAN_ALERTS.MARGIN_CALL_ALERT) activeAlert = la;
    });
    return activeAlert || loanAlerts[0];
  };

  renderPrincipalModal = loan => {
    const { principalCoinWallet } = this.state;
    const canPayPrincipal = loan.can_pay_principal;
    if (canPayPrincipal) {
      if (Number(loan.loan_amount) <= principalCoinWallet.amount.toNumber()) {
        return <LoanAlertsPayoutPrincipalModal loan={loan} />;
      }
      return <LoanAlertsDepositCoinsModal loan={loan} />;
    }
    return null;
  };

  renderMarginCallModal = loan => {
    const { collateralCoinWallet } = this.state;
    const activatedMarginCall = loan.margin_call_activated;
    const couldCoverMarginCallInCollateralCoin =
      loan.margin_call_amount <= collateralCoinWallet.amount;

    if (activatedMarginCall) {
      if (couldCoverMarginCallInCollateralCoin) {
        return <LoanAlertsMarginCallLockCoinModal loan={loan} />;
      }
      return (
        <LoanAlertsMarginCallDepositCoinsModal
          loan={loan}
          yesCopy={"Transfer coins"}
        />
      );
    }
    return null;
  };

  renderInterestModal = loan => {
    const { actions } = this.props;
    return (
      <InterestDueModal
        closeModal={actions.closeModal}
        activeLoan={loan}
        navigateTo={actions.navigateTo}
        alert
      />
    );
  };

  render() {
    const { activeAlert, loan } = this.state;
    if (!activeAlert || !loan) return null;

    switch (activeAlert.type) {
      case LOAN_ALERTS.INTEREST_ALERT:
        return this.renderInterestModal(loan);
      // case LOAN_ALERTS.PRINCIPAL_ALERT:
      //   return this.renderPrincipalModal(loan);
      case LOAN_ALERTS.MARGIN_CALL_ALERT:
        return this.renderMarginCallModal(loan);
    }
  }
}

export default LoanAlertsModalWrapper;
