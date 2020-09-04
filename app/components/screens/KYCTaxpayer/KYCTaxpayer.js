import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
// import { View } from 'react-native';
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import CelButton from "../../atoms/CelButton/CelButton";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import { MODALS } from "../../../constants/UI";
import SsnModal from "../../modals/SsnModal/SsnModal";
import SocialSecurityNumber from "../../molecules/SocialSecurityNumber/SocialSecurityNumber";
import apiUtil from "../../../utils/api-util";
import { isForPrimeTrustKYC, isUSCitizen } from "../../../utils/user-util/user-util";
import API from "../../../constants/API";

@connect(
  state => ({
    user: state.user.profile,
    formData: state.forms.formData,
    formErrors: state.forms.formErrors,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class KYCTaxpayer extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Taxpayer ID",
    customCenterComponent: { steps: 7, currentStep: 6, flowProgress: false },
    headerSameColor: true,
  });

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      updatingTaxInfo: false,
    };
  }

  componentDidMount() {
    const { actions, user } = this.props;
    actions.profileTaxpayerInfo();
    this.setState({ isLoading: false });
    this.initForm(user);
  }

  initForm = user => {
    const { actions } = this.props;
    if (user) {
      if (this.isFromUS()) {
        actions.updateFormFields({ ssn: user.ssn });
      } else {
        actions.updateFormFields({
          itin: user.itin,
          national_id: user.national_id,
        });
      }
    }
  };

  isFromUS = () => {
    const { formData, user } = this.props;

    let usCitizen = false;
    if (
      formData.citizenship.name === "United States" ||
      formData.country.name === "United States"
    )
      usCitizen = true;
    if (
      user.citizenship === "United States" ||
      user.country === "United States"
    )
      usCitizen = true;
    return usCitizen;
  };

  submitTaxpayerInfo = async () => {
    const { actions, formData } = this.props;
    let userTaxInfo;
    if (this.isFromUS()) {
      userTaxInfo = {
        ssn: formData.ssn1 + formData.ssn2 + formData.ssn3,
      };
    } else {
      userTaxInfo = {
        national_id: formData.national_id,
        itin: formData.itin,
      };
    }
    this.setState({ updatingTaxInfo: true });
    const response = await actions.updateTaxpayerInfo(userTaxInfo);

    if (response.success) {
      if (isForPrimeTrustKYC()) {
        actions.navigateTo("KYCPrimeTrustToU");
        actions.showMessage(
          "success",
          "You have successfully submitted ssn number"
        );
      } else {
        await actions.startKYC();
      }
    }
    this.setState({ updatingTaxInfo: false });
  };

  renderSkipButton = disabled => {
    const { actions, callsInProgress, user } = this.props;

    const isSubmitting = apiUtil.areCallsInProgress(
      [API.START_KYC],
      callsInProgress
    );

    if (user.ssn || user.itin) return null;

    if (!this.isFromUS()) {
      return (
        <CelButton
          onPress={() => actions.startKYC()}
          disabled={disabled || isSubmitting}
          laoding={isSubmitting}
          basic
          margin="20 0 20 0"
        >
          Submit without Taxpayer ID
        </CelButton>
      );
    }

    if (!isForPrimeTrustKYC()) {
      return (
        <CelButton
          onPress={() => actions.openModal(MODALS.SSN_MODAL)}
          disabled={disabled || isSubmitting}
          basic
          margin="20 0 20 0"
        >
          Submit Verification Without SSN
        </CelButton>
      );
    }

    return null;
  };

  render() {
    const { updatingTaxInfo, isLoading } = this.state;
    const { actions, user } = this.props;

    if (isLoading) return <LoadingScreen />;

    const isPrimeTrustUser = isForPrimeTrustKYC();

    return (
      <RegularLayout>
        <CelText weight={"700"} type={"H2"} align="center">
          {this.isFromUS() ? "Social Security Number" : "Taxpayer ID"}
        </CelText>

        <CelText
          align={"center"}
          margin={"10 0 0 0"}
          type={"H4"}
          weight={"300"}
        >
          {this.isFromUS()
            ? "US residents must provide their SSN to earn rewards through Celsius. This can be entered later. However, rewards will not be earned until SSN is entered."
            : "You may need to fill your taxpayer ID for tax reporting. You may add it later in your profile."}
        </CelText>

        <SocialSecurityNumber
          onPress={this.submitTaxpayerInfo}
          updatingTaxInfo={updatingTaxInfo}
        />

        {!!(isPrimeTrustUser && user.ssn) && (
          <CelButton
            onPress={() => actions.navigateTo("KYCPrimeTrustToU")}
            iconRight="IconArrowRight"
          >
            Continue
          </CelButton>
        )}

        {!!(
          (!isPrimeTrustUser && user.ssn) ||
          (!isUSCitizen() && user.itin)
        ) && (
          <CelButton
            onPress={() => actions.startKYC()}
            iconRight="IconArrowRight"
          >
            Submit KYC data
          </CelButton>
        )}

        {this.renderSkipButton(updatingTaxInfo)}
        <SsnModal />
      </RegularLayout>
    );
  }
}

export default KYCTaxpayer;
