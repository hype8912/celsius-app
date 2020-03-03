import React, { Component } from "react";
import { Animated } from "react-native";
import { Svg } from "expo";
import PropTypes from "prop-types";


import { THEMES } from "../../../constants/UI";
import STYLES from "../../../constants/STYLES";
import { getTheme } from "../../../utils/styles-util";

class Spinner extends Component {
  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    opacity: PropTypes.number,
  };
  static defaultProps = {
    size: 50
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

  getOpacity = (theme) => {
    const { opacity } = this.props
    if (!isNaN(opacity)) return opacity

    return theme === THEMES.DARK ? 0.7 : 0.3
  }

  getColor = (theme) => {
    const { color } = this.props
    if (color) return color;

    switch (theme) {
      case THEMES.DARK:
        return STYLES.COLORS.WHITE;
      case THEMES.LIGHT:
      case THEMES.CELSIUS:
      default:
        return STYLES.COLORS.DARK_GRAY;
    }
  };

  repeat = () => {
    this.setState({ spinValue: new Animated.Value(0) }, this.animate);
  };

  animate = () => {
    const { spinValue } = this.state;
    this.animation = Animated.timing(
      spinValue,
      {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
      }
    );
    this.animation.start(this.repeat);
  };

  render() {
    const { size } = this.props;
    const { strokeColor, opacity, spinValue } = this.state;

    // Second interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });

    const style = [{ transform: [{ rotate: spin }], width: size, height: size, opacity }];
    return (
      <Animated.View style={style}>
        <Svg width={size} height={size} viewBox="0 0 100 100">
          <Svg.Circle cx="50" cy="50" r="35" stroke={strokeColor} strokeWidth="5" strokeLinecap="round"
                      strokeDasharray="62.83185307179586" fill="transparent"/>
        </Svg>
      </Animated.View>
    );
  }
}

export default Spinner
