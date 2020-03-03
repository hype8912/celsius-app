// TODO(fj): split into auth service and profile service?

import axios from 'axios'
import apiUrl from './api-url'

const usersService = {
  // TODO: auth service
  register,
  registerTwitter,
  registerFacebook,
  registerGoogle,
  login,
  googleLogin,
  facebookLogin,
  twitterLogin,
  resetPassword,
  sendResetLink,

  // TODO move to user-security-service
  invalidateSession,
  getUserSecurityOverview,

  // TODO move to user-kyc-service
  updateProfileAddressInfo,
  getProfileTaxpayerInfo,
  updateProfileTaxpayerInfo,

  // TODO move to user-data-service
  connectPhoneContacts,
  getConnectedContacts,
  getLinkedBankAccount,
  linkBankAccount,
  getCelsiusMemberStatus,
  getLoyaltyInfo,
  getUserAppSettings,
  setUserAppSettings,

  // TODO: keep in user service
  getPersonalInfo,
  updateProfileInfo,
  setProfileImage,
  addExpoPushToken,
}

/**
 * Registers a user with email/password
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#a6c7198c-d7a5-402d-b1ff-308da2def3ed
 *
 * @param {Object} user
 * @param {Object} user.first_name
 * @param {Object} user.last_name
 * @param {Object} user.email
 * @param {Object} user.password
 * @param {Object} user.referral_link_id
 * @return {Promise}
 */
function register (user) {
  return axios.post(`${apiUrl}/users/register`, user)
}

/**
 * Registers a user through Twitter
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#aade0752-df0f-4265-8917-929e4870fbd4
 *
 * @param {Object} twitterUser
 * @param {string} twitterUser.email
 * @param {string} twitterUser.first_name
 * @param {string} twitterUser.last_name
 * @param {string} twitterUser.twitter_id
 * @param {string} twitterUser.profile_picture
 * @param {string} twitterUser.access_token
 * @param {string} twitterUser.secret_token
 * @param {string} twitterUser.referral_link_id
 * @return {Promise}
 */
function registerTwitter (twitterUser) {
  return axios.post(`${apiUrl}/users/twitter`, twitterUser)
}

/**
 * Registers a user through Facebook
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#14c50dea-3b2d-4319-9c8f-0c1ac9dcfbbc
 *
 * @param {Object} facebookUser
 * @param {Object} facebookUser.email
 * @param {Object} facebookUser.first_name
 * @param {Object} facebookUser.last_name
 * @param {Object} facebookUser.facebook_id
 * @param {Object} facebookUser.access_token
 * @param {Object} facebookUser.referral_link_id
 * @return {Promise}
 */
function registerFacebook (facebookUser) {
  return axios.post(`${apiUrl}/users/facebook`, facebookUser)
}

/**
 * Registers a user through Google
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#ab2d7b2c-7507-4e84-a98c-0e064fc86451
 *
 * @param {Object} googleUser
 * @param {Object} googleUser.email
 * @param {Object} googleUser.first_name
 * @param {Object} googleUser.last_name
 * @param {Object} googleUser.google_id
 * @param {Object} googleUser.profile_picture
 * @param {Object} googleUser.access_token
 * @param {Object} googleUser.referral_link_id
 * @return {Promise}
 */
function registerGoogle (googleUser) {
  return axios.post(`${apiUrl}/users/google`, googleUser)
}


/**
 * Logs a user into Celsius with email/password
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#abf851b0-e170-4a3c-9018-bab17b9461d7
 *
 * @param {Object} user
 * @param {string} user.email
 * @param {string} user.password
 * @return {Promise}
 */
function login ({ email, password }) {
  return axios.post(`${apiUrl}/users/login`, {
    email,
    password
  })
}

/**
 * Send an email to the user with the reset password link
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#bf6e3009-2736-4a6e-b1a0-c0928c704550
 *
 * @param {string} email
 * @return {Promise}
 */
function sendResetLink (email) {
  return axios.post(`${apiUrl}/users/send_reset_link`, {
    email
  })
}

