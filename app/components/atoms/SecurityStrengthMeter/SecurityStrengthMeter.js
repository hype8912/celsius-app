import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Image, View } from "react-native";

import STYLES from "../../../constants/STYLES";
import CelText from "../../atoms/CelText/CelText";
import * as appActions from "../../../redux/actions";
import { getTheme } from "../../../utils/styles-util";
import SecurityStrengthMeterStyle from "./SecurityStrengthMeter.styles";
import Card from "../Card/Card";
// import StoryWrapper from "../../atoms/StoryWrapper/StoryWrapper";

@connect(
  state => ({
    interestRates: state.generalData.interestRates,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class SwitchScoreGauge extends Component {
  static propTypes = {
    subtitle: PropTypes.string,
    onPress: PropTypes.func,
    level: PropTypes.oneOf(["1", "2", "3", "4"]).isRequired,
  };
  static defaultProps = {};

  getMeterProps = () => {
    const { level } = this.props;
    const theme = getTheme();
    switch (level) {
      case "1":
        return {
          text: "WEAK",
          imageUrl:
            theme === "light"
              ? require("../../../../assets/images/security-meter/01-pass-strength-weak-light.png")
              : require("../../../../assets/images/security-meter/01-pass-strength-weak-dark.png"),
          textColor: STYLES.COLORS.RED,
        };
      case "2":
        return {
          text: "FAIR",
          imageUrl:
            theme === "light"
              ? require("../../../../assets/images/security-meter/02-pass-strength-fair-light.png")
              : require("../../../../assets/images/security-meter/02-pass-strength-fair-dark.png"),
          textColor: STYLES.COLORS.ORANGE_DARK,
        };
      case "3":
        return {
          text: "GOOD",
          imageUrl:
            theme === "light"
              ? require("../../../../assets/images/security-meter/03-pass-strength-good-light.png")
              : require("../../../../assets/images/security-meter/03-pass-strength-good-dark.png"),
          textColor: STYLES.COLORS.ORANGE,
        };
      case "4":
        return {
          text: "STRONG",
          imageUrl: require("../../../../assets/images/security-meter/04-pass-strength-strong.png"),
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

export default SwitchScoreGauge;
