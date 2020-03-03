import React, { Component } from 'react';
import { View } from 'react-native';


import AllTransactionsStyle from "./AllTransactions.styles";
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import TransactionsHistory from '../../molecules/TransactionsHistory/TransactionsHistory';

class AllTransactions extends Component {
  static propTypes = {};
  static defaultProps = {}

  static navigationOptions = {
    title: 'Transaction history',
    right: 'profile'
  };
  
  render() {
    const style = AllTransactionsStyle();

    return (
      <RegularLayout>
        <View style={style.container}>
          <TransactionsHistory />
        </View>
      </RegularLayout>
    )
  }
}

export default AllTransactions
