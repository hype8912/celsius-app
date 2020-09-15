import moment from "moment";
import { Platform } from "react-native";
import store from "../redux/store";
import { hasPassedKYC } from "./user-util/user-util";

export { isLoanBannerVisible, isIos, presentTime };

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

function presentTime(time, shouldCalculate = false) {
  const now = moment.utc();
  const deactivatedAt = moment.utc(time);
  const diff = deactivatedAt.diff(now);
  const days = Math.abs(moment.duration(diff).days());
  let hours = Math.abs(moment.duration(diff).hours());
  let minutes = Math.abs(moment.duration(diff).minutes());
  if (shouldCalculate) {
    hours = 23 - hours;
    minutes = 60 - minutes;
  }
  if (Number(minutes) < 10) minutes = `0${minutes}`;
  if (Number(hours) < 10) hours = `0${hours}`;

  return {
    days,
    hours,
    minutes,
  };
}
