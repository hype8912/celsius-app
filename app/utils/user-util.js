import store from '../redux/store'
import { KYC_STATUSES } from "../constants/DATA";

export {
  isCompanyMember,
  isUSCitizen,
  isCelsiusMember,
  hasPassedKYC,
  // TODO(ns) KYC: isRejecEted, isPending
  isMalisaPusonja,

}

/**
 * get if the user is a company member
 * @returns {boolean}
 */
function isCompanyMember () {
  const { profile } = store.getState().user
  if (!profile || !profile.email) return false
  return profile.email.includes('@mvpworkshop.co') || profile.email.includes('@celsius.network')
}

/**
 * get if the user is in any way connected to United States
 * @returns {boolean}
 */
function isUSCitizen () {
  const { profile } = store.getState().user
  return [profile.citizenship, profile.country].includes('United States')
}

/**
 * get if user is celsius member
 * @returns {boolean}
 */
function isCelsiusMember () {
  const celsiusMember = store.getState().user.profile.celsius_member;
  return celsiusMember
}

/**
 *  get if user has passed KYC
 * @returns {boolean}
 */
function hasPassedKYC () {
  const status = store.getState().user.profile.kyc ? store.getState().user.profile.kyc.status : null
  if (status) return status === KYC_STATUSES.passed || status === KYC_STATUSES.ico_passed
}

function isMalisaPusonja() {
  const { profile } = store.getState().user
  return profile.email === 'malisa.pusonja@gmail.com' || profile.email === 'lela.djokic@mvpworkshop.co'
}
