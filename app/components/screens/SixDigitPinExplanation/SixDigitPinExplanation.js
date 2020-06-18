import React, { Component } from "react";
import { View, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";

import SixDigitPinExplanationStyle from "./SixDigitPinExplanation.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelButton from "../../atoms/CelButton/CelButton";

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

  onPressGenerate = () => {
    const { actions } = this.props;
    actions.navigateTo("RegisterSetPin");
  };

  render() {
    const style = SixDigitPinExplanationStyle();

    return (
      <RegularLayout fabType="hide">
        <View style={style.wrapper}>
          <Image
            source={require("../../../../assets/images/upgradeToSixDigit.png")}
            style={style.image}
          />
          <CelText
            weight="bold"
            align="center"
            type="H1"
            margin="0 15 0 15"
            style={style.title}
          >
            Upgrade PIN to 6 digits
          </CelText>
          <CelText weight="light" align="center" type="H4" margin="15 15 15 15">
            This is more secure, with vastly more combinations to guess, and
            essentially prevents thieves from brute-forcing their way into your
            device.
          </CelText>
          <CelButton style={style.button} onPress={this.onPressGenerate}>
            Generate 6-Digits PIN
          </CelButton>
        </View>
      </RegularLayout>
    );
  }
}

export default SixDigitPinExplanation;
