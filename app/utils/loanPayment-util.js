import moment from "moment";

import store from "../redux/store";
import { COIN_CARD_TYPE } from "../constants/UI";
import formatter from "./formatter";
import STYLES from "../constants/STYLES";

const loanPaymentUtil = {
  calculateAdditionalPayment,
  isPrincipalWeekAway,
  isSameInterestDay,
};

function calculateAdditionalPayment(
  loan,
  cardType = undefined,
  additionalCoin = undefined
) {
  const walletSummary = store.getState().wallet.summary;
  const currencies = store.getState().currencies.rates;
  const { formData } = store.getState().forms;
  const { currencyRatesShort } = store.getState().currencies;

  let loanCoin;
  let currency;
  let hasEnough;
  let additionalCryptoAmount;
  let additionalUsdAmount;
  let cryptoAmountToPay;
  let amountUsd;
  let isAllowed;
  let value;
  let collateralAmount;
  let cryptoAmount;
  let color;
  let coin;

  if (!additionalCoin) {
    if (cardType === COIN_CARD_TYPE.MARGIN_COLLATERAL_COIN_CARD) {
      coin = loan.coin;
    } else {
      coin = loan.coin_loan_asset !== "USD" ? loan.coin_loan_asset : loan.coin;
    }

    loanCoin = walletSummary.coins.find(c => c.short === coin);
    currency = currencies.filter(
      c => c.short === loanCoin.short.toUpperCase()
    )[0];
    hasEnough = loanCoin.amount_usd.isGreaterThan(loan.monthly_payment);
    additionalCryptoAmount =
      Number(loan.monthly_payment) -
      currency.market_quotes_usd.price * loanCoin.amount;
    additionalUsdAmount =
      Number(loan.monthly_payment) - loanCoin.amount_usd.toNumber();
    cryptoAmountToPay = loanCoin.amount
      .dividedBy(loanCoin.amount_usd)
      .multipliedBy(loan.monthly_payment);
    isAllowed = loanCoin.amount_usd.isGreaterThan(0);
    cryptoAmount = loanCoin.amount.toNumber();
    amountUsd = loanCoin.amount_usd.toNumber();

    if (cardType === COIN_CARD_TYPE.PRINCIPAL_PAYMENT_COIN_CARD) {
      hasEnough = loanCoin.amount_usd.isGreaterThan(loan.loan_amount_usd);
      color = !hasEnough ? STYLES.COLORS.RED : STYLES.COLORS.MEDIUM_GRAY;
      additionalCryptoAmount =
        (loan.loan_amount_usd - loanCoin.amount_usd.toNumber()) /
        currencyRatesShort[loanCoin.short.toLowerCase()];
      additionalUsdAmount =
        loan.loan_amount_usd - loanCoin.amount_usd.toNumber();
    }

    if (cardType === COIN_CARD_TYPE.MARGIN_COLLATERAL_COIN_CARD) {
      collateralAmount =
        Number(loan.margin_call.margin_call_usd_amount) /
        currencyRatesShort[loanCoin.short.toLowerCase()];
      hasEnough = loanCoin.amount_usd.isGreaterThanOrEqualTo(
        loan.margin_call.margin_call_usd_amount
      );
      additionalCryptoAmount = collateralAmount - loanCoin.amount.toNumber();
      additionalUsdAmount =
        Number(loan.margin_call.margin_call_usd_amount) -
        loanCoin.amount_usd.toNumber();
      amountUsd = Number(loan.margin_call.margin_call_usd_amount);
      color = !hasEnough ? STYLES.COLORS.RED : STYLES.COLORS.MEDIUM_GRAY;
    }
  }

  if (additionalCoin) {
    currency = currencies.filter(
      c => c.short === additionalCoin.short.toUpperCase()
    )[0];
    loanCoin = walletSummary.coins.find(c => c.short === additionalCoin.short);
    cryptoAmount = loanCoin.amount.toNumber();
    amountUsd = loanCoin.amount_usd.toNumber();

    if (cardType === COIN_CARD_TYPE.LOAN_PAYMENT_COIN_CARD) {
      additionalUsdAmount = Number(loan.monthly_payment) - amountUsd;
      additionalCryptoAmount =
        Number(loan.monthly_payment) -
        currency.market_quotes_usd.price * cryptoAmount;
      hasEnough = amountUsd > loan.monthly_payment;
      isAllowed = loanCoin.amount_usd.isGreaterThanOrEqualTo(
        loan.monthly_payment
      );
      color = hasEnough ? STYLES.COLORS.MEDIUM_GRAY : STYLES.COLORS.RED;
    }
    if (cardType === COIN_CARD_TYPE.COLLATERAL_COIN_CARD) {
      cryptoAmount = formatter.crypto(
        additionalCoin.amount,
        additionalCoin.short,
        {
          precision: 2,
        }
      );
      amountUsd = additionalCoin.amount_usd.toNumber();
      collateralAmount = Number(formData.loanAmount) * 2;
      isAllowed = additionalCoin.amount_usd >= collateralAmount;
      color =
        additionalCoin.amount_usd < collateralAmount
          ? STYLES.COLORS.RED
          : STYLES.COLORS.MEDIUM_GRAY;
      if (currency) {
        value =
          (formData.loanAmount * 2 - additionalCoin.amount_usd) /
          currency.market_quotes_usd.price;
      }
      additionalCryptoAmount = formatter.crypto(value, additionalCoin.short, {
        precision: 2,
      });
    }
  }

  return {
    coin: loanCoin || "ETH",
    hasEnough,
    additionalCryptoAmount: additionalCryptoAmount || 0,
    additionalUsdAmount: additionalUsdAmount || 0,
    cryptoAmountToPay: cryptoAmountToPay || 0,
    amountUsd: amountUsd || 0,
    collateralAmount: collateralAmount || 0,
    isAllowed,
    cryptoAmount: cryptoAmount || 0,
    color: color || STYLES.COLORS.CELSIUS_BLUE,
  };
}

function isPrincipalWeekAway(activeLoan) {
  if (activeLoan && !activeLoan.maturity_date) return;
  const currentDay = moment.utc();
  const isSevenDays = moment(activeLoan.maturity_date)
    .utc()
    .isSame(currentDay.add(7, "days"), "day");
  return isSevenDays;
}

function isSameInterestDay(activeLoan) {
  if (
    activeLoan &&
    activeLoan.installments_to_be_paid &&
    activeLoan.installments_to_be_paid.installments[0]
  ) {
    const currentDay = moment.utc();
    const newCurrentDay = moment.utc();
    const isThreeDays = moment(
      activeLoan.installments_to_be_paid.installments[0].to
    )
      .utc()
      .isSame(currentDay.add(3, "days"), "day");
    const isSevenDays = moment(
      activeLoan.installments_to_be_paid.installments[0].to
    )
      .utc()
      .isSame(newCurrentDay.add(7, "days"), "day");
    return {
      threeDays: isThreeDays ? 3 : false,
      sevenDays: isSevenDays ? 7 : false,
    };
  }
}

export default loanPaymentUtil;
