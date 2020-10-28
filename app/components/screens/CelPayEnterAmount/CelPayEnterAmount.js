import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BigNumber from "bignumber.js";

import * as appActions from "../../../redux/actions";
import CelPayEnterAmountStyle from "./CelPayEnterAmount.styles";
import CelButton from "../../atoms/CelButton/CelButton";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import { CEL_PAY_TYPES, MODALS } from "../../../constants/UI";
import CoinSwitch from "../../atoms/CoinSwitch/CoinSwitch";
import BalanceView from "../../atoms/BalanceView/BalanceView";
import PredefinedAmounts from "../../organisms/PredefinedAmounts/PredefinedAmounts";
import { PREDEFINED_AMOUNTS } from "../../../constants/DATA";
import formatter from "../../../utils/formatter";
import celUtilityUtil from "../../../utils/cel-utility-util";
import LoseTierModal from "../../modals/LoseTierModal/LoseTierModal";
import CoinPicker from "../../molecules/CoinPicker/CoinPicker";
import mixpanelAnalytics from "../../../utils/mixpanel-analytics";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { getColor } from "../../../utils/styles-util";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    walletSummary: state.wallet.summary,
    celpayCompliance: state.compliance.celpay,
    currencyRatesShort: state.currencies.currencyRatesShort,
    currencies: state.currencies.rates,
    formData: state.forms.formData,
    withdrawalAddresses: state.wallet.withdrawalAddresses,
    loyaltyInfo: state.loyalty.loyaltyInfo,
    keypadOpen: state.ui.isKeypadOpen,
    celPaySettings: state.generalData.celPaySettings,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CelPayEnterAmount extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => {
    return {
      right: "profile",
      title: "Enter Amount",
    };
  };

  constructor(props) {
    super(props);
    const {
      currencies,
      celpayCompliance,
      formData,
      walletSummary,
      actions,
    } = this.props;
    const coinSelectItems =
      currencies &&
      currencies
        .filter(c => celpayCompliance.coins.includes(c.short))
        .filter(c => {
          const balanceUsd = walletSummary.coins.filter(
            coin => coin.short === c.short.toUpperCase()
          )[0].amount_usd;
          return balanceUsd.isGreaterThan(0);
        })
        .map(c => ({
          label: `${c.displayName}  (${c.short})`,
          value: c.short,
        }));

    this.setNavigationParams();

    actions.updateFormFields({
      amountUsd: "",
      amountCrypto: "",
    });

    this.state = {
      coinSelectItems,
      activePeriod: { label: "", value: "" },
    };

    if (!formData.coin) {
      props.actions.updateFormField(
        "coin",
        (coinSelectItems &&
          coinSelectItems.length > 0 &&
          coinSelectItems[0].value) ||
          ""
      );
    }
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.getLoyaltyInfo();
  }

  componentDidUpdate(prevProps) {
    const { formData } = this.props;

    if (prevProps.formData.friend !== formData.friend) {
      this.setNavigationParams();
    }
  }

  setNavigationParams() {
    const { formData, navigation } = this.props;
    const names =
      formData.friend && formData.friend.name
        ? formData.friend.name.split(" ")
        : undefined;
    const screenTitle = names
      ? `Send to ${names[0] ? names[0] : ""} ${
          !!names[1] && !!names[1][0] ? names[1][0] : ""
        }`
      : "CelPay";

    navigation.setParams({
      title: screenTitle,
      activePeriod: { label: "", value: "" },
    });
  }

  getButtonCopy = () => {
    const { formData } = this.props;

    if (formData.amountCrypto && formData.amountCrypto > 0) {
      return "Send";
    }
    return "Enter amount above";
  };

  // getUsdValue = amountUsd =>
  //   formatter.removeDecimalZeros(formatter.floor10(amountUsd, -2) || "");

  // handleAmountChange = (newValue, predefined = { label: "" }) => {
  //   const {
  //     formData,
  //     currencyRatesShort,
  //     actions,
  //     walletSummary,
  //     celPaySettings,
  //   } = this.props;
  //   const coinRate = currencyRatesShort[formData.coin.toLowerCase()];
  //   // const splitedValue = newValue.toString().split(".");
  //
  //   // if (splitedValue && splitedValue.length > 2) return;
  //
  //   const {
  //     amount_usd: balanceUsd,
  //     amount: balanceCrypto,
  //   } = walletSummary.coins.find(c => c.short === formData.coin.toUpperCase());
  //
  //   let amountCrypto;
  //   let amountUsd;
  //   amountCrypto = new BigNumber(formData.amountUsd).dividedBy(coinRate);
  //   console.log({ coinRate });
  //   if (formData.isUsd) {
  //     actions.updateFormField("amountCrypto", amountCrypto)
  //   }
    //
    // if (formData.isUsd) {
    //   // if no predefined label is forwarded and the value is in usd
    //   if (predefined.label.length === 0) {
    //     amountUsd = formatter.setCurrencyDecimals(newValue, "USD");
    //     if (amountUsd === "" || amountUsd === ".") {
    //       amountCrypto = new BigNumber(0).dividedBy(coinRate);
    //     } else {
    //       amountCrypto = new BigNumber(amountUsd).dividedBy(coinRate);
    //     }
    //   } else {
    //     amountUsd = predefined.label === "ALL" ? balanceUsd : newValue;
    //     amountUsd = this.getUsdValue(amountUsd);
    //     amountCrypto =
    //       predefined.label === "ALL"
    //         ? balanceCrypto
    //         : new BigNumber(amountUsd).dividedBy(coinRate);
    //     amountCrypto = formatter.removeDecimalZeros(amountCrypto);
    //   }
    //   // if no predefined label is forwarded and the value is no in usd (crypto)
    // } else if (predefined.label.length === 0) {
    //   if (newValue === ".") {
    //     amountCrypto = formatter.setCurrencyDecimals(0);
    //   } else {
    //     amountCrypto = formatter.setCurrencyDecimals(newValue);
    //   }
    //   amountUsd = Number(amountCrypto) * coinRate;
    //   amountUsd = this.getUsdValue(amountUsd);
    //   if (amountUsd === "0") amountUsd = "";
    // } else {
    //   amountCrypto =
    //     predefined.label === "ALL"
    //       ? new BigNumber(balanceCrypto).toFixed(8)
    //       : newValue;
    //   amountCrypto = new BigNumber(
    //     formatter.removeDecimalZeros(amountCrypto)
    //   ).toFixed(8);
    //   amountUsd = predefined.label === "ALL" ? balanceUsd : predefined.value;
    //   amountUsd = this.getUsdValue(amountUsd);
    // }
    //
    // // Change value '.' to '0.'
    // if (amountUsd[0] === ".") amountUsd = `0${amountUsd}`;
    // // if the crypto amount is eg. 01 the value will be 1, 00 -> 0
    // if (amountUsd.length > 1 && amountUsd[0] === "0" && amountUsd[1] !== ".") {
    //   amountUsd = amountUsd[1];
    // }
    //
    // // if crypto amount is undefined, set it to empty string
    // // if (!new BigNumber(amountCrypto).toNumber()) amountCrypto = "";
    // // Change value '.' to '0.'
    // if (amountCrypto[0] === ".") amountCrypto = `0${amountCrypto}`;
    // // if the crypto amount is eg. 01 the value will be 1, 00 -> 0
    // if (
    //   amountCrypto.length > 1 &&
    //   amountCrypto[0] === "0" &&
    //   amountCrypto[1] !== "."
    // ) {
    //   amountCrypto = amountCrypto[1];
    // }
    //
    // if (new BigNumber(amountCrypto).isGreaterThan(balanceCrypto.toFixed(8))) {
    //   return actions.showMessage("warning", "Insufficient funds!");
    // }
    //
    // if (
    //   new BigNumber(amountUsd).isGreaterThan(
    //     celPaySettings.maximum_transfer_amount
    //   )
    // ) {
    //   return actions.showMessage(
    //     "warning",
    //     `You have surpassed the daily limit of ${formatter.usd(
    //       celPaySettings.maximum_transfer_amount
    //     )}. Please enter different amount to continue.`
    //   );
    // }
    //
    // this.setState({ activePeriod: predefined });
    //
    // actions.updateFormFields({
    //   amountCrypto: amountCrypto.toString(),
    //   amountUsd,
    // });
  // };

  handleCoinChange = (field, value) => {
    const { actions } = this.props;

    actions.updateFormFields({
      [field]: value,
      amountUsd: undefined,
      amountCrypto: undefined,
    });

    this.setState({ activePeriod: { label: "", value: "" } });
  };

  handleNextStep = () => {
    const { actions, formData, walletSummary } = this.props;

    const coinData = walletSummary.coins.filter(
      c => c.short === formData.coin.toUpperCase()
    )[0];

    // TODO: move newBalance calc to util
    const newBalance = coinData.amount.minus(formData.amountCrypto);

    if (celUtilityUtil.isLosingTier(formData.coin, newBalance)) {
      return actions.openModal(MODALS.LOSE_TIER_MODAL);
    }

    this.navigateToNextStep();
  };

  navigateToNextStep = () => {
    const { actions, formData, navigation } = this.props;
    const celPayType = navigation.getParam("celPayType");
    console.log("formData: ", formData);
    if (celPayType === CEL_PAY_TYPES.FRIEND) {
      actions.navigateTo(SCREENS.CEL_PAY_CHOOSE_FRIEND);
    } else {
      actions.navigateTo(SCREENS.VERIFY_PROFILE, {
        onSuccess: () => {
          actions.celPayShareLink();
        },
      });
    }

    mixpanelAnalytics.enteredAmount(
      formData.coin,
      Number(formData.amountUsd),
      Number(formData.amountCrypto)
    );
  };

  render() {
    const { coinSelectItems } = this.state;
    const {
      formData,
      actions,
      walletSummary,
      loyaltyInfo,
      currencyRatesShort
    } = this.props;
    const coinRate = currencyRatesShort[formData.coin && formData.coin.toLowerCase() || "BTC"];

    const style = CelPayEnterAmountStyle();
    if (!formData.coin) return null;
    console.log({ formData });
    const coinData = walletSummary.coins.filter(
      c => c.short === formData.coin.toUpperCase()
    )[0];

    return (
      <RegularLayout padding="0 0 0 0" fabType={"hide"}>
        <View style={style.container}>
          <BalanceView
            opacity={0.65}
            coin={formData.coin}
            crypto={coinData && coinData.amount && coinData.amount.toFixed(8)}
            usd={coinData.amount_usd}
          />
          <View style={style.wrapper}>
            <View style={style.amounts}>
              <CoinPicker
                type={"basic"}
                updateFormField={actions.updateFormField}
                onChange={this.handleCoinChange}
                coin={formData.coin}
                field="coin"
                availableCoins={coinSelectItems}
                navigateTo={actions.navigateTo}
              />

              <CoinSwitch
                updateFormFields={actions.updateFormFields}
                updateFormField={actions.updateFormField}
                onAmountPress={actions.toggleKeypad}
                amountUsd={formData.amountUsd}
                amountCrypto={formData.amountCrypto}
                isUsd={formData.isUsd}
                coin={formData.coin}
                coinRate={coinRate}
              />
            </View>

            <CelButton
              margin="40 0 0 0"
              disabled={
                !(formData.amountCrypto && Number(formData.amountCrypto) > 0)
              }
              onPress={this.handleNextStep}
              iconRight="IconArrowRight"
            >
              {this.getButtonCopy()}
            </CelButton>
          </View>
        </View>

        {loyaltyInfo && loyaltyInfo.tier_level !== 0 && (
          <LoseTierModal
            navigateToNextStep={this.navigateToNextStep}
            tierTitle={loyaltyInfo.tier.title}
          />
        )}
      </RegularLayout>
    );
  }
}

export default CelPayEnterAmount;
