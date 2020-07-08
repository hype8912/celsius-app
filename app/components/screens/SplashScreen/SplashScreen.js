import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Image, View, Animated, StatusBar } from "react-native";
import SplashScreen from "react-native-splash-screen";
import SplashScreenStyle from "./SplashScreen.styles";
import * as appActions from "../../../redux/actions";

@connect(
  state => ({
    history: state.nav.history,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CustomSplashScreen extends Component {
  animationDuration = 1000;

  constructor(props) {
    super(props);
    this.state = {
      scaleAnimation: new Animated.Value(1.1),
      logoAnimation: new Animated.Value(0),
      textTranslateAnimation: new Animated.Value(0),
      textOpacityAnimation: new Animated.Value(0),
      shouldShowBlueLogo: false,
    };
  }

  static propTypes = {};
  static defaultProps = {};
  static navigationOptions = () => ({
    transparent: true,
  });

  scale = () => {
    SplashScreen.hide();
    Animated.timing(this.state.scaleAnimation, {
      toValue: 0,
      duration: this.animationDuration,
    }).start();
  };

  moveLogo = () => {
    Animated.timing(this.state.logoAnimation, {
      toValue: -80,
      duration: this.animationDuration / 2,
      useNativeDriver: true,
    }).start();
  };

  moveText = () => {
    Animated.parallel([
      Animated.timing(this.state.textOpacityAnimation, {
        toValue: 1,
        duration: this.animationDuration / 2,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.textTranslateAnimation, {
        toValue: 50,
        duration: this.animationDuration / 2,
        useNativeDriver: true,
      }),
    ]).start();
  };

  componentDidMount() {
    setTimeout(this.scale, 200);
    setTimeout(() => {
      this.setState({ shouldShowBlueLogo: true });
    }, 900);

    setTimeout(this.moveLogo, 2000);
    setTimeout(this.moveText, 2200);
  }

  componentWillUnmount() {
    StatusBar.setHidden(false);
  }

  render() {
    const { history } = this.props;
    const logoImage = this.state.shouldShowBlueLogo
      ? require("../../../../assets/images/icons/cel.png")
      : require("../../../../assets/images/icons/cel-white.png");
    const style = SplashScreenStyle();

    if (!history.length) {
      return (
        <View style={style.blueStaticContainer}>
          <Image
            resizeMode="contain"
            style={[style.logoStaticImage]}
            source={require("../../../../assets/images/icons/cel-white.png")}
          />
        </View>
      );
    }

    return (
      <View style={style.container}>
        <Animated.View
          style={[
            style.blueContainer,
            {
              opacity: this.state.scaleAnimation,
              transform: [
                {
                  scale: this.state.scaleAnimation,
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            style.logoContainer,
            {
              transform: [
                {
                  translateX: this.state.logoAnimation,
                },
              ],
            },
          ]}
        >
          <Image
            resizeMode="contain"
            style={[style.image]}
            source={logoImage}
          />
        </Animated.View>
        <Animated.View
          style={[
            style.celsiusNetworkContainer,
            {
              opacity: this.state.textOpacityAnimation,
              transform: [
                {
                  translateX: this.state.textTranslateAnimation,
                },
              ],
            },
          ]}
        >
          <Image
            resizeMode="contain"
            style={[style.celsiusNetworkImage]}
            source={require("../../../../assets/images/celsiusnetwork.png")}
          />
        </Animated.View>
      </View>
    );
  }
}

export default CustomSplashScreen;
