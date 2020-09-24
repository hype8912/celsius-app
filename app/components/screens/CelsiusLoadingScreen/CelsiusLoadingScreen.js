import React, { Component } from "react";
import { View, Animated, Easing } from "react-native";
import CelsiusLoadingScreenStyle from "./CelsiusLoadingScreen.styles";

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
    const style = CelsiusLoadingScreenStyle();

    const logoImage = require("../../../../assets/images/icons/cel-logo-blue.png");

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
