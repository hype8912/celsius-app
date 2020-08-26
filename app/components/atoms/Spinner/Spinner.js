import React, { Component } from "react";
import { Animated } from "react-native";
import Svg, { Circle } from "react-native-svg";
import PropTypes from "prop-types";

import { THEMES } from "../../../constants/UI";
import { getColor, getTheme } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

class Spinner extends Component {
  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    opacity: PropTypes.number,
  };
  static defaultProps = {
    size: 40,
  };

  constructor(props) {
    super(props);
    const theme = getTheme();

    this.state = {
      spinValue: new Animated.Value(0),
      strokeColor: this.getColor(theme),
      opacity: this.getOpacity(theme),
    };
    this.animation = null;
  }

  componentDidMount = () => {
    this.animate();
  };

  componentWillUnmount = () => {
    this.animation.stop();
  };

  getOpacity = theme => {
    const { opacity } = this.props;
    if (!isNaN(opacity)) return opacity;

    return theme === THEMES.DARK ? 0.7 : 0.3;
  };

  getColor = () => {
    const { color } = this.props;
    if (color) return color;

    return getColor(COLOR_KEYS.HEADLINE);
  };

  repeat = () => {
    this.setState({ spinValue: new Animated.Value(0) }, this.animate);
  };

  animate = () => {
    const { spinValue } = this.state;
    this.animation = Animated.timing(spinValue, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    });
    this.animation.start(this.repeat);
  };

  render() {
    const { size } = this.props;
    const { strokeColor, opacity, spinValue } = this.state;

    // Second interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    const style = [
      { transform: [{ rotate: spin }], width: size, height: size, opacity },
    ];
    return (
      <Animated.View style={style}>
        <Svg width={size} height={size} viewBox="0 0 100 100">
          <Circle
            cx="50"
            cy="50"
            r="40"
            stroke={strokeColor}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="62.83185307179586"
            fill="transparent"
          />
        </Svg>
      </Animated.View>
    );
  }
}

export default Spinner;
