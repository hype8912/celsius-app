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
import CelButton from "../../atoms/CelButton/CelButton";
import ToggleInfoCard from "../../molecules/ToggleInfoCard/ToggleInfoCard";
// import SecurityScoreGauge from "../../atoms/SecurityScoreGauge/SecurityScoreGauge";
// import SecurityStrengthMeter from "../../atoms/SecurityStrengthMeter/SecurityStrengthMeter";
import CelText from "../../atoms/CelText/CelText";
import SecurityOverviewStyle from "./SecurityOverview.styles";
import Card from "../../atoms/Card/Card";
import { getTheme } from "../../../utils/styles-util";
import Icon from "../../atoms/Icon/Icon";
import { HODL_STATUS } from "../../../constants/UI";
// import IconButton from "../../organisms/IconButton/IconButton";

@connect(
  state => ({
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

  renderInfoCard = () => {
    const style = SecurityOverviewStyle();
    const theme = getTheme();
    // TODO 5 AND 10 fix with props
    return (
      <Card margin="20 0 20 0" padding={"2 2 2 2"} styles={style.card}>
        <View
          style={[
            style.circle,
            { backgroundColor: STYLES.COLORS.CELSIUS_BLUE_OPACITY1 },
          ]}
        >
          <Icon
            name={"Shield"}
            fill={STYLES.COLORS.CELSIUS_BLUE}
            width={35}
            height={35}
          />
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            alignItems: "flex-end",
            paddingVertical: 8,
            paddingRight: 12,
          }}
        >
          <View style={style.infoSubtitleWrapper}>
            <CelText
              type="H3"
              weight="600"
              color={
                theme === "light"
                  ? STYLES.COLORS.DARK_GRAY
                  : STYLES.COLORS.WHITE
              }
            >
              5
            </CelText>
            <CelText
              type="H5"
              color={
                theme === "light"
                  ? STYLES.COLORS.DARK_GRAY
                  : STYLES.COLORS.WHITE
              }
            >
              /10
            </CelText>
          </View>
          <TouchableOpacity onPress={{}}>
            <CelText
              type="H6"
              weight={"600"}
              color={STYLES.COLORS.CELSIUS_BLUE}
            >
              Check Withdrawal Addresses
            </CelText>
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  render() {
    const { securityOverview, is2FAEnabled, hodlStatus, actions } = this.props;

    if (!securityOverview) return <Loader />;

    return (
      <RegularLayout>
        <View style={{ flex: 1 }}>
          {/* <SecurityScoreGauge level={"4"} />*/}
          <Separator text="2FA VERIFICATION" />
          <ToggleInfoCard
            subtitle={"Your 2FA verification is"}
            onPress={this.onPress2fa}
            enabled={is2FAEnabled}
          />

          {/* <Separator text="WHITELISTED WITHDRAWAL ADDRESSES" />*/}
          {/* {this.renderInfoCard()}*/}

          <Separator text="HODL MODE" />
          <ToggleInfoCard
            subtitle={"HODL mode is"}
            onPress={() => actions.navigateTo("HodlLanding")}
            enabled={
              hodlStatus.state && hodlStatus.state !== HODL_STATUS.DEACTIVATED
            }
          />

          <Separator text="PASSWORD" />
          {/* <SecurityStrengthMeter level={"3"} />*/}
          <CelButton
            margin="10 0 10 0"
            onPress={() => actions.navigateTo("ChangePassword")}
          >
            Enhance Password
          </CelButton>

          <Separator text="PIN" />
          {/* <SecurityStrengthMeter level={"4"} />*/}
          <CelButton
            margin="10 0 10 0"
            onPress={() =>
              actions.navigateTo("VerifyProfile", {
                onSuccess: () => actions.navigateTo("ChangePin"),
              })
            }
          >
            Enhance PIN
          </CelButton>

          {/* <Separator text="3D PROTECTION" /> */}
          {/* <ToggleInfoCard enabled subtitle={"Your 3D Protection is"} /> */}

          {/* <Separator text="AUTO LOGOUT" /> */}
          {/* <ToggleInfoCard enabled subtitle={"Your Auto Logout is"} /> */}
        </View>
      </RegularLayout>
    );
  }
}

export default SecurityOverview;
