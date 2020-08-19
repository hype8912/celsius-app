import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import TransactionRow from "../../atoms/TransactionRow/TransactionRow";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import LoadingState from "../../atoms/LoadingState/LoadingState";
import * as appActions from "../../../redux/actions";
import EmptyState from "../../atoms/EmptyState/EmptyState";

@connect(
  state => ({
    buyCoinsPayments: state.buyCoins.payments,
    currencyRatesShort: state.currencies.currencyRatesShort,
    currencies: state.currencies.rates,
    callsInProgress: state.api.callsInProgress,
    activeScreen: state.nav.activeScreen,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BuyCoinsPaymentsHistory extends Component {
  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    const { actions } = this.props;
    actions.getPaymentRequests();
  }

  componentWillUpdate(nextProps) {
    const { activeScreen, actions } = this.props;

    if (
      activeScreen !== nextProps.activeScreen &&
      nextProps.activeScreen === "GetCoinsLanding"
    ) {
      actions.getPaymentRequests();
    }
  }

  render() {
    const { buyCoinsPayments, callsInProgress, actions } = this.props;

    if (
      !buyCoinsPayments.length &&
      apiUtil.areCallsInProgress([API.GET_PAYMENT_REQUESTS], callsInProgress)
    ) {
      return <LoadingState />;
    }

    return (
      <View>
        {!buyCoinsPayments.length && (
          <View>
            <EmptyState
              heading="Transaction History"
              paragraphs={[
                "Purchases made through your Celsius app will appear here.",
              ]}
            />
          </View>
        )}

        <View>
          <FlatList
            data={buyCoinsPayments}
            renderItem={({ item, index }) => (
              <TransactionRow
                transaction={item}
                index={index}
                count={buyCoinsPayments.length}
                onPress={() =>
                  actions.navigateTo("GetCoinsTransactionDetails", {
                    id: item.id,
                  })
                }
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    );
  }
}

export default BuyCoinsPaymentsHistory;
