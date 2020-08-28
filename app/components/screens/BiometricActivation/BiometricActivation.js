import React, { Component } from "react";
import { View, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";

import BiometricActivationStyle from "./BiometricActivation.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelButton from "../../atoms/CelButton/CelButton";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { BIOMETRIC_TYPES } from "../../../constants/UI";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BiometricActivation extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    headerSameColor: false,
    transparent: true,
    hideBack: true,
    gesturesEnabled: false,
  });

  onPressLogin = () => {
    const { actions } = this.props;
    actions.navigateTo("Login");
  };

  selectedBiometricType = () => {
    const biometricType = BIOMETRIC_TYPES.FACE_ID;
    let biometricCopy;
    if (biometricType === BIOMETRIC_TYPES.FACE_ID) {
      biometricCopy = {
        image: require("../../../../assets/images/face-recognition.png"),
        title: "Start using Face Recognition",
        description:
          "To make your account even more secure, enable Face Recognition.",
        button: "Enable Face Recognition",
      };
    } else {
      biometricCopy = {
        image: require("../../../../assets/images/fingerprint.png"),
        title: "Start using your Touch ID",
        description: "To make your account even more secure, enable Touch ID.",
        button: "Enable Touch ID",
      };
    }
    return biometricCopy;
  };

  render() {
    const { actions } = this.props;
    const style = BiometricActivationStyle();
    const copy = this.selectedBiometricType();

    return (
      <RegularLayout fabType="hide">
        <View style={style.wrapper}>
          <Image source={copy.image} style={style.image} />
          <CelText
            margin="0 40 0 40"
            weight="bold"
            align="center"
            type="H2"
            style={style.title}
          >
            {copy.title}
          </CelText>
          <CelText weight="light" align="center" style={style.subtitle}>
            {copy.description}
          </CelText>
          <CelButton style={style.button} onPress={this.onPressLogin}>
            {copy.button}
          </CelButton>
          <CelText
            color={getColor(COLOR_KEYS.PRIMARY_BUTTON)}
            onPress={() => {
              actions.resetToScreen("BiometricAuthentication");
            }}
          >
            Cancel
          </CelText>
        </View>
      </RegularLayout>
    );
  }
}

export default BiometricActivation;
