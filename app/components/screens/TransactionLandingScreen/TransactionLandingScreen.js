import React, { Component } from "react";
import { Animated, View } from "react-native";
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.formData.transactions !== prevState.transactions) {
      return {
        transactions: nextProps.formData.transactions,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      yOffset: new Animated.Value(0),
      opacity: new Animated.Value(0),
      values: {},
    };
  }

  // component

  chooseTypeOfTransaction = data => {
    let values;
    switch (data) {
      case "buy":
        values = {
          type: "buy",
          label: "Buy Coins",
          text: "via",
          method: "method",
        };
        break;
      case "swap":
        values = {
          type: "swap",
          label: "Swap Coins",
          text: "via",
          method: "method",
        };
        break;
      case "withdraw":
        values = {
          type: "withdraw",
          label: "Withdraw",
          text: "to",
          method: "address",
        };
        break;
      case "celpay":
        values = {
          type: "celpay",
          label: "CelPay",
          text: "via",
          method: "method",
        };
        break;
    }

    this.state = {
      values,
    };
    return values;
  };

  render() {
    // const style = TransactionLandingScreenStyle();
    const { formData, formErrors } = this.props;
    const { opacity } = this.state;
    let type;
    // const text =

    // check for picker props: placeholder color etc...

    if (formData.transactions)
      type = this.chooseTypeOfTransaction(formData.transactions);

    return (
      <RegularLayout>
        <CelText margin={"15 0 10 0"} type={"H3"} weight={"500"}>
          I want to
        </CelText>
        <CelSelect
          type="transactions"
          field="transactions"
          labelText=". . ."
          hideCallingCodes
          value={formData.transactions}
          error={formErrors.transactions}
        />

        {!formData.transactions && (
          <View style={{ opacity }}>
            <CelText margin={"40 0 0 0"} type={"H3"} weight={"500"}>
              Buy, Earn & Borrow on the Blockchain
            </CelText>
            <CelText margin={"20 0 0 0"} type={"H5"}>
              Celsius Network lets you buy coins, earn interest on your crypto
              and instantly borrow dollars at 1% APR against it. No fees ever.
            </CelText>
          </View>
        )}

        {formData.transactions && type.type === "withdraw" && (
          <View>
            <CelText margin={"15 0 10 0"} type={"H3"} weight={"500"}>
              {type.text}
            </CelText>
            <CelSelect
              type={type.type}
              field={type.type}
              labelText={type.method}
              hideCallingCodes
              value={formData[type.type]}
              error={formErrors[type.type]}
            />
          </View>
        )}
        {formData.transactions && type.type === "celpay" && (
          <View>
            <CelText margin={"15 0 10 0"} type={"H3"} weight={"500"}>
              {type.text}
            </CelText>
            <CelSelect
              type={type.type}
              field={type.type}
              labelText={type.method}
              hideCallingCodes
              value={formData[type.type]}
              error={formErrors[type.type]}
            />
          </View>
        )}
        {formData.transactions && type.type === "buy" && (
          <View>
            <CelText margin={"15 0 10 0"} type={"H3"} weight={"500"}>
              {type.text}
            </CelText>
            <CelSelect
              type={type.type}
              field={type.type}
              labelText={type.method}
              hideCallingCodes
              value={formData[type.type]}
              error={formErrors[type.type]}
            />
          </View>
        )}
      </RegularLayout>
    );
  }
}

export default TransactionLandingScreen;
