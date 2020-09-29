import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BigNumber from "bignumber.js";

import * as appActions from "../../../redux/actions";
import WithdrawEnterAmountStyle from "./WithdrawEnterAmount.styles";
import CelButton from "../../atoms/CelButton/CelButton";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import formatter from "../../../utils/formatter";
import CelNumpad from "../../molecules/CelNumpad/CelNumpad";
import { EMPTY_STATES, KEYPAD_PURPOSES, MODALS } from "../../../constants/UI";
import CoinSwitch from "../../atoms/CoinSwitch/CoinSwitch";
import WithdrawalInfoModal from "../../modals/WithdrawalInfoModal/WithdrawalInfoModal";
import { KYC_STATUSES, PREDIFINED_AMOUNTS } from "../../../constants/DATA";
import PredefinedAmounts from "../../organisms/PredefinedAmounts/PredefinedAmounts";
import { openModal } from "../../../redux/ui/uiActions";
import store from "../../../redux/store";
import StaticScreen from "../StaticScreen/StaticScreen";
import BalanceView from "../../atoms/BalanceView/BalanceView";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import celUtilityUtil from "../../../utils/cel-utility-util";
import LoseTierModal from "../../modals/LoseTierModal/LoseTierModal";
import { hasPassedKYC } from "../../../utils/user-util/user-util";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import CircleButton from "../../atoms/CircleButton/CircleButton";
import CoinPicker from "../../molecules/CoinPicker/CoinPicker";
import { renderHodlEmptyState } from "../../../utils/hodl-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { getColor } from "../../../utils/styles-util";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    walletSummary: state.wallet.summary,
    withdrawCompliance: state.compliance.withdraw,
    currencyRatesShort: state.currencies.currencyRatesShort,
    currencies: state.currencies.rates,
    formData: state.forms.formData,
    withdrawalAddresses: state.wallet.withdrawalAddresses,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
    keypadOpen: state.ui.isKeypadOpen,
    withdrawalSettings: state.generalData.withdrawalSettings,
    loyaltyInfo: state.loyalty.loyaltyInfo,
    hodlStatus: state.hodl.hodlStatus,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WithdrawEnterAmount extends Component {
  static navigationOptions = () => ({
    title: "Withdraw",
    right: "info",
    onInfo: () => {
      store.dispatch(openModal(MODALS.WITHDRAW_INFO_MODAL));
    },
  });

  constructor(props) {
    super(props);
    const {
      navigation,
      currencies,
      withdrawCompliance,
      walletSummary,
    } = this.props;

    const coin = navigation.getParam(
      "coin",
      (coinSelectItems &&
        coinSelectItems.length > 0 &&
        coinSelectItems[0].value) ||
        ""
    );

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
      activePeriod: { label: "", value: "" },
    };

    if (coin || (coinSelectItems && coinSelectItems.length > 0)) {
      props.actions.initForm({ coin: coin || coinSelectItems[0].value });
    }
    props.actions.getAllCoinWithdrawalAddresses();
  }

  onPressPredefinedAmount = ({ label, value }) => {
    const { formData, walletSummary, currencyRatesShort, actions } = this.props;

    if (!formData.coin) {
      return actions.showMessage("info", "Please select a coin to withdraw.");
    }

    let amount;

    const coinRate = currencyRatesShort[formData.coin.toLowerCase()];
    const walletSummaryObj = walletSummary.coins.find(
      c => c.short === formData.coin.toUpperCase()
    );

    if (label === "ALL") {
      amount = formData.isUsd
        ? walletSummaryObj.amount_usd.toString()
        : walletSummaryObj.amount.toString();
      actions.updateFormField("withdrawAll", true);
    } else {
      amount = formData.isUsd ? value : (Number(value) / coinRate).toString();
    }
    this.handleAmountChange(amount, { label, value });
    actions.toggleKeypad(false);
  };

  getUsdValue = amountUsd =>
    formatter.removeDecimalZeros(formatter.floor10(amountUsd, -2) || "");

  handleAmountChange = (newValue, predefined = { label: "" }) => {
    const { formData, currencyRatesShort, actions, walletSummary } = this.props;
    const coinRate = currencyRatesShort[formData.coin.toLowerCase()];

    const splitedValue = newValue.toString().split(".");

    if (splitedValue && splitedValue.length > 2) return;

    const {
      amount_usd: balanceUsd,
      amount: balanceCrypto,
    } = walletSummary.coins.find(c => c.short === formData.coin.toUpperCase());

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
    if (new BigNumber(amountCrypto).isGreaterThan(balanceCrypto.toFixed(8))) {
      return actions.showMessage("warning", "Insufficient funds!");
    }

    this.setState({ activePeriod: predefined });

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

  handleNextStep = () => {
    const { actions, formData, walletSummary } = this.props;

    const coinData = walletSummary.coins.find(
      c => c.short === formData.coin.toUpperCase()
    );

    const newBalance = coinData.amount.minus(formData.amountCrypto);

    if (celUtilityUtil.isLosingTier(formData.coin, newBalance)) {
      return actions.openModal(MODALS.LOSE_TIER_MODAL);
    }

    this.navigateToNextStep();
  };

  navigateToNextStep = modal => {
    const { withdrawalAddresses, formData, actions } = this.props;
    const coinAddress = withdrawalAddresses[formData.coin.toUpperCase()];
    if (coinAddress) {
      actions.navigateTo(SCREENS.WITHDRAW_CONFIRM_ADDRESS);
    } else {
      actions.navigateTo(SCREENS.WITHDRAW_CREATE_ADDRESS);
    }
    if (modal) actions.closeModal();
  };

  render() {
    const { coinSelectItems, activePeriod } = this.state;
    const {
      formData,
      actions,
      walletSummary,
      keypadOpen,
      withdrawalSettings,
      withdrawalAddresses,
      loyaltyInfo,
      kycStatus,
      withdrawCompliance,
      hodlStatus,
    } = this.props;

    const style = WithdrawEnterAmountStyle();
    if (!hasPassedKYC()) {
      if (kycStatus === KYC_STATUSES.pending) {
        return (
          <StaticScreen
            emptyState={{
              purpose: EMPTY_STATES.VERIFICATION_IN_PROCESS_WITHDRAW,
            }}
          />
        );
      }
      return (
        <StaticScreen
          emptyState={{ purpose: EMPTY_STATES.NON_VERIFIED_WITHDRAW }}
        />
      );
    }
    if (hodlStatus.isActive) {
      return (
        <StaticScreen
          emptyState={{
            purpose: renderHodlEmptyState(hodlStatus, "withdraw"),
          }}
        />
      );
    }
    if (!withdrawCompliance.allowed) {
      return <StaticScreen emptyState={{ purpose: EMPTY_STATES.COMPLIANCE }} />;
    }
    if (!new BigNumber(walletSummary.total_amount_usd).isGreaterThan(0)) {
      return (
        <StaticScreen
          emptyState={{ purpose: EMPTY_STATES.INSUFFICIENT_FUNDS }}
        />
      );
    }
    const coin = formData.coin || "";

    const coinData = walletSummary.coins.find(
      c => c.short === coin.toUpperCase()
    ) || { amount: "", amount_usd: "" };

    if (!withdrawalAddresses) return <LoadingScreen />;

    const isAddressLocked =
      withdrawalAddresses[formData.coin] &&
      withdrawalAddresses[formData.coin].locked;

    let hours;
    let minutes;

    if (
      withdrawalAddresses[formData.coin] &&
      withdrawalAddresses[formData.coin].will_unlock_in
    ) {
      hours = withdrawalAddresses[formData.coin].will_unlock_in.split(":")[0];
      minutes = withdrawalAddresses[formData.coin].will_unlock_in.split(":")[1];
    }
    return (
      <RegularLayout padding="0 0 0 0">
        <View style={style.container}>
          <BalanceView
            opacity={0.65}
            coin={coin}
            crypto={coinData && coinData.amount && coinData.amount.toFixed(8)}
            usd={coinData.amount_usd}
          />
          <View style={style.wrapper}>
            <View>
              <CoinPicker
                type={"basic"}
                onChange={this.handleCoinChange}
                updateFormField={actions.updateFormField}
                coin={coin}
                field="coin"
                availableCoins={coinSelectItems}
                navigateTo={actions.navigateTo}
              />

              {!isAddressLocked && (
                <CoinSwitch
                  updateFormField={actions.updateFormField}
                  onAmountPress={actions.toggleKeypad}
                  amountUsd={formData.amountUsd}
                  amountCrypto={formData.amountCrypto}
                  isUsd={formData.isUsd}
                  coin={coin}
                  amountColor={
                    keypadOpen
                      ? getColor(COLOR_KEYS.HEADLINE)
                      : getColor(COLOR_KEYS.PARAGRAPH)
                  }
                />
              )}
            </View>

            {!isAddressLocked ? (
              <View>
                <PredefinedAmounts
                  data={PREDIFINED_AMOUNTS}
                  onSelect={this.onPressPredefinedAmount}
                  activePeriod={activePeriod}
                />

                <CelButton
                  margin="40 0 0 0"
                  disabled={
                    !(formData.amountUsd && Number(formData.amountUsd) > 0)
                  }
                  onPress={this.handleNextStep}
                  iconRight={
                    formData.amountUsd && Number(formData.amountUsd) > 0
                      ? "IconArrowRight"
                      : ""
                  }
                >
                  {formData.amountUsd && Number(formData.amountUsd) > 0
                    ? "Check wallet address"
                    : "Enter amount above"}
                </CelButton>
              </View>
            ) : (
              <View>
                <CircleButton
                  style={{ marginTop: 50 }}
                  icon="TransactionLocked"
                  iconSize={35}
                />

                <CelText
                  margin="20 0 15 0"
                  align="center"
                  type="H2"
                  weight={"bold"}
                >
                  Address Locked
                </CelText>

                <CelText align="center">
                  {`You have recently changed your ${coin} withdrawal address.`}
                </CelText>

                {hours && minutes && (
                  <Card margin="10 0 0 0">
                    <CelText align="center" type="H6">
                      Due to our security protocols, your address will be active
                      in
                    </CelText>

                    <CelText
                      margin="10 0 0 0"
                      align="center"
                      type="H3"
                      weight={"bold"}
                    >
                      {`${hours}h ${minutes}m.`}
                    </CelText>
                  </Card>
                )}
              </View>
            )}
          </View>
        </View>
        {!isAddressLocked && (
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
        )}

        {loyaltyInfo && loyaltyInfo.tier_level !== 0 && (
          <LoseTierModal
            navigateToNextStep={() => this.navigateToNextStep(true)}
            tierTitle={loyaltyInfo.tier.title}
          />
        )}
        <WithdrawalInfoModal
          withdrawalSettings={withdrawalSettings}
          type={coin}
          closeModal={actions.closeModal}
        />
      </RegularLayout>
    );
  }
}

export default WithdrawEnterAmount;
