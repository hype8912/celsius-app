import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import moment from "moment";


import * as appActions from "../../../redux/actions";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import { BasicSection, InfoSection } from "../TransactionDetails/TransactionDetailsSections";
import STYLES from "../../../constants/STYLES";
import formatter from "../../../utils/formatter";
import { SIMPLEX_PAYMENT_STATUSES, TRANSACTION_TYPES } from "../../../constants/DATA";

@connect(
  state => ({
    payments: state.simplex.payments
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class GetCoinsTransactionDetails extends Component {

  static navigationOptions = () => ({
    title: "Buying Coins",
    right: "profile"
  });

  getTransactionsParams = () => {
    const { payments, navigation } = this.props
    const id = navigation.getParam("id")

    const transaction = payments
      .find(t => t.id === id)
    const orderIdSplitted = transaction.order_id.split("-")
    const orderIdPt1 = `${orderIdSplitted[0]} - ${orderIdSplitted[1]} - ${orderIdSplitted[2]}`
    const orderIdPt2 = `${orderIdSplitted[3]} - ${orderIdSplitted[4]}`

    console.log(orderIdPt1);

    const sortedTransaction = {
      ...transaction,
      transactionDetails: [
        {
          label: "Date",
          value: moment(transaction.created_at).format("DD MMM YYYY")
        },
        {
          label: "Time",
          value: moment(transaction.created_at).format("HH:mm")
        },
        {
          label: "Payment Method", // TODO: change hardcoded when BE is ready
          value: "Credit Card"
        },
        {
          label: "Order ID",
          value: `${orderIdPt1}
${orderIdPt2}`
        },
        {
          label: "Currency",
          value: transaction.fiat_currency
        },
        {
          label: "Price",
          value: `${transaction.fiat_amount - transaction.fee} ${transaction.fiat_currency}`
        },
        {
          label: "Fee",
          value: `${transaction.fee} ${transaction.fiat_currency}`
        },
        {
          label: "Transfer Amount",
          value: `${transaction.fiat_amount} ${transaction.fiat_currency}`
        },
      ]
    }

    return sortedTransaction
  }

  getStatusType = transactionParams => {

    switch (this.getType(transactionParams)) {
      case TRANSACTION_TYPES.DEPOSIT_CONFIRMED:
        return {
          color: STYLES.COLORS.GREEN,
          iconName: "TransactionCC",
          statusText: "Confirmed"
        }
      case TRANSACTION_TYPES.CANCELED:
        return {
          color: STYLES.COLORS.RED,
          iconName: "TransactionCC",
          statusText: "Canceled"
        }
      default:
        return {
          color: STYLES.COLORS.ORANGE,
          iconName: "TransactionCC",
          statusText: "Pending"
        }
    }
  }

  getType(transactionParams) {
    switch (transactionParams) {
      case SIMPLEX_PAYMENT_STATUSES.PENDING:
        return TRANSACTION_TYPES.DEPOSIT_PENDING;

      case SIMPLEX_PAYMENT_STATUSES.APPROVED:
        return TRANSACTION_TYPES.DEPOSIT_CONFIRMED;

      case SIMPLEX_PAYMENT_STATUSES.REFUNDED:
      case SIMPLEX_PAYMENT_STATUSES.CANCELLED:
        return TRANSACTION_TYPES.CANCELED;
    }
  }

  render() {
    const transactionParams = this.getTransactionsParams()

    const transaction = {
      amount: transactionParams.amount,
      fiat_amount: transactionParams.fiat_amount,
      fiat_currency: transactionParams.fiat_currency,
      coin: transactionParams.coin,
    }


    const transactionInfoProps = {
      ...this.getStatusType(transactionParams.status),
    }

    return (
      <RegularLayout padding="0 0 120 0">
        <InfoSection
          margin="40 0 20 0"
          key={"button:back"}
          transaction={transaction}
          transactionProps={transactionInfoProps}
        />

        {transactionParams.transactionDetails.map(i => (
          <BasicSection
            label={i.label}
            value={i.value}
          />
        ))}

      </RegularLayout>
    );
  }
}

export default GetCoinsTransactionDetails
