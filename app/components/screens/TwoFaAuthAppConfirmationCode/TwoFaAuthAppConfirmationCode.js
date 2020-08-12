import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Keyboard, TouchableOpacity, Clipboard } from "react-native";
// eslint-disable-next-line import/no-unresolved
import { openInbox } from "react-native-email-link";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelInput from "../../atoms/CelInput/CelInput";
import CelButton from "../../atoms/CelButton/CelButton";
import UI from "../../../constants/STYLES";
import Spinner from "../../atoms/Spinner/Spinner";

@connect(
  state => ({
    formData: state.forms.formData,
    securityOverview: state.security.securityOverview,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TwoFaAuthAppConfirmationCode extends Component {
  static navigationOptions = () => ({
    title: "Auth App",
  });

  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  async componentDidMount() {
    const { actions } = this.props;
    actions.updateFormField("confirmationCode", "");
  }

  verifyAuthCode = async () => {
    const { actions, formData, securityOverview } = this.props;
    try {
      this.setState({ loading: true });
      const success = await actions.enableTwoFactor(formData.confirmationCode);
      if (success.data.ok) {
        Keyboard.dismiss();
        if (securityOverview.fromFixNow) {
          actions.toFixNow();
        } else {
          actions.showMessage(
            "warning",
            "To complete your Two-Factor verification request follow the email instructions."
          );
          openInbox({
            title: "2FA email confirmation!",
            message: "Open your email app to confirm 2FA activation",
          });
          actions.navigateTo("SecuritySettings");
        }
        this.setState({ loading: false });
      }
    } catch (e) {
      this.setState({ loading: false });
    }
  };

  pasteCodeHelperButton = () => (
    <View
      style={{
        paddingLeft: 10,
        borderLeftColor: UI.COLORS.LIGHT_GRAY,
        borderLeftWidth: 2,
      }}
    >
      <TouchableOpacity onPress={this.paste}>
        <CelText weight="300">Paste code</CelText>
      </TouchableOpacity>
    </View>
  );

  paste = async () => {
    const { actions } = this.props;
    const code = await Clipboard.getString();

    if (code) {
      actions.updateFormField("confirmationCode", code);
    } else {
      actions.showMessage("warning", "Nothing to paste.");
    }
  };

  render() {
    const { formData } = this.props;
    const { loading } = this.state;

    return (
      <RegularLayout>
        <CelText type="H4" align="center">
          Please enter the confirmation code from your authentication app:
        </CelText>

        <CelInput
          placeholder="Confirmation code"
          field={"confirmationCode"}
          value={formData.confirmationCode}
          margin={"30 0 0 0"}
          helperButton={this.pasteCodeHelperButton}
        />
        {loading ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 15,
            }}
          >
            <Spinner />
          </View>
        ) : (
          <CelButton
            onPress={this.verifyAuthCode}
            margin={"20 0 0 0"}
            disabled={!formData.confirmationCode}
            iconRight={"IconArrowRight"}
          >
            Verify Auth App
          </CelButton>
        )}
      </RegularLayout>
    );
  }
}

export default TwoFaAuthAppConfirmationCode;
