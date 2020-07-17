import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import PassMeterTooltipStyle from "./PassMeterTooltip.styles";
import Icon from "../Icon/Icon";
import STYLES from "../../../constants/STYLES";
import CelText from "../CelText/CelText";
import { PASSWORD_STRENGTH_ITEMS } from "../../../constants/DATA";
import securityUtil from "../../../utils/security-util";

class PassMeterTooltip extends Component {
  static propTypes = {
    customStyle: PropTypes.instanceOf(Object),
    password: PropTypes.string,
    type: PropTypes.string,
  };

  handleSecurityItems = () => {
    const { password } = this.props;
    let status;

    const score = securityUtil.calculatePasswordScore(password).result.errors;
    const items = PASSWORD_STRENGTH_ITEMS.map(i => {
      if (!score.includes(i.copy)) {
        status = true;
      } else {
        status = false;
      }
      return {
        copy: i.copy,
        status,
      };
    });
    return items;
  };

  render() {
    const { customStyle } = this.props;
    const style = PassMeterTooltipStyle();

    return (
      <View style={[style.container, customStyle]}>
        {this.handleSecurityItems().map((i, k) => (
          <View style={style.securityStrengthItem} k={k}>
            <Icon
              name={"CheckCircle"}
              height={12}
              width={12}
              fill={i.status ? STYLES.COLORS.GREEN : STYLES.COLORS.RED}
            />
            <CelText
              color={STYLES.COLORS.WHITE}
              type={"H7"}
              margin={"-3 0 5 5"}
            >
              {i.copy}
            </CelText>
          </View>
        ))}
      </View>
    );
  }
}

export default PassMeterTooltip;
