import React, { Component } from "react";
import { View, Animated, Easing } from "react-native";
import CelsiusLoadingScreenStyle from "./CelsiusLoadingScreen.styles";
import { getTheme } from "../../../utils/styles-util";
import { THEMES } from "../../../constants/UI";

class CelsiusLoadingScreen extends Component {
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
    const theme = getTheme();
    const style = CelsiusLoadingScreenStyle();

    let logoImage = require("../../../../assets/images/icons/logo-blue.png");
    if (theme === THEMES.DARK) {
      logoImage = require("../../../../assets/images/icons/logo-white.png");
    }

    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    return (
      <View style={style.container}>
        <View style={style.spinContainer}>
          <Animated.Image
            style={[style.logoImage, { transform: [{ rotate: spin }] }]}
            source={logoImage}
          />
        </View>
      </View>
    );
  }
}

export default CelsiusLoadingScreen;
