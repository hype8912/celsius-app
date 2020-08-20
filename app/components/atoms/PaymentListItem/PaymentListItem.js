import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import moment from "moment";

import PaymentListItemStyle from "./PaymentListItem.styles";
import CelText from "../CelText/CelText";
import Separator from "../Separator/Separator";
import formatter from "../../../utils/formatter";
import STYLES from "../../../constants/STYLES";

const PaymentListItem = ({ payment, upperText, type }) => {
  const style = PaymentListItemStyle();

  const wrapperStyles = [style.baseWrapper];
  if (type) wrapperStyles.push(style[`${type}Wrapper`]);

  let textColor;
  if (type === "green") textColor = "#FFF";

  const amount = payment.isPaid ? payment.amountPaid : payment.amountToPay;
  const amountDisplay = payment.coin
    ? formatter.crypto(amount, payment.coin)
    : formatter.usd(amount);

  let paymentType;

  if (payment.type === "monthly_interest")
    paymentType = {
      type: "Loan Interest",
      color: STYLES.COLORS.RED,
      sign: "-",
    };
  if (payment.type === "receiving_principal_back")
    paymentType = { type: "Principal", color: STYLES.COLORS.RED, sign: "-" };

  return (
    <View>
      {upperText ? (
        <View style={style.upperTextWrapper}>
          <CelText color={style.upperText.color} align="center" type="H6">
            {upperText}
          </CelText>
        </View>
      ) : null}

      <View style={wrapperStyles}>
        <View style={style.textWrapper}>
          <View style={{ alignItems: "center" }}>
            <CelText weight="300" color={textColor} type="H7">
              {moment(payment.dueDate).format("D")}
            </CelText>
            <CelText weight="300" color={textColor} type="H7">
              {moment(payment.dueDate)
                .format("MMM")
                .toUpperCase()}
            </CelText>
          </View>
          <View style={{ alignItems: "flex-start" }}>
            <CelText weight="500" color={textColor} type="H5">
              {paymentType.type}
            </CelText>
            <CelText
              weight="500"
              type="H7"
              color={textColor || paymentType.color}
            >
              {formatter.capitalize(payment.status)}
            </CelText>
          </View>
          <CelText weight="600" color={textColor} type="H4">
            {`${paymentType.sign}${amountDisplay}`}
          </CelText>
        </View>
        <Separator />
      </View>
    </View>
  );
};

PaymentListItem.propTypes = {
  payment: PropTypes.instanceOf(Object),
  upperText: PropTypes.string,
  type: PropTypes.oneOf(["green", "highlight"]),
};

export default PaymentListItem;
