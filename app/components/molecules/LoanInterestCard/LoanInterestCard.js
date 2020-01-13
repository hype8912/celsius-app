import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import * as appActions from "../../../redux/actions";

import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import formatter from "../../../utils/formatter";
import Icon from "../../atoms/Icon/Icon";

import STYLES from "../../../constants/STYLES";
import LoanInterestCardStyle from "./LoanInterestCard.styles";
import Separator from "../../atoms/Separator/Separator";
import userBehaviorUtil from "../../../utils/user-behavior-util";

@connect(
  state => ({
    coins: state.compliance.loan.coins,
    currencies: state.currencies.rates,
    formData: state.forms.formData,
    walletSummary: state.wallet.summary,
    currencyRates: state.currencies.currencyRatesShort,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class LoanInterestCard extends Component {
  static propTypes = {
    ltv: PropTypes.instanceOf(Object).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      currency: null,
    };
    const { formData, currencyRates, walletSummary, ltv } = this.props;

    this.crypto = currencyRates[formData.collateralCoin.toLowerCase()];
    this.amountCollateralUsd = formData.loanAmount / ltv.percent;
    this.amountCollateralCrypto = this.amountCollateralUsd / this.crypto;
    this.interest = formatter.percentage(ltv.interest);
    this.loanToValue = ltv.percent;
    this.monthlyPayment = (ltv.interest * formData.loanAmount) / 12;
    this.isAllowed =
      walletSummary.coins.find(c => c.short === formData.collateralCoin)
        .amount_usd > this.amountCollateralUsd;
  }

  setLoanOption = (
    interest,
    monthlyPayment,
    amountCollateralUsd,
    amountCollateralCrypto,
    loanToValue
  ) => {
    const { actions } = this.props;

    actions.updateFormFields({
      interest,
      monthlyPayment,
      amountCollateralCrypto,
      amountCollateralUsd,
      ltv: loanToValue,
    });
    userBehaviorUtil.loanLTV(loanToValue);
    actions.navigateTo("BorrowLoanTerm");
  };

  handleDepositCalculation = () => {
    const { formData, walletSummary } = this.props;
    const coin = walletSummary.coins.find(
      c => c.short === formData.collateralCoin
    ) || { amount: 0 };
    const value = this.amountCollateralCrypto - coin.amount;
    return formatter.crypto(value);
  };

  render = () => {
    const { actions, ltv, formData } = this.props;
    const style = LoanInterestCardStyle();
    // const theme = getTheme();
    return (
      <Card
        onPress={
          this.isAllowed
            ? () =>
                this.setLoanOption(
                  ltv.interest,
                  this.monthlyPayment,
                  this.amountCollateralUsd,
                  this.amountCollateralCrypto,
                  this.loanToValue
                )
            : null
        }
        color={this.isAllowed ? null : style.cardStyle.color}
        padding="15 15 15 15"
        margin="5 0 5 0"
        // opacity={isAllowed ? 1 : 0.4}
      >
        <View style={style.textContainer}>
          <View style={{ opacity: this.isAllowed ? 1 : 0.4 }}>
            <CelText
              weight={"300"}
              type={"H6"}
              margin={"0 0 4 0"}
            >{`$${formatter.round(this.monthlyPayment)} per month`}</CelText>
            <CelText
              weight={"600"}
              type={"H3"}
              margin={"0 0 4 0"}
            >{`${this.interest}% APR`}</CelText>
            <CelText weight={"300"} type={"H6"}>{`Locking ${formatter.crypto(
              this.amountCollateralCrypto
            )} ${formData.collateralCoin} as collateral`}</CelText>
          </View>
          {!this.isAllowed ? (
            <View>
              <Separator size={2} margin={"15 0 10 0"} />
              <View>
                <CelText weight={"300"} align="left">
                  Additional
                  <CelText weight={"500"} align="left">
                    {` ${this.handleDepositCalculation()}${
                      formData.collateralCoin
                    } `}
                    <CelText weight={"300"} align="left">
                      required
                    </CelText>
                  </CelText>
                </CelText>
                <TouchableOpacity
                  onPress={() =>
                    actions.navigateTo("Deposit", {
                      coin: formData.collateralCoin,
                    })
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                  >
                    <Icon
                      fill={STYLES.COLORS.CELSIUS_BLUE}
                      width="13"
                      height="13"
                      name="CirclePlus"
                    />
                    <CelText
                      margin={"0 0 0 5"}
                      color={STYLES.COLORS.CELSIUS_BLUE}
                    >
                      Deposit more
                    </CelText>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
      </Card>
    );
  };
}

export default LoanInterestCard;
