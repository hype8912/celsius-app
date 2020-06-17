import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View } from "react-native";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import CelInput from "../../atoms/CelInput/CelInput";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import { KEYBOARD_TYPE } from "../../../constants/UI";
import RegisterPromoCodeModal from "../../modals/RegisterPromoCodeModal/RegisterPromoCodeModal";
import RegisterPromoCodeCard from "../../molecules/RegisterPromoCodeCard/RegisterPromoCodeCard";
import RegisterToUCard from "../../molecules/RegisterToUCard/RegisterToUCard";
import Constants from "../../../../constants";
import GoogleReCaptcha from "../../../utils/recaptcha-util";
import passwordUtil from "../../../utils/password-util";
import STYLES from "../../../constants/STYLES";

@connect(
  state => ({
    // user: state.user.profile,
    formData: state.forms.formData,
    formErrors: state.forms.formErrors,
    callsInProgress: state.api.callsInProgress,
    promoCode: state.branch.registeredLink,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class RegisterInitial extends Component {
  static navigationOptions = () => ({
    customCenterComponent: { steps: 3, currentStep: 1, flowProgress: false },
    headerSameColor: true,
  });

  constructor() {
    super();

    this.state = {
      isExpanded: false,
    };
  }

  componentDidMount() {
    const { promoCode } = this.props;

    if (promoCode) {
      this.setState({
        isExpanded: true,
      });
    }
  }

  isFormValid = () => {
    const { actions, formData } = this.props;

    const errors = {};
    const isUsingSocial =
      formData.googleId || formData.facebookId || formData.twitterId;
    let errorFocus = false;

    if (!formData.firstName) {
      errors.firstName = "First name is required!";
      if (!errorFocus) this.firstNameInput.focus();
      errorFocus = true;
    }
    if (!formData.lastName) {
      errors.lastName = "Last name is required!";
      if (!errorFocus) this.last.focus();
      errorFocus = true;
    }
    if (!formData.email) {
      errors.email = "Email is required!";
      if (!errorFocus) this.email.focus();
      errorFocus = true;
    }
    if (!isUsingSocial && !formData.password) {
      errors.password = "Password is required!";
      if (!errorFocus) this.pass.focus();
      errorFocus = true;
    }

    if (Object.keys(errors).length) {
      actions.setFormErrors(errors);
      return false;
    }

    return true;
  };

  submitForm = () => {
    const { actions } = this.props;
    const isFormValid = this.isFormValid();
    if (isFormValid) {
      actions.createAccount();
    }
  };

  disabledRegisterButton = () => {
    const { formData, callsInProgress } = this.props;
    const fields = [
      !!formData.firstName,
      !!formData.lastName,
      !!formData.email,
      passwordUtil.calculatePasswordScore(formData.password).result.score > 80,
    ];
    const fieldsFilledOut = fields.every(x => x);

    const isLoading = apiUtil.areCallsInProgress(
      [
        API.REGISTER_USER,
        API.REGISTER_USER_FACEBOOK,
        API.REGISTER_USER_GOOGLE,
        API.REGISTER_USER_TWITTER,
      ],
      callsInProgress
    );

    if (!formData.termsOfUse) return true;
    if (isLoading) return true;
    if (fieldsFilledOut) return false;
    if (formData.googleId || formData.facebookId || formData.twitterId)
      return false;
    return true;
  };

  renderCaptcha = () => {
    const { RECAPTCHA_KEY, RECAPTCHA_URL } = Constants;
    return (
      <GoogleReCaptcha
        siteKey={RECAPTCHA_KEY}
        url={RECAPTCHA_URL}
        languageCode="en"
        onMessage={this.onMessage}
        reCaptchaPassed={this.submitForm}
        type={"register"}
        buttonDisabled={this.disabledRegisterButton()}
      />
    );
  };

  render() {
    const {
      formData,
      actions,
      callsInProgress,
      formErrors,
      promoCode,
    } = this.props;

    const isUsingSocial =
      formData.googleId || formData.facebookId || formData.twitterId;

    const registerLoading = apiUtil.areCallsInProgress(
      [
        API.REGISTER_USER,
        API.REGISTER_USER_FACEBOOK,
        API.REGISTER_USER_GOOGLE,
        API.REGISTER_USER_TWITTER,
        API.SOCIAL_REGISTER,
      ],
      callsInProgress
    );

    // TODO(ns): check ref if !isUsingSocial for pass input

    return (
      <AuthLayout>
        <View style={{ justifyContent: "space-between", height: "100%" }}>
          <View style={{ justifyContent: "flex-start" }}>
            <CelText margin="0 0 10 0" align="center" type="H1">
              Create Account
            </CelText>
            <CelText margin="0 0 30 0" weight="300" align="center">
              Create a new account
            </CelText>

            <CelInput
              disabled={registerLoading}
              autoCapitalize="words"
              type="text"
              field="firstName"
              value={formData.firstName}
              error={formErrors.firstName}
              placeholder="First name"
              returnKeyType={"next"}
              blurOnSubmiting={false}
              onSubmitEditing={() => {
                this.last.focus();
              }}
              refs={input => {
                this.firstNameInput = input;
              }}
            />
            <CelInput
              disabled={registerLoading}
              autoCapitalize="words"
              type="text"
              field="lastName"
              value={formData.lastName}
              error={formErrors.lastName}
              placeholder="Last name"
              returnKeyType={"next"}
              blurOnSubmiting={false}
              onSubmitEditing={() => {
                this.email.focus();
              }}
              refs={input => {
                this.last = input;
              }}
            />

            <CelInput
              disabled={!!isUsingSocial || registerLoading}
              type="text"
              value={formData.email}
              error={formErrors.email}
              field="email"
              placeholder="E-mail"
              keyboardType={KEYBOARD_TYPE.EMAIL}
              returnKeyType={!isUsingSocial ? "next" : "done"}
              blurOnSubmiting={false}
              onSubmitEditing={() => {
                if (!isUsingSocial) this.pass.focus();
              }}
              refs={input => {
                this.email = input;
              }}
            />

            {!isUsingSocial && (
              <CelInput
                disabled={registerLoading}
                type="password"
                field="password"
                placeholder="Password"
                value={formData.password}
                error={formErrors.password}
                refs={input => {
                  this.pass = input;
                }}
                showPasswordTooltip
                toolTipPositionTop
                showPassMeter
                margin={"0 0 30 0"}
              />
            )}

            <RegisterToUCard
              termsOfUse={formData.termsOfUse}
              updateFormField={actions.updateFormField}
            />

            <RegisterPromoCodeCard
              promoCode={promoCode}
              openModal={actions.openModal}
            />

            {this.renderCaptcha()}

            <RegisterPromoCodeModal type={"register"} />
          </View>
          <View style={{ justifyContent: "flex-end" }}>
            <CelText weight="300" align="center">
              Already have an account?
              <CelText
                weight="300"
                align="center"
                color={STYLES.COLORS.CELSIUS_BLUE}
                onPress={() =>
                  actions.navigateTo("LoginLanding", { type: "login" })
                }
              >
                {` Log in`}
              </CelText>
            </CelText>
          </View>
        </View>
      </AuthLayout>
    );
  }
}

export default RegisterInitial;
