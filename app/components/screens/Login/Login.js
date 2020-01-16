import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import CelInput from "../../atoms/CelInput/CelInput";
import CelButton from "../../atoms/CelButton/CelButton";
import Separator from "../../atoms/Separator/Separator";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
// import apiUtil from "../../../utils/api-util";
// import API from "../../../constants/API";
import SocialLogin from "../../organisms/SocialLogin/SocialLogin";
import { KEYBOARD_TYPE } from "../../../constants/UI";
import Constants from "../../../../constants";
import GoogleReCaptcha from "../../../utils/recaptcha-util";

@connect(
  state => ({
    formData: state.forms.formData,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Login extends Component {
  static navigationOptions = () => ({
    right: "signup",
  });

  // loginUser = () => {
  //   const { actions } = this.props;
  //   actions.loginUser()
  // };

  // onMessage = event => {
  //   console.log('event je: ', event)
  //   const { actions } = this.props
  //   if (event && event.nativeEvent.data) {
  //     console.log('event je: ', event)
  //     console.log('nativeEvent je: ', event.nativeEvent)
  //     console.log('data je: ', event.nativeEvent.data)
  //     if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
  //       return;
  //     }
  //     actions.closeModal();
  //     actions.updateFormField('reCaptchaKey',event.nativeEvent.data)
  //     actions.loginUser();
  //   }
  // };

  reCaptchaPassed = event => {
    const { actions } = this.props;
    actions.updateFormField("reCaptchaKey", event.nativeEvent.data);
    actions.loginUser();
  };

  renderCaptcha = () => {
    const { RECAPTCHA_KEY, RECAPTCHA_URL } = Constants;
    return (
      <GoogleReCaptcha
        siteKey={RECAPTCHA_KEY}
        url={RECAPTCHA_URL}
        languageCode="en"
        onMessage={this.onMessage}
        reCaptchaPassed={this.reCaptchaPassed}
      />
    );
  };

  render() {
    const { formData, actions } = this.props;
    // const loginLoading = apiUtil.areCallsInProgress(
    //   [
    //     API.LOGIN_USER,
    //     API.LOGIN_USER_FACEBOOK,
    //     API.LOGIN_USER_GOOGLE,
    //     API.LOGIN_USER_TWITTER,
    //   ],
    //   callsInProgress <--from props
    // );

    // Disabling forgot pass on Staging regarding to its bug on Staging environment
    const { ENV } = Constants;
    return (
      <AuthLayout>
        <CelText margin="0 0 30 0" align="center" type="H1">
          Welcome back
        </CelText>

        <SocialLogin type="login" actions={actions} />

        <Separator text="or login with email" margin="0 0 20 0" />

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

        {ENV !== "STAGING" ? (
          <>
            <CelButton
              basic
              onPress={() => actions.navigateTo("ForgotPassword")}
            >
              Forgot password
            </CelButton>
          </>
        ) : null}
      </AuthLayout>
    );
  }
}

export default Login;
