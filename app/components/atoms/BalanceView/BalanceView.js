import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import BalanceViewStyle from "./BalanceView.styles";
import CelText from "../../atoms/CelText/CelText";
import formatter from "../../../utils/formatter";

const BalanceView = props => {
  const style = BalanceViewStyle();
  const { crypto, usd, coin } = props;

  return (
    <View style={style.view}>
      <CelText align="right" type="H7" weight={"300"} style={style.text}>
        Balance:{" "}
        {`${formatter.crypto(
          formatter.getEllipsisAmount(formatter.removeDecimalZeros(crypto), -8)
        )} ${coin}  |   ${formatter.usd(formatter.floor10(usd, -2))} USD`}
      </CelText>
    </View>
  );
};

BalanceView.propTypes = {
  usd: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  crypto: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default BalanceView;
