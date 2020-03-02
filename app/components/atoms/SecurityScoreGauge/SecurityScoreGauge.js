import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Image, View } from "react-native";

import STYLES from "../../../constants/STYLES";
import CelText from "../../atoms/CelText/CelText";
import * as appActions from "../../../redux/actions";
// import { getTheme } from "../../../utils/styles-util";
import SingleScoreGaugeStyle from "./SecurityScoreGauge.styles";
import CelButton from "../CelButton/CelButton";
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

  getGaugeProps = () => {
    const { level } = this.props;
    switch (level) {
      case "1":
        return {
          text: "WEAK",
          imageUrl: require("../../../../assets/images/security-overview/01_gauge-weak.png"),
          backgroundColor: STYLES.COLORS.RED,
        };
      case "2":
        return {
          text: "FAIR",
          imageUrl: require("../../../../assets/images/security-overview/02_gauge-fair.png"),
          backgroundColor: STYLES.COLORS.ORANGE_DARK,
        };
      case "3":
        return {
          text: "GOOD",
          imageUrl: require("../../../../assets/images/security-overview/03_gauge-good.png"),
          backgroundColor: STYLES.COLORS.ORANGE,
        };
      case "4":
        return {
          text: "STRONG",
          imageUrl: require("../../../../assets/images/security-overview/04_gauge-strong.png"),
          backgroundColor: STYLES.COLORS.GREEN,
        };
      default:
        return null;
    }
  };
  // TODO Change "3/7" in CelText with prop from backend or Redux
  render() {
    // const theme = getTheme();
    const style = SingleScoreGaugeStyle();
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
        <CelButton
          ghost
          color={"red"}
          size={"small"}
          textColor={"white"}
          onPress={{}}
        >
          <CelText weight={"600"} color={"white"}>
            FIX NOW
          </CelText>
          <CelText color={"white"}> 3/7</CelText>
        </CelButton>
      </View>
    );
  }
}

export default SwitchScoreGauge;
