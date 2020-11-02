import React, { Component } from "react";
import { View, Platform } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Branch from "react-native-branch";
import appsFlyer from "react-native-appsflyer";
import loggerUtil from "../../../utils/logger-util";
import * as appActions from "../../../redux/actions";
import appsFlyerUtil from "../../../utils/appsflyer-util";
import { addDeepLinkData, handleDeepLink } from "../../../utils/deepLink-util";
import mixpanelAnalytics from "../../../utils/mixpanel-analytics";

appsFlyer.onInstallConversionData(data => {
  loggerUtil.log(data);
});
appsFlyer.onAppOpenAttribution(async res => {
  if (res.data && res.data.type)
    // store.dispatch(appActions.addDeepLinkData(res.data));
    await addDeepLinkData(res.data)
    loggerUtil.log("onAppOpenAttributionCanceller: ", res.data);
});
appsFlyerUtil.initSDK();

@connect(
  state => ({
    appState: state.app.appState,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class DeepLinkController extends Component {

  componentDidMount() {
    this.handleBranchDeepLinks()
  }

 async componentDidUpdate(prevProps) {
    const { appState } = this.props;
    if (
      prevProps.appState.match(/inactive|background/) &&
      appState === "active"
    ) {
      if (Platform.OS === "ios") {
        appsFlyer.trackAppLaunch();
      }
      setTimeout(async ()=>{
        await handleDeepLink()
      }, 2000 )
    }
  }


  /**
   * Initialize & Subscribe to Branch
   */
  handleBranchDeepLinks() {
    console.log('usao u handleBranchDeepLinks')
    try {
      Branch.subscribe(async deepLink => {
        if (
          !deepLink ||
          !deepLink.params["+clicked_branch_link"] ||
          deepLink.error ||
          !deepLink.params
        ) {
          return;
        }

        const deepLinkData = {
          ...deepLink,
          type: deepLink.params.type || deepLink.params.link_type,
        };
        await addDeepLinkData(deepLinkData)
      });
    } catch (error) {
      mixpanelAnalytics.logError("branchUtil.initBranch", error);
    }
  }


  render() {
    return <View />;
  }
}
export default DeepLinkController;
