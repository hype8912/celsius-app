import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import HodlDeactivationCodeStyle from "./HodlDeactivationCode.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelInput from "../../atoms/CelInput/CelInputText";
import CelButton from "../../atoms/CelButton/CelButton";
import { EMPTY_STATES } from "../../../constants/UI";
import Card from "../../atoms/Card/Card";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import StaticScreen from "../StaticScreen/StaticScreen";
import { getColor, getFontSize } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    formData: state.forms.formData,
    formErrors: state.forms.formErrors,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class HodlDeactivationCode extends Component {
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      emptyState: false,
    };
  }

  static navigationOptions = () => ({
    title: "HODL Mode",
    right: "profile",
    gesturesEnabled: false,
    customCenterComponent: { steps: 2, currentStep: 2, flowProgress: true },
  });

  componentWillUnmount() {
    const { actions } = this.props;
    actions.clearForm();
  }

  checkEmail = async () => {
    const { actions } = this.props;
    const response = await actions.deactivateHodlMode();
    if (response && response.success) {
      this.setState({
        emptyState: true,
      });
    }
  };

  render() {
    const style = HodlDeactivationCodeStyle();
    const { emptyState } = this.state;
    const { formData, actions, callsInProgress } = this.props;
    // code will be 8 digits
    const isEligible = formData.hodlCode && formData.hodlCode.length === 8;

    if (emptyState)
      return (
        <StaticScreen emptyState={{ purpose: EMPTY_STATES.CHECK_YOUR_EMAIL }} />
      );

    const loading = apiUtil.areCallsInProgress(
      [API.DEACTIVATE_HODL_MODE],
      callsInProgress
    );

    return (
      <RegularLayout fabType={"hide"}>
        <CelText
          align={"left"}
          margin={"10 0 10 0"}
          type={"H2"}
          weight={"bold"}
        >
          Deactivation code
        </CelText>
        <CelText type={"H4"} align={"left"}>
          Please enter your unique security code below to successfully
          deactivate HODL Mode.
        </CelText>

        <Card styles={style.inputCel} margin={"20 0 20 0"}>
          <CelInput
            placeholder={"  X X X X X X X X  "}
            type="text"
            returnKeyType={"done"}
            style={{ textAlign: "center", fontSize: getFontSize("H2") }}
            maxLenght={8}
            field={"hodlCode"}
            value={formData.hodlCode}
            keyboardType={"numeric"}
          />
        </Card>

        <CelButton
          disabled={!isEligible}
          onPress={() => this.checkEmail()}
          loading={loading}
        >
          Send email verification
        </CelButton>

        <CelText margin={"20 0 0 0"} type={"H4"} align={"center"}>
          Forgot your code?
        </CelText>
        <CelText type={"H4"} align={"center"}>
          <CelText
            color={getColor(COLOR_KEYS.PRIMARY_BUTTON)}
            onPress={() => actions.navigateTo(SCREENS.SUPPORT)}
          >
            Contact our support
          </CelText>{" "}
          for help
        </CelText>

      </RegularLayout>
    );
  }
}

export default HodlDeactivationCode;
