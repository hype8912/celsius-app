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
import InfoBox from "../../atoms/InfoBox/InfoBox";
import Icon from "../../atoms/Icon/Icon";
import { BIOMETRIC_TYPES } from "../../../constants/UI";

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

  constructor(props) {
    super(props);
    this.state = {
      biometricActivated: false,
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.getProfileInfo();
    actions.getSecurityOverview();
    // TODO set state regarding of biometrics endpoint
    this.setState({ biometricActivated: false });
  }

  rightSwitch = () => {
    const { biometricActivated } = this.state;
    return (
      <CelSwitch
        onValueChange={this.handleSwitchChangeBiometrics}
        value={biometricActivated}
      />
    );
  };

  // TODO when complete BiometricActivation screen, modify this function
  handleSwitchChangeBiometrics = () => {
    const { biometricActivated } = this.state;
    const { actions } = this.props;
    if (!biometricActivated) {
      actions.navigateTo("VerifyProfile", {
        onSuccess: async () => {
          this.setState({ biometricActivated: true });
          actions.navigateTo("BiometricActivation");
        },
      });
    } else {
      actions.navigateTo("VerifyProfile", {
        onSuccess: () => this.setState({ biometricActivated: false }),
      });
    }
  };

  render() {
    const { actions, biometrics } = this.props;
    const Switcher = this.rightSwitch;

    const biometricType =
      biometrics.biometryType ===
      (BIOMETRIC_TYPES.BIOMETRICS || BIOMETRIC_TYPES.TOUCH_ID)
        ? BIOMETRIC_TYPES.TOUCH_ID
        : BIOMETRIC_TYPES.FACE_ID;
    const icon =
      biometricType === BIOMETRIC_TYPES.TOUCH_ID
        ? "Fingerprint"
        : "FaceRecognition";
    const text =
      biometricType === BIOMETRIC_TYPES.TOUCH_ID ? "Touch ID" : "Face ID";
    const isBiometricAvailableOnAnotherDevice = true;

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

        {isBiometricAvailableOnAnotherDevice && (
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
                We notice that you have activated biometrics on another device.
                Setting biometrics on this device will automatically disable it
                on any other devices.
              </CelText>
            </View>
          </InfoBox>
        )}

        <CelText align={"center"}>
          By enabling some of the biometrics options you agree with{" "}
          {
            <CelText
              color={getColor(COLOR_KEYS.LINK)}
              onPress={() => {
                actions.navigateTo("LoanTermsOfUse");
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
