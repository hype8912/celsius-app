import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, View } from "react-native";

import STYLES from "../../../constants/STYLES";
import CelText from "../../atoms/CelText/CelText";
import { getTheme } from "../../../utils/styles-util";
import SecurityStrengthMeterStyle from "./SecurityStrengthMeter.styles";
import Card from "../Card/Card";
// import StoryWrapper from "../../atoms/StoryWrapper/StoryWrapper";

class SecurityStrengthMeter extends Component {
  static propTypes = {
    subtitle: PropTypes.string,
    onPress: PropTypes.func,
    level: PropTypes.oneOf(["1", "2", "3", "4"]).isRequired,
  };
  static defaultProps = {};

  getImage = description => {
    const theme = getTheme();
    const images = {
      lightWeak: require("../../../../assets/images/security-meter/01-pass-strength-weak-light.png"),
      darkWeak: require("../../../../assets/images/security-meter/01-pass-strength-weak-dark.png"),

      lightFair: require("../../../../assets/images/security-meter/01-pass-strength-weak-light.png"),
      darkFair: require("../../../../assets/images/security-meter/01-pass-strength-weak-dark.png"),

      lightGood: require("../../../../assets/images/security-meter/03-pass-strength-good-light.png"),
      darkGood: require("../../../../assets/images/security-meter/03-pass-strength-good-dark.png"),

      lightStrong: require("../../../../assets/images/security-meter/04-pass-strength-strong.png"),
      darkStrong: require("../../../../assets/images/security-meter/04-pass-strength-strong.png"),
    };
    return images[`${theme}${description}`];
  };

  getMeterProps = () => {
    const { level } = this.props;
    switch (level) {
      case "1":
        return {
          text: "WEAK",
          imageUrl: this.getImage("Weak"),
          textColor: STYLES.COLORS.RED,
        };
      case "2":
        return {
          text: "FAIR",
          imageUrl: this.getImage("Fair"),
          textColor: STYLES.COLORS.ORANGE_DARK,
        };
      case "3":
        return {
          text: "GOOD",
          imageUrl: this.getImage("Good"),
          textColor: STYLES.COLORS.ORANGE,
        };
      case "4":
        return {
          text: "STRONG",
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

    return (
      <Card styles={style.container}>
        <View style={style.leftSide}>
          <Image
            source={meterProps.imageUrl}
            style={style.meter}
            resizeMode={"contain"}
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
      </Card>
    );
  }
}

export default SecurityStrengthMeter;
