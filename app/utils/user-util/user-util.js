import store from "../../redux/store";
import { KYC_STATUSES, PRIMETRUST_KYC_STATES } from "../../constants/DATA";

export {
  isUserLoggedIn,
  isCompanyMember,
  isUSCitizen,
  isUSResident,
  isForPrimeTrustKYC,
  hasPassedKYC,
  isPendingKYC,
  isKYCRejectedForever,
  hasSSN,
  hasAddress,
  getUserKYCStatus,
  mapProfile,
};

/**
 * get if the user is a logged in
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
 * Checks if user should go through PrimeTrust KYC
 * @returns {boolean}
 */
function isForPrimeTrustKYC() {
  const { profile } = store.getState().user;
  const { formData } = store.getState().forms;
  return (
    PRIMETRUST_KYC_STATES.includes(formData.state) ||
    PRIMETRUST_KYC_STATES.includes(profile.state)
  );
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
 *  get if user is pending KYC verification
 * @returns {boolean}
 */
function isPendingKYC() {
  const status = getUserKYCStatus();
  return status === KYC_STATUSES.pending;
}

/**
 * checks if user is rejected from BO
 * @returns {boolean}
 */
function isKYCRejectedForever() {
  const status = getUserKYCStatus();
  return status === KYC_STATUSES.permanently_rejected;
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

/**
 * Change profile image URLs to https://
 * @params {Object} userProfile
 *
 * @returns {Object}
 */
function mapProfile(userProfile) {
  const profile = { ...userProfile };

  if (profile.profile_picture && profile.profile_picture.includes("http:/")) {
    profile.profile_picture = profile.profile_picture.replace(
      "http:",
      "https:"
    );
  }

  return profile;
}
