import { sendEvent } from "../mixpanel-util";

const securityAnalytics = {
  changePassword,
  changePin,
}


/**
 * Fires an event when a user change his password
 */
async function changePassword() {
  await sendEvent("Password Changed");
}

/**
 * Fires an event when a user change his PIN
 */
async function changePin() {
  await sendEvent("PIN Changed");
}


export default securityAnalytics
