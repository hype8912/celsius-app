import React, { Component } from "react";
import { Image, Dimensions } from "react-native";

import RegularLayout from "../../layouts/RegularLayout/RegularLayout";

const { width, height } = Dimensions.get("window");

class SplashScreen extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    transparent: true,
  });

  render() {
    return (
      <RegularLayout fabType="hide" padding="0 0 0 0">
        <Image
          resizeMode="contain"
          style={{ width, height }}
          source={require("../../../../assets/images/loading.png")}
        />
      </RegularLayout>
    );
  }
}

export default SplashScreen;
