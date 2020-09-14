import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";
import mixpanelAnalytics from "../../../utils/mixpanel-analytics";
import { isKYCRejectedForever } from "../../../utils/user-util/user-util";
import API from "../../../constants/API";
import apiUtil from "../../../utils/api-util";
import SplashScreen from "../SplashScreen/SplashScreen";
import CelsiusLoadingScreen from "../CelsiusLoadingScreen/CelsiusLoadingScreen";
import appsFlyerUtil from "../../../utils/appsflyer-util";
import { registerMixpanelUser } from "../../../utils/mixpanel-util";

@connect(
  state => ({
    user: state.user.profile,
    callsInProgress: state.api.callsInProgress,
    appSettings: state.user.appSettings,
    bannerProps: state.ui.bannerProps,
    history: state.nav.history,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Home extends Component {
  static navigationOptions = () => ({
    header: null,
    gesturesEnabled: false,
    hideBack: true,
  });

  async componentDidMount() {
    const { actions } = this.props;

    await actions.getWalletSummary();
    await actions.getUserAppBootstrap();
    await actions.getCurrencyRates();

    mixpanelAnalytics.sessionStarted("Init app");
    await actions.setBannerProps();

    actions.claimAllBranchTransfers();

    const { user } = this.props;
    if (user && user.id && !user.has_pin) {
      return actions.resetToScreen("RegisterSetPin");
    }

    if (isKYCRejectedForever()) {
      return actions.resetToScreen("KYCFinalRejection");
    }

    if (user && user.id && user.has_pin) {
      const newRegistration = apiUtil.wereSuccessfulInHistory(
        [
          API.REGISTER_USER,
          API.REGISTER_USER_FACEBOOK,
          API.REGISTER_USER_GOOGLE,
          API.REGISTER_USER_TWITTER,
        ],
        15
      );
      if (newRegistration) {
        appsFlyerUtil.registrationCompleted(user);
        registerMixpanelUser(user.id);
        mixpanelAnalytics.registrationCompleted(user);
      }

      const hasAlreadyVerified = apiUtil.wereSuccessfulInHistory(
        [API.CHECK_PIN, API.CHECK_TWO_FACTOR, API.SET_PIN],
        15
      );
      if (hasAlreadyVerified) {
        return this.goToWalletLanding();
      }
      return actions.resetToScreen("VerifyProfile", {
        hideBack: true,
        onSuccess: this.goToWalletLanding,
      });
    }
  }

  goToWalletLanding = () => {
    const { actions, bannerProps } = this.props;

    // note :) this was used when we planned to force users to accept updated Terms of USe
    // if (appSettings && !appSettings.accepted_terms_of_use) {
    //   return actions.navigateTo("TermsOfUse", {
    //     purpose: "accept",
    //     nextScreen: "WalletLanding",
    //   });
    // }

    actions.setBannerProps({
      sessionCount: bannerProps.sessionCount + 1,
    });

    actions.resetToScreen("WalletLanding");
    actions.handleDeepLink();
  };

  render = () => {
    if (this.props.history.length > 1) {
      return <CelsiusLoadingScreen />;
    }

    return <SplashScreen />;
  };
}

export default Home;
