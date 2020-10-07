import React, { Component } from "react";
import { View, Linking } from "react-native";
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
import CopyButton from "../../atoms/CopyButton/CopyButton";
import Separator from "../../atoms/Separator/Separator";
import loggerUtil from "../../../utils/logger-util";
import { SCREENS } from "../../../constants/SCREENS";
import Constants from "../../../../constants";

const { STORYBOOK } = Constants;

@connect(
  state => ({
    formData: state.forms.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
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
        <Card styles={{ alignItems: "center", marginTop: 25 }}>
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

          <View style={style.separatorWrapper}>
            <Separator margin={"10 0 0 0"} />
          </View>
          <CopyButton
            copyText={secret}
            onCopy={() =>
              actions.showMessage(
                "success",
                "The secret code copied to clipboard."
              )
            }
          />
        </Card>

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
