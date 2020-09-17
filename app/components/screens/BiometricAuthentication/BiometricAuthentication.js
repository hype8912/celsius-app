import React, { Component } from "react";
import { Linking } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import IconButton from "../../organisms/IconButton/IconButton";
import CelSwitch from "../../atoms/CelSwitch/CelSwitch";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import CelText from "../../atoms/CelText/CelText";
import { BIOMETRIC_TYPES } from "../../../constants/UI";
import {
  createBiometricsKey,
  deleteBiometricsKey,
} from "../../../utils/biometrics-util";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    securityOverview: state.security.securityOverview,
    user: state.user.profile,
    formData: state.forms.formData,
    biometrics: state.biometrics.biometrics,
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
    actions.getSecurityOverview();
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

    const biometricsType =
      biometrics.biometryType === BIOMETRIC_TYPES.TOUCH_ID
        ? "Touch ID"
        : "Face ID";
    const enableBiometricsText = `${biometricsType} enabled on this device.`;
    const disableBiometricsText = `${biometricsType} disabled on this device.`;

    if (!user.biometrics_enabled) {
      actions.navigateTo("VerifyProfile", {
        onSuccess: async () => {
          await createBiometricsKey(publicKey => {
            actions.activateBiometrics(publicKey, biometrics.biometryType);
          });
          actions.resetToScreen(SCREENS.BIOMETRICS_AUTHENTICATION);
          actions.showMessage("success", enableBiometricsText);
        },
        hideBiometrics: true,
      });
    } else {
      actions.navigateTo("VerifyProfile", {
        onSuccess: async () => {
          await deleteBiometricsKey(() => {
            actions.disableBiometrics();
          });
          actions.resetToScreen(SCREENS.BIOMETRICS_AUTHENTICATION);
          actions.showMessage("success", disableBiometricsText);
        },
        hideBiometrics: true,
      });
    }
  };

  render() {
    const { biometrics } = this.props;
    const Switcher = this.rightSwitch;

    const icon =
      biometrics.biometryType === BIOMETRIC_TYPES.TOUCH_ID
        ? "Fingerprint"
        : "FaceRecognition";
    const text =
      biometrics.biometryType === BIOMETRIC_TYPES.TOUCH_ID
        ? "Touch ID"
        : "Face ID";

    return (
      <RegularLayout>
        <CelText type="H4">
          Enable Biometric authentication which is available on this device.
        </CelText>
        <IconButton
          margin={"20 0 20 0"}
          icon={icon}
          right={<Switcher />}
          hideIconRight
        >
          {text}
        </IconButton>

        <CelText align={"center"}>
          By enabling some of the biometrics options you agree with{" "}
          {
            <CelText
              color={getColor(COLOR_KEYS.LINK)}
              onPress={() => {
                Linking.openURL("https://celsius.network/terms-of-use/");
              }}
            >
              Terms and Conditions.
            </CelText>
          }
        </CelText>
      </RegularLayout>
    );
  }
}

export default BiometricAuthentication;
