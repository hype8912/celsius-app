import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BigNumber from "bignumber.js";

import * as appActions from "../../../redux/actions";
import LoanPrepaymentPeriodStyle from "./LoanPrepaymentPeriod.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import VerticalSlider from "../../atoms/VerticalSlider/VerticalSlider";
import CelButton from "../../atoms/CelButton/CelButton";
import formatter from "../../../utils/formatter";
import { LOAN_PAYMENT_REASONS, MODALS } from "../../../constants/UI";
import ConfirmPrepaymentModal from "../../modals/ConfirmPrepaymentModal/ConfirmPrepaymentModal";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    formData: state.forms.formData,
    allLoans: state.loans.allLoans,
    loanSettings: state.loans.loanSettings,
    currencyRates: state.currencies.currencyRatesShort,
    loyaltyInfo: state.loyalty.loyaltyInfo,
    walletSummary: state.wallet.summary,
    currencyRatesShort: state.currencies.currencyRatesShort,
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
        actions.navigateTo(SCREENS.WIRING_BANK_INFORMATION);
      } else {
        actions.openModal(MODALS.CONFIRM_INTEREST_PREPAYMENT);
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

  calculateModalData = () => {
    const {
      formData,
      navigation,
      loyaltyInfo,
      walletSummary,
      allLoans,
    } = this.props;
    const loanId = navigation.getParam("id");
    const loan = allLoans.find(l => l.id === loanId);
    const walletCoin = walletSummary.coins.find(c => c.short === formData.coin);
    const amountUsd = walletCoin ? walletCoin.amount_usd : 0;
    const prepaymentAmount =
      Number(loan.monthly_payment) * Number(formData.prepaidPeriod);

    const sumToPay =
      formData.coin === "CEL"
        ? prepaymentAmount -
          (prepaymentAmount -
            (1 - loyaltyInfo.tier.loanInterestBonus) * prepaymentAmount)
        : prepaymentAmount;
    const cryptoAmountToPay = walletCoin
      ? (walletCoin.amount.toNumber() / walletCoin.amount_usd.toNumber()) *
        sumToPay
      : 0;

    const newBalanceCrypto =
      walletCoin && walletCoin.amount.minus(cryptoAmountToPay);
    const newBalanceUsd = amountUsd && amountUsd.minus(sumToPay);

    return {
      coin: formData.coin,
      sumToPay,
      cryptoAmountToPay,
      newBalanceCrypto,
      newBalanceUsd,
      loanId,
    };
  };

  calculatePrepaidValue = (usdValue, coinRate, coin) => {
    const { formData, loyaltyInfo } = this.props;
    const rate = coin === "USD" ? 1 : coinRate;
    if (formData.coin === "CEL")
      return formatter.crypto(
        ((1 - loyaltyInfo.tier.loanInterestBonus) * usdValue) / rate,
        coin
      );
    return formatter.crypto(usdValue / rate, coin);
  };

  renderSlider = () => {
    const {
      allLoans,
      actions,
      formData,
      navigation,
      currencyRatesShort,
    } = this.props;
    const loanId = navigation.getParam("id");
    const loan = allLoans.find(l => l.id === loanId);
    const coinRate = currencyRatesShort[formData.coin.toLowerCase()];

    const monthValues = this.getMonthValues();

    const sliderItems = monthValues.map(m => ({
      value: m,
      label: (
        <>
          <CelText
            type="H6"
            weight="bold"
            color={
              formData.prepaidPeriod === m
                ? getColor(COLOR_KEYS.PRIMARY_BUTTON)
                : null
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
    const { allLoans, currencyRatesShort, formData, navigation } = this.props;
    const coinRate = currencyRatesShort[formData.coin.toLowerCase()];
    const loanId = navigation.getParam("id");
    const loan = allLoans.find(l => l.id === loanId);
    const amount = this.calculatePrepaidValue(
      new BigNumber(loan.monthly_payment).multipliedBy(6),
      coinRate,
      formData.coin
    );

    const modalData = this.calculateModalData();

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
        <ConfirmPrepaymentModal modalData={modalData} />
      </RegularLayout>
    );
  };

  render() {
    const style = LoanPrepaymentPeriodStyle();
    const verticalSlider = this.renderSlider();
    const monthValues = this.getMonthValues();
    if (monthValues.length === 1) return this.renderWhenOnly6Months();

    const modalData = this.calculateModalData();

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
          <ConfirmPrepaymentModal modalData={modalData} />
        </RegularLayout>
      </View>
    );
  }
}

export default LoanPrepaymentPeriod;
