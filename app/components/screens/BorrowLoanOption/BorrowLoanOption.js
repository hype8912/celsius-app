import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";


import * as appActions from "../../../redux/actions";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import ProgressBar from "../../atoms/ProgressBar/ProgressBar";
import Card from "../../atoms/Card/Card";
import formatter from "../../../utils/formatter";
import STYLES from "../../../constants/STYLES";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

@connect(
  state => ({
    formData: state.forms.formData,
    walletSummary: state.wallet.summary,
    ltv: state.loans.ltvs,
    currencyRates: state.currencies.currencyRatesShort,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BorrowLoanOption extends Component {

  static navigationOptions = () => ({
    title: "Select your loan",
    right: "info"
  });

  setLoanOption = (interest, monthlyPayment, amountCollateralUsd, amountCollateralCrypto, loanToValue) => {
    const { actions } = this.props;

    actions.updateFormFields({
      interest,
      monthlyPayment,
      amountCollateralCrypto,
      amountCollateralUsd,
      ltv: loanToValue
    });

    actions.navigateTo("BorrowLoanTerm")
  };

  renderInterestCard = (ltv) => {
    const { formData, currencyRates, walletSummary, actions } = this.props;

    const crypto = currencyRates[formData.coin.toLowerCase()];
    const monthlyPayment = formData.loanAmount * ltv.interest / 12;
    const amountCollateralUsd = formData.loanAmount / ltv.percent;
    const amountCollateralCrypto = (amountCollateralUsd / crypto);
    const interest = formatter.percentage(ltv.interest);
    const loanToValue = ltv.percent;

    const isAllowed = walletSummary.coins.find(c => c.short === formData.coin).amount_usd > amountCollateralUsd

    return (
      <View key={ltv.interest} style={{ paddingHorizontal: 20 }}>
        <Card onPress={isAllowed ? () => this.setLoanOption(ltv.interest, monthlyPayment, amountCollateralUsd, amountCollateralCrypto, loanToValue) : undefined}
          padding="15 15 15 15"
          margin="25 0 5 0"
          opacity={isAllowed ? 1 : 0.4}
        >
          <CelText weight={"300"} type={"H6"}>{`$${formatter.round(monthlyPayment)} per month`}</CelText>
          <CelText weight={"600"} type={"H3"}>{`${interest}% interest rate`}</CelText>
          <CelText weight={"300"} type={"H6"}>{`Locking ${formatter.crypto(amountCollateralCrypto)} ${formData.coin} as collateral`}</CelText>
        </Card>

        {!isAllowed && (
          <TouchableOpacity onPress={() => actions.navigateTo('Deposit', { coin: formData.coin })}>
            <CelText margin="0 0 0 0">
              <CelText color={STYLES.COLORS.CELSIUS_BLUE}>Deposit more coins to </CelText>
              use this options
            </CelText>
          </TouchableOpacity>
        )}
      </View>
    )
  };

  render() {
    const { ltv } = this.props;
    if (!ltv) return <LoadingScreen />;

    return (
      <RegularLayout>
        <View style={{ paddingTop: 10, alignItems: 'center' }}>
          <ProgressBar steps={6} currentStep={3} />
        </View>
        <CelText weight={"300"} margin={"20 0 20 0"} align='center'>Choose your interest rate:</CelText>
        {ltv.map(this.renderInterestCard)}
      </RegularLayout>
    );
  }
}

export default BorrowLoanOption
