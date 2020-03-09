import React, { Component } from "react";
import { Image, View } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CheckYourEmailStyle from "./CheckYourEmail.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelButton from "../../atoms/CelButton/CelButton";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CheckYourEmail extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "HODL mode",
    right: "profile",
  });

  render() {
    const style = CheckYourEmailStyle();
    const { actions } = this.props;

    return (
      <RegularLayout padding={"50 0 0 0"}>
        <View style={style.container}>
          <View style={[style.circle, { backgroundColor: "white" }]}>
            <Image
              style={style.mail}
              source={require("../../../../assets/images/checkEmail.png")}
            />
          </View>
          <CelText
            align={"center"}
            type={"H2"}
            weight={"bold"}
            margin={"20 0 0 0"}
          >
            Check your Email!
          </CelText>
          <CelText align={"center"} type={"H4"} margin={"20 0 0 0"}>
            To complete HODL mode activation please follow the email
            instructions.
          </CelText>
          <CelButton
            margin={"40 0 0 0"}
            onPress={() => actions.navigateTo("WalletLanding")}
          >
            Go to wallet
          </CelButton>
        </View>
      </RegularLayout>
    );
  }
}

export default CheckYourEmail;
