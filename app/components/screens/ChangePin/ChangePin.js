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

@connect(
  state => ({
    formData: state.forms.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ChangePin extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    headerSameColor: true,
  });

  constructor(props) {
    super(props);
    this.state = {
      pinCreated: false,
      loading: false,
    };
  }

  handlePINChange = newValue => {
    const { pinCreated } = this.state;
    const { actions } = this.props;

    if (newValue.length > 4) return;

    const field = pinCreated ? "newPinConfirm" : "newPin";

    actions.updateFormField(field, newValue);

    if (newValue.length === 4) {
      this.handlePinFinish(newValue);
    }
  };

  handlePinFinish = async newValue => {
    const { pinCreated } = this.state;
    const { actions, formData } = this.props;

    if (!pinCreated) {
      this.setState({ pinCreated: true });
    } else if (formData.newPin === newValue) {
      // actions.changePin()
      this.setState({ loading: true });
      const isSet = await actions.changePin();
      if (!isSet) {
        this.setState({ pinCreated: false });
      }
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
    });

    this.setState({
      pinCreated: false,
    });
  };

  render() {
    const { loading, pinCreated } = this.state;
    const { actions, formData } = this.props;

    const field = !pinCreated ? "newPin" : "newPinConfirm";
    const headingText = !pinCreated ? "Enter your new PIN" : "Repeat your PIN";
    const subheadingText = !pinCreated
      ? "Please enter your new PIN to proceed."
      : "Please repeat your new PIN.";

    const onPressFunc = this.handlePINChange;
    const style = ChangePinStyle();

    return (
      <RegularLayout padding="0 0 0 0">
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
              <HiddenField value={formData[field]} />
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
            onPress={onPressFunc}
            purpose={KEYPAD_PURPOSES.VERIFICATION}
          />
        </View>
      </RegularLayout>
    );
  }
}

export default ChangePin;
