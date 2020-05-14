import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TouchableOpacity, View } from "react-native";
import LoginStyle from "./Login.styles";
import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import CelInput from "../../atoms/CelInput/CelInput";
import CelButton from "../../atoms/CelButton/CelButton";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { KEYBOARD_TYPE } from "../../../constants/UI";
import Constants from "../../../../constants";
import GoogleReCaptcha from "../../../utils/recaptcha-util";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import STYLES from "../../../constants/STYLES";

@connect(
  state => ({
    formData: state.forms.formData,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Login extends Component {
  static navigationOptions = () => ({
    headerSameColor: true,
  });

  loginUser = () => {
    const { actions } = this.props;
    actions.loginUser();
  };

  disabledButton = () => {
    const { callsInProgress } = this.props;
    const isLoading = apiUtil.areCallsInProgress(
      [
        API.LOGIN_USER,
        API.LOGIN_USER_FACEBOOK,
        API.LOGIN_USER_GOOGLE,
        API.LOGIN_USER_TWITTER,
      ],
      callsInProgress
    );
    return isLoading;
  };

  renderCaptcha = () => {
    const { RECAPTCHA_KEY, RECAPTCHA_URL } = Constants;
    return (
      <GoogleReCaptcha
        siteKey={RECAPTCHA_KEY}
        url={RECAPTCHA_URL}
        languageCode="en"
        onMessage={this.onMessage}
        reCaptchaPassed={this.loginUser}
        buttonDisabled={this.disabledButton()}
      />
    );
  };

  render() {
    const { formData, actions } = this.props;
    const style = LoginStyle();

    // Disabling forgot pass on Staging regarding to its bug on Staging environment
    const { ENV } = Constants;
    return (
      <AuthLayout>
        <View style={style.container}>
          <View style={style.form}>
            <CelText margin="0 0 10 0" align="center" type="H1">
              Log in
            </CelText>
            <CelText margin="0 0 30 0" weight="300" align="center">
              Welcome back, please log in to your account
            </CelText>

            <CelInput
              type="text"
              keyboardType={KEYBOARD_TYPE.EMAIL}
              autoCapitalize="none"
              field="email"
              placeholder="E-mail"
              value={formData.email}
              returnKeyType={"next"}
              blurOnSubmiting={false}
              onSubmitEditing={() => {
                this.pass.focus();
              }}
            />
            <CelInput
              type="password"
              field="password"
              placeholder="Password"
              autoCapitalize="none"
              value={formData.password}
              refs={input => {
                this.pass = input;
              }}
            />
            {ENV !== "STAGING" ? (
              <View style={style.forgotPassword}>
                <TouchableOpacity
                  onPress={() => actions.navigateTo("ForgotPassword")}
                >
                  <CelText weight="300" color={STYLES.COLORS.CELSIUS_BLUE}>
                    Forgot password?
                  </CelText>
                </TouchableOpacity>
              </View>
            ) : null}

            {this.renderCaptcha()}

            {/* <CelButton*/}
            {/*  margin="10 0 40 0"*/}
            {/*  onPress={this.loginUser}*/}
            {/*  loading={loginLoading}*/}
            {/* >*/}
            {/*  Log in*/}
            {/* </CelButton>*/}

            {ENV === "STAGING" ? (
              <CelButton basic onPress={() => actions.navigateTo("Storybook")}>
                Open Storybook
              </CelButton>
            ) : null}
          </View>
          <View style={style.bottom}>
            <CelText weight="300" align="center">
              Don't have an account?
              <CelText
                weight="300"
                align="center"
                color={STYLES.COLORS.CELSIUS_BLUE}
                onPress={() =>
                  actions.navigateTo("LoginLanding", { type: "register" })
                }
              >
                {` Sign up`}
              </CelText>
            </CelText>
          </View>
        </View>
      </AuthLayout>
    );
  }
}

export default Login;
