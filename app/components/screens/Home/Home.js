import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Image, ScrollView, SafeAreaView, StatusBar } from "react-native";
import SplashScreen from "react-native-splash-screen";
import * as appActions from "../../../redux/actions";
import Loader from "../../atoms/Loader/Loader";
import { getPadding } from "../../../utils/styles-util";
import CelText from "../../atoms/CelText/CelText";
import {
  THEMES,
  WELCOME_MESSAGES,
  INITIAL_API_CALLS,
} from "../../../constants/UI";
import { isKYCRejectedForever } from "../../../utils/user-util";
import { STORYBOOK } from "../../../../dev-settings";
import HomeStyle from "./Home.styles";
import appUtil from "../../../utils/app-util";

@connect(
  state => ({
    appInitialized: state.app.appInitialized,
    user: state.user.profile,
    callsInProgress: state.api.callsInProgress,
    appSettings: state.user.appSettings,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Home extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { callsInProgress } = nextProps;

    if (
      callsInProgress[0] &&
      INITIAL_API_CALLS.indexOf(callsInProgress[0]) !== -1
    ) {
      return { progress: prevState.progress + 1 };
    }
    return null;
  }

  static navigationOptions = () => ({
    header: null,
    gesturesEnabled: false,
  });

  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      randomMsg:
        WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)],
    };
  }

  async componentDidMount() {
    const { actions, appInitialized } = this.props;
    if (!appInitialized) {
      await appUtil.initializeThirdPartyServices();
      await actions.initCelsiusApp();
    }
  }

  componentDidUpdate(prevProps) {
    const { user, appInitialized, actions } = this.props;
    SplashScreen.hide();

    if (STORYBOOK) {
      return prevProps.actions.navigateTo("Storybook");
    }

    if (prevProps.appInitialized === false && appInitialized === true) {
      if (user.id) {
        if (!user.has_pin) {
          return prevProps.actions.navigateTo("RegisterSetPin");
        }

        if (user.kyc) {
          if (isKYCRejectedForever()) {
            return prevProps.actions.navigateTo("VerifyProfile", {
              showLogOutBtn: true,
              hideBack: true,
              onSuccess: () => {
                actions.navigateTo("KYCFinalRejection");
                actions.resetToScreen("KYCFinalRejection");
              },
            });
          }
        }
        return prevProps.actions.navigateTo("VerifyProfile", {
          showLogOutBtn: true,
          hideBack: true,
          onSuccess: () => {
            actions.resetToScreen("WalletLanding");
          },
        });
      }
      return prevProps.actions.navigateTo("Welcome");
    }
  }

  render() {
    const { randomMsg } = this.state;
    const paddings = getPadding("0 20 0 20");
    const style = HomeStyle();
    return (
      <ScrollView contentContainerStyle={[{ flexGrow: 1 }, paddings]}>
        <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
          <StatusBar barStyle="dark-content" />
          <View style={style.contentWrapper}>
            <Image
              source={require("../../../../assets/images/splashScreen-celsius-new.png")}
              style={style.celImage}
            />
            <CelText
              theme={THEMES.LIGHT}
              align={"center"}
              margin={"20 0 10 0"}
              weight={"600"}
              type={"H2"}
            >
              {randomMsg.title}
            </CelText>
            <CelText
              theme={THEMES.LIGHT}
              align={"center"}
              margin={"0 0 20 0"}
              type={"H4"}
              weight={"300"}
            >
              {randomMsg.text}
            </CelText>
            <Loader progress={this.state.progress / INITIAL_API_CALLS.length} />
          </View>
          <View style={style.partnerLogos}>
            <Image
              source={require("../../../../assets/images/PartnerLogos/DP.png")}
              style={style.logoMiddle}
            />
            <Image
              source={require("../../../../assets/images/PartnerLogos/litecoin-foundation.png")}
              style={style.logoLeft}
            />
            <Image
              source={require("../../../../assets/images/PartnerLogos/prime-trust-llc-vector-logo.png")}
              style={style.logoRight}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default Home;
