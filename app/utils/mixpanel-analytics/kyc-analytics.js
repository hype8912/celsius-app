import { sendEvent } from "../mixpanel-util";
import store from "../../redux/store";

const kycAnalytics = {
  kycProfileInfo,
  kycAddressInfo,
  kycDocumentsSubmitted,
  kycUtilityBillSubmitted,
  kycTaxPayerInfo,
  kycStarted,
};

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
  const { documentType, ssn, itin } = store.getState().forms.formData;

  const nationalId = store.getState().forms.formData.national_id;
  let taxpayerInfo = false;
  const document = "No document";

  if (ssn || itin || nationalId) taxpayerInfo = true;

  await sendEvent("KYC verification started", {
    document_type: documentType || document,
    taxpayer_info: taxpayerInfo,
  });
}

export default kycAnalytics;
