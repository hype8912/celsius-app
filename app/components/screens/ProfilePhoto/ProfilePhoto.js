import React, { Component } from "react";
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import ProfilePhotoStyle from "./ProfilePhoto.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ProfilePhoto extends Component {
  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Change Avatar",
    right: "profile",
  });

  render() {
    // const style = ProfilePhotoStyle();

    return (
      <RegularLayout>
        <CelText>Hello ProfilePhoto</CelText>
      </RegularLayout>
    );
  }
}

export default ProfilePhoto;
