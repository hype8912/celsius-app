import React, { Component } from "react";
import { BackHandler } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";
import StaticScreen from "../StaticScreen/StaticScreen";
import { EMPTY_STATES } from "../../../constants/UI";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class SixDigitPinExplanation extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    headerSameColor: true,
    gesturesEnabled: false,
    hideBack: true,
  });

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () => {
      return true;
    });
  }

  onPressContinue = () => {
    const { actions, navigation } = this.props;
    const onSuccess = navigation.getParam("onSuccess");

    actions.updateFormField("upgradeToSixDigitPin", true); // Flag for navigation to Six digit pin activation
    actions.navigateTo("ChangePin", { onSuccess });
  };

  render() {
    return (
      <StaticScreen
        emptyState={{
          purpose: EMPTY_STATES.SIX_DIGITS_PIN_UPGRADE,
          onPress: this.onPressContinue,
        }}
        type={"hide"}
      />
    );
  }
}

export default SixDigitPinExplanation;
