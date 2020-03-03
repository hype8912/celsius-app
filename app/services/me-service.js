import axios from 'axios'
import apiUrl from './api-url'

const meService = {
  // TODO move to user/user profile service
  sendVerificationSMS,
  verifySMS,

  // TODO move to user-kyc-service
  startKYC,
  createKYCDocuments,
  getKYCDocuments,
  getKYCStatus,

  // TODO move to user-security-service
  setPin,
  checkPin,
  changePin,
  checkTwoFactor
}

/**
 * Send SMS for phone verification to user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#76d35f2e-d523-4f2a-858e-ca33cc173f55
 *
 * @returns {Promise}
 */
function sendVerificationSMS () {
  return axios.post(`${apiUrl}/me/sms/send`, {
    fourDigit: true
  })
}

/**
 * Verifies phone number with code from SMS
 * @see https://documenter.getpostman.com/view/4207695/celsius/RW1aHzQg#55e40ec1-a2c0-485a-9442-3a12b8eebbbb
 *
 * @param {string} verificationCode - eg. '123456'
 * @returns {Promise}
 */
function verifySMS (verificationCode) {
  return axios.post(`${apiUrl}/me/sms/verify`, {
    verification_code: verificationCode
  })
}

/**
 * Start the KYC process on Onfido for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#0846a0d3-ae4f-4ee6-a6c0-fa38230b2f1c
 * @todo: maybe move to kycService?
 *
 * @returns {Promise}
 */
function startKYC () {
  return axios.post(`${apiUrl}/me/kyc/start`)
}

/**
 * Gets KYC status for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#f346333f-db08-4e97-ab03-df9410b03809
 * @todo: maybe move to kycService?
 *
 * @returns {Promise}
 */
function getKYCStatus () {
  return axios.get(`${apiUrl}/me/kyc/status`)
}

// Docs: https://documenter.getpostman.com/view/4207695/celsius/RW1aHzQg#9dfb9269-c3af-4723-8ec9-f62b380b3892

/**
 * Gets kyc documents for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#9dfb9269-c3af-4723-8ec9-f62b380b3892
 * @todo: maybe move to kycService?
 *
 * @returns {Promise}
 */
function getKYCDocuments () {
  return axios.get(`${apiUrl}/me/documents`)
}

// Docs: https://documenter.getpostman.com/view/4207695/celsius/RW1aHzQg#10e4b34c-ebc6-4b0f-a0d0-c2fcf97d74c4

/**
 * Creates KYC documents for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#10e4b34c-ebc6-4b0f-a0d0-c2fcf97d74c4
 * @todo: maybe move to kycService?
 *
 * @returns {Promise}
 */
function createKYCDocuments (documents) {
  const formData = new FormData()
  formData.append('document_front_image', {
    name: 'front.jpg',
    type: 'image/jpg',
    uri: documents.front.uri
  })
  if (documents.back) {
    formData.append('document_back_image', {
      name: 'back.jpg',
      type: 'image/jpg',
      uri: documents.back.uri
    })
  }
  formData.append('type', documents.type)
  return axios.put(`${apiUrl}/user/profile/documents`, formData)
}

/**
 * Sets PIN number for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#2da2217f-17a0-4d2f-bcb7-6fc31dba6a68
 *
 * @para {Object} data
 * @para {string} data.pin - eg. '1111'
 * @para {string} data.pin_confirm - eg. '1111'
 * @returns {Promise}
 */
function setPin (data) {
  return axios.post(`${apiUrl}/me/pin/set`, data)
}

/**
 * Checks pin for user
 * @note endpoint not in postman
 *
 * @param {string} pin - eg. '1111'
 * @returns {Promise}
 */
function checkPin (pin) {
  return axios.post(`${apiUrl}/me/pin/check`, { pin })
}

/**
 * Changes PIN number for the user
 * @note https://documenter.getpostman.com/view/4207695/S11RLvpb#fd597763-179d-426a-88da-379b42f7a902
 *
 * @param {Object} pinData
 * @param {string} pinData.pin - eg. '1111'
 * @param {string} pinData.new_pin - eg. '1234'
 * @param {string} pinData.new_pin_confirm - eg. '1234'
 * @returns {Promise}
 */
function changePin (pinData) {
  return axios.post(`${apiUrl}/user/change_pin`, pinData)
}

/**
 * Checks 2FA code for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#73721752-2e5c-43b2-ab0d-64297b5f9f3b
 * @todo: move to twoFactorService
 *
 * @param {string} code - eg. '123456'
 * @returns {Promise}
 */
function checkTwoFactor (code) {
  return axios.post(`${apiUrl}/me/twoFactor/check`, {
    twoFactorCode: code
  })
}

export default meService
