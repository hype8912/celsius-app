import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { BigNumber } from "bignumber.js";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import CelButton from "../../atoms/CelButton/CelButton";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelNumpad from "../../molecules/CelNumpad/CelNumpad";
import { KEYPAD_PURPOSES } from "../../../constants/UI";
import formatter from "../../../utils/formatter";
import PredefinedAmounts from "../../organisms/PredefinedAmounts/PredefinedAmounts";
import { getColor, getPadding } from "../../../utils/styles-util";
import Icon from "../../atoms/Icon/Icon";
import BorrowEnterAmountStyle from "./BorrowEnterAmount.styles";
import CoinPicker from "../../molecules/CoinPicker/CoinPicker";
import mixpanelAnalytics from "../../../utils/mixpanel-analytics";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { SCREENS } from "../../../constants/SCREENS";

let timeout;

@connect(
  state => ({
    loanCompliance: state.compliance.loan,
    formData: state.forms.formData,
    walletSummary: state.wallet.summary,
    minimumLoanAmount: state.generalData.minimumLoanAmount,
    keypadOpen: state.ui.isKeypadOpen,
    currencies: state.currencies.rates,
    appSettings: state.user.appSettings,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BorrowEnterAmount extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Enter the loan amount",
    customCenterComponent: { steps: 8, currentStep: 2, flowProgress: true },
  });

  constructor(props) {
    super(props);
    const {
      loanCompliance,
      walletSummary,
      minimumLoanAmount,
      currencies,
      formData,
    } = props;

    const eligibleCoins = walletSummary.coins.filter(coinData =>
      loanCompliance.collateral_coins.includes(coinData.short)
    );

    const coinSelectItems =
      currencies &&
      currencies
        .filter(c => loanCompliance.loan_coins.includes(c.short))
        .map(c => ({
          label: `${c.displayName}  (${c.short})`,
          value: c.short,
        }));

    this.state = {
      activePeriod: "",
      coinSelectItems,
    };

    const maxAmount =
      eligibleCoins.reduce((max, element) => {
        const amountUsd = new BigNumber(element.amount_usd).toNumber();
        return amountUsd > max ? amountUsd : max;
      }, new BigNumber(0).toNumber()) / 2;

    props.actions.initForm({
      loanAmount: minimumLoanAmount,
      maxAmount,
      coin: formData.coin,
      loanType: formData.loanType,
    });
  }

  async componentDidMount() {
    const { actions } = this.props;
    actions.startedLoanApplication();
  }

  onPressPredefinedAmount = ({ label, value }) => {
    const { formData, minimumLoanAmount, actions } = this.props;
    let amount;
    if (value === "max") amount = formatter.floor10(formData.maxAmount, 0);
    if (value === "min") amount = minimumLoanAmount.toString();
    this.handleAmountChange(amount, label);
    actions.toggleKeypad(false);
  };

  getAmountColor = () => {
    const { keypadOpen } = this.props;

    if (keypadOpen) return getColor(COLOR_KEYS.PRIMARY_BUTTON);

    return getColor(COLOR_KEYS.PARAGRAPH);
  };

  handleAmountChange = (newValue, predefined = "") => {
    const { actions, formData, minimumLoanAmount } = this.props;

    if (timeout) clearTimeout(timeout);
    if (Number(newValue) < Number(minimumLoanAmount)) {
      timeout = setTimeout(() => {
        actions.showMessage(
          "warning",
          `$${minimumLoanAmount} is currently the minimum loan amount. Please adjust your loan amount to proceed.`
        );
      }, 3000);
    }

    if (Number(newValue) > formData.maxAmount) {
      return actions.showMessage("warning", "Insufficient funds!");
    }

    actions.updateFormField("loanAmount", newValue);
    this.setState({ activePeriod: predefined });
  };

  renderButton() {
    const { formData, actions, minimumLoanAmount } = this.props;

    if (Number(formData.loanAmount) > Number(formData.maxAmount)) {
      return (
        <>
          <CelText margin={"20 0 0 0"} align={"center"}>
            You’ll need to transfer more crypto to be used as collateral for
            this loan.
          </CelText>
          <CelButton
            onPress={() => {
              actions.navigateTo(SCREENS.DEPOSIT);
            }}
            margin="40 0 0 0"
          >
            Transfer more
          </CelButton>
        </>
      );
    }

    return (
      <CelButton
        disabled={
          Number(formData.loanAmount) < Number(minimumLoanAmount) ||
          !formData.coin
        }
        onPress={async () => {
          actions.navigateTo(SCREENS.BORROW_COLLATERAL);
          actions.toggleKeypad();
          actions.getLinkedBankAccount();
          await mixpanelAnalytics.loanType(formData.loanType);
          await mixpanelAnalytics.loanAmount({
            coin: formData.coin,
            amount: formData.loanAmount,
          });
        }}
        margin="20 0 0 0"
        iconRight="arrowRight"
      >
        Choose collateral
      </CelButton>
    );
  }

  renderCoinIcon = () => {
    const { formData } = this.props;
    if (formData.coin === "USD")
      return (
        <CelText type={"H1"} weight={"300"} style={{ opacity: 0.6 }}>
          $
        </CelText>
      );
    return <Icon name={`Icon${formData.coin}`} width="40" height="40" />;
  };

  render() {
    const { activePeriod, coinSelectItems } = this.state;
    const { actions, formData, minimumLoanAmount } = this.props;

    const styles = BorrowEnterAmountStyle();

    const coin = formData.coin || "";

    const predefinedAmount = [
      { label: `${minimumLoanAmount} min`, value: "min" },
      {
        label: `${formatter.floor10(formData.maxAmount, 0)} max`,
        value: "max",
      },
    ];
    const CoinIcon = this.renderCoinIcon;

    return (
      <RegularLayout padding="0 0 0 0" fabType={"hide"}>
        <View
          style={[
            { flex: 1, width: "100%", height: "100%" },
            { ...getPadding("20 20 100 20") },
          ]}
        >
          <View style={{ alignItems: "center" }}>
            <CelText align="center" type="H4" weight={"300"} margin="0 0 50 0">
              How much would you like to borrow?
            </CelText>

            {formData.loanType !== "USD_LOAN" && (
              <CoinPicker
                onChange={(field, value) =>
                  actions.updateFormFields({
                    [field]: value,
                  })
                }
                updateFormField={actions.updateFormField}
                coin={coin}
                field="coin"
                availableCoins={coinSelectItems}
                navigateTo={actions.navigateTo}
              />
            )}

            <View style={{ width: "100%", marginTop: 20 }}>
              <TouchableOpacity
                onPress={actions.toggleKeypad}
                style={{ width: "100%" }}
              >
                <View style={styles.coinIconWrapper}>
                  <CoinIcon />
                </View>
                <CelText
                  color={this.getAmountColor()}
                  type="H1"
                  weight="regular"
                  align="center"
                >
                  {formatter.usd(formData.loanAmount, {
                    code: "",
                    precision: 0,
                  })}
                </CelText>
                <View style={styles.coinTextWrapper}>
                  <CelText color={getColor(COLOR_KEYS.PARAGRAPH)} type="H3">
                    {formData.coin}
                  </CelText>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {formData.maxAmount > Number(minimumLoanAmount) && (
            <PredefinedAmounts
              data={predefinedAmount}
              onSelect={this.onPressPredefinedAmount}
              activePeriod={activePeriod}
            />
          )}

          {/* <Card margin='20 0 5 0'>
            <CelText type="H6" color='gray' >
              The max amount is based on your wallet balance.
            </CelText>
          </Card> */}

          {this.renderButton()}

          <CelNumpad
            autofocus={false}
            toggleKeypad={actions.toggleKeypad}
            field={"loanAmount"}
            value={formData.loanAmount || ""}
            updateFormField={actions.updateFormField}
            setKeypadInput={actions.setKeypadInput}
            onPress={this.handleAmountChange}
            purpose={KEYPAD_PURPOSES.BORROW}
          />
        </View>
      </RegularLayout>
    );
  }
}

export default BorrowEnterAmount;
