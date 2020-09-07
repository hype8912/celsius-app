import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import * as appActions from "../../../redux/actions";
import BorrowCalculatorStyle from "./BorrowCalculator.styles";
import CelText from "../../atoms/CelText/CelText";
import formatter from "../../../utils/formatter";
import Separator from "../../atoms/Separator/Separator";
import CelInput from "../../atoms/CelInput/CelInput";
import Card from "../../atoms/Card/Card";
import HorizontalSlider from "../../atoms/HorizontalSlider/HorizontalSlider";
import Icon from "../../atoms/Icon/Icon";
import { KYC_STATUSES } from "../../../constants/DATA";
import SimpleSelect from "../../molecules/SimpleSelect/SimpleSelect";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

let timeout;

@connect(
  state => ({
    ltv: state.loans.ltvs,
    theme: state.user.appSettings.theme,
    formData: state.forms.formData,
    currencies: state.currencies.rates,
    loanCompliance: state.compliance.loan,
    minimumLoanAmount: state.generalData.minimumLoanAmount,
    walletSummary: state.wallet.summary,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
    loyaltyInfo: state.loyalty.loyaltyInfo,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BorrowCalculator extends Component {
  static propTypes = {
    purpose: PropTypes.string,
    loanParams: PropTypes.instanceOf(Object),
  };

  constructor(props) {
    super(props);

    const { currencies, loanCompliance, ltv } = props;

    const coinSelectItems = currencies
      .filter(c => loanCompliance.collateral_coins.includes(c.short))
      .map(c => ({
        label: `${c.displayName} (${c.short})`,
        value: c.short,
      }));

    this.state = {
      coinSelectItems,
      loanParams: {},
      loanParamsProps: this.props.loanParams,
    };

    this.sliderItems = [
      { value: 6, label: <CelText>6M</CelText> },
      { value: 12, label: <CelText>1Y</CelText> },
      { value: 24, label: <CelText>2Y</CelText> },
      { value: 36, label: <CelText>3Y</CelText> },
    ];

    props.actions.initForm({
      coin: "BTC",
      termOfLoan: 6,
      amount: 0,
      ltv: ltv[0],
    });

    this.style = BorrowCalculatorStyle();
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.getLoyaltyInfo();
    this.updateSliderItems();
  }

  componentDidUpdate(prevProps) {
    const { formData } = this.props;

    if (!_.isEqual(formData, prevProps.formData)) {
      this.updateSliderItems();
    }
  }

  getThemeColors = () => {
    return {
      loanCard: getColor(COLOR_KEYS.HEADER),
      amountCard: getColor(COLOR_KEYS.CARDS),
      iconColor: getColor(COLOR_KEYS.HEADLINE),
    };
  };

  updateSliderItems = () => {
    const { themeModal } = this.props;

    this.sliderItems = [
      {
        value: 6,
        label: <CelText theme={themeModal}>6M</CelText>,
      },
      {
        value: 12,
        label: <CelText theme={themeModal}>1Y</CelText>,
      },
      {
        value: 24,
        label: <CelText theme={themeModal}>2Y</CelText>,
      },
      {
        value: 36,
        label: <CelText theme={themeModal}>3Y</CelText>,
      },
    ];
  };

  changeAmount = (field, value) => {
    const { actions, minimumLoanAmount } = this.props;

    if (timeout) clearTimeout(timeout);
    if (Number(value) < Number(minimumLoanAmount)) {
      timeout = setTimeout(() => {
        actions.showMessage(
          "warning",
          `Minimum amount for a loan is ${formatter.fiat(
            minimumLoanAmount,
            "USD"
          )}`
        );
      }, 3000);
    }
    actions.updateFormField(field, value);
  };

  renderInterestRatesCard = () => {
    const style = BorrowCalculatorStyle();
    const { loanParams, formData } = this.props;

    let numberOfDigits;

    if (loanParams.monthlyInterest && loanParams.totalInterest) {
      numberOfDigits = Math.max(
        loanParams.monthlyInterest.toNumber().length,
        loanParams.totalInterest.toNumber().length
      );
    }

    const INTEREST_DATA = [
      {
        apr: formatter.percentageDisplay(formData.ltv.interest),
        monthly: formatter.fiat(loanParams.monthlyInterest, "USD"),
        total: formatter.fiat(loanParams.totalInterest, "USD"),
        type: " USD, BTC, ETH or Stablecoins",
        color: getColor(COLOR_KEYS.BACKGROUND),
        textColor: getColor(COLOR_KEYS.PARAGRAPH),
      },
      {
        apr: formatter.percentageDisplay(loanParams.loyaltyApr),
        monthly: formatter.fiat(loanParams.monthlyInCEL, "USD"),
        total: formatter.fiat(loanParams.totalInCEL, "USD"),
        type: "CEL",
        color: getColor(COLOR_KEYS.PRIMARY_BUTTON),
        textColor: getColor(COLOR_KEYS.WHITE),
      },
    ];
    const textType = numberOfDigits > 8 ? "H6" : "H5";

    return INTEREST_DATA.map(num => (
      <View
        style={[
          style.interestCardWrapper,
          { backgroundColor: num.color, marginHorizontal: 20 },
        ]}
      >
        <View style={style.interestCardTitle}>
          <CelText type={"H6"} align={"center"} color={num.textColor}>
            Pay interest with {num.type}
          </CelText>
        </View>
        <View style={style.interestCardItems}>
          <View style={style.interestCardItem}>
            <CelText
              type={textType}
              weight={"bold"}
              align={"center"}
              color={num.textColor}
            >
              {num.apr}
            </CelText>
            <CelText type={"H6"} align={"center"} color={num.textColor}>
              APR
            </CelText>
          </View>
          <View style={style.interestCardItem}>
            <CelText
              type={textType}
              weight={"bold"}
              align={"center"}
              color={num.textColor}
            >
              {num.monthly}
            </CelText>
            <CelText type={"H6"} align={"center"} color={num.textColor}>
              Per Month
            </CelText>
          </View>
          <View style={style.interestCardItem}>
            <CelText
              type={textType}
              weight={"bold"}
              align={"center"}
              color={num.textColor}
            >
              {num.total}
            </CelText>
            <CelText type={"H6"} align={"center"} color={num.textColor}>
              Total
            </CelText>
          </View>
        </View>
      </View>
    ));
  };

  render() {
    const { coinSelectItems } = this.state;
    const {
      actions,
      formData,
      ltv,
      theme,
      themeModal,
      minimumLoanAmount,
      loanParams,
    } = this.props;

    const style = BorrowCalculatorStyle(themeModal || theme);
    if (!formData.ltv) return null;

    const themeColors = this.getThemeColors();

    const sortedLtv = ltv
      .sort((a, b) => a.interest > b.interest)
      .filter(c => c.coin === formData.coin);

    return (
      <View style={style.container}>
        <CelInput
          rightText="USD"
          field={"amount"}
          type={"number"}
          placeholder={`${formatter.fiat(minimumLoanAmount, "USD", {
            precision: 0,
          })} min`}
          keyboardType={"numeric"}
          value={formData.amount}
          onChange={this.changeAmount}
          theme={themeModal}
        />
        <Separator margin={"0 0 10 0"} />
        <View>
          <CelText type="H4" align={"center"} margin={"15 0 20 0"}>
            Choose a coin as collateral
          </CelText>
          <Icon
            name={`Icon${formData.coin}`}
            width="64"
            height="64"
            fill={themeColors.iconColor}
          />
          <View style={style.selectWrapper}>
            <SimpleSelect
              items={coinSelectItems}
              field="coin"
              displayValue={formData.coin}
              value={formData.coin}
              updateFormField={actions.updateFormField}
              placeholder="Choose a coin"
            />
          </View>
        </View>
        <Card
          size={"full"}
          margin="20 0 20 0"
          padding="20 0 20 0"
          color={themeColors.amountCard}
        >
          <CelText
            align={"center"}
            weight="600"
            style={
              !themeModal
                ? style.interestCardText
                : { color: getColor(COLOR_KEYS.CIRCLE_ICON_FOREGROUND) }
            }
            type={"H2"}
          >
            {formatter.crypto(loanParams.collateralNeeded || 0, formData.coin)}
          </CelText>
          <CelText align={"center"} weight="300" type={"H6"}>
            Collateral needed
          </CelText>
        </Card>
        <CelText
          align={"center"}
          type={"H5"}
          margin={"4 0 20 0"}
          weight={"300"}
          theme={themeModal}
        >
          The amount of collateral needed is based on your annual interest rate.
        </CelText>
        <Card theme={themeModal}>
          <CelText
            align={"center"}
            type={"H4"}
            margin={"4 0 5 0"}
            weight={"300"}
            theme={themeModal}
          >
            Choose your Loan-to-Value percentage
          </CelText>
          <View style={style.ltvWrapper}>
            {sortedLtv &&
              sortedLtv.map(c => (
                <Card
                  size={"thirdExtra"}
                  margin="20 5 20 5"
                  noBorder
                  theme={themeModal}
                  key={c.interest}
                  styles={
                    formData.ltv.interest === c.interest
                      ? style.selectedCardStyle
                      : style.cardStyle
                  }
                  onPress={() => {
                    actions.updateFormField("ltv", c);
                  }}
                >
                  <CelText
                    align={"center"}
                    weight="bold"
                    type={"H6"}
                    style={
                      formData.ltv.interest === c.interest
                        ? style.selectedTextStyle
                        : style.percentageTextStyle
                    }
                  >
                    {formatter.percentageDisplay(c.percent, false, 0)}
                  </CelText>
                </Card>
              ))}
          </View>
          <Separator />
          <CelText
            type={"H4"}
            margin={"20 10 20 10"}
            weight={"300"}
            theme={themeModal}
          >
            Choose the length of your loan
          </CelText>
          <HorizontalSlider
            items={this.sliderItems}
            field="termOfLoan"
            value={formData.termOfLoan}
            updateFormField={actions.updateFormField}
          />

          <Separator margin={"20 0 0 0"} />

          <CelText type="H4" align={"left"} margin={"15 0 20 0"}>
            Interest rates
          </CelText>

          {this.renderInterestRatesCard()}
        </Card>
      </View>
    );
  }
}

export default BorrowCalculator;
