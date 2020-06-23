import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import CelText from "../../atoms/CelText/CelText";
import ChangePinStyle from "../ChangePin/ChangePin.styles";
import { KEYPAD_PURPOSES } from "../../../constants/UI";
import HiddenField from "../../atoms/HiddenField/HiddenField";
import CelNumpad from "../../molecules/CelNumpad/CelNumpad";
import * as appActions from "../../../redux/actions";
import Spinner from "../../atoms/Spinner/Spinner";
import CelButton from "../../atoms/CelButton/CelButton";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import PinTooltip from "../../molecules/PinTooltip/PinTooltip";

@connect(
  state => ({
    formData: state.forms.formData,
    user: state.user.profile,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class RegisterSetPin extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => {
    return {
      hideBack: true,
      customCenterComponent: { steps: 3, currentStep: 2, flowProgress: false },
      headerSameColor: true,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      pinCreated: false,
      loading: false,
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.updateFormField("pin", "");
  }

  handlePINChange = newValue => {
    const { pinCreated } = this.state;
    const { actions } = this.props;

    if (newValue.length > 6) return;

    const field = pinCreated ? "pinConfirm" : "pin";

    actions.updateFormField(field, newValue);

    if (newValue.length === 6) {
      this.handlePinFinish(newValue);
    }
  };

  handlePinFinish = async newValue => {
    const { pinCreated } = this.state;
    const { actions, formData, navigation } = this.props;

    if (!pinCreated) {
      this.setState({ pinCreated: true });
      navigation.setParams({
        customCenterComponent: {
          steps: 3,
          currentStep: 3,
          flowProgress: false,
        },
      });
    } else if (formData.pin === newValue) {
      this.setState({ loading: true });
      const isSet = await actions.setPin();
      if (!isSet) {
        this.setState({ pinCreated: false });
      } else {
        await actions.getInitialCelsiusData();
        return actions.navigateTo("Home");
      }
    } else {
      actions.showMessage("error", "Both PIN numbers should be the same.");
      actions.updateFormField("pinConfirm", "");
    }
    this.setState({ loading: false });
  };

  handleBack = () => {
    const { actions } = this.props;

    actions.updateFormFields({
      pin: "",
      pinConfirm: "",
    });

    this.setState({
      pinCreated: false,
    });
  };

  setScreenText = () => {
    const { pinCreated } = this.state;

    const screenText = {};
    screenText.headingText = !pinCreated ? "Create a PIN" : "Repeat PIN";
    screenText.subheadingText = !pinCreated
      ? "Create a unique PIN to secure your account."
      : "You're almost there!";

    return screenText;
  };

  render() {
    const { loading, pinCreated } = this.state;
    const { actions, formData, user } = this.props;

    const field = !pinCreated ? "pin" : "pinConfirm";
    const screenText = this.setScreenText();

    const style = ChangePinStyle();

    return (
      <RegularLayout padding="20 0 100 0" fabType={"hide"}>
        <View style={style.container}>
          <View style={style.wrapper}>
            <CelText weight="bold" type="H1" align="center" margin="0 20 0 20">
              {screenText.headingText}
            </CelText>
            <CelText align="center" margin="10 0 30 0">
              {screenText.subheadingText}
            </CelText>

            <TouchableOpacity onPress={actions.toggleKeypad}>
              <HiddenField value={formData[field]} length={6} />
            </TouchableOpacity>

            {pinCreated && !loading && (
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
            value={formData[field]}
            updateFormField={actions.updateFormField}
            setKeypadInput={actions.setKeypadInput}
            toggleKeypad={actions.toggleKeypad}
            onPress={this.handlePINChange}
            purpose={KEYPAD_PURPOSES.VERIFICATION}
          />
          <PinTooltip pin={formData[field]} user={user} />
        </View>
      </RegularLayout>
    );
  }
}

export default RegisterSetPin;
