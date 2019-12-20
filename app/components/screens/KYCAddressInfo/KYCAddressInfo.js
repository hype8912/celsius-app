import React, { Component } from "react";
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View } from "react-native";

import * as appActions from "../../../redux/actions";
// import KYCAddressInfoStyle from "./KYCAddressInfo.styles";
import ProgressBar from "../../atoms/ProgressBar/ProgressBar";
import CelText from "../../atoms/CelText/CelText";
import CelInput from "../../atoms/CelInput/CelInput";
import CelSelect from "../../molecules/CelSelect/CelSelect";
import CelButton from "../../atoms/CelButton/CelButton";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

@connect(
  state => ({
    formData: state.forms.formData,
    formErrors: state.forms.formErrors,
    user: state.user.profile,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class KYCAddressInfo extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    customCenterComponent: <ProgressBar steps={7} currentStep={2} />,
    headerSameColor: true,
  });

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      updatingAddressInfoInProgress: false,
    };
  }

  async componentDidMount() {
    const { actions } = this.props;

    await actions.getProfileInfo();
    this.setState({ isLoading: false });

    this.initForm(this.props.user);
  }

  componentDidUpdate() {
    const errors = Object.keys(this.props.formErrors);
    if (errors.length > 0) {
      if (errors.includes("street")) this.street.focus();
      else if (errors.includes("city")) this.city.focus();
      else if (errors.includes("zip")) this.zip.focus();
    }
  }

  initForm = user => {
    const { actions } = this.props;

    if (user) {
      actions.updateFormFields({
        street: user.street,
        flatNumber: user.flat_number,
        city: user.city,
        zip: user.zip,
        country: { name: user.country },
        state: user.state,
      });
    }
  };

  submitAddressInfo = async () => {
    const { formData, actions } = this.props;

    const updatedAddressInfo = {
      street: formData.street,
      flat_number: formData.flatNumber,
      city: formData.city,
      zip: formData.zip,
      country: formData.country.name,
      state: formData.state,
    };

    await this.setState({ updatingAddressInfoInProgress: true });
    await actions.updateProfileAddressInfo(updatedAddressInfo);
    await this.setState({ updatingAddressInfoInProgress: false });
  };

  render() {
    const { formData, formErrors, actions, callsInProgress } = this.props;
    const { updatingAddressInfoInProgress } = this.state;

    if (
      apiUtil.areCallsInProgress([API.GET_USER_PERSONAL_INFO], callsInProgress)
    ) {
      return <LoadingScreen />;
    }

    return (
      <RegularLayout>
        <CelText type="H2" weight="bold" margin={"0 0 30 0"} align="center">
          Address info
        </CelText>

        <CelInput
          type="text"
          field="street"
          placeholder="Address"
          value={formData.street}
          error={formErrors.street}
          returnKeyType={"next"}
          refs={input => {
            this.street = input;
          }}
          blurOnSubmiting={false}
          onSubmitEditing={() => {
            this.flat.focus();
          }}
        />
        <CelInput
          type="text"
          field="flatNumber"
          placeholder="Apartment number (optional)"
          value={formData.flatNumber}
          refs={input => {
            this.flat = input;
          }}
          returnKeyType={"next"}
          blurOnSubmiting={false}
          onSubmitEditing={() => {
            this.city.focus();
          }}
        />
        <CelInput
          type="text"
          field="city"
          placeholder="City"
          value={formData.city}
          error={formErrors.city}
          returnKeyType={"next"}
          refs={input => {
            this.city = input;
          }}
          blurOnSubmiting={false}
          onSubmitEditing={() => {
            this.zip.focus();
          }}
        />
        <CelInput
          type="text"
          field="zip"
          placeholder="ZIP/Postal Code"
          value={formData.zip}
          error={formErrors.zip}
          refs={input => {
            this.zip = input;
          }}
        />
        <CelSelect
          type="country"
          field="country"
          labelText="Country"
          showCountryFlag
          hideCallingCodes
          value={formData.country}
          error={formErrors.country}
          margin="0 0 0 0"
        />

        {formData.country && formData.country.name === "United States" && (
          <CelSelect
            type="state"
            field="state"
            labelText="State"
            value={formData.state}
            error={formErrors.state}
            margin="20 0 0 0"
          />
        )}

        <View style={{ flex: 1, justifyContent: "flex-end", marginTop: 30 }}>
          <CelButton
            onPress={this.submitAddressInfo}
            iconRight="IconArrowRight"
            loading={updatingAddressInfoInProgress}
          >
            Continue
          </CelButton>
        </View>
        <CelButton
          onPress={() => actions.navigateTo("WalletFab")}
          basic
          margin={"20 0 20 0"}
        >
          Do it later
        </CelButton>
      </RegularLayout>
    );
  }
}

export default KYCAddressInfo;
