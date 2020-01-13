import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View } from "react-native";

import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CircleButton from "../../atoms/CircleButton/CircleButton";
import CelText from "../../atoms/CelText/CelText";
import CelButton from "../../atoms/CelButton/CelButton";
import * as appActions from "../../../redux/actions";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class KYCFinalRejection extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    header: null,
  });

  render() {
    const { actions } = this.props;
    return (
      <RegularLayout padding={"40 20 40 20"} fabType={"hide"}>
        <View>
          <CircleButton
            style={{ marginTop: 50 }}
            icon="Stop"
            iconSize={35}
            disabled
          />

          <CelText margin="20 0 15 0" align="center" type="H2" weight={"bold"}>
            Your account can not be approved.
          </CelText>

          <CelText align="center" margin="20 0 20 0">
            Due to global compliance and regulations, we are unable to approve
            your Celsius Network account and we cannot provide you with access
            to Celsius services.
          </CelText>

          <CelButton onPress={() => actions.logoutUser()}>Log out</CelButton>
        </View>
      </RegularLayout>
    );
  }
}

export default KYCFinalRejection;
