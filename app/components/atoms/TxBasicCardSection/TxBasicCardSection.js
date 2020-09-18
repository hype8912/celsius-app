import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import BasicCardSectionStyle from "./TxBasicCardSection.styles";
import CelText from "../CelText/CelText";
import formatter from "../../../utils/formatter";
import Card from "../Card/Card";
import Separator from "../Separator/Separator";

const TxBasicCardSection = ({ label, value, coin, monthly, total }) => {
  const style = BasicCardSectionStyle();
  const coinSize = coin === "USDT ERC20" ? "H6" : "H4";

  return (
    <View style={style.container}>
      <View style={style.percentage}>
        <CelText type="H6">{label}:</CelText>
        <CelText type="H6">{`${formatter.percentage(value)} %`}</CelText>
      </View>
      <Card>
        <View style={style.amount}>
          <View>
            <CelText type={"H6"}>Monthly Interest</CelText>
            <CelText type={coinSize} weight={"600"}>
              {" "}
              {formatter.usd(monthly)}
            </CelText>
          </View>
          <Separator vertical />
          <View>
            <CelText type={"H6"}>Total Interest</CelText>
            <CelText type={coinSize} weight={"600"}>
              {formatter.usd(total)}
            </CelText>
          </View>
        </View>
      </Card>
    </View>
  );
};

TxBasicCardSection.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  coin: PropTypes.string,
  monthly: PropTypes.string,
  total: PropTypes.string,
};

export default TxBasicCardSection;
