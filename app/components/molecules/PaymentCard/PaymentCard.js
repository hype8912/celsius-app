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

import STYLES from "../../../constants/STYLES";
import PaymentCardStyle from "./PaymentCard.styles";
import Separator from "../../atoms/Separator/Separator";
import CelButton from "../../atoms/CelButton/CelButton";
import CollateralCoinCard from "../CollateralCoinCard/CollateralCoinCard";

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
    const {
      type,
      formData,
      coin,
      currencies,
      walletSummary,
      isMarginCall,
      marginCall,
      currencyRatesShort,
      amountNeededUsd,
      loan,
    } = this.props;
    let value;
    let cryptoAmount;
    let amountUsd;
    let additionalCryptoAmount;
    let isAllowed;
    let color;

    // constant values
    const name = formatter.capitalize(coin.name);
    const currency = currencies.filter(
      c => c.short === coin.short.toUpperCase()
    )[0];
    const walletCoin = walletSummary.find(c => c.short === coin.short);
    // formatter.crypto(walletCoin.amount, walletCoin.short, { precision: 2 })
    // default values
    cryptoAmount = walletCoin ? walletCoin.amount.toNumber() : null;
    amountUsd = walletCoin ? walletCoin.amount_usd.toNumber() : null;
    isAllowed = walletCoin ? walletCoin.amount_usd.isGreaterThan(0) : false; // TODO check this!

    await this.setState({ name, currency, isAllowed });
    if (type !== COIN_CARD_TYPE.COLLATERAL_COIN_CARD) {
      additionalCryptoAmount =
        Number(loan.monthly_payment) -
        currency.market_quotes_usd.price * cryptoAmount;
    }

    if (type === COIN_CARD_TYPE.COLLATERAL_COIN_CARD) {
      cryptoAmount = formatter.crypto(coin.amount, coin.short, {
        precision: 2,
      });
      amountUsd = coin.amount_usd.toNumber();

      const collateralAmount = Number(formData.loanAmount) * 2;
      isAllowed = coin.amount_usd >= collateralAmount;
      color =
        coin.amount_usd < collateralAmount
          ? STYLES.COLORS.RED
          : STYLES.COLORS.MEDIUM_GRAY;
      if (currency) {
        value =
          (formData.loanAmount * 2 - coin.amount_usd) /
          currency.market_quotes_usd.price;
      }

      additionalCryptoAmount = formatter.crypto(value, coin.short, {
        precision: 2,
      });

      await this.setState({
        additionalInfoExplanation: "required.",
        cryptoAmount,
        amountUsd,
        additionalCryptoAmount,
        color,
        isAllowed,
      });
    } else if (type === COIN_CARD_TYPE.PRINCIPAL_PAYMENT_COIN_CARD) {
      isAllowed = walletCoin
        ? walletCoin.amount_usd.isGreaterThan(amountNeededUsd)
        : false;
      color = !isAllowed ? STYLES.COLORS.RED : STYLES.COLORS.MEDIUM_GRAY;
      value =
        (amountNeededUsd - walletCoin.amount_usd.toNumber()) /
        currencyRatesShort[coin.short.toLowerCase()];
      additionalCryptoAmount = formatter.crypto(value, coin.short, {
        precision: 2,
      });

      await this.setState({
        additionalInfoExplanation: "required for a principal payout.",
        cryptoAmount,
        amountUsd,
        isAllowed,
        color,
        additionalCryptoAmount,
      });
    } else if (type === COIN_CARD_TYPE.LOAN_PAYMENT_COIN_CARD) {
      color =
        additionalCryptoAmount > 0
          ? STYLES.COLORS.RED
          : STYLES.COLORS.MEDIUM_GRAY;
      await this.setState({
        additionalInfoExplanation:
          "required for a first month of loan interest payment.",
        cryptoAmount,
        amountUsd,
        isAllowed,
        color,
        additionalCryptoAmount,
        // TODO when API is completed add state: additionalCryptoAmount
      });
    } else if (type === COIN_CARD_TYPE.MARGIN_COLLATERAL_COIN_CARD) {
      const amountNeededInCoin =
        Number(marginCall.margin_call_usd_amount) /
        currencyRatesShort[coin.short.toLowerCase()];
      isAllowed = coin.amount >= amountNeededInCoin;
      color = !isAllowed ? STYLES.COLORS.RED : STYLES.COLORS.MEDIUM_GRAY;

      // additionalCryptoAmount - margin call value
      // let marginCallValue;

      if (isMarginCall && amountNeededInCoin > Number(coin.amount)) {
        // marginCallValue = formatter.crypto(
        //   amountNeededInCoin - Number(coin.amount),
        //   coin.short,
        //   { precision: 4 }
        // );
      } else {
        // marginCallValue = formatter.crypto(amountNeededInCoin, coin.short, {
        //   precision: 4,
        // });
      }

      await this.setState({
        additionalInfoExplanation: "required.",
        cryptoAmount,
        amountUsd,
        isAllowed,
        additionalCryptoAmount,
        color,
      });
    }
  };

  renderAdditionalAmountRequired = () => {
    const { coin, loan } = this.props;
    const { amountUsd, additionalCryptoAmount } = this.state;

    const additionalUsd = loan.monthly_payment - amountUsd;
    // const amountCrypto = amountUsd / cryptoAmount;

    const style = PaymentCardStyle();
    return (
      <Card
        color={style.marginRequired.backgroundColor}
        style={style.marginRequired}
      >
        <CelText
          color={"white"}
          align={"left"}
          weight={"600"}
          type={"H3"}
        >{`${formatter.fiat(additionalUsd, "USD")}`}</CelText>
        <CelText color={"white"} align={"left"} weight={"300"} type={"H6"}>
          <CelText color={"white"} align={"left"} type={"H6"}>
            {`${formatter.crypto(additionalCryptoAmount, coin.short)} `}
          </CelText>
          additionally required
        </CelText>
      </Card>
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
    const { amountUsd, additionalCryptoAmount } = this.state;
    return (
      <View>
        <CelButton
          margin={"20 0 10 0"}
          onPress={() =>
            actions.navigateTo("Deposit", {
              coin: coin.short,
              reason,
              amountUsd,
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
          onPress={isAllowed ? () => handleSelectCoin(coin.short) : null}
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
                <View style={{ opacity: isAllowed ? 1 : 0.4 }}>
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
