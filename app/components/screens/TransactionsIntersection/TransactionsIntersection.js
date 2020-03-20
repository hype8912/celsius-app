// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import TransactionsIntersectionStyle from "./TransactionsIntersection.styles";
// import CelText from '../../atoms/CelText/CelText';
// import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import { TRANSACTION_TYPES } from "../../../constants/DATA";

@connect(
  state => ({
    transaction: state.transactions.transactionDetails,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TransactionsIntersection extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "TransactionsIntersection Screen",
    right: "profile",
  });

  render() {
    // const style = TransactionsIntersectionStyle();
    const { transaction } = this.props;

    switch (transaction.type) {
      case TRANSACTION_TYPES.DEPOSIT_CONFIRMED:
      case TRANSACTION_TYPES.DEPOSIT_PENDING:
        return; // TransactionDetailsDeposits
      case TRANSACTION_TYPES.LOAN_INTEREST:
      case TRANSACTION_TYPES.LOAN_PRINCIPAL_PAYMENT:
      case TRANSACTION_TYPES.LOAN_PRINCIPAL_RECEIVED:
      case TRANSACTION_TYPES.MARGIN_CALL:
      case TRANSACTION_TYPES.COLLATERAL_LIQUIDATED:
      case TRANSACTION_TYPES.COLLATERAL_LOCKED:
      case TRANSACTION_TYPES.COLLATERAL_PENDING:
      case TRANSACTION_TYPES.COLLATERAL_UNLOCKED:
        return; // TransactionLoanDetails
      case TRANSACTION_TYPES.CELPAY_PENDING_VERIFICATION:
      case TRANSACTION_TYPES.CELPAY_PENDING:
      case TRANSACTION_TYPES.CELPAY_CANCELED:
      case TRANSACTION_TYPES.CELPAY_CLAIMED:
      case TRANSACTION_TYPES.CELPAY_EXPIRED:
      case TRANSACTION_TYPES.CELPAY_ONHOLD:
      case TRANSACTION_TYPES.CELPAY_RECEIVED:
      case TRANSACTION_TYPES.CELPAY_RETURNED:
      case TRANSACTION_TYPES.CELPAY_SENT:
        return; // TransactionCelpayDetails
      case TRANSACTION_TYPES.WITHDRAWAL_CONFIRMED:
      case TRANSACTION_TYPES.WITHDRAWAL_PENDING:
      case TRANSACTION_TYPES.WITHDRAWAL_CANCELED:
      case TRANSACTION_TYPES.WITHDRAWAL_PENDING_VERIFICATION:
      case TRANSACTION_TYPES.WITHDRAWAL_PENDING_REVIEW:
        return; // TransactionWithdrawDetails
      case TRANSACTION_TYPES.INTEREST:
      case TRANSACTION_TYPES.PENDING_INTEREST:
        return; // TransactionInterestDetails
      case "canceled":
      case "in":
      case "out":
        return; // TransactionGeneralDetails
      // PROMO_CODE_BONUS
      // REFERRED_HODL
      // REFERRED
      // REFERRED_PENDING
      // REFERRER_HODL
      // REFERRER
      // REFERRER_PENDING
      // BONUS_TOKEN
    }
  }
}

export default TransactionsIntersection;