/**
 * resets the password for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#413e806c-89d8-486f-b638-0d1e32832381
 *
 * @param {string} currentPassword
 * @param {string} newPassword
 * @return {Promise}
 */
function resetPassword (currentPassword, newPassword) {
  return axios.post(`${apiUrl}/users/reset_password`, {
    current_password: currentPassword,
    new_password: newPassword
  })
}

/**
 * Logs a user into Celsius through Google
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#c74fa667-84dc-41eb-a760-aa09f74019f6
 *
 * @param {Object} googleUser
 * @param {string} googleUser.email
 * @param {string} googleUser.first_name
 * @param {string} googleUser.last_name
 * @param {string} googleUser.google_id
 * @param {string} googleUser.profile_picture
 * @param {string} googleUser.access_token
 * @return {Promise}
 */
function googleLogin (googleUser) {
  return axios.post(`${apiUrl}/users/google/login`, googleUser)
}

/**
 * Logs a user into Celsius through Facebook
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#cfbd2ca1-c1a7-492f-b6e1-4c9e4f1a6da0
 *
 * @param {Object} facebookUser
 * @param {string} facebookUser.email
 * @param {string} facebookUser.first_name
 * @param {string} facebookUser.last_name
 * @param {string} facebookUser.facebook_id
 * @param {string} facebookUser.access_token
 * @return {Promise}
 */
function facebookLogin (facebookUser) {
  return axios.post(`${apiUrl}/users/facebook/login`, facebookUser)
}

/**
 * Logs a user into Celsius through Twitter
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#6d7f3d95-b44b-41c2-a888-6d07fdfb82ae
 *
 * @param {Object} twitterUser
 * @param {string} twitterUser.email
 * @param {string} twitterUser.first_name
 * @param {string} twitterUser.twitter_id - id from Twitter
 * @param {string} twitterUser.access_token
 * @param {string} twitterUser.secret_token
 * @return {Promise}
 */
function twitterLogin (twitterUser) {
  return axios.post(`${apiUrl}/users/twitter/login`, twitterUser)
}

/**
 * Get profile info for logged in user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#52468b39-6440-417c-9e53-35471dbdd0e0
 *
 * @return {Promise}
 */
function getPersonalInfo () {
  return axios.get(`${apiUrl}/me`)
}


/**
 * Gets taxpayer info for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#46f917e4-9e14-4531-bebd-a11ccf9e1fc2
 *
 * @return {Promise}
 */
function getProfileTaxpayerInfo () {
  return axios.get(`${apiUrl}/me/taxpayer_info`)
}

/**
 * Updates user info
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#cd83aca2-11a1-42d2-ad08-3df6b3d2d090
 * @todo check reusability and add params, check update method, duplicate
 *
 * @param {Object} profileInfo
 * @return {Promise}
 */
function updateProfileInfo (profileInfo) {
  return axios.patch(`${apiUrl}/me`, profileInfo)
}

/**
 * Updates address info for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#55dd21a1-2e99-4c6d-865c-a605eaef5b57
 *
 * @param {Object} profileAddressInfo
 * @param {string} profileAddressInfo.country - eg. "Serbia"
 * @param {string} profileAddressInfo.state - US state
 * @param {string} profileAddressInfo.city - eg. "Beograd"
 * @param {string} profileAddressInfo.zip - eg. "11FG0"
 * @param {string} profileAddressInfo.street
 * @param {string} [profileAddressInfo.building_number] - eg. "456b"
 * @param {string} [profileAddressInfo.flat_number]
 * @return {Promise}
 */
function updateProfileAddressInfo (profileAddressInfo) {
  return axios.post(`${apiUrl}/me/address`, profileAddressInfo)
}

/**
 * Updates taxpayer info for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#ce921baa-1d5e-4cca-986c-ed1bcfb393ff
 *
 * @param {Object} profileTaxpayerInfo
 * @param {string} profileTaxpayerInfo.ssn
 * @param {string} profileTaxpayerInfo.itin
 * @param {string} profileTaxpayerInfo.national_id
 * @return {Promise}
 */
