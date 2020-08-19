import React, { Component } from "react";
import { View, Platform, Switch } from "react-native";
import PropTypes from "prop-types";
import { getColor } from "../../../utils/styles-util";

// import CelSwitchStyle from "./CelSwitch.styles";
import STYLES from "../../../constants/STYLES";
import { COLOR_KEYS } from "../../../constants/COLORS";

const falseColor =
  Platform.OS === "ios" ? "transparent" : STYLES.COLORS.DARK_GRAY3;

class CelSwitch extends Component {
  static propTypes = {
    thumbColor: PropTypes.string,
    iosBackgroundColor: PropTypes.string,
    trackColor: PropTypes.instanceOf(Object),
    value: PropTypes.bool,
    onValueChange: PropTypes.func,
    disabled: PropTypes.bool,
  };
  static defaultProps = {
    thumbColor: getColor(COLOR_KEYS.TOGGLE_ON_FOREGROUND),
    iosBackgroundColor: getColor(COLOR_KEYS.TOGGLE_OFF_BACKGROUND),
    trackColor: {
      false: falseColor,
      true: getColor(COLOR_KEYS.TOGGLE_ON_BACKGROUND),
    },
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      thumbColor,
      iosBackgroundColor,
      trackColor,
      value,
      onValueChange,
      disabled,
    } = this.props;
    // const style = CelSwitchStyle();
    return (
      <View>
        <Switch
          disabled={disabled}
          thumbColor={thumbColor}
          ios_backgroundColor={iosBackgroundColor}
          trackColor={trackColor}
          value={value}
          onValueChange={onValueChange}
        />
      </View>
    );
  }
}

export default CelSwitch;
