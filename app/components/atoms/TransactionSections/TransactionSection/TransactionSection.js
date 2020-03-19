import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import TransactionSectionStyle from "./TransactionSection.styles";
import Card from "../../Card/Card";
import CelText from "../../CelText/CelText";
import STYLES from "../../../../constants/STYLES";
import CopyButton from "../../CopyButton/CopyButton";

const TransactionSection = ({ transaction, text, actions }) => {
  const style = TransactionSectionStyle();
  return transaction && transaction.transaction_id ? (
    <View style={style.container}>
      <Card margin={"20 0 20 0"}>
        <View style={style.content}>
          <CelText style={{ color: STYLES.COLORS.MEDIUM_GRAY }}>{text}</CelText>
        </View>
        <CelText weight="500" style={style.text} type="H4">
          {transaction.transaction_id}
        </CelText>
        <CopyButton
          text="Copy ID"
          color={STYLES.COLORS.CELSIUS_BLUE}
          copyText={transaction.transaction_id}
          onCopy={() => {
            actions.showMessage(
              "success",
              "Transaction ID copied to clipboard!"
            );
          }}
        />
      </Card>
    </View>
  ) : null;
};

TransactionSection.propTypes = {
  transaction: PropTypes.instanceOf(Object),
  text: PropTypes.string,
  actions: PropTypes.instanceOf(Object),
};

export default TransactionSection;
