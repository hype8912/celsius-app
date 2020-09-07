import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import TransactionSectionStyle from "./TxTransactionSection.styles";
import Card from "../Card/Card";
import CelText from "../CelText/CelText";
import CopyButton from "../CopyButton/CopyButton";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const TxTransactionSection = ({ transaction, text, actions }) => {
  const style = TransactionSectionStyle();
  return transaction && transaction.transaction_id ? (
    <View>
      <Card margin={"20 0 20 0"}>
        <View style={style.content}>
          <CelText
            style={{ color: getColor(COLOR_KEYS.DOT_INDICATOR_INACTIVE) }}
          >
            {text}
          </CelText>
        </View>
        <CelText weight="500" style={style.text} type="H4">
          {transaction.transaction_id}
        </CelText>
        <CopyButton
          text="Copy ID"
          color={getColor(COLOR_KEYS.PRIMARY_BUTTON)}
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

TxTransactionSection.propTypes = {
  transaction: PropTypes.instanceOf(Object),
  text: PropTypes.string,
  actions: PropTypes.instanceOf(Object),
};

export default TxTransactionSection;
