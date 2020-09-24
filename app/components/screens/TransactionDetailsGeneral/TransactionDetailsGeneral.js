import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

// import TransactionDetailsGeneralStyle from "./TransactionDetailsGeneral.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import TxInfoSection from "../../atoms/TxInfoSection/TxInfoSection";
import TxBasicSection from "../../atoms/TxBasicSection/TxBasicSection";

class TransactionDetailsGeneral extends Component {
  static propTypes = {
    transaction: PropTypes.instanceOf(Object),
  };
  static defaultProps = {};

  render() {
    // const style = TransactionDetailsGeneralStyle();
    const { transaction } = this.props;
    const transactionProps = transaction.uiProps;

    return (
      <RegularLayout>
        <View>
          <TxInfoSection
            margin="40 0 20 0"
            transaction={transaction}
            transactionProps={transactionProps}
          />

          <TxBasicSection
            label={"Date"}
            value={moment.utc(transaction.time).format("D MMM YYYY")}
          />

          <TxBasicSection
            label={"Time"}
            value={moment.utc(transaction.time).format("h:mm A (z)")}
          />
        </View>
      </RegularLayout>
    );
  }
}

export default TransactionDetailsGeneral;
