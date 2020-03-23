// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import TransactionsIntersectionStyle from "./TransactionsIntersection.styles";
import TransactionDetailsDeposits from "../TransactionDetailsDeposits/TransactionDetailsDeposits";
import TransactionWithdrawDetails from "../TransactionWithdrawDetails/TransactionWithdrawDetails";
import TransactionDetailsCelPay from "../TransactionDetailsCelPay/TransactionDetailsCelPay";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import LoadingState from "../../atoms/LoadingState/LoadingState";
import { TRANSACTION_TYPES } from "../../../constants/DATA";

@connect(
  state => ({
    transaction: state.transactions.transactionDetails,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TransactionsIntersection extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Transaction Details",
    right: "profile",
  });

  componentDidMount = () => {
    const { actions, navigation } = this.props;
    const id = navigation.getParam("id");
    actions.getTransactionDetails(id);

    // ToDO: leave for the swiping?
    // this.interval = setInterval(() => {
    //   actions.getTransactionDetails(id);
    // }, 15000);
  };

  render() {
    // const style = TransactionsIntersectionStyle();
    const { transaction, callsInProgress, navigation } = this.props;
    const transactionId = navigation.getParam("id");
    // const transactionType = navigation.getParam("type");
    const loadingTransactionDetails = apiUtil.areCallsInProgress(
      [API.GET_TRANSACTION_DETAILS],
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
      case transaction.type.includes("DEPOSIT"):
        return <TransactionDetailsDeposits transaction={transaction} />;
      case transaction.type.includes("LOAN") ||
        transaction.type.includes("MARGIN") ||
        transaction.type.includes("COLLATERAL"):
        return; // TransactionLoanDetails
      case transaction.type.includes("CELPAY"):
        return <TransactionDetailsCelPay transaction={transaction} />;
      case transaction.type.includes("WITHDRAWAL"):
        return <TransactionWithdrawDetails transaction={transaction} />;
      case transaction.type.includes("INTEREST"):
        return; // TransactionInterestDetails
      case transaction.type.includes("REFERR"):
        return; // TransactionInterestDetails
      case transaction.type.includes("BONUS"):
        return; // TransactionInterestDetails
      case TRANSACTION_TYPES.CANCELED:
      case TRANSACTION_TYPES.IN:
      case TRANSACTION_TYPES.OUT:
        return; // TransactionGeneralDetails
    }
  }
}

export default TransactionsIntersection;
