import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import { Constants } from "expo";

import * as appActions from "../../../redux/actions";
import NoKyc from "../NoKyc/NoKyc";
import CreatePasscode from "../Passcode/CreatePasscode";
import { KYC_STATUSES } from "../../../config/constants/common";
import WelcomeScreen from "../Welcome/Welcome";
import SignupTwo from "../Signup/SignupTwo";
import { registerForPushNotificationsAsync } from "../../../utils/push-notifications-util";
import { getSecureStoreKey } from "../../../utils/expo-storage";
import WalletBalance from "../WalletBalance/WalletBalance";

const {SECURITY_STORAGE_AUTH_KEY} = Constants.manifest.extra;

@connect(
  state => ({
    nav: state.nav,
    user: state.users.user,
    displayedRatesModal: state.ui.showedTodayRatesOnOpen,
    appSettings: state.users.appSettings,
    openedModal: state.ui.openedModal,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)

class HomeScreen extends Component {
  async componentWillMount() {
    const { actions, displayedRatesModal, openedModal, appSettings: { showTodayRatesModal } } = this.props;

    try {
      // get user token
      const token = await getSecureStoreKey(SECURITY_STORAGE_AUTH_KEY);
      // get user from db
      if (token) {
        await actions.getProfileInfo();

        // Anything beyond this point is considered as the user has logged in.
        registerForPushNotificationsAsync();
        actions.getKYCDocTypes();

        if (showTodayRatesModal && !displayedRatesModal && !openedModal) {
          actions.showTodaysRatesModal();
        }
      }
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    const { user } = this.props;

    if (!user) return <WelcomeScreen/>;

    if (!user.first_name || !user.last_name) return <SignupTwo/>;
    if (!user.has_pin) return <CreatePasscode />;
    if (!user.kyc || (user.kyc && user.kyc.status !== KYC_STATUSES.passed)) return <NoKyc />;
    return <WalletBalance />;
  }
}

export default HomeScreen;
