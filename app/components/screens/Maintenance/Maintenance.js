import React, { Component } from "react";
// import { Image } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import MaintenanceStyle from "./Maintenance.styles";
import { EMPTY_STATES } from "../../../constants/UI";
import StaticScreen from "../StaticScreen/StaticScreen";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    backendStatus: state.generalData.backendStatus,
    appCompliance: state.compliance.app,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Maintenance extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    header: null,
  });

  componentDidUpdate(prevProps) {
    const { actions } = this.props;
    if (
      (prevProps.backendStatus.maintenance &&
        !this.props.backendStatus.maintenance) ||
      (!prevProps.appCompliance.allowed && this.props.appCompliance.allowed)
    ) {
      actions.navigateTo(SCREENS.WALLET_LANDING);
    }
  }

  render() {
    const { backendStatus } = this.props;

    if (backendStatus.maintenance) {
      return backendStatus.title && backendStatus.explanation ? (
        <StaticScreen
          emptyState={{
            purpose: EMPTY_STATES.MAINTENANCE,
            heading: backendStatus.title,
            paragraphs: [backendStatus.explanation],
            image: require("../../../../assets/images/icons/tool.png"),
          }}
        />
      ) : (
        <StaticScreen emptyState={{ purpose: EMPTY_STATES.MAINTENANCE }} />
      );
    }

    return <StaticScreen emptyState={{ purpose: EMPTY_STATES.COMPLIANCE }} />;
  }
}

export default Maintenance;
