import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, View } from "react-native";

import CelText from "../../atoms/CelText/CelText";
import SecurityScoreGaugeStyle from "./SecurityScoreGauge.styles";
// import CelButton from "../CelButton/CelButton";
import { SECURITY_STRENGTH_LEVEL } from "../../../constants/DATA";
import { getColor, getTheme } from "../../../utils/styles-util";
import CelButton from "../CelButton/CelButton";
import { COLOR_KEYS } from "../../../constants/COLORS";

class SecurityScoreGauge extends Component {
  static propTypes = {
    subtitle: PropTypes.string,
    onPress: PropTypes.func,
    level: PropTypes.oneOf(["weak", "fair", "good", "strong"]).isRequired,
    fixNow: PropTypes.instanceOf(Object),
  };
  static defaultProps = {};

  getImage = description => {
    const theme = getTheme();
    const images = {
      lightWeak: require("../../../../assets/images/security-overview/01_gauge-weak.png"),
      unicornWeak: require("../../../../assets/images/security-overview/01_gauge-weak.png"),
      darkWeak: require("../../../../assets/images/security-overview/01_gauge-dark-weak.png"),

      lightFair: require("../../../../assets/images/security-overview/02_gauge-fair.png"),
      unicornFair: require("../../../../assets/images/security-overview/02_gauge-fair.png"),
      darkFair: require("../../../../assets/images/security-overview/02_gauge-dark-fair.png"),

      lightGood: require("../../../../assets/images/security-overview/03_gauge-good.png"),
      unicornGood: require("../../../../assets/images/security-overview/03_gauge-good.png"),
      darkGood: require("../../../../assets/images/security-overview/03_gauge-dark-good.png"),

      lightStrong: require("../../../../assets/images/security-overview/04_gauge-strong.png"),
      unicornStrong: require("../../../../assets/images/security-overview/04_gauge-strong.png"),
      darkStrong: require("../../../../assets/images/security-overview/04_gauge-dark-strong.png"),
    };
    return images[`${theme}${description}`];
  };

  getGaugeProps = () => {
    const { level } = this.props;
    const strength = level.toLowerCase();
    const theme = getTheme();
    switch (strength) {
      case SECURITY_STRENGTH_LEVEL.WEAK.toLowerCase():
        return {
          text: strength.toUpperCase(),
          imageUrl: this.getImage("Weak"),
          textColor:
            theme === "dark"
              ? getColor(COLOR_KEYS.NEGATIVE_STATE)
              : getColor(COLOR_KEYS.CARDS),
          backgroundColor: getColor(COLOR_KEYS.NEGATIVE_STATE),
        };
      case SECURITY_STRENGTH_LEVEL.FAIR.toLowerCase():
        return {
          text: strength.toUpperCase(),
          imageUrl: this.getImage("Fair"),
          textColor:
            theme === "dark"
              ? getColor(COLOR_KEYS.FAIR)
              : getColor(COLOR_KEYS.CARDS),
          backgroundColor: getColor(COLOR_KEYS.FAIR),
        };
      case SECURITY_STRENGTH_LEVEL.GOOD.toLowerCase():
        return {
          text: strength.toUpperCase(),
          imageUrl: this.getImage("Good"),
          textColor:
            theme === "dark"
              ? getColor(COLOR_KEYS.ALERT_STATE)
              : getColor(COLOR_KEYS.CARDS),
          backgroundColor: getColor(COLOR_KEYS.ALERT_STATE),
        };
      case SECURITY_STRENGTH_LEVEL.STRONG.toLowerCase():
        return {
          text: strength.toUpperCase(),
          imageUrl: this.getImage("Strong"),
          textColor:
            theme === "dark"
              ? getColor(COLOR_KEYS.POSITIVE_STATE)
              : getColor(COLOR_KEYS.CARDS),
          backgroundColor: getColor(COLOR_KEYS.POSITIVE_STATE),
        };
      default:
        return null;
    }
  };

  render() {
    const style = SecurityScoreGaugeStyle();
    const gaugeProps = this.getGaugeProps();
    const theme = getTheme();

    const { fixNow, onPressFixNow } = this.props;

    if (!gaugeProps) return null;
    return (
      <View
        style={[
          style.wrapper,
          theme !== "dark" && { backgroundColor: gaugeProps.backgroundColor },
        ]}
      >
        <Image
          source={gaugeProps.imageUrl}
          style={style.gauge}
          resizeMode={"contain"}
        />
        <CelText type="H3" weight="600" color={gaugeProps.textColor}>
          {gaugeProps.text}
        </CelText>
        <CelText
          margin={"0 0 15 0"}
          type="H7"
          color={getColor(COLOR_KEYS.WHITE)}
        >
          SECURITY SCORE
        </CelText>
        {fixNow.scoreParamsFixableCount > 0 && (
          <CelButton
            ghost
            size={"small"}
            color="white"
            textColor="white"
            onPress={onPressFixNow}
            margin="0 0 10 0"
          >
            FIX NOW {fixNow.scoreParamsFixableCount}/{fixNow.scoreParamsCount}
          </CelButton>
        )}
      </View>
    );
  }
}

export default SecurityScoreGauge;
