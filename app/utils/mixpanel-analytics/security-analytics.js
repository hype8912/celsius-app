import { sendEvent } from "../mixpanel-util";

const securityAnalytics = {
  changePassword,
  changePin,
  forgottenPassword,
  loggedOutOfAllSessions,
  biometricsActivated,
  biometricsDeactivated,
};

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

/**
 * Fires an event when a user requests password change
 */
async function forgottenPassword() {
  await sendEvent("Sent Forgotten Password Request");
}

/**
 * Fires an event when a user logs out on security screen
 */
async function loggedOutOfAllSessions() {
  await sendEvent("Logged Out of all Sessions");
}

async function biometricsActivated(type) {
  await sendEvent("Biometrics activated", {
    type,
  });
}

async function biometricsDeactivated() {
  await sendEvent("Biometrics deactivated");
}

export default securityAnalytics;
