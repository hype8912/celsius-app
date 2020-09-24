import React, { Component } from "react";
import { View, Image, StatusBar } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";

import WelcomeStyle from "./Welcome.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelButton from "../../atoms/CelButton/CelButton";
import ReferralReceivedModal from "../../modals/ReferralReceivedModal/ReferralReceivedModal";
import BuildVersion from "../../molecules/BuildVersion/BuildVersion";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    advertisingId: state.app.advertisingId,
    appsFlyerUID: state.app.appsFlyerUID,
    referralLink: state.branch.registeredLink,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Welcome extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    headerSameColor: true,
    hideBack: true,
  });

  async componentDidMount() {
    StatusBar.setHidden(false);
  }

  onPressLogin = () => {
    const { actions } = this.props;
    actions.navigateTo(SCREENS.LOGIN_LANDING, { type: "login" });
  };

  render() {
    const style = WelcomeStyle();
    const { actions, referralLink } = this.props;

    return (
      <RegularLayout
        padding="0 20 0 20"
        fabType="hide"
        enableParentScroll={false}
      >
        <View style={style.wrapper}>
          <Image
            source={require("../../../../assets/images/splashScreen-celsius-new.png")}
            style={style.celImage}
          />
          <CelText weight="bold" align="center" type="H1" style={style.title}>
            Welcome!
          </CelText>
          <CelText weight="300" align="center" style={style.subtitle}>
            Join Celsius and be part of the future of finance. Earn up
            to 12% annually, and borrow cash starting at just 1% APR.
          </CelText>
          <CelButton
            style={style.button}
            onPress={() =>
              actions.navigateTo(SCREENS.LOGIN_LANDING, { type: "register" })
            }
          >
            Join Celsius
          </CelButton>
          <CelButton basic onPress={() => this.onPressLogin()}>
            Login
          </CelButton>
          <BuildVersion margin={"10 0 0 0"} />
        </View>

        <ReferralReceivedModal
          navigateTo={actions.navigateTo}
          closeModal={actions.closeModal}
          referralLink={referralLink}
        />
      </RegularLayout>
    );
  }
}

export default Welcome;
