import React, { Component } from "react";
import { View, FlatList } from "react-native";
import moment from "moment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import TransactionRow from "../../atoms/TransactionRow/TransactionRow";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import LoadingState from "../../atoms/LoadingState/LoadingState";
import * as appActions from "../../../redux/actions";
import {
  SIMPLEX_PAYMENT_STATUSES,
  TRANSACTION_TYPES,
} from "../../../constants/DATA";
import STYLES from "../../../constants/STYLES";
import EmptyState from "../../atoms/EmptyState/EmptyState";

@connect(
  state => ({
    simplexPayments: state.simplex.payments,
    currencyRatesShort: state.currencies.currencyRatesShort,
    currencies: state.currencies.rates,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class SimplexPaymentsHistory extends Component {
  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    const { actions } = this.props;
    actions.getAllSimplexPayments();
  }

  getUIProps(payment) {
    switch (this.getType(payment)) {
      case TRANSACTION_TYPES.DEPOSIT_PENDING:
        return {
          color: STYLES.COLORS.ORANGE,
          iconName: "TransactionReceived",
          statusText: "Pending",
        };
      case TRANSACTION_TYPES.DEPOSIT_CONFIRMED:
        return {
          color: STYLES.COLORS.GREEN,
          iconName: "TransactionReceived",
          statusText: "Confirmed",
        };
      case TRANSACTION_TYPES.CANCELED:
        return {
          color: STYLES.COLORS.RED,
          iconName: "TransactionReceived",
          statusText: "Canceled",
        };
    }
  }

  getType(payment) {
    switch (payment.status) {
      case SIMPLEX_PAYMENT_STATUSES.PENDING:
        return TRANSACTION_TYPES.DEPOSIT_PENDING;

      case SIMPLEX_PAYMENT_STATUSES.APPROVED:
        return TRANSACTION_TYPES.DEPOSIT_CONFIRMED;

      case SIMPLEX_PAYMENT_STATUSES.REFUNDED:
      case SIMPLEX_PAYMENT_STATUSES.CANCELLED:
        return TRANSACTION_TYPES.CANCELED;
    }
  }

  prepPayments() {
    const { simplexPayments } = this.props;

    const paymentsDisplay = simplexPayments.map(p => ({
      ...p,
      id: p.id,
      amount: p.amount,
      amount_usd: p.fiat_amount,
      coin: p.coin,
      time: moment(p.created_at).isSame(moment(), "day")
        ? moment(p.created_at).format("HH:mm")
        : moment(p.created_at).format("DD MMM YYYY"),
      status: p.status,
      type: this.getType(p),
      uiProps: this.getUIProps(p),
    }));

    return paymentsDisplay;
  }

  render() {
    const { callsInProgress } = this.props;
    const payments = this.prepPayments();

    if (
      !payments.length &&
      apiUtil.areCallsInProgress([API.GET_PAYMENT_REQUESTS], callsInProgress)
    ) {
      return <LoadingState />;
    }

    return (
      <View>
        {!payments.length && (
          <View>
            <EmptyState
              heading="Transaction History"
              paragraphs={[
                "You haven’t purchased any coins yet! Any crypto purchases made through the Celsius app will appear here.",
              ]}
            />
          </View>
        )}

        <View>
          <FlatList
            data={payments.reverse()}
            renderItem={({ item, index }) => (
              <TransactionRow
                transaction={item}
                index={index}
                count={payments.length}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
  }
}

export default SimplexPaymentsHistory;
