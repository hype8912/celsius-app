import React, { Component } from "react";
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import NotificationsSettingsStyle from "./NotificationsSettings.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import IconButton from "../../organisms/IconButton/IconButton";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class NotificationsSettings extends Component {
  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};
  static navigationOptions = () => ({
    title: "Notifications",
  });

  render() {
    return (
      <RegularLayout>
        <CelText>Let us know how you’d like to recieve alerts</CelText>
        <IconButton>SMS notifications</IconButton>
        <IconButton margin="0 0 20 0">Email notifications</IconButton>
        <IconButton margin="0 0 20 0">Push notifications</IconButton>
      </RegularLayout>
    );
  }
}

export default NotificationsSettings;
