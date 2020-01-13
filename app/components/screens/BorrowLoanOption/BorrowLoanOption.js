import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import HeadingProgressBar from "../../atoms/HeadingProgressBar/HeadingProgressBar";
import LoanInterestCard from "../../molecules/LoanInterestCard/LoanInterestCard";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

@connect(
  state => ({
    formData: state.forms.formData,
    walletSummary: state.wallet.summary,
    ltv: state.loans.ltvs,
    currencyRates: state.currencies.currencyRatesShort,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BorrowLoanOption extends Component {
  static navigationOptions = () => ({
    title: "Choose Your Interest Rate",
    right: "info",
  });

  render() {
    const { ltv } = this.props;
    if (!ltv) return <LoadingScreen />;

    const ltvCards = ltv
      .sort((a, b) => a.interest > b.interest)
      .map(item => <LoanInterestCard key={item.interest} ltv={item} />);

    return (
      <View style={{ flex: 1 }}>
        <HeadingProgressBar steps={6} currentStep={3} />
        <RegularLayout fabType="hide">
          <CelText weight={"300"} margin={"0 0 20 0"} align="center">
            Choose your interest rate:
          </CelText>
          {ltvCards}
        </RegularLayout>
      </View>
    );
  }
}

export default BorrowLoanOption;
