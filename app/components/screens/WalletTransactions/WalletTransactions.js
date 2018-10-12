import { hook } from 'cavy';
import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import WalletLayout from "../../layouts/WalletLayout/WalletLayout";
import TransactionsHistory from "../../molecules/TransactionHistory/TransactionsHistory";

import { GLOBAL_STYLE_DEFINITIONS as globalStyles } from "../../../config/constants/style";
import CelButton from "../../atoms/CelButton/CelButton";
import Loader from "../../atoms/Loader/Loader";
import WalletTransactionsStyle from "./WalletTransactions.styles";
import apiUtil from "../../../utils/api-util";
import API from "../../../config/constants/API";


@connect(
  state => ({
    transactions: state.wallet.transactions,
    currencyRatesShort: state.generalData.currencyRatesShort,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WalletTransactions extends Component {
  // lifecycle methods
  componentDidMount() {
    const { actions } = this.props;
    actions.getAllTransactions();
  }

  componentWillReceiveProps(nextProps) {
    const { activeScreen, actions } = this.props;

    if (activeScreen !== nextProps.activeScreen && nextProps.activeScreen === "WalletTransactions") {
      actions.getAllTransactions();
    }
  }

  // event hanlders
  getTransactions() {
    const { transactions } = this.props;
    if (!transactions) return [];

    const transactionIds = Object.keys(transactions);
    const transactionArray = [];
    transactionIds.forEach(tid => transactionArray.push(transactions[tid]));
    return transactionArray;
  }

  // rendering methods
  render() {
    const { currencyRatesShort, actions, callsInProgress } = this.props;
    const transactions = this.getTransactions();
    const isLoading = apiUtil.areCallsInProgress([API.GET_ALL_TRANSACTIONS], callsInProgress) && !transactions.length;

    if (isLoading) return (
      <WalletLayout>
        <Loader/>
      </WalletLayout>
    )

    if (!transactions.length) return (
      <WalletLayout>
        <View>
          <Image source={require("../../../../assets/images/deerTransactionHistory.png")}
                 style={WalletTransactionsStyle.image}/>
          <View>
            <Text style={[globalStyles.heading, WalletTransactionsStyle.header]}>There are no transactions recorded</Text>
            <Text style={[globalStyles.normalText, WalletTransactionsStyle.text]}>Your transaction history will appear here after your first
              transaction. You can start by adding funds.</Text>
          </View>

          <CelButton
            ref={this.props.generateTestHook('WalletTransactions.AddFunds')}
            onPress={() => actions.navigateTo("AddFunds")}
          >
            Add Funds
          </CelButton>
        </View>
      </WalletLayout>
    );

    return (

      <WalletLayout>
          <TransactionsHistory
            transactions={transactions}
            navigateTo={actions.navigateTo}
            currencyRatesShort={currencyRatesShort}
          />
      </WalletLayout>
    );
  }
}

// export default WalletTransactions;
const TestHook = hook(WalletTransactions)
export default TestHook;
