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
    const transactionType = navigation.getParam("transactionType");
    const coin = navigation.getParam("coin");

    return (
      <RegularLayout>
        <View style={style.container}>
          <TransactionsHistory
            hasFilter={!(transactionType || coin)}
            additionalFilter={
              transactionType || coin ? { coin, type: transactionType } : null
            }
          />
        </View>
      </RegularLayout>
    );
  }
}

export default AllTransactions;
