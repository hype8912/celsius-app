import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import LoanPrepaymentPeriodStyle from "./LoanPrepaymentPeriod.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import VerticalSlider from "../../atoms/VerticalSlider/VerticalSlider";
import CelButton from "../../atoms/CelButton/CelButton";
import STYLES from "../../../constants/STYLES";
import formatter from "../../../utils/formatter";
import { LOAN_PAYMENT_REASONS } from "../../../constants/UI";

@connect(
  state => ({
    formData: state.forms.formData,
    allLoans: state.loans.allLoans,
    loanSettings: state.loans.loanSettings,
    currencyRates: state.currencies.currencyRatesShort,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class LoanPrepaymentPeriod extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Prepayment period",
    right: "profile",
    left: "back",
  });

  constructor(props) {
    super(props);
    props.actions.updateFormField("prepaidPeriod", 6);
  }

  setPrepaymentPeriod = () => {
    const { actions, formData, navigation, allLoans } = this.props;
    const reason = navigation.getParam("reason");
    const id = navigation.getParam("id");
    const loan = allLoans.find(l => l.id === id);

    if (reason === LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT) {
      if (formData.coin === "USD") {
        const amountUsd = formData.prepaidPeriod * loan.monthly_payment;
        actions.updateFormField("amountUsd", amountUsd);
        actions.navigateTo("WiringBankInformation");
      } else {
        actions.navigateTo("VerifyProfile", {
          onSuccess: () => {
            actions.prepayInterest(id);
            actions.updateFormField("prepayLoanId", id);
          },
        });
      }
    }
  };

  getMonthValues = () => {
    const { allLoans, navigation } = this.props;
    const loanId = navigation.getParam("id");
    const loan = allLoans.find(l => l.id === loanId);

    // const monthValues = [6, 7, 8, 9, 10, 11, 12]
    const monthValues = [];
    let month = 6;
    while (month <= Math.min(loan.max_possible_prepayment_period, 12)) {
      monthValues.push(month);
      month++;
    }

    return monthValues;
  };

  calculatePrepaidValue = (usdValue, coinRate, coin) => {
    const rate = coin === "USD" ? 1 : coinRate;
    return formatter.crypto(usdValue / rate, coin);
  };

  renderSlider = () => {
    const {
      allLoans,
      actions,
      formData,
      navigation,
      currencyRates,
    } = this.props;
    const loanId = navigation.getParam("id");
    const loan = allLoans.find(l => l.id === loanId);
    const coinRate = currencyRates[formData.coin.toLowerCase()];

    const monthValues = this.getMonthValues();

    const sliderItems = monthValues.map(m => ({
      value: m,
      label: (
        <>
          <CelText
            type="H6"
            weight="bold"
            color={
              formData.prepaidPeriod === m ? STYLES.COLORS.CELSIUS_BLUE : null
            }
          >
            {m} MONTHS
          </CelText>
          <CelText type="H6">
            Prepay:{" "}
            {this.calculatePrepaidValue(
              Number(loan.monthly_payment * m),
              coinRate,
              formData.coin
            )}
          </CelText>
        </>
      ),
    }));

    return (
      <VerticalSlider
        items={sliderItems}
        field="prepaidPeriod"
        value={formData.prepaidPeriod}
        updateFormField={actions.updateFormField}
      />
    );
  };

  renderWhenOnly6Months = () => {
    const { allLoans, currencyRates, formData, navigation } = this.props;
    const coinRate = currencyRates[formData.coin.toLowerCase()];
    const loanId = navigation.getParam("id");
    const loan = allLoans.find(l => l.id === loanId);
    const amount = this.calculatePrepaidValue(
      Number(loan.monthly_payment * 6),
      coinRate,
      formData.coin
    );

    return (
      <RegularLayout>
        <CelText type="H3" weight="bold" align="center" margin="50 0 15 0">
          Minimum prepayment time period is 6 months
        </CelText>
        <CelText align="center" weight={"300"}>
          You can payout {amount} of your interest now
        </CelText>

        <CelButton
          margin="50 0 30 0"
          iconRight="IconArrowRight"
          onPress={this.setPrepaymentPeriod}
        >
          Continue
        </CelButton>
      </RegularLayout>
    );
  };

  render() {
    const style = LoanPrepaymentPeriodStyle();
    const verticalSlider = this.renderSlider();
    const monthValues = this.getMonthValues();

    if (monthValues.length === 1) return this.renderWhenOnly6Months();

    return (
      <View style={style.container}>
        <RegularLayout fabType={"hide"}>
          <View style={{ paddingTop: 10, alignItems: "center" }}>
            <CelText align="center" weight={"300"}>
              Choose your prepayment time period.
            </CelText>
            <CelText margin={"0 0 30 0"} align="center" weight={"300"}>
              Minimum period is 6 months.
            </CelText>
          </View>
          <View>{verticalSlider}</View>

          <CelButton
            margin="50 0 30 0"
            iconRight="IconArrowRight"
            onPress={this.setPrepaymentPeriod}
          >
            Continue
          </CelButton>
        </RegularLayout>
      </View>
    );
  }
}

export default LoanPrepaymentPeriod;
