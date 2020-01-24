import { sendEvent } from "../mixpanel-util";

const authAnalytics = {
  registrationCompleted,
  setPin,
}


/**
 * Fires an event when a users completes the registration process (sets PIN number)
 *
 * @param {object} user
 * @param {object} user.facebook_id - indicates user registered through facebook
 * @param {object} user.google_id - indicates user registered through google
 * @param {object} user.twitter_id - indicates user registered through twitter
 * @param {object} user.id
 * @param {object} user.referral_link_id - id of the person who referred the user
 */
async function registrationCompleted(user) {
  let method = "email";
  if (user.facebook_id) method = "facebook";
  if (user.google_id) method = "google";
  if (user.twitter_id) method = "twitter";

  await sendEvent("Registration completed", {
    method,
    referral_link_id: user.referral_link_id,
  });
}

/**
 * Fires an event when a user set a pin
 */
async function setPin() {
  await sendEvent("Set PIN");
}

export default authAnalytics;
