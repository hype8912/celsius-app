import React, { Component } from "react";
import { View, TouchableOpacity, Clipboard, BackHandler } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";

import * as appActions from "../../../redux/actions";
import VerifyProfileStyle from "./VerifyProfile.styles";
import CelText from "../../atoms/CelText/CelText";
import CelNumpad from "../../molecules/CelNumpad/CelNumpad";
import { KEYPAD_PURPOSES } from "../../../constants/UI";
import HiddenField from "../../atoms/HiddenField/HiddenField";
import Spinner from "../../atoms/Spinner/Spinner";
import ContactSupport from "../../atoms/ContactSupport/ContactSupport";
import { DEEP_LINKS } from "../../../constants/DATA";

@connect(
  state => ({
    appState: state.app.appState,
    formData: state.forms.formData,
    twoFAStatus: state.security.twoFAStatus,
    deepLinkData: state.deepLink.deepLinkData,
    user: state.user.profile,
    previousScreen: state.nav.previousScreen,
    activeScreen: state.nav.activeScreen,
    theme: state.user.appSettings.theme,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class VerifyProfileComponent extends Component {
  static propTypes = {};

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerSameColor: true,
      hideBack: !!(params && (params.show || params.hideBack)) || false,
      right: navigation.getParam("showLogOutBtn", false) && "logout",
      gesturesEnabled: false,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      loading: false,
      verificationError: false,
      showLogOutBtn: false,
      hasSixDigitPin: false,
    };
  }

  componentDidMount = () => {
    const { navigation, actions, user } = this.props;
    const activeScreen = navigation.getParam("activeScreen");
    const hasSixDigitPin = navigation.getParam("hasSixDigitPin");

    actions.updateFormField("loading", false);
    actions.getPreviousPinScreen(activeScreen);
    if (hasSixDigitPin || user.has_six_digit_pin)
      this.setState({ hasSixDigitPin: true });
    if (activeScreen) this.props.navigation.setParams({ hideBack: true });
  };

  componentWillUpdate(nextProps) {
    const { activeScreen } = this.props;

    if (
      activeScreen !== nextProps.activeScreen &&
      nextProps.activeScreen === "VerifyProfile"
    ) {
      this.setState({ value: "" });
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }


  onCheckSuccess = async () => {
    this.setState({ loading: true });

    const { navigation, actions, previousScreen, deepLinkData } = this.props;
    const onSuccess = navigation.getParam("onSuccess");
    const activeScreen = navigation.getParam("activeScreen");

    actions.updateFormField("loading", true);

    // Check if app is opened from DeepLink
    if (!_.isEmpty(deepLinkData)) {
      if (deepLinkData.type === DEEP_LINKS.NAVIGATE_TO) {
        actions.handleDeepLink();
        return;
      }
    }

    if (activeScreen) {
      if (activeScreen === "VerifyProfile") {
        this.setState({ loading: false });
        actions.updateFormField("loading", false);

        actions.resetToScreen(previousScreen || "WalletLanding");
        return;
      }

      actions.navigateTo(activeScreen);
      actions.updateFormField("loading", false);

      this.setState({ loading: false });
      return;
    }
    actions.updateFormField("loading", false);
    this.setState({ loading: false });
    onSuccess();
  };

  onCheckError = () => {
    this.setState({ loading: false, value: "", verificationError: true });
    const timeout = setTimeout(() => {
      this.setState({ verificationError: false });

      clearTimeout(timeout);
    }, 5000);
  };

  handlePINChange = newValue => {
    const { actions } = this.props;
    const { hasSixDigitPin } = this.state;
    const pinLength = hasSixDigitPin ? 6 : 4;

    if (newValue.length > pinLength) return;

    actions.updateFormField("pin", newValue);
    this.setState({ value: newValue });

    if (newValue.length === pinLength) {
      this.setState({ loading: true });
      actions.checkPIN(this.onCheckSuccess, this.onCheckError);
    }
  };

  renderDots = length => {
    const { actions } = this.props;
    const { verificationError, value } = this.state;

    const pinLength = length || 6;
    return (
      <TouchableOpacity onPress={actions.toggleKeypad}>
        <HiddenField
          value={value}
          error={verificationError}
          length={pinLength}
        />
      </TouchableOpacity>
    );
  };

  renderPIN() {
    const { loading } = this.state;
    const style = VerifyProfileStyle();

    return (
      <View style={style.wrapper}>
        <CelText type="H1" align="center">
          Verification required
        </CelText>
        <CelText align="center" margin="10 0 10 0">
          Please enter your PIN to proceed
        </CelText>

        {this.renderDots(6)}
        <View>
          <ContactSupport copy="Forgot PIN? Contact our support at app@celsius.network." />
        </View>

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
    );
  }

  renderModalVerificationScreen = () => {
    const { value } = this.state;
    const { actions } = this.props;

    const field = "pin";
    const onPressFunc = this.handlePINChange;

    const style = VerifyProfileStyle();
    return (
      <View
        style={[{ paddingTop: 50, backgroundColor: "red" }]}
      >
        {this.renderPIN()}
        <CelNumpad
          field={field}
          value={value}
          updateFormField={actions.updateFormField}
          setKeypadInput={actions.setKeypadInput}
          toggleKeypad={actions.toggleKeypad}
          onPress={onPressFunc}
          purpose={KEYPAD_PURPOSES.VERIFICATION}
        />
      </View>
    );
  };

  render() {
    return this.renderModalVerificationScreen();

  }
}

export default VerifyProfileComponent;
