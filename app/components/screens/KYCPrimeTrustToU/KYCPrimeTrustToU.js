import React, { Component } from "react";
import { Linking } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Card from "../../atoms/Card/Card";
import CelCheckbox from "../../atoms/CelCheckbox/CelCheckbox";
import STYLES from "../../../constants/STYLES";
import CelButton from "../../atoms/CelButton/CelButton";
import API from "../../../constants/API";
import apiUtil from "../../../utils/api-util";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

@connect(
  state => ({
    appSettings: state.user.appSettings,
    callsInProgress: state.api.callsInProgress,
    primeTrustToULink: state.kyc.primeTrustToULink,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class KYCPrimeTrustToU extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    customCenterComponent: { steps: 7, currentStep: 7, flowProgress: false },
    headerSameColor: true,
  });

  componentDidMount() {
    const { actions } = this.props;

    actions.getPrimeTrustToULink();
  }

  togglePTToU = () => {
    const { actions, appSettings } = this.props;

    actions.setUserAppSettings({
      accepted_primetrust_custodial_agreement: !appSettings.accepted_primetrust_custodial_agreement,
    });
  };

  render() {
    const {
      actions,
      appSettings,
      callsInProgress,
      primeTrustToULink,
    } = this.props;
    const togglingToU = apiUtil.areCallsInProgress(
      [API.SET_APP_SETTINGS],
      callsInProgress
    );
    const startingKYC = apiUtil.areCallsInProgress(
      [API.START_KYC],
      callsInProgress
    );

    if (!primeTrustToULink) return <LoadingScreen />;

    return (
      <RegularLayout>
        <CelText type="H2" weight="bold" align="center">
          Terms of Use
        </CelText>

        <CelText type="H4" weight="300" margin="10 0 20 0" align="center">
          One last thing! To complete your account verification, please
          carefully read and agree to the
          <CelText
            color={STYLES.COLORS.CELSIUS_BLUE}
            onPress={() => Linking.openURL(primeTrustToULink)}
          >
            {" "}
            Terms of Use
          </CelText>
          .
        </CelText>

        <Card>
          <CelCheckbox
            onChange={this.togglePTToU}
            loading={togglingToU}
            updateFormField={actions.updateFormField}
            field="primeTrustToU"
            value={appSettings.accepted_primetrust_custodial_agreement}
            uncheckedCheckBoxColor={STYLES.COLORS.GRAY}
            checkedCheckBoxColor={STYLES.COLORS.GREEN}
            rightText="I have read and agree to the Terms of Use"
          />
        </Card>

        <CelButton
          onPress={() => actions.startKYC()}
          margin="20 0 20 0"
          disabled={
            !appSettings.accepted_primetrust_custodial_agreement || startingKYC
          }
          loading={startingKYC}
        >
          Submit Profile Verification
        </CelButton>
      </RegularLayout>
    );
  }
}

export default KYCPrimeTrustToU;
