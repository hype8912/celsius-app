import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import TxBasicSection from "../../atoms/TxBasicSection/TxBasicSection";
import TxInfoSection from "../../atoms/TxInfoSection/TxInfoSection";
import TxAddressSection from "../../atoms/TxAddressSection/TxAddressSection";
import CelButton from "../../atoms/CelButton/CelButton";
import { SCREENS } from "../../../constants/SCREENS";

class TransactionDetailsDeposits extends Component {
  static propTypes = {
    transaction: PropTypes.string,
    navigateTo: PropTypes.func,
  };
  static defaultProps = {};

  render() {
    // const style = TransactionDetailsDepositsStyle();
    const { transaction, navigateTo } = this.props;
    const transactionProps = transaction.uiProps;

    return (
      <RegularLayout>
        <View>
          <TxInfoSection
            margin="40 0 20 0"
            transaction={transaction}
            transactionProps={transactionProps}
          />
          <TxAddressSection
            transaction={transaction}
            address={transaction.from_address}
            text="Received from:"
          />
          <TxBasicSection
            label={"Date"}
            value={moment(transaction.time).format("D MMM YYYY")}
          />
          <TxBasicSection
            label={"Time"}
            value={moment.utc(transaction.time).format("h:mm A (z)")}
          />
          <CelButton
            margin={"40 0 0 0"}
            onPress={() => navigateTo(SCREENS.DEPOSIT)}
          >
            Deposit new coins
          </CelButton>
          <CelButton
            margin={"20 0 0 0"}
            basic
            onPress={() => navigateTo(SCREENS.WALLET_LANDING)}
          >
            Go Back to Wallet
          </CelButton>
        </View>
      </RegularLayout>
    );
  }
}

export default TransactionDetailsDeposits;
