import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, View } from "react-native";

import STYLES from "../../../constants/STYLES";
import CelText from "../../atoms/CelText/CelText";
import { getTheme } from "../../../utils/styles-util";
import SecurityStrengthMeterStyle from "./SecurityStrengthMeter.styles";
import Card from "../Card/Card";
import { SECURITY_STRENGTH_LEVEL } from "../../../constants/DATA";
import Separator from "../Separator/Separator";

// import StoryWrapper from "../../atoms/StoryWrapper/StoryWrapper";

class SecurityStrengthMeter extends Component {
  static propTypes = {
    lastChangePeriod: PropTypes.string,
    onPressEnhance: PropTypes.func,
    enhanceText: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    level: PropTypes.oneOf(["weak", "fair", "good", "strong"]).isRequired,
  };
  static defaultProps = {};

  getImage = description => {
    const theme = getTheme();
    const images = {
      lightWeak: require("../../../../assets/images/security-meter/01-pass-strength-weak-light.png"),
      darkWeak: require("../../../../assets/images/security-meter/01-pass-strength-weak-dark.png"),

      lightFair: require("../../../../assets/images/security-meter/02-pass-strength-fair-light.png"),
      darkFair: require("../../../../assets/images/security-meter/02-pass-strength-fair-dark.png"),

      lightGood: require("../../../../assets/images/security-meter/03-pass-strength-good-light.png"),
      darkGood: require("../../../../assets/images/security-meter/03-pass-strength-good-dark.png"),

      lightStrong: require("../../../../assets/images/security-meter/04-pass-strength-strong.png"),
      darkStrong: require("../../../../assets/images/security-meter/04-pass-strength-strong.png"),
    };
    return images[`${theme}${description}`];
  };

  getMeterProps = () => {
    const { level } = this.props;
    const strength = level.toLowerCase();

    switch (strength) {
      case SECURITY_STRENGTH_LEVEL.WEAK.toLowerCase():
        return {
          text: strength.toUpperCase(),
          imageUrl: this.getImage("Weak"),
          textColor: STYLES.COLORS.RED,
        };
      case SECURITY_STRENGTH_LEVEL.FAIR.toLowerCase():
        return {
          text: strength.toUpperCase(),
          imageUrl: this.getImage("Fair"),
          textColor: STYLES.COLORS.ORANGE_DARK,
        };
      case SECURITY_STRENGTH_LEVEL.GOOD.toLowerCase():
        return {
          text: strength.toUpperCase(),
          imageUrl: this.getImage("Good"),
          textColor: STYLES.COLORS.ORANGE,
        };
      case SECURITY_STRENGTH_LEVEL.STRONG.toLowerCase():
        return {
          text: strength.toUpperCase(),
          imageUrl: this.getImage("Strong"),
          textColor: STYLES.COLORS.GREEN,
        };
      default:
        return null;
    }
  };
  render() {
    const style = SecurityStrengthMeterStyle();
    const meterProps = this.getMeterProps();

    if (!meterProps) return null;

    const { onPressEnhance, enhanceText, lastChangePeriod } = this.props;

    return (
      <Card styles={style.container}>
        <View style={[style.section, { marginBottom: 10 }]}>
          <View style={style.leftSide}>
            <Image
              source={meterProps.imageUrl}
              style={style.meter}
              resizeMode={"stretch"}
            />
          </View>
          <View style={style.rightSide}>
            <CelText
              type="H5"
              weight="600"
              color={meterProps.textColor}
              align={"right"}
            >
              {meterProps.text}
            </CelText>
          </View>
        </View>

        <Separator />

        <View style={[style.section, { marginTop: 5 }]}>
          <View style={style.leftSide}>
            <CelText type="H7">
              {"Last change: "}
              <CelText type="H7" weight="600">
                {lastChangePeriod}
              </CelText>
            </CelText>
          </View>
          <View style={style.rightSide}>
            <CelText
              type="H6"
              weight="600"
              onPress={onPressEnhance}
              color={STYLES.COLORS.CELSIUS_BLUE}
              align={"right"}
            >
              {enhanceText}
            </CelText>
          </View>
        </View>
      </Card>
    );
  }
}

export default SecurityStrengthMeter;
