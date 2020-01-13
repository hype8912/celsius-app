import React, { Component } from "react";
import { Linking } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import SupportStyle from "./Support.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import MultiInfoCard from "../../molecules/MultiInfoCard/MultiInfoCard";

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
    // const style = SupportStyle();

    return (
      <RegularLayout>
        <MultiInfoCard
          darkImage={require("../../../../assets/images/icons/help-center-dark.png")}
          lightImage={require("../../../../assets/images/icons/help-center.png")}
          textButton={"Help Center"}
          explanationOne={"Check answers to most"}
          explanationTwo={"common questions."}
          navigateTo={() =>
            Linking.openURL("https://support.celsius.network/hc/en-us")
          }
        />
        <MultiInfoCard
          darkImage={require("../../../../assets/images/icons/support-dark.png")}
          lightImage={require("../../../../assets/images/icons/support.png")}
          textButton={"Submit Ticket"}
          explanationOne={"Our support team is here"}
          explanationTwo={"to help you solve any"}
          explanationThree={"problem you may have."}
          navigateTo={() =>
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
