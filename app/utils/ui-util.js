import moment from "moment";
import { Platform } from "react-native";
import store from "../redux/store";
import { hasPassedKYC } from "./user-util/user-util";
import { getSecureStoreKey } from "./storage-util";
import { STORAGE_KEYS } from "../constants/DATA";
import { LOAN_PAYMENT_REASONS } from "../constants/UI";
import { COLOR_KEYS } from "../constants/COLORS";

export {
  isLoanBannerVisible,
  isBiometricsBannerVisible,
  isIos,
  presentTime,
  renderAdditionalDepositCardContent,
};

function isIos() {
  return Platform.OS === "ios";
}

function isLoanBannerVisible() {
  const { isBannerVisible } = store.getState().ui;
  const { allLoans } = store.getState().loans;
  const { loan } = store.getState().compliance;

  const hasLoans = !!allLoans.length;

  return !!(hasPassedKYC() && loan.allowed && !hasLoans && isBannerVisible);
}

async function isBiometricsBannerVisible() {
  const dontShow = JSON.parse(
    await getSecureStoreKey(STORAGE_KEYS.BIOMETRIC_BANNER)
  );
  return dontShow;
}

function presentTime(time, shouldCalculate = false) {
  const now = moment.utc();
  const deactivatedAt = moment.utc(time);
  const diff = deactivatedAt.diff(now);
  const days = Math.abs(moment.duration(diff).days());
  let hours = Math.abs(moment.duration(diff).hours());
  let minutes = Math.abs(moment.duration(diff).minutes());
  if (shouldCalculate) {
    hours = 23 - hours;
    minutes = 59 - minutes;
  }
  if (Number(minutes) < 10) minutes = `0${minutes}`;
  if (Number(hours) < 10) hours = `0${hours}`;

  return {
    days,
    hours,
    minutes,
  };
}

function renderAdditionalDepositCardContent(
  reason,
  amountUsd,
  additionalCryptoAmount
) {
  const color =
    reason !== LOAN_PAYMENT_REASONS.MARGIN_CALL
      ? COLOR_KEYS.PRIMARY_BUTTON
      : COLOR_KEYS.NEGATIVE_STATE;

  let text;
  let usd;
  let crypto;

  switch (reason) {
    case LOAN_PAYMENT_REASONS.COLLATERAL:
      text = "required for loan collateral.";
      usd = amountUsd;
      crypto = additionalCryptoAmount;
      break;
    case LOAN_PAYMENT_REASONS.MANUAL_INTEREST:
    case LOAN_PAYMENT_REASONS.INTEREST:
    case LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT:
      text = "required for the next interest payment.";
      usd = amountUsd;
      crypto = additionalCryptoAmount;
      break;
    case LOAN_PAYMENT_REASONS.PRINCIPAL:
      text = "required for the principal payment.";
      usd = amountUsd;
      crypto = additionalCryptoAmount;
      break;
    case LOAN_PAYMENT_REASONS.MARGIN_CALL:
      text = "required to close the Margin Call";
      usd = amountUsd;
      crypto = additionalCryptoAmount;
      break;
    default:
      text = "required";
      usd = 0;
      crypto = 0;
  }

  return {
    color,
    text,
    usd,
    crypto,
  };
}
