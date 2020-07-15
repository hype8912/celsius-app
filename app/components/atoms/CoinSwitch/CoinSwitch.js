import React from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native";

import CoinSwitchStyle from "./CoinSwitch.styles";
import CelText from "../CelText/CelText";
import formatter from "../../../utils/formatter";
import Icon from "../Icon/Icon";
import {
  getColor,
  getScaledFont,
  getFontSize,
  getTheme,
} from "../../../utils/styles-util";
import Spinner from "../Spinner/Spinner";
import { COLOR_KEYS } from "../../../constants/COLORS";

const CoinSwitch = props => {
  const {
    isUsd,
    amountUsd,
    amountCrypto,
    updateFormField,
    coin,
    amountColor,
    doubleTilde,
    lowerSpinner,
    theme: inheritTheme,
  } = props;

  // `$ ${amountUsd || '0.00'}` format a number to $ 21.32 or set default value as 0.00
  const upperValue = isUsd
    ? `$ ${amountUsd || "0.00"}`
    : `${formatter.getEllipsisAmount(amountCrypto || "0.00", -5)}`;
  const lowerValue = !isUsd
    ? `$ ${amountUsd || "0.00"} USD`
    : `${formatter.getEllipsisAmount(amountCrypto || "0.00", -5)} ${coin}`;

  const theme = inheritTheme || getTheme();
  const style = CoinSwitchStyle(theme);

  return (
    <View style={style.container}>
      {!isUsd ? (
        <Icon
          name={`Icon${coin}`}
          width="40"
          height="40"
          fill={COLOR_KEYS.HEADLINE}
          style={{ marginBottom: 28 }}
        />
      ) : (
        <View style={{ width: 40 }} />
      )}
      {props.onAmountPress ? (
        <View>
          <TouchableOpacity disabled={!coin} onPress={props.onAmountPress}>
            <View
              style={{
                height: getScaledFont(getFontSize("H1")),
                justifyContent: "center",
                marginVertical: 10,
              }}
            >
              <CelText
                align="center"
                type="H1"
                weight="regular"
                size={getFontSize("H1") - upperValue.length}
                color={amountColor}
              >
                {upperValue}
              </CelText>
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: getScaledFont(getFontSize("H2")),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {lowerSpinner ? (
              <Spinner size={30} />
            ) : (
              <CelText
                align="center"
                type="H2"
                color={getColor(COLOR_KEYS.PARAGRAPH)}
                size={getFontSize("H2") - lowerValue.length / 2}
              >
                {doubleTilde && "≈"} {lowerValue}
              </CelText>
            )}
          </View>
        </View>
      ) : (
        <View>
          <View
            style={{
              height: getScaledFont(getFontSize("H1")),
              justifyContent: "center",
            }}
          >
            <CelText
              align="center"
              type="H1"
              style={{ height: getScaledFont(getFontSize("H1")) }}
              size={getFontSize("H1") - upperValue.length}
              margin="10 0 10 0"
              weight="regular"
              color={amountColor}
            >
              {upperValue}
            </CelText>
          </View>
          <View
            style={{
              height: getScaledFont(getFontSize("H2")),
              justifyContent: "center",
            }}
          >
            <CelText
              align="center"
              type="H2"
              color={getColor(COLOR_KEYS.PARAGRAPH)}
              style={{ height: getScaledFont(getFontSize("H2")) }}
              size={getFontSize("H2") - lowerValue.length / 2}
            >
              {doubleTilde && "≈"} {lowerValue}
            </CelText>
          </View>
        </View>
      )}
      <View style={style.switchButton}>
        <TouchableOpacity onPress={() => updateFormField("isUsd", !isUsd)}>
          <Icon
            name="Switch"
            width="25"
            height="25"
            fill={COLOR_KEYS.HEADLINE}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

CoinSwitch.propTypes = {
  isUsd: PropTypes.bool,
  noUsdDecimals: PropTypes.bool,
  amountUsd: PropTypes.string,
  amountCrypto: PropTypes.string,
  updateFormField: PropTypes.func.isRequired,
  onAmountPress: PropTypes.func,
  coin: PropTypes.string,
  amountColor: PropTypes.string,
  theme: PropTypes.string,
  lowerSpinner: PropTypes.bool,
};

export default CoinSwitch;
