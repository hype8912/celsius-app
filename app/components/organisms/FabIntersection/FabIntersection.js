import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import FabMenuAnimated from "../FabMenuAnimated/FabMenuAnimated";
import FabMenu from "../FabMenu/FabMenu";

@connect(
  state => ({
    shouldAnimate: state.ui.shouldAnimate,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class FabIntersection extends Component {
  render() {
    const { shouldAnimate } = this.props;
    if (shouldAnimate) return <FabMenuAnimated />;
    return <FabMenu />;
  }
}

export default FabIntersection;
