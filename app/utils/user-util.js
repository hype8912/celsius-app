import store from "../redux/store";
import { KYC_STATUSES } from "../constants/DATA";

export {
  isUserLoggedIn,
  isCompanyMember,
  isUSCitizen,
  isUSResident,
  isCelsiusMember,
  hasPassedKYC,
  isKYCRejectedForever,
  // TODO(ns) KYC: isRejecEted, isPending
  isMalisaPusonja,
  hasSSN,
  hasAddress,
  getUserKYCStatus,
};

/**
 * get if the user is a company member
 * @returns {boolean}
 */
function isUserLoggedIn() {
  const { profile } = store.getState().user;
  return !!profile.id;
}

/**
 * get if the user is a company member
 * @returns {boolean}
 */
function isCompanyMember() {
  const { profile } = store.getState().user;
  if (!profile || !profile.email) return false;
  return (
    profile.email.includes("@mvpworkshop.co") ||
    profile.email.includes("@celsius.network")
  );
}

/**
 * get if the user is in any way connected to United States
 * @returns {boolean}
 */
function isUSCitizen() {
  const { profile } = store.getState().user;
  return [profile.citizenship, profile.country].includes("United States");
}

/**
 * get if the user has an address in the US
 * @returns {boolean}
 */
function isUSResident() {
  const { profile } = store.getState().user;
  return profile.country === "United States";
}

/**
 * get if user is celsius member
 * @returns {boolean}
 */
function isCelsiusMember() {
  const celsiusMember = store.getState().user.profile.celsius_member;
  return celsiusMember;
}

/**
 *  get if user has passed KYC
 * @returns {string} status - one of KYC_STATUSES
 */
function getUserKYCStatus() {
  const status = store.getState().user.profile.kyc
    ? store.getState().user.profile.kyc.status
    : KYC_STATUSES.collecting;
  return status;
}

/**
 *  get if user has passed KYC
 * @returns {boolean}
 */
function hasPassedKYC() {
  const status = getUserKYCStatus();
  return status === KYC_STATUSES.passed || status === KYC_STATUSES.ico_passed;
}

/**
 * checks if user is rejected from BO
 * @returns {boolean}
 */
function isKYCRejectedForever() {
  const status = getUserKYCStatus();
  return status === KYC_STATUSES.permanently_rejected;
}

function isMalisaPusonja() {
  const { profile } = store.getState().user;
  return (
    profile.email === "malisa.pusonja@gmail.com" ||
    profile.email === "lela.djokic@mvpworkshop.co"
  );
}

/**
 * checks if user has SSN
 * @returns {boolean}
 */
function hasSSN() {
  const { profile } = store.getState().user;
  if (!isUSCitizen()) return true;

  return !!profile.ssn;
}

/**
 * checks if user has address
 * @returns {boolean}
 */
function hasAddress() {
  const { profile } = store.getState().user;

  return profile.street && profile.city && profile.country;
}
