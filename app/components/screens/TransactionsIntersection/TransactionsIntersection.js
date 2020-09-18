// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import TransactionsIntersectionStyle from "./TransactionsIntersection.styles";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import LoadingState from "../../atoms/LoadingState/LoadingState";
import { TRANSACTION_TYPES } from "../../../constants/DATA";
import TransactionDetailsInterest from "../TransactionDetailsInterest/TransactionDetailsInterest";
import TransactionDetailsRewards from "../TransactionDetailsRewards/TransactionDetailsRewards";
import TransactionDetailsLoans from "../TransactionDetailsLoans/TransactionDetailsLoans";
import TransactionDetailsGeneral from "../TransactionDetailsGeneral/TransactionDetailsGeneral";
import TransactionDetailsDeposits from "../TransactionDetailsDeposits/TransactionDetailsDeposits";
import TransactionDetailsWithdraw from "../TransactionDetailsWithdraw/TransactionDetailsWithdraw";
import TransactionDetailsCelPay from "../TransactionDetailsCelPay/TransactionDetailsCelPay";

@connect(
  state => ({
    transaction: state.transactions.transactionDetails,
    callsInProgress: state.api.callsInProgress,
    totalInterestEarned: state.wallet.summary.total_interest_earned,
    currencies: state.currencies.rates,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TransactionsIntersection extends Component {
  static propTypes = {};
  static defaultProps = {};
  constructor(props) {
    super(props);
    const { actions, navigation, transaction } = this.props;
    const id = navigation.getParam("id");

    if (id || transaction.id) {
      actions.getTransactionDetails(id || transaction.id);
    }
    this.interval = null;
  }

  static navigationOptions = ({ navigation }) => {
    const hide = navigation.getParam("hideBack");
    return {
      title: "Transaction Details",
      right: "profile",
      hideBack: hide,
    };
  };

  componentDidMount = async () => {
    const { actions, navigation, transaction } = this.props;
    const loanPayment = navigation.getParam("loanPayment");
    const id = navigation.getParam("id");
    actions.getAllTransactions();
    if (loanPayment) await actions.getAllLoans();
    this.interval = setInterval(() => {
      if (id || transaction.id) {
        actions.getTransactionDetails(id || transaction.id);
      }
    }, 15000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  extendTransactionObj = () => {
    const { transaction, currencies } = this.props;
    const coinFull =
      transaction &&
      currencies.find(
        c => c.short.toLowerCase() === transaction.coin.toLowerCase()
      ).displayName;
    const interestCoinFull =
      transaction &&
      currencies.find(
        c => c.short.toLowerCase() === transaction.interest_coin.toLowerCase()
      ).displayName;

    const extendedTransactionObj = {
      ...transaction,
      coinFull,
      interestCoinFull,
    };

    return extendedTransactionObj;
  };

  render() {
    // const style = TransactionsIntersectionStyle();
    const {
      transaction,
      callsInProgress,
      navigation,
      totalInterestEarned,
      actions,
    } = this.props;
    const transactionId = navigation.getParam("id");
    // const transactionType = navigation.getParam("type");
    // add API.GET_ALL_LOANS if necessary
    const loadingTransactionDetails = apiUtil.areCallsInProgress(
      [API.GET_TRANSACTION_DETAILS],
      callsInProgress
    );

    const cancelingCelPay = apiUtil.areCallsInProgress(
      [API.CANCEL_TRANSFER],
      callsInProgress
    );

    if (
      !transaction ||
      (loadingTransactionDetails &&
        transactionId &&
        transaction.id !== transactionId)
    )
      return (
        <RegularLayout padding="0 0 0 0">
          <LoadingState />
        </RegularLayout>
      );

    switch (transaction.type) {
      case TRANSACTION_TYPES.DEPOSIT_CONFIRMED:
      case TRANSACTION_TYPES.DEPOSIT_PENDING:
        return (
          <TransactionDetailsDeposits
            transaction={transaction}
            navigateTo={actions.navigateTo}
          />
        );
      case TRANSACTION_TYPES.LOAN_INTEREST:
      case TRANSACTION_TYPES.LOAN_PRINCIPAL_PAYMENT:
      case TRANSACTION_TYPES.LOAN_PRINCIPAL_RECEIVED:
      case TRANSACTION_TYPES.MARGIN_CALL:
      case TRANSACTION_TYPES.COLLATERAL_LIQUIDATED:
      case TRANSACTION_TYPES.COLLATERAL_LOCKED:
      case TRANSACTION_TYPES.COLLATERAL_PENDING:
      case TRANSACTION_TYPES.COLLATERAL_UNLOCKED:
        return (
          <TransactionDetailsLoans
            transaction={transaction}
            navigateTo={actions.navigateTo}
          />
        );
      case TRANSACTION_TYPES.CELPAY_PENDING_VERIFICATION:
      case TRANSACTION_TYPES.CELPAY_PENDING:
      case TRANSACTION_TYPES.CELPAY_CANCELED:
      case TRANSACTION_TYPES.CELPAY_CLAIMED:
      case TRANSACTION_TYPES.CELPAY_ONHOLD:
      case TRANSACTION_TYPES.CELPAY_RECEIVED:
      case TRANSACTION_TYPES.CELPAY_RETURNED:
      case TRANSACTION_TYPES.CELPAY_SENT:
        return (
          <TransactionDetailsCelPay
            transaction={transaction}
            navigateTo={actions.navigateTo}
            cancelTransfer={actions.cancelTransfer}
            cancelingCelPay={cancelingCelPay}
          />
        );
      case TRANSACTION_TYPES.WITHDRAWAL_CONFIRMED:
      case TRANSACTION_TYPES.WITHDRAWAL_UNCONFIRMED:
      case TRANSACTION_TYPES.WITHDRAWAL_FAILED:
      case TRANSACTION_TYPES.WITHDRAWAL_PENDING:
      case TRANSACTION_TYPES.WITHDRAWAL_CANCELED:
      case TRANSACTION_TYPES.WITHDRAWAL_PENDING_VERIFICATION:
      case TRANSACTION_TYPES.WITHDRAWAL_PENDING_REVIEW:
        return (
          <TransactionDetailsWithdraw
            transaction={transaction}
            cancelWithdrawal={actions.cancelWithdrawal}
            navigateTo={actions.navigateTo}
            callsInProgress={callsInProgress}
          />
        );
      case TRANSACTION_TYPES.INTEREST:
      case TRANSACTION_TYPES.PENDING_INTEREST:
        return (
          <TransactionDetailsInterest
            navigateTo={actions.navigateTo}
            transaction={this.extendTransactionObj()}
            totalInterest={totalInterestEarned}
          />
        );
      case TRANSACTION_TYPES.REFERRED_HODL:
      case TRANSACTION_TYPES.REFERRED:
      case TRANSACTION_TYPES.REFERRED_PENDING:
      case TRANSACTION_TYPES.REFERRER_HODL:
      case TRANSACTION_TYPES.REFERRER:
      case TRANSACTION_TYPES.REFERRER_PENDING:
      case TRANSACTION_TYPES.BONUS_TOKEN:
      case TRANSACTION_TYPES.PROMO_CODE_BONUS:
        return (
          <TransactionDetailsRewards
            transaction={transaction}
            navigateTo={actions.navigateTo}
          />
        );
      case TRANSACTION_TYPES.CANCELED:
      case TRANSACTION_TYPES.IN:
      case TRANSACTION_TYPES.OUT:
        return <TransactionDetailsGeneral transaction={transaction} />;
    }
  }
}

export default TransactionsIntersection;
