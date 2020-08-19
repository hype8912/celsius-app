import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import PinTooltipStyle from "./PinTooltip.styles";
import CelText from "../../atoms/CelText/CelText";
import STYLES from "../../../constants/STYLES";
import Icon from "../../atoms/Icon/Icon";
import securityUtil from "../../../utils/security-util";
import { PIN_STRENGTH_ITEMS } from "../../../constants/DATA";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

class PinTooltip extends Component {
  static propTypes = {
    showTooltip: PropTypes.bool,
    toolTipPositionTop: PropTypes.bool,
    customStyle: PropTypes.instanceOf(Object),
    positionTop: PropTypes.number,
    pin: PropTypes.string,
    user: PropTypes.instanceOf(Object),
  };

  static defaultProps = {
    showTooltip: true,
    toolTipPositionTop: false,
    positionTop: 220,
    positionLeft: 30,
    positionRight: 30,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSecurityItems = () => {
    const { pin, user } = this.props;
    const score = securityUtil.calculatePinScore(pin, user.date_of_birth);
    const items = PIN_STRENGTH_ITEMS.map(i => {
      const securityItem = score.find(s => i.copy === s.copy);
      return securityItem;
    });
    return items;
  };

  render() {
    const {
      showTooltip,
      toolTipPositionTop,
      pin,
      customStyle,
      positionTop,
      positionLeft,
      positionRight,
    } = this.props;
    const style = PinTooltipStyle();
    return (
      <View
        style={{
          position: "absolute",
          top: positionTop,
          left: positionLeft,
          right: positionRight,
          width: "auto",
        }}
      >
        {!!pin && showTooltip && (
          <>
            <View
              style={{
                position: "absolute",
                width: 0,
                height: 0,
                marginLeft: 145,
                top: !toolTipPositionTop ? -10 : "auto",
                bottom: toolTipPositionTop ? -10 : "auto",
                borderLeftWidth: 10,
                borderRightWidth: 10,
                borderBottomWidth: 10,
                borderStyle: "solid",
                backgroundColor: getColor(COLOR_KEYS.TRANSPARENT),
                borderLeftColor: getColor(COLOR_KEYS.TRANSPARENT),
                borderRightColor: getColor(COLOR_KEYS.TRANSPARENT),
                borderBottomColor: STYLES.COLORS.DARK_GRAY, // TODO: missing COLOR_KEY
                transform: [
                  {
                    rotate: toolTipPositionTop ? "180deg" : "0deg",
                  },
                ],
              }}
            />

            <View style={[style.container, customStyle]}>
              <CelText color={COLOR_KEYS.WHITE} margin={"0 0 10 0"}>
                PIN Must:
              </CelText>
              {this.handleSecurityItems().map((i, k) => (
                <View style={style.securityStrengthItem} k={k}>
                  <Icon
                    name={"CheckCircle"}
                    height={12}
                    width={12}
                    fill={
                      i.status
                        ? getColor(COLOR_KEYS.POSITIVE_STATE)
                        : getColor(COLOR_KEYS.NEGATIVE_STATE)
                    }
                  />
                  <CelText
                    color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
                    type={"H7"}
                    margin={"-3 0 5 5"}
                  >
                    {i.copy}
                  </CelText>
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    );
  }
}

export default PinTooltip;
