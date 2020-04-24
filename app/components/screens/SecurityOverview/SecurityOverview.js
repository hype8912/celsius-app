import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from 'lodash';
import moment from "moment";
import STYLES from "../../../constants/STYLES";
import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Separator from "../../atoms/Separator/Separator";
import ToggleInfoCard from "../../molecules/ToggleInfoCard/ToggleInfoCard";
import SecurityScoreGauge from "../../atoms/SecurityScoreGauge/SecurityScoreGauge";
import SecurityStrengthMeter from "../../atoms/SecurityStrengthMeter/SecurityStrengthMeter";
import CelText from "../../atoms/CelText/CelText";
import SecurityOverviewStyle from "./SecurityOverview.styles";
import Card from "../../atoms/Card/Card";
import { getTheme } from "../../../utils/styles-util";
import Icon from "../../atoms/Icon/Icon";
import { SECURITY_STRENGTH_LEVEL } from "../../../constants/DATA";
import LoadingScreen from "../LoadingScreen/LoadingScreen";


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

   componentDidMount(){
    const { actions } = this.props;
    actions.getSecurityOverview();
  }

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
    const { actions, securityOverview } = this.props;

    if (_.isEmpty(securityOverview)) return

    if (
      securityOverview.withdrawal_addresses_whitelisted_count ===
      securityOverview.withdrawal_addresses_count
    ) {
      return (
        <ToggleInfoCard
          enabled
          titleText={`${securityOverview.withdrawal_addresses_whitelisted_count}/${securityOverview.withdrawal_addresses_count}`}
          subtitle={"You added all withdrawal addresses"}
        />
      );
    }
    return (
      <Card margin="20 0 20 0" padding={"2 2 2 2"} styles={style.card}>
        <View style={{ justifyContent: "center" }}>
          <View
            style={[style.circle,
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
        </View>

        <View style={style.infoTextWrapper}>
          <View style={style.infoSubtitleWrapper}>
            <CelText type="H2" weight="600">
              {securityOverview.withdrawal_addresses_whitelisted_count}
            </CelText>
            <CelText type="H4" margin="0 0 2 0">
              /{securityOverview.withdrawal_addresses_count}
            </CelText>
          </View>
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
        </View>
      </Card>
    );
  };


  render() {
    const { is2FAEnabled, actions, securityOverview } = this.props;
    if (_.isEmpty(securityOverview)) return <LoadingScreen />;

    return (
      <RegularLayout>
        <View style={{ flex: 1 }}>
          <SecurityScoreGauge level={securityOverview.overall_score_strength} />
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
            enabled={ securityOverview.hodl_mode_active }
          />

          {securityOverview.is_using_password_auth && (
            <>
              <Separator text="PASSWORD" />
              <SecurityStrengthMeter
                level={securityOverview.password_strength}
                lastChangePeriod={moment(securityOverview.password_last_change).fromNow()}
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

         { !is2FAEnabled && <>
           <Separator text="PIN" />
           <SecurityStrengthMeter
             level={securityOverview.pin_strength}
             lastChangePeriod={moment(securityOverview.pin_last_change).fromNow()}
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
          </>}

        </View>
      </RegularLayout>
    );
  }
}

export default SecurityOverview;
