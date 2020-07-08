import React, { Component } from "react";
import { View, Platform } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import appsFlyer from "react-native-appsflyer";
import _ from "lodash";
import loggerUtil from "../../../utils/logger-util";
import store from "../../../redux/store";
import * as appActions from "../../../redux/actions";
import appsFlyerUtil from "../../../utils/appsflyer-util";

appsFlyer.onInstallConversionData(data => {
  loggerUtil.log(data);
});
appsFlyer.onAppOpenAttribution(res => {
  store.dispatch(appActions.addDeepLinkData(res.data));
  loggerUtil.log("onAppOpenAttributionCanceller: ", res.data);
});
appsFlyerUtil.initSDK();

@connect(
  state => ({
    deepLinkData: state.deepLink.deepLinkData,
    appState: state.app.appState,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class DeepLinkController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allowHandleDeepLink: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { deepLinkData, appState, actions } = this.props;
    const { allowHandleDeepLink } = this.state;
    if (
      prevProps.appState.match(/inactive|background/) &&
      appState === "active"
    ) {
      if (Platform.OS === "ios") {
        appsFlyer.trackAppLaunch();
      }
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ allowHandleDeepLink: true });
    }

    if (!_.isEqual(deepLinkData, prevProps.deepLinkData)) {
      if (allowHandleDeepLink && deepLinkData && deepLinkData.type) {
        actions.handleDeepLink();
      }

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ allowHandleDeepLink: false });
    }
  }

  render() {
    return <View />;
  }
}
export default DeepLinkController;
