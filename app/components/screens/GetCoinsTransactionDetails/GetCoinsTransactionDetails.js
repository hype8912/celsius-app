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
          label: "Payment ID",
          value: transaction.id
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

  getStatusType = status => {
    switch (status) {
      case "approved":
        return {
          color: STYLES.COLORS.GREEN,
          text: "Confirmed"
        }
      case "declined":
        return {
          color: STYLES.COLORS.RED,
          text: "Canceled"
        }
      default:
        return {
          color: STYLES.COLORS.ORANGE,
          text: "Pending"
        }
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
      iconName: "TransactionCC",
      color: this.getStatusType(transactionParams.status).color,
      statusText: formatter.capitalize(this.getStatusType(transactionParams.status).text),
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
