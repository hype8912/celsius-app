import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import * as appActions from "../../../redux/actions";
import { COIN_CARD_TYPE, LOAN_PAYMENT_REASONS } from "../../../constants/UI";

import { getTheme } from "../../../utils/styles-util";
import CoinIcon from "../../atoms/CoinIcon/CoinIcon";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import formatter from "../../../utils/formatter";
// import Icon from "../../atoms/Icon/Icon";

import PaymentCardStyle from "./PaymentCard.styles";
import Separator from "../../atoms/Separator/Separator";
import CelButton from "../../atoms/CelButton/CelButton";
import CollateralCoinCard from "../CollateralCoinCard/CollateralCoinCard";
import AdditionalAmountCard from "../AdditionalAmountCard/AdditionalAmountCard";
import loanPaymentUtil from "../../../utils/loanPayment-util";

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
    await this.setState({ name, currency });

    if (type === COIN_CARD_TYPE.COLLATERAL_COIN_CARD) {
      const collateralPayment = loanPaymentUtil.calculateAdditionalPayment(
        loan,
        COIN_CARD_TYPE.COLLATERAL_COIN_CARD,
        coin
      );
      await this.setState({
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
      await this.setState({
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
      await this.setState({
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
      await this.setState({
        additionalInfoExplanation: "required.",
        cryptoAmount: marginCallPayment.cryptoAmount,
        amountUsd: marginCallPayment.amountUsd,
        isAllowed: marginCallPayment.isAllowed,
        additionalCryptoAmount: marginCallPayment.additionalCryptoAmount,
        color: marginCallPayment.color,
        hasEnough: marginCallPayment.hasEnough,
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

  renderMarginCallNote = () => {
    const { color } = this.state;

    const style = PaymentCardStyle();
    return (
      <Card color={style.background.backgroundColor}>
        <CelText style={{ color }} weight={"300"}>
          Note: Amounts are estimates, may change based on value at time of
          locking.
        </CelText>
      </Card>
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

  render = () => {
    const {
      handleSelectCoin,
      coin,
      marginCall,
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
    } = this.state;

    const style = PaymentCardStyle();
    const theme = getTheme();

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
              </View>

              <Separator margin={"10 0 10 0"} />
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

              {amountUsd < loan.monthly_payment ? (
                <View>
                  {this.renderAdditionalAmountRequired()}
                  {this.renderDepositMore()}
                </View>
              ) : null}
              {marginCall && isAllowed
                ? this.renderAdditionalAmountRequired()
                : null}
            </View>
          </View>
        </Card>
      );
    }
    return null;
  };
}

export default PaymentCard;
