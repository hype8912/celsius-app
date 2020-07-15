import React, { Component } from "react";
import { View, Image, StatusBar } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";

import WelcomeStyle from "./Welcome.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelButton from "../../atoms/CelButton/CelButton";
import appUtil from "../../../utils/app-util";
import ReferralReceivedModal from "../../modals/ReferralReceivedModal/ReferralReceivedModal";

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
  });

  state = {
    revisionId: "",
  };

  async componentDidMount() {
    StatusBar.setHidden(false);

    const appVersion = await appUtil.getRevisionId();
    this.setState({ revisionId: appVersion.revisionId });
  }

  onPressLogin = () => {
    const { actions } = this.props;
    actions.navigateTo("LoginLanding", { type: "login" });
  };

  render() {
    const style = WelcomeStyle();
    const { actions, referralLink } = this.props;

    const { revisionId } = this.state;
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
            A new way to earn, borrow and pay on the blockchain. Let’s bring the
            next 100M people into crypto together.
          </CelText>
          <CelButton
            style={style.button}
            onPress={() =>
              actions.navigateTo("LoginLanding", { type: "register" })
            }
          >
            Join Celsius
          </CelButton>
          <CelButton basic onPress={() => this.onPressLogin()}>
            Login
          </CelButton>
          <CelText
            margin="30 0 0 0"
            weight="light"
            align="center"
            type="H7"
            style={{ opacity: 0.5 }}
          >
            Celsius App version: {revisionId}
          </CelText>
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
