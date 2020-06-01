import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TWLoginButton } from "react-native-simple-twitter";
import { View } from "react-native";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import LoginLandingStyle from "./LoginLanding.styles";
import STYLES from "../../../constants/STYLES";
import CelButton from "../../atoms/CelButton/CelButton";
import Constants from "../../../../constants";
import LoginButton from "../../atoms/LoginButton/LoginButton";
import loggerUtil from "../../../utils/logger-util";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";

@connect(
  state => ({
    formData: state.forms.formData,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class LoginLanding extends Component {
  static navigationOptions = () => ({
    headerSameColor: true,
  });

  loginViaGoogleHandle = (type, navigateTo) => {
    const { actions } = this.props;
    actions.authGoogle(type, navigateTo);
  };

  loginViaFacebookHandle = (type, navigateTo) => {
    const { actions } = this.props;
    actions.authFacebook(type, navigateTo);
  };

  loginViaEmailHandle = navigateTo => {
    const { actions } = this.props;
    actions.navigateTo(navigateTo);
  };

  onTwitterSuccess = twitterUser => {
    const { actions, navigation } = this.props;
    const type = navigation.getParam("type");
    const navigateTo = type === "login" ? "Login" : "RegisterInitial";

    actions.authTwitter(type, twitterUser, navigateTo);
  };

  onOpenTwitter = () => {
    const { actions } = this.props;

    actions.twitterOpen();
  };

  handleError = err => {
    loggerUtil.log(err);
  };

  getImage = type => {
    switch (type) {
      case "google":
        return require("../../../../assets/images/icons/googleIcon.png");
      case "email":
        return require("../../../../assets/images/icons/emailIcon.png");
      case "facebook":
        return require("../../../../assets/images/icons/facebookIcon.png");
      case "twitter":
        return require("../../../../assets/images/icons/twitterIcon.png");
      default:
        return;
    }
  };

  disabledButton = () => {
    const { callsInProgress } = this.props;
    return apiUtil.areCallsInProgress(
      [
        API.LOGIN_USER,
        API.LOGIN_USER_FACEBOOK,
        API.LOGIN_USER_GOOGLE,
        API.LOGIN_USER_TWITTER,
      ],
      callsInProgress
    );
  };

  titleCopy = () => {
    const { navigation } = this.props;
    const type = navigation.getParam("type");
    const inactiveUser = !!navigation.getParam("inactiveUser");
    const logoutMsg = navigation.getParam("msg");

    if (type === "login") {
      if (inactiveUser) {
        return {
          title: "You have been logged out",
          subTitle: logoutMsg,
        };
      }
      return {
        title: "Log in",
        subTitle: "Welcome back, please log in to your account",
      };
    }
    return {
      title: "Create Account",
      subTitle: "Choose how you want to sign up",
    };
  };

  render() {
    const { actions, navigation } = this.props;
    const style = LoginLandingStyle();
    const { ENV } = Constants;
    const type = navigation.getParam("type");
    const navigateTo = type === "login" ? "Login" : "RegisterInitial";
    const inactiveUser = !!navigation.getParam("inactiveUser");

    return (
      <AuthLayout>
        <View style={style.container}>
          <View style={style.header}>
            <CelText
              margin="0 0 10 0"
              align="center"
              type={inactiveUser ? "H2" : "H1"}
            >
              {this.titleCopy().title}
            </CelText>
            <CelText weight="300" align="center">
              {this.titleCopy().subTitle}
            </CelText>
          </View>
          <View style={style.buttons}>
            <LoginButton
              text={
                type === "login"
                  ? "Log in with Facebook"
                  : "Sign up with Facebook"
              }
              icon={this.getImage("facebook")}
              disabled={this.disabledButton()}
              onPress={() => this.loginViaFacebookHandle(type, navigateTo)}
            />
            <LoginButton
              text={
                type === "login" ? "Log in with Google" : "Sign up with Google"
              }
              icon={this.getImage("google")}
              disabled={this.disabledButton()}
              onPress={() => this.loginViaGoogleHandle(type, navigateTo)}
            />
            <TWLoginButton
              type="TouchableOpacity"
              onGetAccessToken={actions.twitterGetAccessToken}
              onSuccess={this.onTwitterSuccess}
              closeText="< Back to Celsius"
              onClose={actions.twitterClose}
              onError={this.handleError}
              onPress={this.onOpenTwitter}
            >
              <LoginButton
                text={
                  type === "login"
                    ? "Log in with Twitter"
                    : "Sign up with Twitter"
                }
                icon={this.getImage("twitter")}
                disabled={this.disabledButton()}
              />
            </TWLoginButton>
            <LoginButton
              text={
                type === "login" ? "Log in with Email" : "Sign up with Email"
              }
              icon={this.getImage("email")}
              onPress={() => this.loginViaEmailHandle(navigateTo)}
              disabled={this.disabledButton()}
            />
          </View>
          <View style={style.footer}>
            {ENV === "STAGING" ? (
              <CelButton basic onPress={() => actions.navigateTo("Storybook")}>
                Open Storybook
              </CelButton>
            ) : null}
            <CelText weight="300" align="center">
              {type === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
              <CelText
                weight="300"
                align="center"
                color={STYLES.COLORS.CELSIUS_BLUE}
                onPress={() =>
                  actions.navigateTo("LoginLanding", {
                    type: type === "login" ? "register" : "login",
                  })
                }
              >
                {type === "login" ? ` Sign up` : ` Log in`}
              </CelText>
            </CelText>
          </View>
        </View>
      </AuthLayout>
    );
  }
}

export default LoginLanding;
