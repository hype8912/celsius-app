import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import ChangePinStyle from "./ChangePin.styles";
import HiddenField from "../../atoms/HiddenField/HiddenField";
import CelButton from "../../atoms/CelButton/CelButton";
import PinTooltip from "../../molecules/PinTooltip/PinTooltip";
import securityUtil from "../../../utils/security-util";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

@connect(
  state => ({
    formData: state.forms.formData,
    user: state.user.profile,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ChangePin extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    headerSameColor: true,
    gesturesEnabled: false,
  });

  componentDidMount() {
    const { actions } = this.props;
    actions.updateFormFields({
      newPin: "",
      newPinConfirm: "",
      pinCreated: false,
      loading: false,
    });
  }

  getVerificationType = () => {
    const { user, navigation } = this.props;

    // handling 426 error - PIN || 2FA
    const typeFromNavigation = navigation.getParam("verificationType", null);

    const typeFromUser = user.two_factor_enabled ? "2FA" : "PIN";
    return typeFromNavigation || typeFromUser;
  };

  shouldShow2FA = () => this.getVerificationType() === "2FA";

  handlePINChange = newValue => {
    const { actions, user, formData } = this.props;
    if (newValue.length > 6) return;

    const field = formData.pinCreated ? "newPinConfirm" : "newPin";
    actions.updateFormField(field, newValue);
    actions.updateFormField("pinCreated", true);

    // Check PIN strength
    const pinScoreNotPassed = !!securityUtil
      .calculatePinScore(newValue, user.date_of_birth)
      .find(i => i.status === null || !i.status);

    if (newValue.length === 6 && !pinScoreNotPassed) {
      this.handlePinFinish(newValue);
    }
  };

  handlePinFinish = async newValue => {
    const { actions, navigation } = this.props;
    const onSuccess = navigation.getParam("onSuccess");

    if (!this.props.formData.pinCreated) {
      actions.updateFormField("pinCreated", true);
    } else if (this.props.formData.newPin === newValue) {
      actions.updateFormField("pinCreated", false);
      await actions.changePin(onSuccess);
    } else {
      actions.showMessage("error", "Both PIN numbers should be the same.");
      actions.updateFormFields({
        newPinConfirm: "",
        loading: false,
      });
    }
  };

  handleBack = () => {
    const { actions } = this.props;

    actions.updateFormFields({
      newPin: "",
      newPinConfirm: "",
      pinCreated: false,
    });
  };

  render() {
    const {  user, formData } = this.props;
    const field = !formData.pinCreated ? "newPin" : "newPinConfirm";
    const headingText = !formData.pinCreated
      ? "Enter your 6-digits PIN"
      : "Repeat your 6-digits PIN";
    const subheadingText = !formData.pinCreated
      ? "Please enter your new PIN to proceed."
      : "Please repeat your new PIN.";
    const style = ChangePinStyle();
    const isLoading = _.isEmpty(formData) || formData.loading;
    return (
      <RegularLayout padding="0 0 0 0" fabType={"hide"}>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <View style={style.container}>
            <View style={style.wrapper}>
              <CelText
                weight="bold"
                type="H1"
                align="center"
                margin="0 20 0 20"
              >
                {headingText}
              </CelText>
              <CelText align="center" margin="10 0 30 0">
                {subheadingText}
              </CelText>

              <View>
                <HiddenField
                  length={6}
                  loading={formData && !formData.loading}
                  field={!formData.pinCreated ? "newPin" : "newPinConfirm"}
                  handleVerification={this.handlePINChange}
                />
              </View>

              {formData.pinCreated && !formData.loading && (
                <CelButton basic onPress={this.handleBack}>
                  Back
                </CelButton>
              )}
            </View>

            <PinTooltip pin={formData[field]} user={user} />
          </View>
        )}
      </RegularLayout>
    );
  }
}

export default ChangePin;
