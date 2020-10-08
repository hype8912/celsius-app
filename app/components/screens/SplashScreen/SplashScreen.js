import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Image, View, Animated, StatusBar } from "react-native";
import SplashScreen from "react-native-splash-screen";
import SplashScreenStyle from "./SplashScreen.styles";
import * as appActions from "../../../redux/actions";
import appUtil from "../../../utils/app-util";
import { widthPercentageToDP } from "../../../utils/styles-util";

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
      shouldUpdate: true,
    };
  }

  static propTypes = {};
  static defaultProps = {};
  static navigationOptions = () => ({
    transparent: true,
  });

  scale = () => {
    Animated.timing(this.state.scaleAnimation, {
      toValue: 0,
      duration: this.animationDuration,
    }).start();
  };

  moveLogo = () => {
    Animated.timing(this.state.logoAnimation, {
      toValue: -widthPercentageToDP("17%"),
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
        toValue: widthPercentageToDP("13%"),
        duration: this.animationDuration / 2,
        useNativeDriver: true,
      }),
    ]).start();
  };

  async componentDidMount() {
    const shouldUpdate = await appUtil.shouldUpdateCelsiusApp();
    this.setState({ shouldUpdate });
    SplashScreen.hide();
    if (shouldUpdate) return;

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
    const { shouldUpdate } = this.state;
    const logoImage = this.state.shouldShowBlueLogo
      ? require("../../../../assets/images/icons/cel-logo-blue.png")
      : require("../../../../assets/images/icons/cel-logo-white.png");
    const style = SplashScreenStyle();

    if (!history.length || shouldUpdate) {
      return (
        <View style={style.blueStaticContainer}>
          <Image
            resizeMode="contain"
            style={[style.logoStaticImage]}
            source={require("../../../../assets/images/icons/cel-logo-white.png")}
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
            source={require("../../../../assets/images/icons/cel-text-blue.png")}
          />
        </Animated.View>
      </View>
    );
  }
}

export default CustomSplashScreen;
