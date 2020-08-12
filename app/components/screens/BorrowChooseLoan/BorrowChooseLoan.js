import React, { Component } from "react";
import { View } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import BorrowChooseLoanStyle from "./BorrowChooseLoan.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import { getPadding } from "../../../utils/styles-util";
import { LOAN_TYPES } from "../../../constants/DATA";
import MultiInfoCardButton from "../../molecules/MultiInfoCardButton/MultiInfoCardButton";

@connect(
  state => ({
    loanCompliance: state.compliance.loan,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BorrowChooseLoan extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Borrow",
    right: "profile",
    left: "back",
    customCenterComponent: { steps: 8, currentStep: 1, flowProgress: true },
  });

  constructor(props) {
    super(props);

    const { loanCompliance } = props;
    const canBorrowUSD = loanCompliance.loan_coins.includes("USD");
    const stableCoins = loanCompliance.loan_coins.filter(c => c !== "USD");
    const canBorrowStable = !!stableCoins.length;

    this.state = { canBorrowUSD, canBorrowStable };
  }

  getCardProps = () => {
    const { actions } = this.props;
    const { canBorrowUSD, canBorrowStable } = this.state;

    const cardDetails = [];

    if (canBorrowUSD) {
      cardDetails.push({
        textButton: "Borrow Dollars",
        explanation: "Take out a cash loan against your crypto.",
        lightImage: require("../../../../assets/images/illustration-borrow-dollars.png"),
        darkImage: require("../../../../assets/images/illustration-borrow-dollars.png"),
        unicornImage: require("../../../../assets/images/illustration-borrow-dollars-unicorn.png"),
        onPress: () => {
          actions.navigateTo("BorrowEnterAmount");
          actions.updateFormFields({
            coin: "USD",
            loanType: LOAN_TYPES.USD_LOAN,
          });
        },
      });
    }

    if (canBorrowStable) {
      cardDetails.push({
        textButton: "Borrow Stablecoins",
        explanation: "Take out a loan in one of our supported stable coins.",
        lightImage: require("../../../../assets/images/illustration-borrow-stablecoins.png"),
        darkImage: require("../../../../assets/images/illustration-borrow-stablecoins.png"),
        unicornImage: require("../../../../assets/images/illustration-borrow-stablecoins-unicorn.png"),
        onPress: () => {
          actions.navigateTo("BorrowEnterAmount");
          actions.updateFormFields({
            coin: "USDC",
            loanType: LOAN_TYPES.STABLE_COIN_LOAN,
          });
        },
      });
    }

    return cardDetails;
  };

  render() {
    // const style = BorrowChooseLoanStyle();
    const cardDetails = this.getCardProps();

    return (
      <RegularLayout padding="0 0 0 0">
        <View
          style={[
            { flex: 1, width: "100%", height: "100%" },
            { ...getPadding("20 20 100 20") },
          ]}
        >
          <CelText align="center" type="H4" weight="300" margin="0 0 20 0">
            What type of currency would you like to borrow?
          </CelText>
          {cardDetails.map(i => (
            <MultiInfoCardButton {...i} key={i.cardTitle} />
          ))}
        </View>
      </RegularLayout>
    );
  }
}

export default BorrowChooseLoan;
