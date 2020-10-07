import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { LOAN_ALERTS } from "../../../constants/UI";
import * as appActions from "../../../redux/actions";
import LoanAlertsPayoutPrincipalModal from "./LoanAlertsPayoutPrincipalModal/LoanAlertsPayoutPrincipalModal";
import LoanAlertsDepositCoinsModal from "./LoanAlertsDepositCoinsModal/LoanAlertsDepositCoinsModal";
import InterestDueModal from "../InterestDueModal/InterestDueModal";
import InterestReminderModal from "../InterestReminderModal/InterestReminderModal";
import loanPaymentUtil from "../../../utils/loanPayment-util";
import MarginCallModal from "../MarginCallModal/MarginCallModal";
import PrincipalAlertModal from "../PrincipalAlertModal/PrincipalAlertModal";

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
        la => la.type === LOAN_ALERTS.MARGIN_CALL_ALERT
      );
      activeAlert =
        activeAlert ||
        nextProps.loanAlerts.find(la => la.type === LOAN_ALERTS.INTEREST_ALERT);
      activeAlert =
        activeAlert ||
        nextProps.loanAlerts.find(
          la => la.type === LOAN_ALERTS.PRINCIPAL_ALERT
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
    let principalCoinWallet;
    if (loan.coin_loan_asset === "USD") {
      principalCoinWallet = "USD";
    } else {
      principalCoinWallet = walletSummary.coins.find(
        p => p.short === loan.coin_loan_asset
      );
    }
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

  componentDidMount = () => {
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
  };

  getFirstAlert = loanAlerts => {
    if (!loanAlerts || !loanAlerts.length) return null;
    let activeAlert;
    loanAlerts
      .sort((a, b) => b.id - a.id)
      .forEach(la => {
        if (la.type === LOAN_ALERTS.MARGIN_CALL_ALERT) activeAlert = la;
      });
    return activeAlert || loanAlerts[0];
  };

  renderPrincipalModal = loan => {
    const { actions } = this.props;
    const { principalCoinWallet } = this.state;
    const canPayPrincipal = loan.can_pay_principal;
    if (principalCoinWallet === "USD") {
      actions.showMessage("error", "Can't pay principal in USD");
      return null;
    }
    const isPrincipalWeekAway = loanPaymentUtil.isPrincipalWeekAway(loan);
    if (isPrincipalWeekAway)
      return <PrincipalAlertModal actions={actions} loan={loan} />;
    if (canPayPrincipal) {
      if (Number(loan.loan_amount) <= principalCoinWallet.amount.toNumber()) {
        return <LoanAlertsPayoutPrincipalModal loan={loan} />;
      }
      return <LoanAlertsDepositCoinsModal loan={loan} />;
    }
    return null;
  };

  renderMarginCallModal = loan => {
    const activatedMarginCall = loan.margin_call_activated;

    if (activatedMarginCall) {
      return <MarginCallModal />;
    }
    return null;
  };

  renderInterestModal = loan => {
    const { actions } = this.props;
    const { activeAlert } = this.state;

    // if no money reminder 3 & 7 days. If you have money and manual payment set, reminder in 3 days
    const payment = loanPaymentUtil.calculateAdditionalPayment(loan);
    const isSameDay = loanPaymentUtil.isSameInterestDay(loan);
    const hasNoMoney =
      !payment.hasEnough &&
      isSameDay &&
      (isSameDay.sevenDays || isSameDay.threeDays);
    const manuelPaymentNoMoney =
      payment.hasEnough &&
      loan.loanPaymentSettings &&
      !loan.loanPaymentSettings.automatic_interest_payment &&
      isSameDay &&
      isSameDay.threeDays;

    if (hasNoMoney || manuelPaymentNoMoney) {
      return (
        <InterestReminderModal
          closeModal={actions.closeModal}
          navigateTo={actions.navigateTo}
          activeLoan={loan}
          isSameDay={isSameDay}
        />
      );
    }

    return (
      <InterestDueModal
        closeModal={actions.closeModal}
        navigateTo={actions.navigateTo}
        activeLoan={loan}
        alert={activeAlert}
      />
    );
  };

  render() {
    const { activeAlert, loan } = this.state;
    if (!activeAlert || !loan) return null;

    switch (activeAlert.type) {
      case LOAN_ALERTS.INTEREST_ALERT:
        return this.renderInterestModal(loan);
      case LOAN_ALERTS.PRINCIPAL_ALERT:
        return this.renderPrincipalModal(loan);
      case LOAN_ALERTS.MARGIN_CALL_ALERT:
        return this.renderMarginCallModal(loan);
    }
  }
}

export default LoanAlertsModalWrapper;
