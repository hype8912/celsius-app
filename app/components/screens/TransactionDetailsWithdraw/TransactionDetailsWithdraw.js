import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import TxInfoSection from "../../atoms/TxInfoSection/TxInfoSection";
import TxAddressSection from "../../atoms/TxAddressSection/TxAddressSection";
import TxBasicSection from "../../atoms/TxBasicSection/TxBasicSection";
import CelButton from "../../atoms/CelButton/CelButton";
import STYLES from "../../../constants/STYLES";
import { TRANSACTION_TYPES } from "../../../constants/DATA";

class TransactionDetailsWithdraw extends Component {
  static propTypes = {
    transaction: PropTypes.string,
  };
  static defaultProps = {};

  render() {
    // const style = TransactionDetailsDepositsStyle();
    const { transaction, actions } = this.props;
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
            text="Withdrawn to:"
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
            onPress={() => actions.navigateTo("WalletLanding")}
          >
            Go Back to Wallet
          </CelButton>
          {transaction.type !== TRANSACTION_TYPES.WITHDRAWAL_CANCELED && (
            <CelButton
              margin={"20 0 0 0"}
              color={STYLES.COLORS.RED}
              basic
              onPress={() => actions.cancelWithdrawal(transaction.id)}
            >
              Cancel Withdrawal
            </CelButton>
          )}
        </View>
      </RegularLayout>
    );
  }
}

export default TransactionDetailsWithdraw;
