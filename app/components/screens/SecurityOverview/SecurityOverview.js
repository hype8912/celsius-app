import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import STYLES from "../../../constants/STYLES";
import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Separator from "../../atoms/Separator/Separator";
import Loader from "../../atoms/Loader/Loader";
import ToggleInfoCard from "../../molecules/ToggleInfoCard/ToggleInfoCard";
import SecurityScoreGauge from "../../atoms/SecurityScoreGauge/SecurityScoreGauge";
import SecurityStrengthMeter from "../../atoms/SecurityStrengthMeter/SecurityStrengthMeter";
import CelText from "../../atoms/CelText/CelText";
import SecurityOverviewStyle from "./SecurityOverview.styles";
import Card from "../../atoms/Card/Card";
import { getTheme } from "../../../utils/styles-util";
import Icon from "../../atoms/Icon/Icon";
import { HODL_STATUS } from "../../../constants/UI";
import { SECURITY_STRENGTH_LEVEL } from "../../../constants/DATA";
// import IconButton from "../../organisms/IconButton/IconButton";

// TODO when backend call is completed remove this const
const securityOverview = {
  is_2fa_set: false,
  hodl_mode_set: false,
  hodl_status: "Deactivated",
  is_using_oauth: false,
  password_strength: "fair",
  pin_strength: "weak",
  password_last_change: "3 days ago",
  pin_last_change: "3 days ago",
  withdrawal_addresses_whitelisted: false,
  withdrawal_addresses_count: 4,
  whitelisted_withdrawal_addresses_count: 2,
  overall_score: "good",
};

@connect(
  state => ({
    withdrawalAddresses: state.wallet.withdrawalAddresses,
    securityOverview: state.security.securityOverview,
    is2FAEnabled: state.user.profile.two_factor_enabled,
    hodlStatus: state.hodl.hodlStatus,
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
    title: "Security Overview",
    right: "profile",
  });

  // TODO When wire with backend is complete, check this part of code.
  // componentDidMount() {
  //   const { actions } = this.props;
  //   actions.getSecurityOverview();
  // }

  onPress2fa = () => {
    const { actions, is2FAEnabled } = this.props;
    if (!is2FAEnabled) {
      actions.navigateTo("VerifyProfile", {
        onSuccess: () => actions.navigateTo("TwoFactorSettings"),
      });
    }
  };

  renderWhitelistedAddressesCard = () => {
    const style = SecurityOverviewStyle();
    const theme = getTheme();
    const { actions } = this.props;

    if (
      securityOverview.whitelisted_withdrawal_addresses_count ===
      securityOverview.withdrawal_addresses_count
    ) {
      return (
        <ToggleInfoCard
          enabled
          titleText={`${securityOverview.whitelisted_withdrawal_addresses_count}/${securityOverview.withdrawal_addresses_count}`}
          subtitle={"You added all withdrawal addresses"}
        />
      );
    }

    return (
      <Card margin="20 0 20 0" padding={"2 2 2 2"} styles={style.card}>
        <View
          style={[
            style.circle,
            {
              backgroundColor:
                theme === "light"
                  ? STYLES.COLORS.DARK_GRAY1
                  : STYLES.COLORS.WHITE_OPACITY1,
            },
          ]}
        >
          <Icon
            name={"Shield"}
            fill={STYLES.COLORS.CELSIUS_BLUE}
            width={35}
            height={35}
          />
        </View>
        <View style={style.infoTextWrapper}>
          <View style={style.infoSubtitleWrapper}>
            <CelText type="H2" weight="600">
              {securityOverview.whitelisted_withdrawal_addresses_count}
            </CelText>
            <CelText type="H4" margin="0 0 2 0">
              /{securityOverview.withdrawal_addresses_count}
            </CelText>
          </View>
          <TouchableOpacity onPress={{}}>
            <CelText
              type="H6"
              weight={"600"}
              color={STYLES.COLORS.CELSIUS_BLUE}
              onPress={() => {
                actions.navigateTo("WithdrawAddressOverview");
              }}
            >
              Check Withdrawal Addresses
            </CelText>
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  render() {
    // TODO add "securityOverview" to props instead of const
    const { is2FAEnabled, actions } = this.props;

    if (!securityOverview) return <Loader />;
    return (
      <RegularLayout>
        <View style={{ flex: 1 }}>
          <SecurityScoreGauge level={securityOverview.overall_score} />
          <Separator text="2FA VERIFICATION" />
          <ToggleInfoCard
            subtitle={"Your 2FA verification is"}
            onPress={this.onPress2fa}
            enabled={is2FAEnabled}
          />

          <>
            <Separator text="WHITELISTED WITHDRAWAL ADDRESSES" />
            {this.renderWhitelistedAddressesCard()}
          </>

          <Separator text="HODL MODE" />
          <ToggleInfoCard
            subtitle={"HODL mode is"}
            onPress={() => actions.navigateTo("HodlLanding")}
            enabled={securityOverview.hodl_status !== HODL_STATUS.DEACTIVATED}
          />

          {!securityOverview.is_using_oauth && (
            <>
              <Separator text="PASSWORD" />
              <SecurityStrengthMeter
                level={securityOverview.password_strength}
                lastChangePeriod={securityOverview.password_last_change}
                enhanceText={
                  securityOverview.password_strength !==
                    SECURITY_STRENGTH_LEVEL.STRONG.toLowerCase() &&
                  "Change Password"
                }
                onPressEnhance={() => {
                  actions.navigateTo("ChangePassword");
                }}
              />
            </>
          )}

          <Separator text="PIN" />
          <SecurityStrengthMeter
            level={securityOverview.pin_strength}
            lastChangePeriod={securityOverview.pin_last_change}
            enhanceText={
              securityOverview.pin_strength !==
                SECURITY_STRENGTH_LEVEL.STRONG.toLowerCase() && "Change PIN"
            }
            onPressEnhance={() => {
              actions.navigateTo("VerifyProfile", {
                onSuccess: () => actions.navigateTo("ChangePin"),
              });
            }}
          />

          {/* <Separator text="3D PROTECTION" />*/}
          {/* <ToggleInfoCard enabled subtitle={"Your 3D Protection is"} />*/}

          {/* <Separator text="AUTO LOGOUT" /> */}
          {/* <ToggleInfoCard enabled subtitle={"Your Auto Logout is"} /> */}
        </View>
      </RegularLayout>
    );
  }
}

export default SecurityOverview;
