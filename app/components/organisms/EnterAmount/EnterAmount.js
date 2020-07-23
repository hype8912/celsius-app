import React, { Component } from "react";
import { View } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BigNumber from "bignumber.js";

import * as appActions from "../../../redux/actions";
import EnterAmountStyle from "./EnterAmount.styles";
import CelNumpad from "../../molecules/CelNumpad/CelNumpad";
import { KEYPAD_PURPOSES } from "../../../constants/UI";
import CoinSwitch from "../../atoms/CoinSwitch/CoinSwitch";
import STYLES from "../../../constants/STYLES";
import formatter from "../../../utils/formatter";
import cryptoUtil from "../../../utils/crypto-util";
import CelButton from "../../atoms/CelButton/CelButton";

@connect(
  state => ({
    formData: state.forms.formData,
    walletSummary: state.wallet.summary,
    currencies: state.currencies.rates,
    withdrawCompliance: state.compliance.withdraw,
    keypadOpen: state.ui.isKeypadOpen,
    currencyRatesShort: state.currencies.currencyRatesShort,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class EnterAmount extends Component {
  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    const { currencies, withdrawCompliance, walletSummary } = this.props;
    const coinSelectItems =
      currencies &&
      currencies
        .filter(c => withdrawCompliance.coins.includes(c.short))
        .filter(c => {
          const walletCoin = walletSummary.coins.find(
            wCoin => wCoin.short === c.short.toUpperCase()
          );
          const balanceUsd = walletCoin ? walletCoin.amount_usd.toNumber() : 0;

          return balanceUsd > 0;
        })
        .map(c => ({ label: `${c.displayName} (${c.short})`, value: c.short }));
    this.state = {
      coinSelectItems,
    };
  }

  handleCoinChange = (field, value) => {
    const { actions } = this.props;
    actions.updateFormFields({
      [field]: value,
      amountUsd: undefined,
      amountCrypto: undefined,
    });
  };

  getUsdValue = amountUsd =>
    formatter.removeDecimalZeros(formatter.floor10(amountUsd, -2) || "");

  handleAmountChange = (newValue, predefined = { label: "" }) => {
    const { formData, currencyRatesShort, actions, walletSummary } = this.props;

    const coinRate = currencyRatesShort.btc;

    const splitedValue = newValue.toString().split(".");

    if (splitedValue && splitedValue.length > 2) return;

    const {
      amount_usd: balanceUsd,
      amount: balanceCrypto,
    } = walletSummary.coins.find(c => c.short === "BTC");

    let amountCrypto;
    let amountUsd;

    if (formData.isUsd) {
      // if no predefined label is forwarded and the value is in usd
      if (predefined.label.length === 0) {
        amountUsd = formatter.setCurrencyDecimals(newValue, "USD");
        if (amountUsd === "" || amountUsd === ".") {
          amountCrypto = new BigNumber(0).dividedBy(coinRate);
        } else {
          amountCrypto = new BigNumber(amountUsd).dividedBy(coinRate);
        }
      } else {
        amountUsd = predefined.label === "ALL" ? balanceUsd : newValue;
        amountUsd = this.getUsdValue(amountUsd);
        amountCrypto =
          predefined.label === "ALL"
            ? balanceCrypto
            : new BigNumber(amountUsd).dividedBy(coinRate);
        amountCrypto = formatter.removeDecimalZeros(amountCrypto);
      }
      // if no predefined label is forwarded and the value is no in usd (crypto)
    } else if (predefined.label.length === 0) {
      if (newValue === ".") {
        amountCrypto = formatter.setCurrencyDecimals(0);
      } else {
        amountCrypto = formatter.setCurrencyDecimals(newValue);
      }
      amountUsd = Number(amountCrypto) * coinRate;
      amountUsd = this.getUsdValue(amountUsd);
      if (amountUsd === "0") amountUsd = "";
    } else {
      amountCrypto =
        predefined.label === "ALL"
          ? new BigNumber(balanceCrypto).toFixed(8)
          : newValue;
      amountCrypto = new BigNumber(
        formatter.removeDecimalZeros(amountCrypto)
      ).toFixed(8);
      amountUsd = predefined.label === "ALL" ? balanceUsd : predefined.value;
      amountUsd = this.getUsdValue(amountUsd);
    }
    // amountCrypto = amountCrypto.toString();

    // Change value '.' to '0.'
    if (amountUsd[0] === ".") amountUsd = `0${amountUsd}`;
    // if the crypto amount is eg. 01 the value will be 1, 00 -> 0
    if (amountUsd.length > 1 && amountUsd[0] === "0" && amountUsd[1] !== ".") {
      amountUsd = amountUsd[1];
    }

    // if crypto amount is undefined, set it to empty string
    // if (amountCrypto && !amountCrypto.toNumber()) amountCrypto = "";
    // if (!new BigNumber(amountCrypto).toNumber()) {
    //   amountCrypto = "0."
    // }
    // Change value '.' to '0.'
    // console.log("stringifiedAmountCrypto", stringifiedAmountCrypto);
    if (amountCrypto[0] === ".") {
      amountCrypto = `0${amountCrypto}}`;
    }
    // if the crypto amount is eg. 01 the value will be 1, 00 -> 0
    if (
      amountCrypto.length > 1 &&
      amountCrypto[0] === "0" &&
      amountCrypto[1] !== "."
    ) {
      amountCrypto = amountCrypto[1];
    }
    if (cryptoUtil.isGreaterThan(amountCrypto, balanceCrypto.toFixed(8))) {
      return actions.showMessage("warning", "Insufficient funds!");
    }

    this.setState({
      activePeriod: predefined,
      balance: balanceCrypto.toFixed(8),
    });

    actions.updateFormFields({
      amountCrypto: amountCrypto.toString(),
      amountUsd,
    });
  };

  render() {
    const { formData, actions, keypadOpen, walletSummary } = this.props;
    const { coinSelectItems } = this.state;
    const style = EnterAmountStyle();
    const {
      // amount_usd: balanceUsd,
      amount: balanceCrypto,
    } = walletSummary.coins.find(c => c.short === "BTC");

    return (
      <View style={style.container}>
        <View>
          <CoinSwitch
            updateFormField={actions.updateFormField}
            onAmountPress={actions.toggleKeypad}
            amountUsd={formData.amountUsd}
            amountCrypto={formData.amountCrypto}
            isUsd={formData.isUsd}
            coin={"BTC"}
            amountColor={
              keypadOpen ? STYLES.COLORS.CELSIUS_BLUE : STYLES.COLORS.DARK_GRAY
            }
            navigateTo={actions.navigateTo}
            availableCoins={coinSelectItems}
            onChange={this.handleCoinChange}
            balance={balanceCrypto.toNumber()}
          />
        </View>
        <View>
          <CelButton
            style={{ position: "absolute", right: 20, top: 20 }}
            margin={"20 0 0 0"}
            iconRight={"IconArrowRight"}
            iconRightHeight={"20"}
            iconRightColor={"white"}
          >
            Next
          </CelButton>
        </View>
        <CelNumpad
          field={formData.isUsd ? "amountUsd" : "amountCrypto"}
          value={
            formData.isUsd ? formData.amountUsd : formData.amountCrypto || ""
          }
          toggleKeypad={() => ({})}
          updateFormField={actions.updateFormField}
          setKeypadInput={actions.setKeypadInput}
          onPress={this.handleAmountChange}
          purpose={KEYPAD_PURPOSES.WITHDRAW}
          autofocus={false}
        />
      </View>
    );
  }
}

export default EnterAmount;
