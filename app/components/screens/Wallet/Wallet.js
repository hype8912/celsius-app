import React, { Component } from "react";
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import WalletStyle from "./Wallet.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelInput from "../../atoms/CelInput/CelInput";
import CelButton from "../../atoms/CelButton/CelButton";

@connect(
  state => ({
    formData: state.forms.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Wallet extends Component {
  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  render() {
    const { formData } = this.props;
    return (
      <RegularLayout>
        <CelButton onPress={() => {}}>Join Celsius</CelButton>
        <CelInput
          field="test"
          placeholder="Password"
          returnKeyType={"next"}
          blurOnSubmiting={false}
          onSubmitEditing={() => {
            this.pass.focus();
          }}
        />
        <CelInput
          field="test1"
          placeholder="Password"
          type="password"
          value={formData.test1 || ""}
          refs={input => {
            this.pass = input;
          }}
        />
      </RegularLayout>
    );
  }
}

export default Wallet;