function updateProfileTaxpayerInfo (profileTaxpayerInfo) {
  return axios.post(`${apiUrl}/me/taxpayer_info`, profileTaxpayerInfo)
}

/**
 * Updates profile image for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#029631f2-67bc-48c2-8463-f0d2572145a0
 *
 * @param {Object} image - file object
 * @return {Promise}
 */
function setProfileImage (image) {
  const formData = new FormData()
  let pictureUrl
  if (typeof image === 'string' && image.includes('https')) {
    pictureUrl = { profile_picture_url: image }
  } else {
    formData.append('profile_picture', {
      name: 'picture.jpg',
      type: 'image/jpg',
      uri: image.uri
    })
  }

  return axios.post(
    `${apiUrl}/user/profile/profile_picture`,
    pictureUrl || formData
  )
}

/**
 * Adds Expo push notification token to user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#cae21d46-1014-4c5e-b909-8a821767c16d
 *
 * @param {string} token
 * @return {Promise}
 */
async function addExpoPushToken (token) {
  return axios.put(`${apiUrl}/users/expoPushToken`, {
    expo_push_token: token
  })
}

/**
 * Gets Loyalty info for user
 *
 * @returns {Promise}
 */

function getLoyaltyInfo() {
  return axios.get(`${apiUrl}/user/loyalty`)
}

/**
 * Connects contacts from device phone book
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#0b117565-209f-4b10-8f5a-a02c63815330
 *
 * @param {Object} contacts - @todo check payload
 * @return {Promise}
 */
function connectPhoneContacts (contacts) {
  return axios.post(`${apiUrl}/users/friends/contacts`, { contacts })
}

/**
 * Gets all contacts for user
 * @note not in Postman
 *
 * @return {Promise}
 */
function getConnectedContacts () {
  return axios.get(`${apiUrl}/users/friends`)
}

/**
 * Gets users bank account for loan
 * @see https://documenter.getpostman.com/view/4207695/S11RLvpb#eec4ff11-563e-48bb-82c1-0d6d3fb78ba2
 *
 * @return {Promise}
 */
function getLinkedBankAccount () {
  return axios.get(`${apiUrl}/bank/account`)
}

/**
 * Creates bank account for user
 * @see https://documenter.getpostman.com/view/4207695/S11RLvpb#230b4a7d-0055-4d51-81e9-7397fdc29278
 *
 * @param {number} bankAccountInfo
 * @param {string} bankAccountInfo.bank_name
 * @param {string} bankAccountInfo.bank_routing_number
 * @param {string} bankAccountInfo.account_type
 * @param {string} bankAccountInfo.bank_account_number
 * @param {string} bankAccountInfo.iban
 * @param {string} bankAccountInfo.swift
 * @return {Promise}
 */
function linkBankAccount (bankAccountInfo) {
  return axios.post(`${apiUrl}/bank/account`, bankAccountInfo)
}

/**
 * Log the user out from all devices
 * @see https://documenter.getpostman.com/view/4207695/S11RLvpb#00bf42d5-3bd7-47e8-a8b8-d31e61f96f83
 *
 * @return {Promise}
 */
function invalidateSession () {
  return axios.post(`${apiUrl}/user/invalidate_session`)
}

/**
 * Get the user member status
 * @return {Promise}
 */
function getCelsiusMemberStatus () {
  return axios.post(`${apiUrl}/user/membership`)
}

/**
 * Get user app setings
 * @returns {Promise}
 */
function getUserAppSettings () {
  return axios.get(`${apiUrl}/user_app_settings`)
}

function setUserAppSettings (data) {
  return axios.put(`${apiUrl}/user_app_settings`, data)
}

/**
 * Get user security overview
 * @returns {Promise}
 */
function getUserSecurityOverview() {
  return axios.get(`${apiUrl}/user/security_overview`)
}

export default usersService
