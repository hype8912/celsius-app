import React, { Component } from "react";
import { Linking } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import MultiInfoCardButton from "../../molecules/MultiInfoCardButton/MultiInfoCardButton";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Support extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Need help?",
    right: "profile",
  });

  render() {
    return (
      <RegularLayout>
        <MultiInfoCardButton
          darkImage={require("../../../../assets/images/icons/help-center-dark.png")}
          lightImage={require("../../../../assets/images/icons/help-center.png")}
          textButton={"Help Center"}
          explanation={"Check answers to most common questions."}
          onPress={() =>
            Linking.openURL("https://support.celsius.network/hc/en-us")
          }
        />
        <MultiInfoCardButton
          darkImage={require("../../../../assets/images/icons/support-dark.png")}
          lightImage={require("../../../../assets/images/icons/support.png")}
          textButton={"Submit Ticket"}
          explanation={
            "Our support team is here to help you solve any problem you may have."
          }
          onPress={() =>
            Linking.openURL(
              "https://support.celsius.network/hc/en-us/requests/new"
            )
          }
        />
      </RegularLayout>
    );
  }
}

export default Support;
