import React, { Component } from "react";
import { View, Linking, TouchableOpacity, Clipboard, Image, ImageBackground } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QRCode from "react-native-qrcode-svg";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import TwoFactorSettingsStyle from "./TwoFactorSettings.styles";
import CelButton from "../../atoms/CelButton/CelButton";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Card from "../../atoms/Card/Card";
import loggerUtil from "../../../utils/logger-util";
import { SCREENS } from "../../../constants/SCREENS";
import Constants from "../../../../constants";
import InfoBox from "../../atoms/InfoBox/InfoBox";
import Icon from "../../atoms/Icon/Icon";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { getColor } from "../../../utils/styles-util";
import ThemedImage from "../../atoms/ThemedImage/ThemedImage";

const { STORYBOOK } = Constants;

@connect(
  state => ({
    formData: state.forms.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class TwoFactorSettings extends Component {
  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Auth App",
  });

  constructor(props) {
    super(props);

    const secret = STORYBOOK && "NN5TSVC6MFIGGWS3LJCSYT3VNE2ESRSG";

    this.state = {
      secretLoaded: !!secret,
      secret: secret || null,
      qrOverlayVisible: true,
    };
  }

  async componentDidMount() {
    const { actions, formData } = this.props;
    try {
      const data = await actions.getTwoFactorSecret(formData.pin);
      if (data.ok) {
        const qrCodeUrl = this.getQRCode(data.secret);
        this.setState({
          secret: data.secret,
          secretLoaded: true,
          qrCodeUrl,
        });
      }
    } catch (e) {
      loggerUtil.log(e);
    }
  }

  getQRCode = secret =>
    `otpauth://totp/Celsius?secret=${secret}&issuer=Celsius`;

  render() {
    const { actions } = this.props;
    const { secret, secretLoaded, qrCodeUrl } = this.state;
    const style = TwoFactorSettingsStyle();

    if (!secretLoaded) return <LoadingScreen />;

    return (
      <RegularLayout>
        <CelText align="center" type="H4">
          Scan the QR code or enter the code manually in your auth app.
        </CelText>

        <InfoBox
          backgroundColor={getColor(COLOR_KEYS.ALERT_STATE)}
          padding="15 15 15 15"
          left>
          <View style={{ flexDirection: "row" }}>
            <Icon
              name={"WarningCircle"}
              height="25"
              width="25"
              fill="#FFFFFF"
            />
            <View style={{ flexDirection: "column" }}>
              <CelText weight="bold" color={getColor(COLOR_KEYS.WHITE)} margin={"0 20 0 10"}>
                Warning: Do Not Screenshot
              </CelText>
              <CelText color={getColor(COLOR_KEYS.WHITE)} margin={"0 20 0 10"}>
                For your security, it is strongly advised that you do NOT screenshot your two-factor authentication
                code.
              </CelText>
            </View>
          </View>
        </InfoBox>

        <Card styles={{ alignItems: "center", marginTop: 25 }}>
          {this.state.qrOverlayVisible &&
          <View style={style.qrCodeBlur}>
            <ImageBackground
              style={{ flex: 1 }}
              resizeMode={"contain"}
              imageStyle={{ borderRadius: 6 }}
              source={require("../../../../assets/images/blur.png")}
            />
          </View>}

          <View style={style.qrWrapper}>
            <QRCode
              value={qrCodeUrl}
              size={141}
              bgColor="#FFF"
              fgColor="#000"
            />
          </View>
          <CelText
            align="center"
            style={style.secretText}
            onPress={() => Linking.openURL(qrCodeUrl)}
          >
            {secret}
          </CelText>
        </Card>

        <View style={style.buttonsContainer}>

          <Card styles={style.buttonCard}
                margin={0,0,0,0}>
            <TouchableOpacity
              onPressIn={() => this.setState({ qrOverlayVisible: false })}
              onPressOut={() => this.setState({ qrOverlayVisible: true })}>
              <View>
                <ThemedImage
                  style={style.buttonIconHand}
                  lightSource={require("../../../../assets/images/hold-to-show.png")}
                  darkSource={require("../../../../assets/images/hold-to-show.png")}
                  unicornSource={require("../../../../assets/images/hold-to-show.png")}
                />
                <CelText align="center" link>Hold to show</CelText>
              </View>
            </TouchableOpacity>
          </Card>

          <Card styles={style.buttonCard} margin={0,0,0,0}>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(secret);
                actions.showMessage("success", "The secret code copied ti clipboard.");
              }}
            >
              <View>
                <ThemedImage
                  style={style.buttonIconCopy}
                  lightSource={require("../../../../assets/images/ic_copy.png")}
                  darkSource={require("../../../../assets/images/ic_copy.png")}
                  unicornSource={require("../../../../assets/images/ic_copy.png")}
                />
                <CelText align="center" link>Copy code</CelText>
              </View>
            </TouchableOpacity>
          </Card>

        </View>

        <View style={style.buttonWrapper}>
          <CelButton
            margin={"25 0 25 0"}
            onPress={() => {
              actions.navigateTo(SCREENS.TWO_FA_AUTH_APP_CONFIRMATION_CODE);
            }}
          >
            Continue
          </CelButton>
        </View>
      </RegularLayout>
    );
  }
}

export default TwoFactorSettings;
