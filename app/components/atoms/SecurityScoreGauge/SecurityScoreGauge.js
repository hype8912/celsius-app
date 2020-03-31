import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, View } from "react-native";

import STYLES from "../../../constants/STYLES";
import CelText from "../../atoms/CelText/CelText";
import SecurityScoreGaugeStyle from "./SecurityScoreGauge.styles";
// import CelButton from "../CelButton/CelButton";
import { SECURITY_STRENGTH_LEVEL } from "../../../constants/DATA";
// import StoryWrapper from "../../atoms/StoryWrapper/StoryWrapper";

class SecurityScoreGauge extends Component {
  static propTypes = {
    subtitle: PropTypes.string,
    onPress: PropTypes.func,
    // level: PropTypes.oneOf(["weak", "fair", "good", "strong"]).isRequired,
  };
  static defaultProps = {};

  getImage = description => {
    const images = {
      weak: require("../../../../assets/images/security-overview/01_gauge-weak.png"),
      fair: require("../../../../assets/images/security-overview/02_gauge-fair.png"),
      good: require("../../../../assets/images/security-overview/03_gauge-good.png"),
      strong: require("../../../../assets/images/security-overview/04_gauge-strong.png"),
    };
    return images[`${description}`];
  };

  getGaugeProps = () => {
    const { level } = this.props;
    const strength = level.toLowerCase();

    switch (strength) {
      case SECURITY_STRENGTH_LEVEL.WEAK.toLowerCase():
        return {
          text: strength.toUpperCase(),
          imageUrl: this.getImage("weak"),
          backgroundColor: STYLES.COLORS.RED,
        };
      case SECURITY_STRENGTH_LEVEL.FAIR.toLowerCase():
        return {
          text: strength.toUpperCase(),
          imageUrl: this.getImage("fair"),
          backgroundColor: STYLES.COLORS.ORANGE_DARK,
        };
      case SECURITY_STRENGTH_LEVEL.GOOD.toLowerCase():
        return {
          text: strength.toUpperCase(),
          imageUrl: this.getImage("good"),
          backgroundColor: STYLES.COLORS.ORANGE,
        };
      case SECURITY_STRENGTH_LEVEL.STRONG.toLowerCase():
        return {
          text: strength.toUpperCase(),
          imageUrl: this.getImage("strong"),
          backgroundColor: STYLES.COLORS.GREEN,
        };
      default:
        return null;
    }
  };
  // TODO Change "3/7" in CelText with prop from backend or Redux
  render() {
    const style = SecurityScoreGaugeStyle();
    const gaugeProps = this.getGaugeProps();

    if (!gaugeProps) return null;

    return (
      <View
        style={[style.wrapper, { backgroundColor: gaugeProps.backgroundColor }]}
      >
        <Image
          source={gaugeProps.imageUrl}
          style={style.gauge}
          resizeMode={"contain"}
        />
        <CelText type="H3" weight="600" color={STYLES.COLORS.WHITE}>
          {gaugeProps.text}
        </CelText>
        <CelText margin={"0 0 15 0"} type="H7" color={STYLES.COLORS.WHITE}>
          SECURITY SCORE
        </CelText>
        {/* <CelButton*/}
        {/*  ghost*/}
        {/*  color={"red"}*/}
        {/*  size={"small"}*/}
        {/*  textColor={"white"}*/}
        {/*  onPress={{}}*/}
        {/* >*/}
        {/*  <CelText weight={"600"} color={"white"}>*/}
        {/*    FIX NOW*/}
        {/*  </CelText>*/}
        {/*  <CelText color={"white"}> 3/7</CelText>*/}
        {/* </CelButton>*/}
      </View>
    );
  }
}

export default SecurityScoreGauge;
