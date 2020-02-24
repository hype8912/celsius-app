import axios from "axios";
import apiUrl from "./api-url";

const userAuthService = {
  register,
  registerTwitter,
  registerFacebook,
  registerGoogle,
  login,
  sendResetLink,
  resetPassword,
  googleLogin,
  facebookLogin,
  twitterLogin,
};

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
function register(user) {
  return axios.post(`${apiUrl}/users/register`, user);
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
function registerTwitter(twitterUser) {
  return axios.post(`${apiUrl}/users/twitter`, twitterUser);
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
function registerFacebook(facebookUser) {
  return axios.post(`${apiUrl}/users/facebook`, facebookUser);
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
function registerGoogle(googleUser) {
  return axios.post(`${apiUrl}/users/google`, googleUser);
}

/**
 * Logs a user into Celsius with email/password
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#abf851b0-e170-4a3c-9018-bab17b9461d7
 *
 * @param {Object} user
 * @param {string} user.email
 * @param {string} user.password
 * @param {string} user.reCaptchaKey
 * @return {Promise}
 */
function login({ email, password, reCaptchaKey }) {
  return axios.post(`${apiUrl}/users/login`, {
    email,
    password,
    reCaptchaKey,
  });
}

/**
 * Send an email to the user with the reset password link
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#bf6e3009-2736-4a6e-b1a0-c0928c704550
 *
 * @param {string} email
 * @return {Promise}
 */
function sendResetLink(email) {
  return axios.post(`${apiUrl}/users/send_reset_link`, {
    email,
  });
}

/**
 * resets the password for user
 * @see https://documenter.getpostman.com/view/4207695/RW1aHzQg#413e806c-89d8-486f-b638-0d1e32832381
 *
 * @param {string} currentPassword
 * @param {string} newPassword
 * @return {Promise}
 */
function resetPassword(currentPassword, newPassword) {
  return axios.post(`${apiUrl}/users/reset_password`, {
    current_password: currentPassword,
    new_password: newPassword,
  });
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
function googleLogin(googleUser) {
  return axios.post(`${apiUrl}/users/google/login`, googleUser);
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
function facebookLogin(facebookUser) {
  return axios.post(`${apiUrl}/users/facebook/login`, facebookUser);
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
function twitterLogin(twitterUser) {
  return axios.post(`${apiUrl}/users/twitter/login`, twitterUser);
}

export default userAuthService;
