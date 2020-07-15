import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelNumpad from "../../molecules/CelNumpad/CelNumpad";
import { KEYPAD_PURPOSES } from "../../../constants/UI";
import ChangePinStyle from "./ChangePin.styles";
import HiddenField from "../../atoms/HiddenField/HiddenField";
import Spinner from "../../atoms/Spinner/Spinner";
import CelButton from "../../atoms/CelButton/CelButton";
import PinTooltip from "../../molecules/PinTooltip/PinTooltip";
import securityUtil from "../../../utils/security-util";

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

  constructor(props) {
    super(props);
    this.state = {
      pinCreated: false,
      loading: false,
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.updateFormFields({
      newPin: "",
      newPinConfirm: "",
      pinCreated: false,
    });
  }

  handlePINChange = newValue => {
    const { actions, user } = this.props;

    if (newValue.length > 6) return;

    const field = this.props.formData.pinCreated ? "newPinConfirm" : "newPin";
    actions.updateFormField(field, newValue);
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
      actions.updateFormField("newPinConfirm", "");
    }
    this.setState({ loading: false });
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
    const { loading } = this.state;
    const { actions, user } = this.props;

    const field = !this.props.formData.pinCreated ? "newPin" : "newPinConfirm";
    const headingText = !this.props.formData.pinCreated
      ? "Enter your 6-digits PIN"
      : "Repeat your 6-digits PIN";
    const subheadingText = !this.props.formData.pinCreated
      ? "Please enter your new PIN to proceed."
      : "Please repeat your new PIN.";

    const onPressFunc = this.handlePINChange;
    const style = ChangePinStyle();

    return (
      <RegularLayout padding="0 0 0 0" fabType={"hide"}>
        <View style={style.container}>
          <View style={style.wrapper}>
            <CelText weight="bold" type="H1" align="center" margin="0 20 0 20">
              {headingText}
            </CelText>
            <CelText
              color="rgba(61,72,83,0.7)"
              align="center"
              margin="10 0 30 0"
            >
              {subheadingText}
            </CelText>

            <TouchableOpacity onPress={actions.toggleKeypad}>
              <HiddenField value={this.props.formData[field]} length={6} />
            </TouchableOpacity>

            {this.props.formData.pinCreated && !loading && (
              <CelButton basic onPress={this.handleBack}>
                Back
              </CelButton>
            )}

            {loading && (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 15,
                }}
              >
                <Spinner />
              </View>
            )}
          </View>

          <CelNumpad
            field={field}
            value={this.props.formData[field]}
            updateFormField={actions.updateFormField}
            setKeypadInput={actions.setKeypadInput}
            toggleKeypad={actions.toggleKeypad}
            onPress={onPressFunc}
            purpose={KEYPAD_PURPOSES.VERIFICATION}
          />

          <PinTooltip pin={this.props.formData[field]} user={user} />
        </View>
      </RegularLayout>
    );
  }
}

export default ChangePin;
