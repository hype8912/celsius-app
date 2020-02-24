import React, { Component } from "react";
import { View, Image } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { lookup } from "country-data";
import moment from "moment";

import * as appActions from "../../../redux/actions";
import SecurityOverviewStyle from "./SecurityOverview.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Card from "../../atoms/Card/Card";
import Separator from "../../atoms/Separator/Separator";
import STYLES from "../../../constants/STYLES";
import Icon from "../../atoms/Icon/Icon";
import Loader from "../../atoms/Loader/Loader";

@connect(
  state => ({
    securityOverview: state.security.securityOverview,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class SecurityOverview extends Component {
  static propTypes = {
    iconName: PropTypes.string,
  };
  static defaultProps = {
    iconName: "",
  };

  static navigationOptions = () => ({
    title: "Security info",
    right: "profile",
  });

  componentDidMount() {
    const { actions } = this.props;
    actions.getSecurityOverview();
  }

  getIcon = item => {
    if (item.action === "transaction-history") {
      return {
        name: "Csv",
        color: STYLES.COLORS.CELSIUS_BLUE,
        action: "Transaction History Requested",
      };
    }

    if (item.action === "withdrawal-request") {
      return {
        name: "CaretUp",
        color: STYLES.COLORS.ORANGE,
        action: "Withdraw Request",
      };
    }

    if (item.action === "successful-login") {
      return {
        name: "Checked",
        color: STYLES.COLORS.GREEN,
        action: "Successful Login",
      };
    }

    if (item.action === "loan-rejected") {
      return {
        name: "Loan",
        color: STYLES.COLORS.RED,
        action: "Loan Rejected",
      };
    }

    if (item.action === "loan-approved") {
      return {
        name: "Loan",
        color: STYLES.COLORS.GREEN,
        action: "Loan Approved",
      };
    }

    if (item.action === "loan-canceled") {
      return {
        name: "Loan",
        color: STYLES.COLORS.RED,
        action: "Loan Canceled",
      };
    }

    if (item.action === "change-email") {
      return {
        name: "Mail",
        color: STYLES.COLORS.CELSIUS_BLUE,
        action: "Change Email",
      };
    }

    if (item.action === "change-pin") {
      return {
        name: "Lock",
        color: STYLES.COLORS.CELSIUS_BLUE,
        action: "Change Pin",
      };
    }

    if (item.action === "pin-activated") {
      return { name: "Lock", color: STYLES.COLORS.GREEN, action: "Set Pin" };
    }
    if (item.action === "confirm-celpay") {
      return {
        name: "Mail",
        color: `${STYLES.COLORS.CELSIUS_BLUE}`,
        action: "CelPay Confirmed",
      };
    }
    if (item.action === "loan-apply") {
      return { name: "Lock", color: STYLES.COLORS.GREEN, action: "Loan apply" };
    }
    if (item.action === "change-password-confirm") {
      return {
        name: "Key",
        color: `${STYLES.COLORS.GREEN}`,
        action: "Password changed",
      };
    }
    if (item.action === "2fa-deactivated") {
      return {
        name: "NotSecure",
        color: `${STYLES.COLORS.RED}`,
        action: "2FA Deactivated",
      };
    }
    if (item.action === "2fa-deactivation-confirm") {
      return {
        name: "NotSecure",
        color: `${STYLES.COLORS.CELSIUS_BLUE}`,
        action: "2FA Deactivation Confirm ",
      };
    }
    if (item.action === "2fa-activation-confirm") {
      return {
        name: "Shield",
        color: `${STYLES.COLORS.CELSIUS_BLUE}`,
        action: "2FA Activation Confirm ",
      };
    }
    if (item.action === "2fa-activated") {
      return {
        name: "Shield",
        color: STYLES.COLORS.GREEN,
        action: "2FA Activated",
      };
    }
    if (item.action === "celpay-claim") {
      return {
        name: "CaretDown",
        color: STYLES.COLORS.GREEN,
        action: "CelPay Claimed",
      };
    }
    if (item.action === "withdraw-info") {
      return {
        name: "CaretUp",
        color: `${STYLES.COLORS.RED}`,
        action: "Withdraw",
      };
    }
    if (item.action === "deposit-success") {
      return {
        name: "CaretDown",
        color: STYLES.COLORS.GREEN,
        action: "Deposit",
      };
    }
    if (item.action === "confirm-withdrawal-request") {
      return {
        name: "CaretUp",
        color: `${STYLES.COLORS.GREEN}`,
        action: "Withdraw confirm request",
      };
    }
    if (item.action === "withdrawal-address-change") {
      return {
        name: "QrCode",
        color: `${STYLES.COLORS.CELSIUS_BLUE}`,
        action: "Withdrawal address change",
      };
    }
  };

  getCardProps = () => {
    const { securityOverview } = this.props;

    return {
      name: securityOverview.is_2fa_set ? "Checked" : "Shield",
      color: securityOverview.is_2fa_set
        ? STYLES.COLORS.GREEN
        : STYLES.COLORS.WHITE,
      circleColor: securityOverview.is_2fa_set
        ? STYLES.COLORS.WHITE_OPACITY2
        : STYLES.COLORS.RED_OPACITY2,
      fill: securityOverview.is_2fa_set
        ? STYLES.COLORS.WHITE
        : STYLES.COLORS.RED,
      text: securityOverview.is_2fa_set
        ? STYLES.COLORS.WHITE
        : STYLES.COLORS.DARK_GRAY,
    };
  };

  renderStatus = () => {
    const { securityOverview } = this.props;
    if (securityOverview.is_2fa_set) {
      return (
        <CelText type="H2" weight="600" color={STYLES.COLORS.WHITE}>
          {" "}
          ACTIVE{" "}
        </CelText>
      );
    }
    return (
      <CelText type="H2" weight="600" color={STYLES.COLORS.RED}>
        {" "}
        INACTIVE{" "}
      </CelText>
    );
  };

  renderUserActionsLog = () => {
    // Add text (no actions yet..) if doesn't exists
    const { securityOverview } = this.props;
    const style = SecurityOverviewStyle();

    return securityOverview &&
    securityOverview.user_actions_log &&
    securityOverview.user_actions_log.length > 0 ? (
      <>
        <Separator margin="0 0 10 0" text="User actions log"/>
        {securityOverview.user_actions_log.map(item => {
          const actions = this.getIcon(item);

          return (
            <View key={item.created_at} style={style.userActionsLogWrapper}>
              <View style={style.userActionsLog}>
                <Icon
                  name={actions.name}
                  viewBox="0 0 29 29"
                  fill={actions.color}
                />
                <CelText
                  style={{ flex: 1, justifyContent: "flex-start" }}
                  type="H5"
                  weight="600"
                >
                  {actions.action}{" "}
                </CelText>
                <CelText type="H6" weight="300">
                  {moment(item.created_at).format("MMMM D, GGGG")}{" "}
                </CelText>
              </View>
              <View style={{ marginBottom: 0 }}>
                {securityOverview.user_actions_log[
                securityOverview.user_actions_log.length - 1
                  ] !== item ? (
                  <Separator/>
                ) : null}
              </View>
            </View>
          );
        })}
      </>
    ) : null;
  };

  renderImage = (iso = "") => {
    if (!lookup.countries({ name: iso }) || !lookup.countries({ name: iso })[0])
      return null;
    const short = lookup.countries({ name: iso })[0].alpha2;
    return (
      <Image
        source={{
          uri: `https://raw.githubusercontent.com/hjnilsson/country-flags/master/png250px/${short.toLowerCase()}.png`,
        }}
        resizeMode="cover"
        style={{ borderRadius: 15, width: 30, height: 30 }}
      />
    );
  };

  renderAccountActionsLog = () => {
    // country flag
    const { securityOverview } = this.props;
    const style = SecurityOverviewStyle();

    return securityOverview &&
    securityOverview.account_activity_log &&
    securityOverview.account_activity_log.length > 0 ? (
      <>
        <Separator margin="10 0 20 0" text="Account activity LOG"/>
        {securityOverview.account_activity_log.map(item => (
          <View key={item.date} style={style.accountActionsLogWrapper}>
            <View style={style.accountActionsLog1}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {this.renderImage(item.country)}
                <View style={style.accountActionsLog2}>
                  <CelText type="H5" weight="600">
                    {item.ip}{" "}
                  </CelText>
                  <CelText type="H6" weight="300">
                    {item.country}{" "}
                  </CelText>
                </View>
              </View>
              <View style={style.accountActionsLog3}>
                <CelText type="H6" weight="300">
                  {item.platform === "ios" ? "iOS" : "Android"}{" "}
                </CelText>
                <CelText type="H6" weight="300">
                  {moment(item.date).format("MMMM D, GGGG")}
                </CelText>
              </View>
            </View>
            {securityOverview.account_activity_log[
            securityOverview.account_activity_log.length - 1
              ] !== item ? (
              <Separator margin="15 0 10 0"/>
            ) : null}
          </View>
        ))}
      </>
    ) : null;
  };

  renderDeviceLogedIn = () => {
    // Logic for current device loged in
    const { securityOverview } = this.props;
    const style = SecurityOverviewStyle();
    return securityOverview &&
    securityOverview.devices_logged_in &&
    securityOverview.devices_logged_in.length > 0 ? (
      <>
        <Separator margin="10 0 20 0" text="DEVICES Loged in"/>
        {securityOverview.devices_logged_in.map(item => (
          <View key={item.date} style={style.renderDeviceWrapper}>
            <View style={style.renderDevice}>
              <Icon name="Mobile" viewBox="0 0 29 29" fill="#737A82"/>
              <View style={{ flex: 1, flexDirection: "column" }}>
                <CelText type="H5" weight="600">
                  {item.model}{" "}
                </CelText>
                <CelText type="H6" weight="300">
                  {item.country}{" "}
                </CelText>
              </View>
              <View style={style.renderDeviceCity}>
                <CelText type="H6" weight="300">
                  {item.city}{" "}
                </CelText>
                <CelText type="H6" weight="300">
                  {moment(item.date).format("MMMM D, GGGG")}
                </CelText>
              </View>
            </View>
            {securityOverview.devices_logged_in[
            securityOverview.devices_logged_in.length - 1
              ] !== item ? (
              <Separator margin="15 0 10 0"/>
            ) : null}
          </View>
        ))}
      </>
    ) : null;
  };

  render() {
    const { actions, securityOverview } = this.props;
    const style = SecurityOverviewStyle();

    if (!securityOverview) return <Loader/>;

    const UserActionsLog = this.renderUserActionsLog;
    const AccountActionsLog = this.renderAccountActionsLog;
    const DeviceLogedIn = this.renderDeviceLogedIn;
    const cardProps = this.getCardProps();

    return (
      <RegularLayout>
        <View style={{ flex: 1 }}>
          <CelText margin="0 0 20 0">
            Check the security of your account and check the suggestions on how
            to make it even more secure.
          </CelText>
          <Separator text="Two-factor verification"/>
          <Card
            margin="40 0 40 0"
            padding={"2 2 2 2"}
            styles={[style.card, { backgroundColor: cardProps.color }]}
          >
            <View
              style={[style.circle, { backgroundColor: cardProps.circleColor }]}
            >
              <Icon
                name={cardProps.name}
                fill={cardProps.fill}
                width={35}
                height={35}
              />
            </View>
            <View style={style.text}>
              <CelText type="H7" color={cardProps.text}>
                {" "}
                Your Two-Factor Verification is{" "}
              </CelText>
              <CelText align="right">{this.renderStatus()}</CelText>
            </View>
          </Card>
          <CelText margin="0 0 20 0">
            Two-Factor Verification is an extra layer of security that prevents
            the risk of unwanted access to your account, even if your login
            information is compromised.{" "}
          </CelText>
          <Separator text="Email confirmation"/>

          <Card
            margin="40 0 40 0"
            padding={"2 2 2 2"}
            styles={[style.card, { backgroundColor: STYLES.COLORS.GREEN }]}
          >
            <View
              style={[
                style.circle,
                { backgroundColor: STYLES.COLORS.WHITE_OPACITY2 },
              ]}
            >
              <Icon
                name={"Checked"}
                fill={STYLES.COLORS.WHITE}
                width={35}
                height={35}
              />
            </View>
            <View style={style.text}>
              <CelText type="H7" color={STYLES.COLORS.WHITE}>
                Email confirmation
              </CelText>
              <CelText type="H2" weight="600" color={STYLES.COLORS.WHITE}>
                ACTIVE
              </CelText>
            </View>
          </Card>
          <CelText margin="0 0 20 0">
            Stay in control of your actions! By confirming your transactions via
            email you are adding to your security level.
          </CelText>

          <UserActionsLog/>

          <AccountActionsLog/>

          <DeviceLogedIn/>

          <Separator margin="20 0 20 0"/>

          <View>
            <CelText align="center">
              To make any changes on your account’s safety go to your
              <CelText
                color={STYLES.COLORS.CELSIUS_BLUE}
                onPress={() => actions.navigateTo("SecuritySettings")}
              >
                {" "}
                Security Settings
              </CelText>
            </CelText>
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default SecurityOverview;
