import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import CardSectionStyle from "./TxCardSection.styles";
import CelText from "../CelText/CelText";
import formatter from "../../../utils/formatter";
import Card from "../Card/Card";
import Separator from "../Separator/Separator";

const TxCardSection = ({
  coinAmount,
  coin,
  cardText,
  amount,
  title,
  noSeparator = false,
}) => {
  const style = CardSectionStyle();
  return (
    <View style={style.container}>
      <View style={style.content}>
        <CelText type="H6" margin="0 0 10 0">
          {title}
        </CelText>
        {coin && (
          <CelText type="H6">
            {formatter.crypto(coinAmount, coin.toUpperCase())}
          </CelText>
        )}
        {amount && <CelText hideFromRecording type="H6">{formatter.usd(amount)}</CelText>}
      </View>
      {cardText && (
        <Card padding="20 10 20 10">
          <CelText type={"H6"}>{cardText}</CelText>
        </Card>
      )}
      {!noSeparator && <Separator />}
    </View>
  );
};

TxCardSection.propTypes = {
  coinAmount: PropTypes.string,
  coin: PropTypes.string,
  cardText: PropTypes.string,
  amount: PropTypes.string,
  title: PropTypes.string,
  noSeparator: PropTypes.bool,
};

export default TxCardSection;
