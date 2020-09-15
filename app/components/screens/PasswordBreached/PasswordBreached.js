import React, { Component } from "react";
import { View, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";

import PasswordBreachedStyle from "./PasswordBreached.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelButton from "../../atoms/CelButton/CelButton";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class PasswordBreached extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    headerSameColor: false,
    transparent: true,
    hideBack: true,
    gesturesEnabled: false,
  });

  onPressLogin = () => {
    const { actions } = this.props;
    actions.navigateTo(SCREENS.LOGIN);
  };

  render() {
    const style = PasswordBreachedStyle();

    return (
      <RegularLayout fabType="hide">
        <View style={style.wrapper}>
          <Image
            source={require("../../../../assets/images/password-breached.png")}
            style={style.image}
          />
          <CelText weight="bold" align="center" type="H2" style={style.title}>
            Password Breach Alert!
          </CelText>
          <CelText weight="light" align="center" style={style.subtitle}>
            This login attempt has been blocked because the password you're
            using was previously disclosed through a data breach (not in this
            application). Please check your email for more information.
          </CelText>
          <CelButton style={style.button} onPress={this.onPressLogin}>
            Log in Again
          </CelButton>
        </View>
      </RegularLayout>
    );
  }
}

export default PasswordBreached;
