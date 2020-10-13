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

import { getColor, getTheme } from "../../../utils/styles-util";
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
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import { presentTime } from "../../../utils/ui-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { SCREENS } from "../../../constants/SCREENS";
import Badge from "../../atoms/Badge/Badge";

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
      LOAN_PAYMENT_REASONS.MANUAL_INTEREST,
      LOAN_PAYMENT_REASONS.INTEREST_SETTINGS,
      LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT,
      LOAN_PAYMENT_REASONS.PRINCIPAL,
      LOAN_PAYMENT_REASONS.MARGIN_CALL
    ),
    loan: PropTypes.instanceOf(Object),
    number: PropTypes.number,
    isOverview: PropTypes.bool,
  };

  static defaultProps = {
    isOverview: false,
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
    const name = formatter.capitalize(coin.name);
    const currency = currencies.filter(
      c => c.short === coin.short.toUpperCase()
    )[0];
    this.setState({ name, currency });

    if (type === COIN_CARD_TYPE.COLLATERAL) {
      const collateralPayment = loanPaymentUtil.calculateAdditionalPayment(
        loan,
        COIN_CARD_TYPE.COLLATERAL,
        coin
      );
      this.setState({
        additionalInfoExplanation: "required.",
        cryptoAmount: collateralPayment.cryptoAmount,
        usdAmount: collateralPayment.usdAmount,
        additionalCryptoAmount: collateralPayment.additionalCryptoAmount,
        color: collateralPayment.color,
        isAllowed: collateralPayment.isAllowed,
        hasEnough: collateralPayment.hasEnough,
        additionalUsdAmount: collateralPayment.additionalUsdAmount,
      });
    } else if (type === COIN_CARD_TYPE.PRINCIPAL) {
      const principalPayment = loanPaymentUtil.calculateAdditionalPayment(
        loan,
        COIN_CARD_TYPE.PRINCIPAL
      );
      this.setState({
        additionalInfoExplanation: "required for a principal payout.",
        cryptoAmount: principalPayment.cryptoAmount,
        usdAmount: principalPayment.usdAmount,
        color: principalPayment.color,
        additionalCryptoAmount: principalPayment.additionalCryptoAmount,
        hasEnough: principalPayment.hasEnough,
      });
    } else if (type === COIN_CARD_TYPE.INTEREST) {
      const loanPayment = loanPaymentUtil.calculateAdditionalPayment(
        loan,
        COIN_CARD_TYPE.INTEREST,
        coin
      );
      this.setState({
        additionalInfoExplanation:
          "required for a first month of loan interest payment.",
        cryptoAmount: loanPayment.cryptoAmount,
        usdAmount: loanPayment.usdAmount,
        color: loanPayment.color,
        additionalCryptoAmount: loanPayment.additionalCryptoAmount,
        additionalUsdAmount: loanPayment.additionalUsdAmount,
        hasEnough: loanPayment.hasEnough,
        // TODO when API is completed add state: additionalCryptoAmount
      });
    } else if (type === COIN_CARD_TYPE.MARGIN_CALL) {
      const marginCallPayment = loanPaymentUtil.calculateAdditionalPayment(
        loan,
        COIN_CARD_TYPE.MARGIN_CALL
      );
      this.setState({
        additionalInfoExplanation: "additionally required.",
        cryptoAmount: marginCallPayment.cryptoAmount,
        usdAmount: marginCallPayment.usdAmount,
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
            actions.navigateTo(SCREENS.DEPOSIT, {
              coin: coin.short,
              reason,
              usdAmount: additionalUsdAmount,
              additionalCryptoAmount,
            })
          }
        >
          {`Deposit more ${coin.short}`}
        </CelButton>
        {marginCall ? (
          <CelButton
            onPress={() =>
              actions.navigateTo(SCREENS.DEPOSIT, { coin: coin.short })
            }
            basic
            margin={"10 0 10 0"}
          >
            Buy more collateral
          </CelButton>
        ) : null}
      </View>
    );
  };

  getTypeOfPaymentTitle = (reason, loan) => {
    const amountOfInstalments =
      loan.installments_to_be_paid.installments.length;
    const text =
      amountOfInstalments > 1 ? `${amountOfInstalments} Months` : `Monthly`;
    switch (reason) {
      case LOAN_PAYMENT_REASONS.INTEREST_SETTINGS:
        return "";
      case LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT:
      case LOAN_PAYMENT_REASONS.MANUAL_INTEREST:
        return `${text} Interest Payment Amount: `;
      case LOAN_PAYMENT_REASONS.MARGIN_CALL:
        return "Collateral Amount Due: ";
      case LOAN_PAYMENT_REASONS.PRINCIPAL:
        return "Principal Due: ";
    }
  };

  marginResolve = loanId => {
    const { actions, isOverview } = this.props;
    const style = PaymentCardStyle();

    if (isOverview)
      return (
        <View style={style.buttonsWrapper}>
          <CelModalButton
            buttonStyle={"secondary"}
            position={"single"}
            onPress={() =>
              actions.navigateTo(SCREENS.SINGLE_MARGIN_CALL_SCREEN, {
                id: loanId,
              })
            }
          >
            Resolve Margin Call
          </CelModalButton>
        </View>
      );
    return this.marginCallOptions();
  };

  marginCallOptions = () => {
    const { handleSelectCoin, coin, loan, actions } = this.props;
    const {
      additionalCryptoAmount,
      hasEnough,
      additionalUsdAmount,
    } = this.state;

    return (
      <View>
        <Card margin={"0 0 10 0"} color={getColor(COLOR_KEYS.BACKGROUND)}>
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
            Add Collateral
          </CelButton>
        ) : (
          <CelButton
            onPress={() => {
              actions.navigateTo(SCREENS.DEPOSIT, {
                reason: LOAN_PAYMENT_REASONS.MARGIN_CALL,
                coin: coin.short,
                usdAmount: additionalUsdAmount,
                additionalCryptoAmount,
                isMarginCall: loan.margin_call.margin_call_detected,
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
            actions.navigateTo(SCREENS.GET_COINS_ENTER_AMOUNT);
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
      number,
      isOverview,
    } = this.props;
    const {
      cryptoAmount,
      usdAmount,
      color,
      currency,
      isAllowed,
      additionalCryptoAmount,
      additionalInfoExplanation,
      hasEnough,
      collateralAmount,
      additionalUsdAmount,
    } = this.state;
    const style = PaymentCardStyle();
    const theme = getTheme();

    if (currency && cryptoAmount && type === COIN_CARD_TYPE.COLLATERAL) {
      return (
        <CollateralCoinCard
          actions={actions}
          usdAmount={usdAmount}
          additionalUsdAmount={additionalUsdAmount}
          additionalCryptoAmount={additionalCryptoAmount}
          additionalInfoExplanation={additionalInfoExplanation}
          cardColor={!isAllowed ? null : style.cardStyle}
          color={color}
          coin={coin}
          currency={currency}
          cryptoAmount={cryptoAmount}
          hasEnough={hasEnough}
          onPress={hasEnough ? () => handleSelectCoin(coin.short) : null}
          opacity={isLoading ? 0.7 : 1}
        />
      );
    }

    if (!loan) return null;
    let time;
    const loanNumber = number + 1;

    if (loan && loan.margin_call && type === COIN_CARD_TYPE.MARGIN_CALL)
      time = presentTime(loan.margin_call.margin_call_detected, true);

    if (currency && cryptoAmount && type !== COIN_CARD_TYPE.COLLATERAL) {
      const amountToPay =
        type !== COIN_CARD_TYPE.MARGIN_CALL
          ? {
              crypto: formatter.crypto(
                Number(loan.installments_to_be_paid.total) /
                  currency.market_quotes_usd.price,
                currency.short
              ),
              usd: formatter.fiat(loan.installments_to_be_paid.total, "USD"),
            }
          : {
              crypto: formatter.crypto(collateralAmount, coin.short, {}),
              usd: formatter.fiat(usdAmount, "USD"),
            };
      return (
        <Card
          onPress={hasEnough ? () => handleSelectCoin(coin.short) : null}
          color={hasEnough ? null : style.cardStyle}
          opacity={isLoading ? 0.7 : 1}
        >
          {type === COIN_CARD_TYPE.MARGIN_CALL && isOverview && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {loanNumber ? (
                  <CelText>{`Margin Call #${loanNumber}`}</CelText>
                ) : null}
                <CelText>{`Loan - #${loan.id}`}</CelText>
              </View>
              <Separator margin={"10 0 10 0"} />
            </View>
          )}
          {reason === LOAN_PAYMENT_REASONS.INTEREST_SETTINGS ? null : (
            <CelText
              weight={"300"}
              type={"H6"}
              align={"left"}
              margin={"0 0 10 0"}
            >
              {this.getTypeOfPaymentTitle(reason, loan)}
            </CelText>
          )}
          <View
            key={coin.name}
            style={[
              style.mainContainer,
              { marginBottom: isOverview ? 50 : 10 },
            ]}
          >
            <View style={style.coinInfo}>
              <View style={style.iconContainer}>
                <CoinIcon
                  customStyles={[
                    style.coinImage,
                    { opacity: hasEnough ? 1 : 0.4 },
                  ]}
                  theme={theme}
                  url={currency.image_url}
                  coinShort={currency.short}
                />
              </View>
              {type && reason !== LOAN_PAYMENT_REASONS.INTEREST_SETTINGS ? (
                <View>
                  <CelText weight={"600"} align="left" type="H3">
                    {amountToPay.crypto}
                  </CelText>
                  <CelText weight={"300"} align="left" type="H5">
                    {amountToPay.usd}
                  </CelText>
                </View>
              ) : (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <CelText weight={"600"} align="left" type="H3">
                      {`Set ${currency.short}`}
                    </CelText>
                    {currency.short ===
                      loan.loanPaymentSettings.interest_payment_asset && (
                      <Badge
                        color={getColor(COLOR_KEYS.POSITIVE_STATE)}
                        style={{ opacity: 1, zIndex: 100 }}
                      >
                        <CelText type="H6" color="white">
                          {`Currently Active`}
                        </CelText>
                      </Badge>
                    )}
                  </View>
                </View>
              )}
            </View>
            <Separator margin={"10 0 10 0"} />
            {type !== COIN_CARD_TYPE.MARGIN_CALL ? (
              <View style={[{ flexWrap: "wrap" }, style.textContainer]}>
                <CelText weight={"300"} align="left">
                  In wallet:{" "}
                </CelText>
                <View>
                  <CelText
                    weight={"300"}
                    align="right"
                    style={{ color: getColor(color) }}
                  >
                    {formatter.crypto(cryptoAmount, coin.short, {
                      precision: 2,
                    })}
                    <CelText
                      weight={"300"}
                      align="right"
                      style={{ color: getColor(color) }}
                    >
                      {" | "}
                      <CelText
                        weight={"300"}
                        align="right"
                        style={{ color: getColor(color) }}
                      >
                        {formatter.fiat(usdAmount, "USD")}
                      </CelText>
                    </CelText>
                  </CelText>
                </View>
              </View>
            ) : (
              <View>
                <View>
                  <CelText weight={"300"} type={"H6"}>
                    Current available balance in wallet:
                  </CelText>
                  <CelText
                    color={getColor(color)}
                    margin={"5 0 0 0"}
                    type={"H6"}
                  >
                    {formatter.crypto(cryptoAmount, coin.short, {
                      precision: 2,
                    })}
                  </CelText>
                  {!hasEnough && (
                    <AdditionalAmountCard
                      margin={"10 0 10 0"}
                      additionalCryptoAmount={additionalCryptoAmount}
                      color={color}
                      additionalUsd={additionalUsdAmount}
                      text={additionalInfoExplanation}
                      coin={coin.short}
                    />
                  )}
                </View>
              </View>
            )}
            {usdAmount.isLessThan(loan.monthly_payment) &&
            reason !== LOAN_PAYMENT_REASONS.INTEREST_SETTINGS ? (
              <View>
                {this.renderAdditionalAmountRequired()}
                {this.renderDepositMore()}
              </View>
            ) : null}
            {isOverview &&
              loan &&
              loan.margin_call &&
              type === COIN_CARD_TYPE.MARGIN_CALL && (
                <Card
                  margin={"10 0 0 0"}
                  color={getColor(COLOR_KEYS.BACKGROUND)}
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
                    <Card color={getColor(COLOR_KEYS.NEGATIVE_STATE)}>
                      <CelText weight={"300"} type={"H6"} color={"white"}>
                        Your loan is now in default and you are at risk of
                        collateral liquidation. We advise you to contact your
                        loan manager now.
                      </CelText>
                    </Card>
                  )}
                </Card>
              )}
          </View>

          {type === COIN_CARD_TYPE.MARGIN_CALL && this.marginResolve(loan.id)}
        </Card>
      );
    }
    return null;
  };
}

export default PaymentCard;
