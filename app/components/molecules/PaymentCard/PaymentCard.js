import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import * as appActions from "../../../redux/actions";
import {
  COIN_CARD_TYPE,
  LOAN_PAYMENT_REASONS,
  MODALS,
} from "../../../constants/UI";

import { getTheme } from "../../../utils/styles-util";
import CoinIcon from "../../atoms/CoinIcon/CoinIcon";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import formatter from "../../../utils/formatter";

import PaymentCardStyle from "./PaymentCard.styles";
import Separator from "../../atoms/Separator/Separator";
import CelButton from "../../atoms/CelButton/CelButton";
import CollateralCoinCard from "../CollateralCoinCard/CollateralCoinCard";
import AdditionalAmountCard from "../AdditionalAmountCard/AdditionalAmountCard";
import loanPaymentUtil from "../../../utils/loanPayment-util";
import STYLES from "../../../constants/STYLES";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import { presentTime } from "../../../utils/ui-util";

@connect(
  state => ({
    coins: state.compliance.loan.coins,
    currencies: state.currencies.rates,
    currencyRatesShort: state.currencies.currencyRatesShort,
    formData: state.forms.formData,
    walletSummary: state.wallet.summary.coins,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class PaymentCard extends Component {
  static propTypes = {
    coin: PropTypes.instanceOf(Object).isRequired,
    type: PropTypes.oneOf("Interest", "PrincipalPayment", "MarginCall"),
    isLoading: PropTypes.bool,
    isMarginCall: PropTypes.bool,
    marginCall: PropTypes.instanceOf(Object),
    amountNeededUsd: PropTypes.string,
    reason: PropTypes.oneOf(
      "MANUAL_INTEREST",
      "INTEREST",
      "INTEREST_PREPAYMENT",
      "PRINCIPAL",
      "MARGIN_CALL"
    ),
    loan: PropTypes.instanceOf(Object),
  };

  constructor(props) {
    super(props);
    this.state = {
      currency: null,
      name: null,
      fiat: null,
      collateralAmount: null,
      color: null,
      amount: null,
      amount_usd: null,
      additionalCryptoAmount: null,
      isAllowed: false,
      additionalInfoExplanation: null,
      options: false,
    };
  }

  componentDidMount() {
    this.setValues();
  }

  setValues = async () => {
    const { type, coin, currencies, loan } = this.props;
    // constant values
    const name = formatter.capitalize(coin.name);
    const currency = currencies.filter(
      c => c.short === coin.short.toUpperCase()
    )[0];
    this.setState({ name, currency });

    if (type === COIN_CARD_TYPE.COLLATERAL_COIN_CARD) {
      const collateralPayment = loanPaymentUtil.calculateAdditionalPayment(
        loan,
        COIN_CARD_TYPE.COLLATERAL_COIN_CARD,
        coin
      );
      this.setState({
        additionalInfoExplanation: "required.",
        cryptoAmount: collateralPayment.cryptoAmount,
        amountUsd: collateralPayment.amountUsd,
        additionalCryptoAmount: collateralPayment.additionalCryptoAmount,
        color: collateralPayment.color,
        isAllowed: collateralPayment.isAllowed,
        hasEnough: collateralPayment.hasEnough,
      });
    } else if (type === COIN_CARD_TYPE.PRINCIPAL_PAYMENT_COIN_CARD) {
      const principalPayment = loanPaymentUtil.calculateAdditionalPayment(
        loan,
        COIN_CARD_TYPE.PRINCIPAL_PAYMENT_COIN_CARD
      );
      this.setState({
        additionalInfoExplanation: "required for a principal payout.",
        cryptoAmount: principalPayment.cryptoAmount,
        amountUsd: principalPayment.amountUsd,
        isAllowed: principalPayment.isAllowed,
        color: principalPayment.color,
        additionalCryptoAmount: principalPayment.additionalCryptoAmount,
        hasEnough: principalPayment.hasEnough,
      });
    } else if (type === COIN_CARD_TYPE.LOAN_PAYMENT_COIN_CARD) {
      const loanPayment = loanPaymentUtil.calculateAdditionalPayment(
        loan,
        COIN_CARD_TYPE.LOAN_PAYMENT_COIN_CARD,
        coin
      );
      this.setState({
        additionalInfoExplanation:
          "required for a first month of loan interest payment.",
        cryptoAmount: loanPayment.cryptoAmount,
        amountUsd: loanPayment.amountUsd,
        isAllowed: loanPayment.isAllowed,
        color: loanPayment.color,
        additionalCryptoAmount: loanPayment.additionalCryptoAmount,
        additionalUsdAmount: loanPayment.additionalUsdAmount,
        hasEnough: loanPayment.hasEnough,
        // TODO when API is completed add state: additionalCryptoAmount
      });
    } else if (type === COIN_CARD_TYPE.MARGIN_COLLATERAL_COIN_CARD) {
      const marginCallPayment = loanPaymentUtil.calculateAdditionalPayment(
        loan,
        COIN_CARD_TYPE.MARGIN_COLLATERAL_COIN_CARD
      );
      this.setState({
        additionalInfoExplanation: "additionally required.",
        cryptoAmount: marginCallPayment.cryptoAmount,
        amountUsd: marginCallPayment.amountUsd,
        isAllowed: marginCallPayment.isAllowed,
        additionalCryptoAmount: marginCallPayment.additionalCryptoAmount,
        color: marginCallPayment.color,
        hasEnough: marginCallPayment.hasEnough,
        collateralAmount: marginCallPayment.collateralAmount,
        additionalUsdAmount: marginCallPayment.additionalUsdAmount,
      });
    }
  };

  renderAdditionalAmountRequired = () => {
    const { coin } = this.props;
    const { additionalUsdAmount, additionalCryptoAmount } = this.state;
    const style = PaymentCardStyle();

    return (
      <AdditionalAmountCard
        color={style.marginRequired.backgroundColor}
        style={style.marginRequired}
        additionalCryptoAmount={additionalCryptoAmount}
        additionalUsd={additionalUsdAmount}
        text={"additionally required"}
        coin={coin.short}
      />
    );
  };

  renderDepositMore = () => {
    const { coin, actions, marginCall, reason } = this.props;
    const { additionalUsdAmount, additionalCryptoAmount } = this.state;
    return (
      <View>
        <CelButton
          margin={"20 0 10 0"}
          onPress={() =>
            actions.navigateTo("Deposit", {
              coin: coin.short,
              reason,
              amountUsd: additionalUsdAmount,
              additionalCryptoAmount,
            })
          }
        >
          {`Deposit more ${coin.short}`}
        </CelButton>
        {marginCall ? (
          <CelButton
            onPress={() => actions.navigateTo("Deposit", { coin: coin.short })}
            basic
            margin={"10 0 10 0"}
          >
            Buy more collateral
          </CelButton>
        ) : null}
      </View>
    );
  };

  getTypeOfPaymentTitle = reason => {
    switch (reason) {
      case LOAN_PAYMENT_REASONS.INTEREST:
      case LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT:
      case LOAN_PAYMENT_REASONS.MANUAL_INTEREST:
        return "Monthly Interest Payment Amount: ";
      case LOAN_PAYMENT_REASONS.MARGIN_CALL:
        return "Collateral Amount Due: ";
      case LOAN_PAYMENT_REASONS.PRINCIPAL:
        return "Principal Due: ";
    }
  };

  showOptions = () => {
    this.setState({
      options: true,
    });
  };

  marginCallOptions = () => {
    const style = PaymentCardStyle();
    const { handleSelectCoin, coin, loan, actions } = this.props;
    const {
      additionalCryptoAmount,
      hasEnough,
      additionalUsdAmount,
    } = this.state;
    return (
      <View>
        <Card margin={"10 0 10 0"} color={style.card.color}>
          <CelText weight={"300"}>
            Note: These are current estimates. Final values fixed when Margin
            Call is resolved.
          </CelText>
        </Card>
        {hasEnough ? (
          <CelButton
            onPress={() => {
              handleSelectCoin(loan);
              actions.openModal(MODALS.MARGIN_CALL_CONFIRM);
            }}
            margin={"10 0 10 0"}
          >
            Add Collateral From Wallet
          </CelButton>
        ) : (
          <CelButton
            onPress={() => {
              actions.navigateTo("Deposit", {
                reason: LOAN_PAYMENT_REASONS.MARGIN_CALL,
                coin: coin.short,
                amountUsd: additionalUsdAmount,
                additionalCryptoAmount,
                marginCall: loan.margin_call.margin_call_activated,
              });
            }}
            margin={"10 0 10 0"}
          >
            {`Deposit more ${coin.short}`}
          </CelButton>
        )}
        <CelButton
          margin={"0 0 10 0"}
          onPress={() => {
            actions.updateFormField("cryptoCoin", coin.short);
            actions.navigateTo("GetCoinsEnterAmount");
          }}
          basic
        >
          {`Buy More ${coin.short}`}
        </CelButton>
      </View>
    );
  };

  render = () => {
    const {
      handleSelectCoin,
      coin,
      isLoading,
      reason,
      loan,
      type,
      actions,
    } = this.props;
    const {
      cryptoAmount,
      amountUsd,
      color,
      currency,
      isAllowed,
      additionalCryptoAmount,
      additionalInfoExplanation,
      hasEnough,
      collateralAmount,
      additionalUsdAmount,
      options,
    } = this.state;

    const style = PaymentCardStyle();
    const theme = getTheme();
    const time = presentTime(loan.margin_call.margin_call_detected, true);

    if (
      currency &&
      cryptoAmount &&
      type === COIN_CARD_TYPE.COLLATERAL_COIN_CARD
    ) {
      return (
        <CollateralCoinCard
          actions={actions}
          amountUsd={amountUsd}
          additionalCryptoAmount={additionalCryptoAmount}
          additionalInfoExplanation={additionalInfoExplanation}
          cardColor={isAllowed ? null : style.cardStyle.color}
          color={color}
          coin={coin}
          currency={currency}
          cryptoAmount={cryptoAmount}
          isAllowed={isAllowed}
          onPress={isAllowed ? () => handleSelectCoin(coin.short) : null}
          opacity={isLoading ? 0.7 : 1}
        />
      );
    }

    if (
      currency &&
      cryptoAmount &&
      type !== COIN_CARD_TYPE.COLLATERAL_COIN_CARD
    ) {
      return (
        <Card
          onPress={
            isAllowed && hasEnough ? () => handleSelectCoin(coin.short) : null
          }
          color={isAllowed ? null : style.cardStyle.color}
          opacity={isLoading ? 0.7 : 1}
        >
          <View>
            {type === COIN_CARD_TYPE.MARGIN_COLLATERAL_COIN_CARD && (
              <View>
                <CelText
                  weight={"500"}
                  type={"H5"}
                  color={STYLES.COLORS.CELSIUS_BLUE}
                >
                  {`Loan - #${loan.id}`}
                </CelText>
                <Separator margin={"10 0 10 0"} />
              </View>
            )}
            <CelText
              weight={"300"}
              type={"H6"}
              align={"left"}
              margin={"0 0 10 0"}
            >
              {this.getTypeOfPaymentTitle(reason)}
            </CelText>
            <View key={coin.name} style={style.mainContainer}>
              <View style={style.coinInfo}>
                <View style={style.iconContainer}>
                  <CoinIcon
                    customStyles={[
                      style.coinImage,
                      { opacity: isAllowed ? 1 : 0.4 },
                    ]}
                    theme={theme}
                    url={currency.image_url}
                    coinShort={currency.short}
                  />
                </View>
                {type !== COIN_CARD_TYPE.MARGIN_COLLATERAL_COIN_CARD ? (
                  <View>
                    <CelText weight={"600"} align="left" type="H3">
                      {`${formatter.crypto(
                        Number(loan.monthly_payment) /
                          currency.market_quotes_usd.price,
                        currency.short
                      )}`}
                    </CelText>
                    <CelText weight={"300"} align="left">
                      {`$ ${loan.monthly_payment} USD`}
                    </CelText>
                  </View>
                ) : (
                  <View>
                    <CelText weight={"600"} align="left" type="H3">
                      {formatter.fiat(amountUsd, "USD")}
                    </CelText>
                    <CelText weight={"300"} align="left" type="H5">
                      {formatter.crypto(collateralAmount, coin.short, {
                        precision: 2,
                      })}
                    </CelText>
                  </View>
                )}
              </View>

              <Separator margin={"10 0 10 0"} />

              {type !== COIN_CARD_TYPE.MARGIN_COLLATERAL_COIN_CARD ? (
                <View style={style.textContainer}>
                  <CelText weight={"300"} align="left">
                    In wallet:{" "}
                  </CelText>
                  <View>
                    <CelText weight={"300"} align="right" style={{ color }}>
                      {formatter.crypto(cryptoAmount, coin.short, {
                        precision: 2,
                      })}
                      <CelText weight={"300"} align="right" style={{ color }}>
                        {" | "}
                        <CelText weight={"300"} align="right" style={{ color }}>
                          {formatter.fiat(amountUsd, "USD")}
                        </CelText>
                      </CelText>
                    </CelText>
                  </View>
                </View>
              ) : (
                <View>
                  {!hasEnough && (
                    <View>
                      <CelText weight={"300"} type={"H6"}>
                        Current available balance in wallet:
                      </CelText>
                      <CelText color={color} margin={"5 0 0 0"} type={"H6"}>
                        {formatter.crypto(cryptoAmount, coin.short, {
                          precision: 2,
                        })}
                      </CelText>
                      <AdditionalAmountCard
                        margin={"10 0 10 0"}
                        additionalCryptoAmount={additionalCryptoAmount}
                        color={color}
                        additionalUsd={additionalUsdAmount}
                        text={additionalInfoExplanation}
                        coin={coin.short}
                      />
                    </View>
                  )}

                  {type === COIN_CARD_TYPE.MARGIN_COLLATERAL_COIN_CARD && (
                    <Card
                      margin={!options ? "10 0 60 0" : "10 0 10 0"}
                      color={style.card.color}
                    >
                      <CelText align={"left"} type={"H6"}>
                        Time remaining to resolve Margin Call
                      </CelText>
                      <CelText align={"left"} weight={"500"} type={"H3"}>
                        {time.days >= 1
                          ? `00h 00m`
                          : `${time.hours}h ${time.minutes}m`}
                      </CelText>
                      {time.days >= 1 && (
                        <Card color={STYLES.COLORS.RED}>
                          <CelText weight={"300"} type={"H6"} color={"white"}>
                            Your loan is now in default and you are at risk of
                            collateral liquidation. We advise you to contact
                            your loan manager now.
                          </CelText>
                        </Card>
                      )}
                    </Card>
                  )}
                </View>
              )}

              {amountUsd < loan.monthly_payment ? (
                <View>
                  {this.renderAdditionalAmountRequired()}
                  {this.renderDepositMore()}
                </View>
              ) : null}
            </View>
          </View>

          {!options ? (
            <View style={style.buttonsWrapper}>
              <CelModalButton
                buttonStyle={"secondary"}
                position={"single"}
                onPress={() => this.showOptions()}
              >
                Resolve Margin Call
              </CelModalButton>
            </View>
          ) : (
            this.marginCallOptions()
          )}
        </Card>
      );
    }
    return null;
  };
}

export default PaymentCard;
