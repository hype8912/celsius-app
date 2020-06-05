import React, { Component } from "react";
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import PastIdentitiesStyle from "./PastIdentities.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Card from "../../atoms/Card/Card";

const IDENTITIES = [
  "0xDE082CC5F6F02D8B0F0A43357C77059620358BC272D88E84E922061FFCAE2BDD",
  "0xDE082CC5F6F02D8B0F0A43357C77059620358BC272D88E84E922061FFCAE2BDV",
  "0xDE082CC5F6F02D8B0F0A43357C77059620358BC272D88E84E922061FFCAE2BDH",
];

@connect(
  state => ({
    user: state.user.profile,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class PastIdentities extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Past Identities",
    right: "profile",
  });

  // async componentDidMount() {
  //   const {user, actions} = this.props
  //   try {
  //     const res = await blockExplorerService.getUserSettings(user.id)
  //     console.log("user: " ,res.data);
  //   } catch (e) {
  //     actions.showMessage("error", e)
  //   }
  // }

  render() {
    // const style = PastIdentitiesStyle();

    return (
      <RegularLayout>
        {IDENTITIES.map(item => (
          <Card padding={"20 20 20 20"}>
            <CelText type={"H6"}>{item}</CelText>
          </Card>
        ))}
      </RegularLayout>
    );
  }
}

export default PastIdentities;
