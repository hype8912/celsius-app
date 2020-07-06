import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import { KEYPAD_PURPOSES, THEMES } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import formatter from "../../../utils/formatter";
import Separator from "../../atoms/Separator/Separator";
import STYLES from "../../../constants/STYLES";
import CoinSwitch from "../../atoms/CoinSwitch/CoinSwitch";
import SimpleSelect from "../../molecules/SimpleSelect/SimpleSelect";
import InterestCalculatorStyle from "./InterestCalculator.styles";
import CelNumpad from "../../molecules/CelNumpad/CelNumpad";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

@connect(
  state => ({
    interestRates: state.generalData.interestRates,
    formData: state.forms.formData,
    currencies: state.currencies.rates,
    interestCompliance: state.compliance.interest,
    currencyRatesShort: state.currencies.currencyRatesShort,
    keypadOpen: state.ui.isKeypadOpen,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class InterestCalculator extends Component {
  static propTypes = {
    defaultCoin: PropTypes.string,
    showCard: PropTypes.bool,
    theme: PropTypes.oneOf(Object.values(THEMES)),
  };
  static defaultProps = { defaultCoin: "BTC", showCard: false };

  constructor(props) {
    super(props);
    const { defaultCoin, currencies, interestCompliance } = this.props;

    const coinSelectItems = currencies
      .filter(c => interestCompliance.coins.includes(c.short))
      .map(c => ({ label: `${c.displayName}  (${c.short})`, value: c.short }));

    this.state = {
      coinSelectItems,
      activePeriod: "",
      earnInterestIn: false,
    };
    props.actions.updateFormField("coin", defaultCoin);
  }

  getUsdValue = amountUsd =>
    formatter.removeDecimalZeros(formatter.floor10(amountUsd, -2) || "");

  handleAmountChange = newValue => {
    const { formData, currencyRatesShort, actions } = this.props;
    const coinRate = currencyRatesShort[formData.coin.toLowerCase()];

    const splitedValue = newValue.toString().split(".");

    if (splitedValue && splitedValue.length > 2) return;

    let amountCrypto;
    let amountUsd;

    if (formData.isUsd) {
      amountUsd = formatter.setCurrencyDecimals(newValue, "USD");
      amountCrypto = amountUsd / coinRate;
    } else {
      amountCrypto = formatter.setCurrencyDecimals(newValue);
      amountUsd = amountCrypto * coinRate;
      amountUsd = this.getUsdValue(amountUsd);
      if (amountUsd === "0") amountUsd = "";
    }

    // Change value '.' to '0.'
    if (amountUsd[0] === ".") amountUsd = `0${amountUsd}`;
    // if the crypto amount is eg. 01 the value will be 1, 00 -> 0
    if (amountUsd.length > 1 && amountUsd[0] === "0" && amountUsd[1] !== ".") {
      amountUsd = amountUsd[1];
    }

    // if crypto amount is undefined, set it to empty string
    if (!amountCrypto) amountCrypto = "";
    // Change value '.' to '0.'
    if (amountCrypto[0] === ".") amountCrypto = `0${amountCrypto}`;
    // if the crypto amount is eg. 01 the value will be 1, 00 -> 0
    if (
      amountCrypto.length > 1 &&
      amountCrypto[0] === "0" &&
      amountCrypto[1] !== "."
    ) {
      amountCrypto = amountCrypto[1];
    }

    actions.updateFormFields({
      amountCrypto: amountCrypto.toString(),
      amountUsd,
    });
  };

  handleCoinChange = (field, value) => {
    const { actions } = this.props;

    actions.updateFormFields({
      [field]: value,
      amountUsd: undefined,
      amountCrypto: undefined,
    });
  };

  renderInterestOptions = () => {
    const { earnInterestIn } = this.state;
    const { formData, interestRates, currencyRatesShort, theme } = this.props;

    const style = InterestCalculatorStyle(theme);

    const selectedCoin = formData.coin || "BTC";

    const interestRateForCoin =
      interestRates && formData.coin && interestRates[formData.coin]
        ? interestRates[formData.coin]
        : { rate: 0, cel_rate: 0 };
    const weeklyInterest =
      (formData.amountCrypto *
        (earnInterestIn && formData.coin !== "CEL"
          ? interestRateForCoin.compound_cel_rate
          : interestRateForCoin.rate)) /
      52;

    const yearlyInterest =
      formData.amountCrypto *
      (earnInterestIn && formData.coin !== "CEL"
        ? interestRateForCoin.compound_cel_rate
        : interestRateForCoin.compound_rate);
    const noCelCardStyle = [style.earningCard];
    const celCardStyle = [style.earningCard];

    const noCelTextColor = !earnInterestIn
      ? STYLES.COLORS.WHITE
      : getColor(COLOR_KEYS.PARAGRAPH);
    const celTextColor = earnInterestIn
      ? STYLES.COLORS.WHITE
      : getColor(COLOR_KEYS.PARAGRAPH);

    if (!earnInterestIn) {
      noCelCardStyle.push(style.selectedCard);
    } else {
      celCardStyle.push(style.selectedCard);
    }

    const interestInCelPerWeek =
      (weeklyInterest * currencyRatesShort[selectedCoin.toLowerCase()]) /
      currencyRatesShort.cel;
    const interestInCelPerYear =
      (yearlyInterest * currencyRatesShort[selectedCoin.toLowerCase()]) /
      currencyRatesShort.cel;

    return (
      <View style={style.showInterestWrapper}>
        {formData.coin !== "CEL" && (
          <CelText align={"center"} margin="20 0 5 0">
            Choose how you want to earn interest.
          </CelText>
        )}

        <View style={{ flexDirection: "row" }}>
          <Card
            noBorder
            styles={noCelCardStyle}
            margin="20 10 20 20"
            onPress={
              formData.coin !== "CEL" &&
              (() => {
                this.setState({ earnInterestIn: false });
              })
            }
          >
            <CelText color={noCelTextColor} align={"center"} weight="bold">
              {formatter.percentageDisplay(
                interestRateForCoin.compound_rate,
                true
              )}
              <CelText type="H4" weight="600" color={noCelTextColor}>
                %
              </CelText>
            </CelText>
            <CelText color={noCelTextColor} align={"center"}>
              Regular
            </CelText>
          </Card>
          {formData.coin !== "CEL" && (
            <Card
              noBorder
              styles={celCardStyle}
              margin="20 20 20 10"
              onPress={() => {
                this.setState({ earnInterestIn: true });
              }}
            >
              <CelText color={celTextColor} align={"center"} weight="bold">
                {formatter.percentageDisplay(
                  interestRateForCoin.compound_cel_rate,
                  true
                )}
                <CelText
                  type="H4"
                  align="center"
                  weight="bold"
                  color={celTextColor}
                >
                  %
                </CelText>
              </CelText>
              <CelText color={celTextColor} align={"center"}>
                Earn in CEL
              </CelText>
            </Card>
          )}
        </View>

        <Separator margin={"0 0 20 0"} />

        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginHorizontal: 20,
          }}
        >
          <Card color={getColor(COLOR_KEYS.BACKGROUND)} margin="0 20 0 20">
            <CelText align={"center"}>
              {formatter.usd(
                weeklyInterest * currencyRatesShort[selectedCoin.toLowerCase()]
              )}
            </CelText>
            <CelText align={"center"} weight="bold">
              {earnInterestIn === true
                ? formatter.crypto(interestInCelPerWeek, "CEL", {
                    precision: 2,
                  })
                : formatter.crypto(weeklyInterest, selectedCoin, {
                    precision: 2,
                  })}
            </CelText>
            <CelText type="H6" align={"center"}>
              Interest per week
            </CelText>
          </Card>
          <Card color={getColor(COLOR_KEYS.BACKGROUND)} margin="20 20 20 20">
            <CelText align={"center"}>
              {formatter.usd(
                yearlyInterest * currencyRatesShort[selectedCoin.toLowerCase()]
              )}
            </CelText>
            <CelText align={"center"} weight="bold">
              {earnInterestIn === true
                ? formatter.crypto(interestInCelPerYear, "CEL", {
                    precision: 2,
                  })
                : formatter.crypto(yearlyInterest, selectedCoin, {
                    precision: 2,
                  })}
            </CelText>
            <CelText type="H6" align={"center"}>
              Interest per year
            </CelText>
          </Card>
        </View>
      </View>
    );
  };

  render() {
    const { coinSelectItems } = this.state;
    const { actions, formData, keypadOpen, showCard, theme } = this.props;

    const selectedCoin = formData.coin || "BTC";

    const style = InterestCalculatorStyle(theme);
    const InterestOptions = this.renderInterestOptions;

    return (
      <RegularLayout>
        <View>
          <View style={style.selectWrapper}>
            <SimpleSelect
              theme={theme}
              items={coinSelectItems}
              field="coin"
              displayValue={selectedCoin}
              updateFormField={actions.updateFormField}
              onChange={this.handleCoinChange}
              placeholder="Choose a coin"
            />
          </View>

          <CoinSwitch
            updateFormField={actions.updateFormField}
            onAmountPress={actions.toggleKeypad}
            amountUsd={formData.amountUsd}
            amountCrypto={formData.amountCrypto}
            isUsd={formData.isUsd}
            noUsdDecimals
            coin={selectedCoin}
            theme={theme}
            amountColor={
              keypadOpen
                ? getColor(COLOR_KEYS.LINK)
                : getColor(COLOR_KEYS.HEADLINE)
            }
          />
        </View>

        {showCard ? (
          <View style={{ marginHorizontal: 20 }}>
            <Card>
              <InterestOptions />
            </Card>
          </View>
        ) : (
          <InterestOptions />
        )}

        <CelNumpad
          field={formData.isUsd ? "amountUsd" : "amountCrypto"}
          value={formData.isUsd ? formData.amountUsd : formData.amountCrypto}
          updateFormField={actions.updateFormField}
          setKeypadInput={actions.setKeypadInput}
          toggleKeypad={actions.toggleKeypad}
          onPress={this.handleAmountChange}
          purpose={KEYPAD_PURPOSES.INTEREST_CALCULATOR}
        />
      </RegularLayout>
    );
  }
}

export default InterestCalculator;
