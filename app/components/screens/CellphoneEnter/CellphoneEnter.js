import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { countries } from "country-data";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import ProgressBar from "../../atoms/ProgressBar/ProgressBar";
import CelInput from "../../atoms/CelInput/CelInput";
import CelButton from "../../atoms/CelButton/CelButton";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";

@connect(
  state => ({
    formData: state.forms.formData,
    user: state.user.profile,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CellphoneEnter extends Component {
  static navigationOptions = () => ({
    customCenterComponent: <ProgressBar steps={5} currentStep={2} />,
  });

  componentDidMount() {
    const { actions } = this.props;
    actions.updateFormField("cellphone", countries.US);
  }

  updateCellphoneNumber = async phone => {
    const { actions, formData, user } = this.props;
    let count = 0;
    const charArray = `${phone.countryCallingCodes[0]}${
      formData["cellphone.text"]
    }`
      .split("")
      .map(c => {
        if (["+", ",", ";", "*", "#"].includes(c)) count++;
        return charArray;
      });

    if (!phone || !formData["cellphone.text"] || count > 1) {
      return actions.showMessage(
        "error",
        "You must enter a valid phone to continue."
      );
    }

    const response = await actions.updateProfileInfo({
      cellphone: `${phone.countryCallingCodes[0]}${formData["cellphone.text"]}`,
    });
    if (response.success) {
      actions.sendVerificationSMS(user.cellphone);
      actions.navigateTo("CellphoneVerify");
    }
  };

  render() {
    const { formData } = this.props;
    return (
      <RegularLayout>
        <CelText margin="0 0 30 0" type="H1" align="center">
          Enter your phone number
        </CelText>
        <CelInput
          type="phone"
          field="cellphone"
          placeholder="Phone number"
          margin="20 0 20 0"
          value={formData.cellphone}
        />

        <CelButton
          margin="10 0 40 0"
          onPress={() => {
            this.updateCellphoneNumber(formData.cellphone);
          }}
          iconRight="IconArrowRight"
        >
          Verify phone number
        </CelButton>
      </RegularLayout>
    );
  }
}

export default CellphoneEnter;
