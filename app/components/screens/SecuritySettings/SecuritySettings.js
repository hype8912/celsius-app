import React, { Component } from "react";
// eslint-disable-next-line import/no-unresolved
import { openInbox } from "react-native-email-link";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import IconButton from "../../organisms/IconButton/IconButton";
import CelButton from "../../atoms/CelButton/CelButton";
import { HODL_STATUS } from "../../../constants/UI";
import { hasPassedKYC } from "../../../utils/user-util/user-util";
import CelSwitch from "../../atoms/CelSwitch/CelSwitch";
import { SECURITY_STRENGTH_LEVEL } from "../../../constants/DATA";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

@connect(
  state => ({
    securityOverview: state.security.securityOverview,
    is2FAEnabled: state.user.profile.two_factor_enabled,
    user: state.user.profile,
    kycStatus: state.user.profile.kyc,
    formData: state.forms.formData,
    hodlStatus: state.hodl.hodlStatus,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class SecuritySettings extends Component {
  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Security",
  });

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.is2FAEnabled !== prevState.is2FAEnabled) {
      return {
        is2FAEnabled: nextProps.is2FAEnabled,
      };
    }
    if (nextProps.hodlStatus.isActive !== prevState.isInHodlMode) {
      return {
        isInHodlMode: nextProps.hodlStatus.isActive,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      is2FAEnabled: false,
      isInHodlMode: false,
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.getProfileInfo();
    actions.getSecurityOverview();
  }

  logoutUser = async () => {
    const { actions } = this.props;
    await actions.logoutFromAllDevices();
  };

  rightSwitch2FA = () => {
    const { is2FAEnabled } = this.state;
    return (
      <CelSwitch
        onValueChange={this.handleSwitchChange2FA}
        value={is2FAEnabled}
      />
    );
  };

  handleSwitchChange2FA = () => {
    const { is2FAEnabled } = this.state;
    const { actions } = this.props;
    if (is2FAEnabled) {
      actions.navigateTo("VerifyProfile", {
        onSuccess: async () => {
          await actions.disableTwoFactor();
          actions.navigateTo("SecuritySettings");
          openInbox({
            title: "Remove Auth App",
            message:
              "If you remove authentication application you will lose a second step of verification. Are you sure you want to proceed?",
          });
        },
      });
    } else {
      actions.navigateTo("VerifyProfile", {
        onSuccess: () => actions.navigateTo("TwoFactorSettings"),
      });
    }
  };

  rightSwitchHodl = () => {
    const { isInHodlMode } = this.state;
    const { hodlStatus } = this.props;
    return (
      <CelSwitch
        onValueChange={this.handleSwitchChangeHodl}
        value={isInHodlMode}
        disabled={
          hodlStatus.state === HODL_STATUS.PENDING_DEACTIVATION ||
          hodlStatus.created_by === "backoffice"
        }
      />
    );
  };

  handleSwitchChangeHodl = () => {
    const { actions } = this.props;
    actions.navigateTo("HodlLanding");
  };

  securityOverallScore = () => {
    const { securityOverview } = this.props;

    if (_.isEmpty(securityOverview)) return;

    const strength = securityOverview.overall_score_strength.toLowerCase();
    switch (strength) {
      case SECURITY_STRENGTH_LEVEL.WEAK.toLowerCase():
        return {
          text: strength.toUpperCase(),
          textColor: getColor(COLOR_KEYS.NEGATIVE_STATE),
        };
      case SECURITY_STRENGTH_LEVEL.FAIR.toLowerCase():
        return {
          text: strength.toUpperCase(),
          textColor: getColor(COLOR_KEYS.ALERT_STATE),
        };
      case SECURITY_STRENGTH_LEVEL.GOOD.toLowerCase():
        return {
          text: strength.toUpperCase(),
          textColor: getColor(COLOR_KEYS.ALERT_STATE),
        };
      case SECURITY_STRENGTH_LEVEL.STRONG.toLowerCase():
        return {
          text: strength.toUpperCase(),
          textColor: getColor(COLOR_KEYS.POSITIVE_STATE),
        };
      default:
        return null;
    }
  };

  render() {
    const {
      actions,
      is2FAEnabled,
      user,
      kycStatus,
      securityOverview,
    } = this.props;

    const Switcher2FA = this.rightSwitch2FA;
    const SwitcherHodl = this.rightSwitchHodl;
    const rightText = this.securityOverallScore();
    if (_.isEmpty(securityOverview)) return <LoadingScreen />;

    return (
      <RegularLayout>
        {kycStatus && hasPassedKYC() && !_.isEmpty(securityOverview) && (
          <IconButton
            margin="0 0 0 0"
            rightText={rightText.text}
            rightTextColor={rightText.textColor}
            onPress={() => actions.navigateTo("SecurityOverview")}
          >
            Security Overview
          </IconButton>
        )}

        <IconButton margin={"20 0 20 0"} right={<Switcher2FA />} hideIconRight>
          Two-Factor Verification
        </IconButton>

        <IconButton right={<SwitcherHodl />} hideIconRight margin="0 0 20 0">
          HODL Mode
        </IconButton>

        {!user.registered_with_social && (
          <IconButton
            margin="0 0 20 0"
            onPress={() => actions.navigateTo("ChangePassword")}
          >
            Change password
          </IconButton>
        )}

        {!is2FAEnabled && (
          <IconButton
            margin="0 0 20 0"
            onPress={() =>
              actions.navigateTo("VerifyProfile", {
                onSuccess: () => actions.navigateTo("ChangePin"),
              })
            }
          >
            Change PIN
          </IconButton>
        )}

        <IconButton
          margin="0 0 20 0"
          onPress={() => actions.navigateTo("WithdrawAddressOverview")}
        >
          Change withdrawal addresses
        </IconButton>

        <CelButton
          margin="0 0 20 0"
          basic
          onPress={() => {
            actions.navigateTo("ActionsByUser");
          }}
        >
          User Actions
        </CelButton>

        <CelButton margin="0 0 20 0" onPress={this.logoutUser}>
          Log out from all devices
        </CelButton>
      </RegularLayout>
    );
  }
}

export default SecuritySettings;
