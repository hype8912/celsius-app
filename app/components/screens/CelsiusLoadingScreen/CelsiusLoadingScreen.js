import React, { Component } from "react";
import { Image, View, Animated, Easing } from "react-native";
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

    let outerImage = require("../../../../assets/images/icons/logo-outer-circle-blue.png");
    let innerImage = require("../../../../assets/images/icons/logo-inner-circle-blue.png");
    if (theme === THEMES.DARK) {
      outerImage = require("../../../../assets/images/icons/logo-outer-circle-white.png");
      innerImage = require("../../../../assets/images/icons/logo-inner-circle-white.png");
    }

    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    return (
      <View style={style.container}>
        <View>
          <Image
            resizeMode="contain"
            style={[style.outerImage]}
            source={outerImage}
          />
        </View>
        <View style={style.spinContainer}>
          <Animated.Image
            style={[style.innerImage, { transform: [{ rotate: spin }] }]}
            source={innerImage}
          />
        </View>
      </View>
    );
  }
}

export default CelsiusLoadingScreen;
