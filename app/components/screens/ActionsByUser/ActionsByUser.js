import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import LoginDevicesLog from "../../atoms/LoginDevicesLog/LoginDevicesLog";
import AccountActivityLog from "../../atoms/AccountActivityLog/AccountActivityLog";
import UserActionsLog from "../../atoms/UserActionsLog/UserActionsLog";

@connect(
  state => ({
    securityOverview: state.security.securityOverview,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ActionsByUser extends Component {
  static propTypes = {
    iconName: PropTypes.string,
  };
  static defaultProps = {
    iconName: "",
  };

  static navigationOptions = () => ({
    title: "User Actions",
    right: "profile",
  });

  componentDidMount() {
    const { actions } = this.props;
    actions.getSecurityOverview();
  }

  renderUserActionsLog = () => {
    const { securityOverview } = this.props;

    return securityOverview &&
      securityOverview.user_actions_log &&
      securityOverview.user_actions_log.length > 0 ? (
        <UserActionsLog logData={securityOverview.user_actions_log}/>
    ) : null;
  };

  renderAccountActionsLog = () => {
    const { securityOverview } = this.props;

    return securityOverview &&
      securityOverview.account_activity_log &&
      securityOverview.account_activity_log.length > 0 ? (
        <AccountActivityLog logData={securityOverview.account_activity_log}/>
    ) : null;
  };

  renderDeviceLogedIn = () => {
    const { securityOverview } = this.props;
    return (
      securityOverview &&
      securityOverview.devices_logged_in &&
      securityOverview.devices_logged_in.length > 0 ?
        (
          <LoginDevicesLog logData={securityOverview.devices_logged_in}/>
        )
      : null
    )
  };

  render() {
    const { securityOverview } = this.props;
    if (!securityOverview) return <LoadingScreen />;

    const LogUserActions = this.renderUserActionsLog;
    const AccountActionsLog = this.renderAccountActionsLog;
    const DeviceLogedIn = this.renderDeviceLogedIn;

    return (
      <RegularLayout>
        <View style={{ flex: 1 }}>
          <LogUserActions />
          <AccountActionsLog />
          <DeviceLogedIn />
        </View>
      </RegularLayout>
    );
  }
}

export default ActionsByUser;
