import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import moment from "moment";

import PaymentListItemStyle from "./PaymentListItem.styles";
import CelText from "../CelText/CelText";
import Separator from "../Separator/Separator";
import formatter from "../../../utils/formatter";

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
          <CelText weight="600" color={textColor} type="H3">
            {amountDisplay}
          </CelText>
          <CelText weight="300" color={textColor} type="H6">
            {moment(payment.dueDate).format("MMM D, YYYY")}
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
