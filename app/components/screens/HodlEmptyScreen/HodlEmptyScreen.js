import React, { Component } from "react";
import { Image, View } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import HodlEmptyScreenStyle from "./HodlEmptyScreen.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelButton from "../../atoms/CelButton/CelButton";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class HodlEmptyScreen extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "HODL Mode",
    right: "profile",
  });

  render() {
    const style = HodlEmptyScreenStyle();
    const { actions } = this.props;

    return (
      <RegularLayout>
        <View style={style.container}>
          <View style={[style.circle]}>
            <Image
              source={require("../../../../assets/images/hodlModeStatus.png")}
              style={style.image}
            />
          </View>

          <CelText margin="20 0 15 0" align="center" type="H2" weight={"bold"}>
            {"HODL Mode is active!"}
          </CelText>

          <CelText margin="5 0 15 0" align="center" type="H4" weight={"300"}>
            {
              "Your wallet is currently in HODL Mode, which means outbound transactions are currently unavailable. To make a withdrawal, please deactivate HODL Mode."
            }
          </CelText>

          <CelButton
            margin="10 0 10 0"
            onPress={() => actions.navigateTo("SecuritySettings")}
          >
            {"Deactivate HODL Mode"}
          </CelButton>

          <CelButton
            basic
            margin="10 0 10 0"
            onPress={() => actions.navigateTo("WalletLanding")}
          >
            {"Go back to wallet"}
          </CelButton>
        </View>
      </RegularLayout>
    );
  }
}

export default HodlEmptyScreen;
