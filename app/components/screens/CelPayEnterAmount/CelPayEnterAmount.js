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
