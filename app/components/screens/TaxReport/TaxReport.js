import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';

@connect(
  state => ({
    user: state.user.profile,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class TaxReport extends Component {
  static propTypes = {};
  static defaultProps = {}

  static navigationOptions = () => ({
    title: "Tax Report"
  });

  render() {
    return (
      <RegularLayout>
        <CelText align="center" type="H4">
          Select the desired Tax Year report
        </CelText>
        <CelText margin={"20 0 0 0"}>
          Need help? Contact our{" "}
          <CelText weight={"500"} link>
            Support
          </CelText>
        </CelText>
      </RegularLayout>
    );
  }
}

export default TaxReport
