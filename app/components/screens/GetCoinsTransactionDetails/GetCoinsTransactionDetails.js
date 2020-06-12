import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import formatter from "../../../utils/formatter";
import TxInfoSection from "../../atoms/TxInfoSection/TxInfoSection";
import TxBasicSection from "../../atoms/TxBasicSection/TxBasicSection";

@connect(
  state => ({
    payments: state.buyCoins.payments,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class GetCoinsTransactionDetails extends Component {
  static navigationOptions = () => ({
    title: "Buying Coins",
    right: "profile",
  });

  render() {
    const { payments, navigation } = this.props;
    const id = navigation.getParam("id");
    const transaction = payments.find(t => t.id === id);

    const isSimplexTransaction = transaction.provider === "simplex";

    return (
      <RegularLayout padding="0 20 120 20">
        <TxInfoSection
          margin="40 0 20 0"
          key={"button:back"}
          transaction={transaction}
          transactionProps={transaction.uiProps}
        />

        <TxBasicSection
          label="Date"
          value={moment(transaction.created_at).format("DD MMM YYYY")}
        />
        <TxBasicSection
          label="Time"
          value={moment(transaction.created_at).format("HH:mm")}
        />
        <TxBasicSection
          label="Payment method"
          value={transaction.paymentMethod}
        />
        <TxBasicSection
          label="Provider"
          value={formatter.capitalize(transaction.provider)}
        />
        {isSimplexTransaction && (
          <TxBasicSection label="Order ID" value={transaction.orderID} />
        )}
        <TxBasicSection
          label="Currency"
          value={transaction.fiat_currency.toUpperCase()}
        />
        {isSimplexTransaction && (
          <TxBasicSection
            label="Price"
            value={formatter.fiat(
              transaction.fiat_amount - transaction.fee,
              transaction.fiat_currency
            )}
          />
        )}
        {isSimplexTransaction && (
          <TxBasicSection
            label="Fee"
            value={formatter.fiat(transaction.fee, transaction.fiat_currency)}
          />
        )}
        <TxBasicSection
          label="Transfer Amount"
          value={formatter.fiat(
            transaction.fiat_amount,
            transaction.fiat_currency
          )}
        />
      </RegularLayout>
    );
  }
}

export default GetCoinsTransactionDetails;
