import React, { Component } from "react";
import { View } from "react-native";

import AllTransactionsStyle from "./AllTransactions.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import TransactionsHistory from "../../molecules/TransactionsHistory/TransactionsHistory";

class AllTransactions extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = ({ navigation }) => {
    const transactionType = navigation.getParam("transactionType");
    const coin = navigation.getParam("coin");

    return {
      title: `${
        transactionType
          ? transactionType[0].charAt(0).toUpperCase() +
            transactionType[0].slice(1)
          : coin || "Transaction"
      } history`,
      right: "profile",
    };
  };

  render() {
    const { navigation } = this.props;
    const style = AllTransactionsStyle();
    const additionalFilter = navigation.getParam("additionalFilter");

    return (
      <RegularLayout>
        <View style={style.container}>
          <TransactionsHistory
            hasFilter={!(additionalFilter.type || additionalFilter.coin)}
            hasTitle={false}
            additionalFilter={
              additionalFilter.type || additionalFilter.coin
                ? { coin: additionalFilter.coin, type: additionalFilter.type }
                : null
            }
          />
        </View>
      </RegularLayout>
    );
  }
}

export default AllTransactions;
