import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import moment from "moment";

import PaymentListItemStyle from "./PaymentListItem.styles";
import CelText from "../CelText/CelText";
import Separator from "../Separator/Separator";
import formatter from "../../../utils/formatter";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { getColor } from "../../../utils/styles-util";
import { LOAN_PAYMENT_TYPES } from "../../../constants/DATA";

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

  if (payment.type === LOAN_PAYMENT_TYPES.MONTHLY_INTEREST)
    paymentType = {
      type: "Loan Interest",
      color: getColor(COLOR_KEYS.NEGATIVE_STATE),
      sign: "-",
    };
  if (payment.type === LOAN_PAYMENT_TYPES.RECEIVING_PRINCIPAL_BACK)
    paymentType = {
      type: "Principal",
      color: getColor(COLOR_KEYS.NEGATIVE_STATE),
      sign: "-",
    };

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
