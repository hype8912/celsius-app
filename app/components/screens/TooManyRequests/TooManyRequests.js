import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View } from "react-native";

import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelText from "../../atoms/CelText/CelText";
import * as appActions from "../../../redux/actions";
import CelButton from "../../atoms/CelButton/CelButton";

// TODO should probably be a static screen
@connect(
  state => ({
    user: state.user.profile,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TooManyRequests extends Component {
  static navigationOptions = () => ({
    hideBack: true,
  });

  componentDidMount() {
    const { actions, user } = this.props;
    if (user.id) {
      setTimeout(() => {
        actions.logoutUser();
      }, 7000);
    }
  }

  render() {
    const { user } = this.props;
    return (
      <RegularLayout fabType="hide">
        <View style={{ height: "100%", justifyContent: "center" }}>
          <CelText
            margin="20 0 15 0"
            align="center"
            type="H2"
            weight={"700"}
            bold
          >
            Too many requests
          </CelText>
          <CelText margin="5 0 15 0" align="center" type="H4" weight={"300"}>
            Yikes, it looks like you made several wrong attempts in a short period
            of time. You will be able to use the application again in less than an
            hour. You can reach out to our support team at app@celsius.network.
          </CelText>
          {!user.id && (
            <CelButton
              margin="40 0 0 0"
              color="blue"
              onPress={this.props.actions.navigateBack}
            >
              Try again
            </CelButton>
          )}
        </View>
      </RegularLayout>
    );
  }
}

export default TooManyRequests;
