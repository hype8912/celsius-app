import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import moment from "moment";
import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Separator from "../../atoms/Separator/Separator";
import ToggleInfoCard from "../../molecules/ToggleInfoCard/ToggleInfoCard";
import SecurityScoreGauge from "../../atoms/SecurityScoreGauge/SecurityScoreGauge";
import SecurityStrengthMeter from "../../atoms/SecurityStrengthMeter/SecurityStrengthMeter";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import CheckWithdrawalAddressesCard from "../../organisms/CheckWithdrawalAddressesCard/CheckWithdrawalAddressesCard";
import SeparatorInfoModal from "../../modals/SeparatorInfoModal/SeparatorInfoModal";
import { MODALS } from "../../../constants/UI";
import SecurityOverviewStyle from "./SecurityOverview.styles";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    withdrawalAddresses: state.wallet.withdrawalAddresses,
    securityOverview: state.security.securityOverview,
    twoFAStatus: state.security.twoFAStatus,
    is2FAEnabled: state.user.profile.two_factor_enabled,
    hodlStatus: state.hodl.hodlStatus,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class SecurityOverview extends Component {
  state = {
    selectedModalData: {
      title: "",
      body: [],
    },
  };

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

  componentDidMount() {
    const { actions } = this.props;
    actions.getSecurityOverview();
  }

  onPress2fa = () => {
    const { actions, twoFAStatus } = this.props;
    if (!twoFAStatus.isActive) {
      actions.navigateTo(SCREENS.VERIFY_PROFILE, {
        onSuccess: () => actions.navigateTo(SCREENS.TWO_FACTOR_SETTINGS),
        hideBiometrics: true,
      });
    }
  };

  onPressFixNow = () => {
    const { securityOverview, actions } = this.props;
    const fixNowContent = securityOverview.score_parameters.filter(
      c => c.fixable && c.name !== "hodl_mode"
    );
    actions.navigateTo(SCREENS.SECURITY_FIX_NOW, {
      fixNowContentLength: fixNowContent.length,
    });
  };

  getFixNowParams = () => {
    const { securityOverview, twoFAStatus } = this.props;
    let scoreParams = securityOverview.score_parameters;
    const scoreParamsCount = securityOverview.score_parameters_count;
    let scoreParamsFixableCount =
      securityOverview.score_parameters_fixable_count;

    if (
      scoreParams.find(c => c.name === "pin" && c.fixable) &&
      twoFAStatus.isActive
    ) {
      scoreParams = scoreParams.filter(c => c.name !== "pin");
      scoreParamsFixableCount -= 1;
    }

    const fixNowParams = {
      scoreParams,
      scoreParamsCount,
      scoreParamsFixableCount,
    };
    return fixNowParams;
  };

  handleModalData = type => {
    switch (type) {
      case "hodl":
        this.setState({
          selectedModalData: {
            title: "What is HODL Mode?",
            body: [
              "HODL Mode is a security feature that gives you the ability to temporarily disable outgoing transactions from your Celsius wallet. You control when HODL Mode is activated, and it is an ideal feature for those that do not plan on withdrawing or transferring funds from their wallet for an extended period of time.",
            ],
          },
        });
        return;
      case "withdrawalAddresses":
        this.setState({
          selectedModalData: {
            title: "Why should you whitelist your withdrawal addresses?",
            body: [
              "Whitelisting a withdrawal address means that in the rare chance a hacker is able to gain access to your wallet, the only place they can send your crypto is a wallet that you already control. In addition, changing a whitelisted address for a specific coin requires email confirmation and will incur a 24 hours lock-down on all withdrawals in that coin.",
            ],
          },
        });
        return;
      case "twoFA":
        this.setState({
          selectedModalData: {
            title: "What is 2FA?",
            body: [
              "Two-factor authentication (2FA) is the industry standard for securing online accounts. Once activated, 2FA adds a second layer of protection between a hacker and withdrawal confirmations, CelPay confirmations, logins, and other sensitive actions by using a Time-based One-time Password.",
              "You can set up 2FA on your account by using Google Authenticator or Authy app, available on Android and iOS mobile devices.",
            ],
          },
        });
        return;
      default:
        return;
    }
  };

  render() {
    const { actions, securityOverview, twoFAStatus } = this.props;
    const style = SecurityOverviewStyle();
    if (_.isEmpty(securityOverview)) return <LoadingScreen />;
    const fixNowParams = this.getFixNowParams();
    return (
      <RegularLayout>
        <View style={style.container}>
          <SecurityScoreGauge
            level={securityOverview.overall_score_strength}
            fixNow={fixNowParams}
            onPressFixNow={() => this.onPressFixNow()}
          />

          <TouchableOpacity
            onPress={() => {
              this.handleModalData("twoFA");
              actions.openModal(MODALS.SEPARATOR_INFO_MODAL);
            }}
          >
            <Separator text="2FA VERIFICATION" showInfo />
          </TouchableOpacity>
          <ToggleInfoCard
            subtitle={"Your 2FA is"}
            onPress={this.onPress2fa}
            enabled={twoFAStatus.isActive}
          />

          <TouchableOpacity
            onPress={() => {
              this.handleModalData("withdrawalAddresses");
              actions.openModal(MODALS.SEPARATOR_INFO_MODAL);
            }}
          >
            <Separator text="WHITELISTED WITH. ADDRESSES" showInfo />
          </TouchableOpacity>
          <CheckWithdrawalAddressesCard />

          <TouchableOpacity
            onPress={() => {
              this.handleModalData("hodl");
              actions.openModal(MODALS.SEPARATOR_INFO_MODAL);
            }}
          >
            <Separator text="HODL MODE" showInfo />
          </TouchableOpacity>
          <ToggleInfoCard
            subtitle={"HODL mode is"}
            onPress={() => actions.navigateTo(SCREENS.HODL_LANDING)}
            enabled={securityOverview.hodl_mode_active}
          />

          {securityOverview.is_using_password_auth && (
            <>
              <Separator text="PASSWORD" />
              <SecurityStrengthMeter
                level={securityOverview.password_strength}
                lastChangePeriod={moment(
                  securityOverview.password_last_change
                ).fromNow()}
                enhanceText={
                  securityOverview.score_parameters.find(
                    e => e.name === "password" && e.fixable
                  )
                    ? "Change Password"
                    : null
                }
                onPressEnhance={() => {
                  actions.navigateTo(SCREENS.CHANGE_PASSWORD);
                }}
              />
            </>
          )}

          {!twoFAStatus.isActive && (
            <>
              <Separator text="PIN" />
              <SecurityStrengthMeter
                level={securityOverview.pin_strength}
                lastChangePeriod={moment(
                  securityOverview.pin_last_change
                ).fromNow()}
                enhanceText={
                  securityOverview.score_parameters.find(
                    e => e.name === "pin" && e.fixable
                  )
                    ? "Change PIN"
                    : null
                }
                onPressEnhance={() => {
                  actions.navigateTo(SCREENS.VERIFY_PROFILE, {
                    onSuccess: () => actions.navigateTo(SCREENS.CHANGE_PIN),
                    hideBiometrics: true,
                  });
                }}
              />
            </>
          )}
          <SeparatorInfoModal
            actions={actions}
            data={this.state.selectedModalData}
          />
        </View>
      </RegularLayout>
    );
  }
}

export default SecurityOverview;
