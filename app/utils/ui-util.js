import { Platform } from "react-native";
import store from "../redux/store";
import { hasPassedKYC } from "./user-util";
import { getSecureStoreKey } from "./expo-storage";
import { DONT_SHOW_AGAIN } from "../constants/UI";

export { isLoanBannerVisible, isBiometricsBannerVisible, isIos };

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
    await getSecureStoreKey(DONT_SHOW_AGAIN.BIOMETRIC_BANNER)
  );
  return dontShow;
}
