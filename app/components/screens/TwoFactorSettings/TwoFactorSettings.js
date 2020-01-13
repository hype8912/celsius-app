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

    this.state = {
      secretLoaded: false,
      secret: null,
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;

    const secret = navigation.getParam("secret");

    if (secret) {
      this.setState({
        secret,
        secretLoaded: true,
      });
    }
  }

  getQRCode = secret =>
    `otpauth://totp/Celsius?secret=${secret}&issuer=Celsius`;

  render() {
    const { actions } = this.props;
    const { secret, secretLoaded } = this.state;
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
              value={this.getQRCode(secret)}
              size={141}
              bgColor="#FFF"
              fgColor="#000"
            />
          </View>
          <CelText
            align="center"
            style={style.secretText}
            onPress={() => Linking.openURL(this.getQRCode(secret))}
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
              actions.navigateTo("TwoFaAuthAppConfirmationCode");
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
