import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import InfoSectionStyle from "./TxInfoSection.styles";
import Icon from "../Icon/Icon";
import CelText from "../CelText/CelText";
import formatter from "../../../utils/formatter";
import STYLES from "../../../constants/STYLES";

const TxInfoSection = ({ transaction, transactionProps }) => {
  const style = InfoSectionStyle();
  return (
    <View style={style.container}>
      <View style={style.statusText}>
        <Icon
          width={transaction.amount_usd ? "12" : "24"}
          fill={transactionProps.color}
          name={transactionProps.iconName}
          style={{ marginRight: 5 }}
        />
        <CelText color={transactionProps.color}>
          {transactionProps.statusText}
        </CelText>
      </View>

      <CelText margin="0 0 10 0" type="H1" align="center">
        {formatter.crypto(transaction.amount, transaction.coin.toUpperCase(), {
          precision: 5,
        })}
      </CelText>
      <CelText color={STYLES.COLORS.MEDIUM_GRAY} type="H3" align="center">
        {transaction.amount_usd
          ? formatter.usd(transaction.amount_usd)
          : `${formatter.fiat(
              transaction.fiat_amount,
              transaction.fiat_currency
            )}`}
      </CelText>
    </View>
  );
};

TxInfoSection.propTypes = {
  transaction: PropTypes.instanceOf(Object),
  transactionProps: PropTypes.instanceOf(Object),
};

export default TxInfoSection;
