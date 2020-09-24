import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Animated, Easing } from "react-native";
import { THEMES } from "../../../constants/UI";
import LoadingStateStyle from "./LoadingState.styles";
import CelText from "../CelText/CelText";
import { getTheme } from "../../../utils/styles-util";

class LoadingState extends Component {
  animationDuration = 1000;

  constructor(props) {
    super(props);

    this.state = {
      spinValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.state.spinValue, {
        toValue: 1,
        duration: this.animationDuration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }

  render() {
    const style = LoadingStateStyle();
    const theme = getTheme();

    let logoImage = require("../../../../assets/images/icons/cel-logo-blue.png");
    if (theme === THEMES.DARK) {
      logoImage = require("../../../../assets/images/icons/cel-logo-white.png");
    }

    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    return (
      <View style={style.container}>
        <View style={{ alignSelf: "center" }}>
          <Animated.Image
            style={[style.image, { transform: [{ rotate: spin }] }]}
            source={logoImage}
          />
        </View>

        <CelText
          margin="20 0 15 0"
          align="center"
          type="H4"
          style={{ paddingHorizontal: 20 }}
        >
          {this.props.heading}
        </CelText>
      </View>
    );
  }
}

LoadingState.propTypes = {
  heading: PropTypes.string,
};

LoadingState.defaultProps = {
  heading: "Please wait. This may take a moment",
};

export default LoadingState;
