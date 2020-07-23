import React, { Component } from "react";
import { View } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import TransactionLandingScreenStyle from "./TransactionLandingScreen.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelSelect from "../../molecules/CelSelect/CelSelect";

@connect(
  state => ({
    formData: state.forms.formData,
    formErrors: state.forms.formErrors,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TransactionLandingScreen extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "TransactionLandingScreen Screen",
    right: "profile",
  });

  chooseTypeOfTransaction = data => {
    switch (data) {
      case "buy":
        return {
          type: "buy",
          label: "Buy Coins",
        };
      case "swap":
        return {
          type: "celpay",
          label: "Swap Coins",
        };
      case "withdraw":
        return {
          type: "celpay",
          label: "Withdraw",
        };
      case "celpay":
        return {
          type: "celpay",
          label: "CelPay",
        };
      default:
        return;
    }
  };

  render() {
    // const style = TransactionLandingScreenStyle();
    const { formData, formErrors } = this.props;
    let type;
    // const text =

    // check for picker props: placeholder color etc...

    if (formData.transactions)
      type = this.chooseTypeOfTransaction(formData.transactions);

    return (
      <RegularLayout>
        <CelText>I want to</CelText>
        <CelSelect
          type="transactions"
          field="transactions"
          labelText=". . ."
          hideCallingCodes
          value={formData.transactions}
          error={formErrors.transactions}
        />

        {!formData.transactions && (
          <View>
            <CelText margin={"40 0 0 0"} type={"H3"} weight={"500"}>
              Buy, Earn & Borrow on the Blockchain
            </CelText>
            <CelText margin={"20 0 0 0"} type={"H5"}>
              Celsius Network lets you buy coins, earn interest on your crypto
              and instantly borrow dollars at 1% APR against it. No fees ever.
            </CelText>
          </View>
        )}

        {formData.transactions && (
          <CelSelect
            type={type.type}
            field={formData[type.type]}
            labelText={type.label}
            hideCallingCodes
            value={formData[type.type]}
            error={formErrors[type.type]}
          />
        )}
      </RegularLayout>
    );
  }
}

export default TransactionLandingScreen;
