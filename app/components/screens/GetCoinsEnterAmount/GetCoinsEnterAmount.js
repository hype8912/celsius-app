import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import GetCoinsEnterAmountStyle from "./GetCoinsEnterAmount.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import STYLES from "../../../constants/STYLES";
import CoinPicker from "../../molecules/CoinPicker/CoinPicker";
import CelNumpad from "../../molecules/CelNumpad/CelNumpad";
import { KEYPAD_PURPOSES, MODALS } from "../../../constants/UI";
import formatter from "../../../utils/formatter";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import GetCoinsConfirmModal from "../../modals/GetCoinsConfirmModal/GetCoinsConfirmModal";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import { SIMPLEX_FIAT_CURRENCIES } from "../../../constants/DATA";
import Spinner from "../../atoms/Spinner/Spinner";
import mixpanelAnalytics from "../../../utils/mixpanel-analytics";
import getCoinsUtil from "../../../utils/get-coins-util";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

@connect(
  state => ({
    formData: state.forms.formData,
    keypadOpen: state.ui.isKeypadOpen,
    currencyRatesShort: state.currencies.currencyRatesShort,
    buyCoinsSettings: state.generalData.buyCoinsSettings,
    depositCompliance: state.compliance.deposit,
    simplexCompliance: state.compliance.simplex,
    currencies: state.currencies.rates,
    simplexData: state.buyCoins.simplexData,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class GetCoinsEnterAmount extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Buy Coins",
    right: "profile",
  });

  constructor(props) {
    super(props);
    const { currencies, simplexCompliance, actions, formData } = this.props;

    const availableCryptoCoins = simplexCompliance
      ? currencies
          .filter(c => simplexCompliance.coins.includes(c.short))
          .map(c => ({
            label: `${formatter.capitalize(c.name)} (${c.short})`,
            value: c.short,
          }))
      : [];

    actions.updateFormFields({
      amountFiat: "",
      amountCrypto: "",
      isFiat: false,
      fiatCoin: formData.fiatCoin || "USD",
      cryptoCoin: formData.cryptoCoin || simplexCompliance.coins[0],
    });

    this.state = {
      availableCryptoCoins,
    };
  }

  handleNextStep = () => {
    const { actions, formData, currencyRatesShort } = this.props;

    const cryptoProp = formData.cryptoCoin.toLowerCase();
    const amountInUsd =
      currencyRatesShort[cryptoProp] * Number(formData.amountCrypto);

    actions.updateFormField("amountInUsd", amountInUsd);
    mixpanelAnalytics.enteredBuyCoinsAmount(
      "CARD",
      formData.cryptoCoin,
      formData.fiatCoin,
      formData.amountInUsd,
      formData.amountFiat,
      formData.amountCrypto
    );
    actions.openModal(MODALS.GET_COINS_CONFIRM_MODAL);
  };

  setCryptoAmount = simplexCryptoAmount =>
    Math.max(simplexCryptoAmount, 0).toString();

  handleAmountChange = async newValue => {
    const { formData, actions } = this.props;
    const splitedValue = newValue.toString().split(".");

    if (splitedValue && splitedValue.length > 2) return;

    let amountFiat = "";
    let amountCrypto = "";

    if (formData.isFiat) {
      // All fiats have decimals like USD
      amountFiat = formatter.setCurrencyDecimals(newValue, "USD");
    } else {
      amountCrypto = formatter.setCurrencyDecimals(newValue);
    }

    // Change value '.' to '0.'
    if (amountFiat[0] === ".") amountFiat = `0${amountFiat}`;
    // if the crypto amount is eg. 01 the value will be 1, 00 -> 0
    if (
      amountFiat.length > 1 &&
      amountFiat[0] === "0" &&
      amountFiat[1] !== "."
    ) {
      amountFiat = amountFiat[1];
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
      amountFiat,
      amountCrypto: amountCrypto.toString(),
    });

    if (getCoinsUtil.isAmountInScope()) {
      await actions.getSimplexQuote();

      const { simplexData } = this.props;

      if (formData.isFiat) {
        actions.updateFormField(
          "amountCrypto",
          this.setCryptoAmount(
            simplexData &&
              simplexData.digital_money &&
              simplexData.digital_money.amount
          )
        );
      } else {
        actions.updateFormField(
          "amountFiat",
          simplexData &&
            simplexData.fiat_money &&
            simplexData.fiat_money.total_amount.toString()
        );
      }
    } else {
      this.handleEnterAmountErrors();

      if (formData.isFiat) {
        actions.updateFormField("amountCrypto", "0");
      } else {
        actions.updateFormField("amountFiat", "0");
      }
    }
  };

  handleFiatCoinSelect = async (field, value) => {
    const { actions } = this.props;
    actions.updateFormFields({
      fiatCoin: value,
      amountFiat: "0",
      amountCrypto: "0",
      isFiat: true,
    });
  };

  handleCryptoCoinSelect = async (field, value) => {
    const { actions } = this.props;
    actions.updateFormFields({
      cryptoCoin: value,
      amountCrypto: "0",
      amountFiat: "0",
      isFiat: false,
    });
  };

  handleEnterAmountErrors = () => {
    const { formData, actions } = this.props;

    const limits = formData.isFiat
      ? getCoinsUtil.getBuyLimitsPerFiatCurrency(formData.fiatCoin)
      : getCoinsUtil.getBuyLimitsPerCrypto(formData.cryptoCoin);

    let minDisplay;
    let maxDisplay;

    if (formData.isFiat) {
      minDisplay = formatter.fiat(limits.min, formData.fiatCoin);
      maxDisplay = formatter.fiat(limits.max, formData.fiatCoin);
    } else {
      minDisplay = formatter.crypto(limits.min, formData.cryptoCoin);
      maxDisplay = formatter.crypto(limits.max, formData.cryptoCoin);
    }

    actions.showMessage(
      "warning",
      `Transaction amount out of limits. Please enter a value between ${minDisplay} and ${maxDisplay}`
    );
  };

  handleAmountTextStyle = type => {
    const { formData } = this.props;
    const isZero = formData.isFiat
      ? !Number(formData.amountFiat)
      : !Number(formData.amountCrypto);

    if (!isZero && !getCoinsUtil.isAmountInScope()) {
      return {
        color: STYLES.COLORS.RED,
      };
    }

    if (
      (!formData.isFiat && type === "crypto") ||
      (formData.isFiat && type === "fiat")
    ) {
      return { color: STYLES.COLORS.WHITE };
    }

    const style = GetCoinsEnterAmountStyle();
    return style.text;
  };

  handleAmountBackColor = type => {
    const { formData } = this.props;

    if (
      (!formData.isFiat && type === "crypto") ||
      (formData.isFiat && type === "fiat")
    ) {
      return {
        backgroundColor: STYLES.COLORS.CELSIUS_BLUE,
      };
    }

    return null;
  };

  render() {
    const { actions, formData, callInProgress, buyCoinsSettings } = this.props;
    const style = GetCoinsEnterAmountStyle();
    const { availableCryptoCoins } = this.state;
    const isFetchingQuotes = apiUtil.areCallsInProgress(
      [API.GET_SIMPLEX_QUOTE],
      callInProgress
    );

    const activeTextStyle = [style.text, { color: STYLES.COLORS.WHITE }];

    if (!buyCoinsSettings.limit_per_crypto_currency) {
      return <LoadingScreen />;
    }
    return (
      <RegularLayout fabType={"hide"} padding={"0 0 0 0"}>
        <View style={[style.fiatSection, this.handleAmountBackColor("fiat")]}>
          <View style={style.amounts}>
            <CelText
              align={"center"}
              margin={"0 0 10 0"}
              style={formData.isFiat ? activeTextStyle : style.text}
            >
              PAY WITH
            </CelText>
            <CoinPicker
              type={"basic"}
              updateFormField={actions.updateFormField}
              onChange={this.handleFiatCoinSelect}
              coin={formData.fiatCoin}
              field="fiatCoin"
              defaultSelected={formData.fiatCoin || "USD"}
              availableCoins={SIMPLEX_FIAT_CURRENCIES}
              navigateTo={actions.navigateTo}
            />
          </View>
          {isFetchingQuotes && !formData.isFiat ? (
            <View style={{ marginVertical: 15 }}>
              <Spinner size={30} color={style.text.color} />
            </View>
          ) : (
            <TouchableOpacity
              style={{ marginVertical: 10 }}
              onPress={() => {
                actions.updateFormFields({
                  isFiat: true,
                });
                actions.toggleKeypad(true);
              }}
            >
              <CelText style={this.handleAmountTextStyle("fiat")} type={"H2"}>
                {formatter.fiat(formData.amountFiat, formData.fiatCoin)}
              </CelText>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={[style.cryptoSection, this.handleAmountBackColor("crypto")]}
        >
          <View style={style.amounts}>
            <CelText
              align={"center"}
              margin={"0 0 10 0"}
              style={!formData.isFiat ? activeTextStyle : style.text}
            >
              RECEIVE
            </CelText>
            <CoinPicker
              type={"basic"}
              updateFormField={actions.updateFormField}
              onChange={this.handleCryptoCoinSelect}
              coin={formData.cryptoCoin}
              field="cryptoCoin"
              defaultSelected={formData.cryptoCoin || "ETH"}
              availableCoins={availableCryptoCoins}
              navigateTo={actions.navigateTo}
            />
          </View>
          {isFetchingQuotes && formData.isFiat ? (
            <View style={{ marginVertical: 15 }}>
              <Spinner size={30} color={style.text.color} />
            </View>
          ) : (
            <TouchableOpacity
              style={{ marginVertical: 10 }}
              onPress={() => {
                actions.updateFormFields({
                  isFiat: false,
                });
                actions.toggleKeypad(true);
              }}
            >
              <CelText style={this.handleAmountTextStyle("crypto")} type={"H2"}>
                {" "}
                {formatter.crypto(formData.amountCrypto, formData.cryptoCoin)}
              </CelText>
            </TouchableOpacity>
          )}
        </View>
        <CelButton
          margin="30 0 0 0"
          disabled={
            !(
              formData.amountFiat &&
              getCoinsUtil.isFiatAmountInScope(
                formData.amountFiat,
                formData.fiatCoin
              )
            )
          }
          onPress={this.handleNextStep}
          iconRight={
            formData.amountFiat && Number(formData.amountFiat) > 0
              ? "IconArrowRight"
              : ""
          }
        >
          {formData.amountFiat && Number(formData.amountFiat) > 0
            ? "Buy Coins"
            : "Enter amount above"}
        </CelButton>
        <CelNumpad
          field={formData.isFiat ? "amountFiat" : "amountCrypto"}
          value={formData.isFiat ? formData.amountFiat : formData.amountCrypto}
          toggleKeypad={actions.toggleKeypad}
          updateFormField={actions.updateFormField}
          setKeypadInput={actions.setKeypadInput}
          onPress={this.handleAmountChange}
          purpose={KEYPAD_PURPOSES.BUY_COINS}
          autofocus
        />
        <GetCoinsConfirmModal />
      </RegularLayout>
    );
  }
}

export default GetCoinsEnterAmount;
