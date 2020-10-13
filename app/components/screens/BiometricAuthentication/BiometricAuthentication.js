import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import IconButton from "../../organisms/IconButton/IconButton";
import CelSwitch from "../../atoms/CelSwitch/CelSwitch";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import CelText from "../../atoms/CelText/CelText";
import { BIOMETRIC_ERRORS, MODALS } from "../../../constants/UI";
import {
  biometricNonEnrolled,
  createBiometricsKey,
  deleteBiometricsKey,
  getBiometricTypeData,
} from "../../../utils/biometrics-util";
import { SCREENS } from "../../../constants/SCREENS";
import InfoBox from "../../atoms/InfoBox/InfoBox";
import Icon from "../../atoms/Icon/Icon";
import mixpanelAnalytics from "../../../utils/mixpanel-analytics";
import BiometricsActivateFingerprintModal from "../../modals/BiometricsActivateFingerprintModal/BiometricsActivateFingerprintModal";

@connect(
  state => ({
    user: state.user.profile,
    biometrics: state.biometrics.biometrics,
    appState: state.app.appState,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BiometricAuthentication extends Component {
  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Biometric authentication",
  });

  componentDidMount() {
    const { actions } = this.props;
    actions.getProfileInfo();
  }

  rightSwitch = () => {
    const { user } = this.props;
    return (
      <CelSwitch
        onValueChange={this.handleSwitchChangeBiometrics}
        value={user.biometrics_enabled}
      />
    );
  };

  handleSwitchChangeBiometrics = () => {
    const { actions, biometrics, user } = this.props;
    const biometricsType = getBiometricTypeData();
    const enableBiometricsText = `${biometricsType.text} enabled on this device.`;
    const disableBiometricsText = `${biometricsType.text} disabled on this device.`;

    if (!user.biometrics_enabled) {
      actions.navigateTo(SCREENS.VERIFY_PROFILE, {
        onSuccess: async () => {
          try {
            const publicKey = await createBiometricsKey();
            const changeSuccessful = await actions.activateBiometrics(
              publicKey,
              biometrics.biometryType
            );
            if (changeSuccessful)
              actions.showMessage("success", enableBiometricsText);
            actions.navigateTo(SCREENS.BIOMETRICS_AUTHENTICATION);
          } catch (e) {
            actions.navigateTo(SCREENS.BIOMETRICS_AUTHENTICATION);
            if (
              e &&
              e.message === BIOMETRIC_ERRORS.ERROR_GENERATING_PUBLIC_KEYS
            ) {
              actions.openModal(MODALS.BIOMETRICS_ACTIVATE_FINGERPRINT_MODAL);
            }
            mixpanelAnalytics.logError(
              "handleSwitchChangeBiometrics - enable",
              e
            );
          }
        },
        hideBiometrics: true,
      });
    } else {
      actions.navigateTo(SCREENS.VERIFY_PROFILE, {
        onSuccess: async () => {
          try {
            const biometricDisabled = await actions.disableBiometrics(false);
            if (biometricDisabled)
              actions.showMessage("success", disableBiometricsText);
            await deleteBiometricsKey();
            actions.navigateTo(SCREENS.BIOMETRICS_AUTHENTICATION);
          } catch (e) {
            mixpanelAnalytics.logError(
              "handleSwitchChangeBiometrics - disable",
              e
            );
          }
        },
        hideBiometrics: true,
      });
    }
  };

  render() {
    const { biometrics, actions } = this.props;
    const noBiometricsEnrolled = biometricNonEnrolled();

    const Switcher = this.rightSwitch;
    const biometricsType = getBiometricTypeData();
    return (
      <RegularLayout>
        <CelText type="H4">
          Enable Biometric authentication which is available on this device.
        </CelText>
        {biometrics.available && (
          <IconButton
            margin={"20 0 20 0"}
            icon={biometricsType.icon}
            right={<Switcher />}
            hideIconRight
          >
            {biometricsType.text}
          </IconButton>
        )}

        {noBiometricsEnrolled && (
          <InfoBox
            backgroundColor={getColor(COLOR_KEYS.ALERT_STATE)}
            padding={"20 30 20 10"}
          >
            <View style={{ flexDirection: "row" }}>
              <View>
                <Icon
                  name={"WarningCircle"}
                  height="30"
                  width="30"
                  fill={getColor(COLOR_KEYS.WHITE)}
                />
              </View>
              <CelText type="H6" color={"white"} margin={"0 10 0 10"}>
                We notice that you haven't activated biometrics on your device.
                If you want to use biometrics in the app, you must activate
                biometrics on your device first.
              </CelText>
            </View>
          </InfoBox>
        )}
        <BiometricsActivateFingerprintModal actions={actions} />
      </RegularLayout>
    );
  }
}

export default BiometricAuthentication;
