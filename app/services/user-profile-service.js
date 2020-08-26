import axios from "axios";
import apiUrl from "./api-url";

const userProfileService = {
  getPersonalInfo,
  updateProfileInfo,
  setProfileImage,
  sendVerificationSMS,
  verifySMS,
  addExpoPushToken, // TODO: remove this
};

/**
 * Get profile info for logged in user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#52468b39-6440-417c-9e53-35471dbdd0e0
 *
 * @return {Promise}
 */
function getPersonalInfo() {
  return axios.get(`${apiUrl}/me`);
}

/**
 * Updates user info
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#cd83aca2-11a1-42d2-ad08-3df6b3d2d090
 *
 * @param {Object} profileInfo
 * @return {Promise}
 */
function updateProfileInfo(profileInfo) {
  return axios.patch(`${apiUrl}/me`, profileInfo);
}

/**
 * Updates profile image for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#029631f2-67bc-48c2-8463-f0d2572145a0
 *
 * @param {Object} image - file object
 * @return {Promise}
 */
function setProfileImage(image) {
  const formData = new FormData();
  let pictureUrl;
  if (typeof image === "string" && image.includes("https")) {
    pictureUrl = { profile_picture_url: image };
  } else {
    formData.append("profile_picture", {
      name: "picture.jpg",
      type: "image/jpg",
      uri: image.uri,
    });
  }

  return axios.post(
    `${apiUrl}/user/profile/profile_picture`,
    pictureUrl || formData
  );
}

/**
 * Send SMS for phone verification to user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#76d35f2e-d523-4f2a-858e-ca33cc173f55
 *
 * @returns {Promise}
 */
function sendVerificationSMS() {
  return axios.post(`${apiUrl}/me/sms/send`, {
    fourDigit: true,
  });
}

/**
 * Verifies phone number with code from SMS
 * @see https://documenter.getpostman.com/view/4207695/celsius/RW1aHzQg#55e40ec1-a2c0-485a-9442-3a12b8eebbbb
 *
 * @param {string} verificationCode - eg. '123456'
 * @returns {Promise}
 */
function verifySMS(verificationCode) {
  return axios.post(`${apiUrl}/me/sms/verify`, {
    verification_code: verificationCode,
  });
}

/**
 * Adds Expo push notification token to user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#cae21d46-1014-4c5e-b909-8a821767c16d
 *
 * @param {string} token
 * @return {Promise}
 */
async function addExpoPushToken(token) {
  return axios.put(`${apiUrl}/users/expoPushToken`, {
    expo_push_token: token,
  });
}

export default userProfileService;
