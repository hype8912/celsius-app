import moment from "moment";

import store from "../redux/store";
import { COIN_CARD_TYPE } from "../constants/UI";
import formatter from "./formatter";
import { COLOR_KEYS } from "../constants/COLORS";
import { SCREENS } from "../constants/SCREENS";

const loanPaymentUtil = {
  calculateAdditionalPayment,
  isPrincipalWeekAway,
  isSameInterestDay,
  shouldNotCheckForAlerts,
};

function calculateAdditionalPayment(
  loan = undefined,
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
  let usdAmount;
  let isAllowed;
  let collateralAmount;
  let cryptoAmount;
  let color;
  let coin;
  let amountToPay;

  if (loan) {
    amountToPay = loan.installments_to_be_paid.total;
  }

  if (!additionalCoin) {
    if (cardType === COIN_CARD_TYPE.MARGIN_CALL) {
      coin = loan.coin;
    } else {
      coin = loan.coin_loan_asset !== "USD" ? loan.coin_loan_asset : loan.coin;
    }
    loanCoin = walletSummary.coins.find(c => c.short === coin);
    currency = currencies.filter(
      c => c.short === loanCoin.short.toUpperCase()
    )[0];
    if (amountToPay) {
      hasEnough = loanCoin.amount_usd.isGreaterThan(amountToPay);
      additionalCryptoAmount =
        Number(amountToPay) -
        currency.market_quotes_usd.price * loanCoin.amount;
      additionalUsdAmount =
        Number(amountToPay) - loanCoin.amount_usd.toNumber();
      cryptoAmountToPay = loanCoin.amount
        .dividedBy(loanCoin.amount_usd)
        .multipliedBy(amountToPay);
    }
    cryptoAmount = loanCoin.amount.toNumber();
    usdAmount = loanCoin.amount_usd;
    isAllowed = usdAmount.isGreaterThan(0);
    const rate = currencyRatesShort[loanCoin.short.toLowerCase()];

    if (cardType === COIN_CARD_TYPE.PRINCIPAL) {
      hasEnough = usdAmount.isGreaterThan(loan.loan_amount_usd);
      color = !hasEnough ? COLOR_KEYS.NEGATIVE_STATE : COLOR_KEYS.PARAGRAPH;
      additionalCryptoAmount =
        (loan.loan_amount_usd - usdAmount.toNumber()) / rate;
      additionalUsdAmount = loan.loan_amount_usd - usdAmount.toNumber();
    }

    if (cardType === COIN_CARD_TYPE.MARGIN_CALL) {
      const marginCallUsdAmount = loan.margin_call.margin_call_usd_amount;
      hasEnough = usdAmount.isGreaterThanOrEqualTo(marginCallUsdAmount);
      color = !hasEnough ? COLOR_KEYS.NEGATIVE_STATE : COLOR_KEYS.PARAGRAPH;
      collateralAmount = Number(marginCallUsdAmount) / rate;
      additionalCryptoAmount = collateralAmount - cryptoAmount;
      additionalUsdAmount = Number(marginCallUsdAmount) - usdAmount.toNumber();
      usdAmount = Number(marginCallUsdAmount);
    }
  }

  if (additionalCoin) {
    currency = currencies.filter(
      c => c.short === additionalCoin.short.toUpperCase()
    )[0];
    const marketPriceUsd = currency.market_quotes_usd.price;
    loanCoin = walletSummary.coins.find(c => c.short === additionalCoin.short);
    cryptoAmount = loanCoin.amount.toNumber();
    usdAmount = loanCoin.amount_usd;
    if (cardType === COIN_CARD_TYPE.INTEREST) {
      hasEnough = usdAmount.isGreaterThanOrEqualTo(amountToPay);
      color = hasEnough ? COLOR_KEYS.PARAGRAPH : COLOR_KEYS.NEGATIVE_STATE;
      additionalUsdAmount = Number(amountToPay) - usdAmount.toNumber();
      additionalCryptoAmount =
        Number(amountToPay) - marketPriceUsd * cryptoAmount;
    }
    if (cardType === COIN_CARD_TYPE.COLLATERAL) {
      collateralAmount = Number(formData.loanAmount) * 2;
      hasEnough = additionalCoin.amount_usd.isGreaterThanOrEqualTo(
        collateralAmount
      );
      color = additionalCoin.amount_usd.isLessThan(collateralAmount)
        ? COLOR_KEYS.NEGATIVE_STATE
        : COLOR_KEYS.PARAGRAPH;
      cryptoAmount = formatter.crypto(
        additionalCoin.amount,
        additionalCoin.short,
        {
          precision: 2,
        }
      );
      usdAmount = additionalCoin.amount_usd.toNumber();
      if (currency) {
        additionalCryptoAmount =
          (Number(formData.loanAmount) * 2 - usdAmount) / marketPriceUsd;
        additionalUsdAmount = additionalCryptoAmount * marketPriceUsd;
      }
    }
  }

  return {
    coin: loanCoin || "ETH",
    hasEnough,
    isAllowed,
    color: color || COLOR_KEYS.PRIMARY_BUTTON,
    usdAmount: usdAmount || 0,
    additionalCryptoAmount: additionalCryptoAmount || 0,
    additionalUsdAmount: additionalUsdAmount || 0,
    cryptoAmount: cryptoAmount || 0,
    cryptoAmountToPay: cryptoAmountToPay || 0,
    collateralAmount: collateralAmount || 0,
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

function shouldNotCheckForAlerts(activeScreen) {
  return [
    SCREENS.MARGIN_CALL_OVERVIEW_SCREEN,
    SCREENS.INTEREST_PAYMENT_OVERVIEW,
    SCREENS.SINGLE_MARGIN_CALL_SCREEN,
    SCREENS.CHOOSE_PAYMENT_METHOD,
    SCREENS.PAYMENT_CEL,
    SCREENS.LOAN_PAYMENT_COIN,
    SCREENS.TRANSACTION_INTERSECTION
  ].includes(activeScreen);
}

export default loanPaymentUtil;
