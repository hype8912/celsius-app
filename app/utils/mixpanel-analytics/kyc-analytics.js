import { sendEvent } from "../mixpanel-util";

const kycAnalytics = {
  kycProfileInfo,
  kycAddressInfo,
  kycDocumentsSubmitted,
  kycUtilityBillSubmitted,
  kycTaxPayerInfo,
  kycStarted,
}


/**
 * Fires an event when a user submit KYC personal details
 */
async function kycProfileInfo() {
  await sendEvent("KYC Personal Details Submitted");
}

/**
 * Fires an event when a user submit KYC address
 */
async function kycAddressInfo() {
  await sendEvent("KYC Address Submitted");
}

/**
 * Fires an event when a user submits KYC Document photos
 */
async function kycDocumentsSubmitted() {
  await sendEvent("KYC Documents Submitted");
}

/**
 * Fires an event when a user submits KYC utility bill photo
 */
async function kycUtilityBillSubmitted() {
  await sendEvent("KYC Utility Bill Submitted");
}

/**
 * Fires an event when a user submit KYC taxpayer info
 */
async function kycTaxPayerInfo() {
  await sendEvent("KYC Taxpayer info Submitted");
}

/**
 * Fires an event when a user starts KYC verification
 */
async function kycStarted() {
  await sendEvent("KYC verification started");
}


export default kycAnalytics
