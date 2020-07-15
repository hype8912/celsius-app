import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import PassStrengthMeterStyle from "./PassStrengthMeter.styles";
import CelText from "../CelText/CelText";
import securityUtil from "../../../utils/security-util";
import { SECURITY_STRENGTH_LEVEL } from "../../../constants/DATA";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

class PassStrengthMeter extends Component {
  static propTypes = {
    customStyle: PropTypes.instanceOf(Object),
    password: PropTypes.string,
  };
  static defaultProps = {};

  handlePassStatus = () => {
    const { password } = this.props;
    const status = securityUtil.calculatePasswordScore(password).customStatus;
    switch (status) {
      case SECURITY_STRENGTH_LEVEL.WEAK:
        return {
          level: SECURITY_STRENGTH_LEVEL.WEAK,
          color: getColor(COLOR_KEYS.NEGATIVE_STATE),
        };
      case SECURITY_STRENGTH_LEVEL.FAIR:
        return {
          level: SECURITY_STRENGTH_LEVEL.FAIR,
          color: getColor(COLOR_KEYS.ALERT_STATE),
        };
      case SECURITY_STRENGTH_LEVEL.GOOD:
        return {
          level: SECURITY_STRENGTH_LEVEL.GOOD,
          color: getColor(COLOR_KEYS.ALERT_STATE),
        };
      case SECURITY_STRENGTH_LEVEL.STRONG:
        return {
          level: SECURITY_STRENGTH_LEVEL.STRONG,
          color: getColor(COLOR_KEYS.POSITIVE_STATE),
        };
    }
  };

  handleMeterLength = () => {
    const { password } = this.props;
    const result = securityUtil.calculatePasswordScore(password).result;
    if (result.status === "needs requirement(s)") {
      return "15%";
    }
    return `${result.percent}%`;
  };

  render() {
    const style = PassStrengthMeterStyle();
    const { customStyle } = this.props;
    const passStatus = this.handlePassStatus();

    return (
      <View style={[customStyle, style.container]}>
        <View
          style={[
            style.meterLine,
            {
              width: this.handleMeterLength(),
              borderColor: passStatus.color,
            },
          ]}
        />
        <View style={{ flexDirection: "row" }}>
          <CelText type={"H6"} margin={"5 0 0 0"}>
            Password Strength:{" "}
          </CelText>
          <CelText type={"H6"} margin={"5 0 0 0"} color={passStatus.color}>
            {passStatus.level}
          </CelText>
        </View>
      </View>
    );
  }
}

export default PassStrengthMeter;
