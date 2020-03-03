import { Constants, Facebook, GoogleSignIn, Google } from 'expo'

import ACTIONS from '../../constants/ACTIONS'
import API from '../../constants/API'
import { startApiCall, apiError } from '../api/apiActions'
import { navigateTo } from '../nav/navActions'
import { showMessage } from '../ui/uiActions'
import { updateFormFields } from '../forms/formsActions'
import { setSecureStoreKey } from '../../utils/expo-storage'
import usersService from '../../services/users-service'
import { initAppData } from '../app/appActions'
import { claimAllBranchTransfers } from '../transfers/transfersActions'
import analytics from '../../utils/analytics'
import branchUtil from '../../utils/branch-util'

const {
  SECURITY_STORAGE_AUTH_KEY,
  FACEBOOK_APP_ID,
  FACEBOOK_URL,
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_CLIENT_ID
} = Constants.manifest.extra

export {
  authTwitter,
  registerUserTwitter,
  twitterClose,
  twitterOpen,
  twitterGetAccessToken,
  authFacebook,
  registerUserFacebook,
  authGoogle,
  registerUserGoogle,
}


/**
 * Handles response after twitter login
 * @param {string} type - one of login|register
 * @param {Object} twitterUser - response from twitter success
 */
function authTwitter (type, twitterUser) {
  return (dispatch, getState) => {
    const user = getState().user.profile

    const twitterNames = twitterUser.name.split(' ')
    user.firstName = twitterNames.shift()
    user.lastName = twitterNames.join(' ')

    if (type === 'login') {
      dispatch(
        loginTwitter({
          ...user,
          ...twitterUser
        })
      )
    } else {
      dispatch(
        updateFormFields({
          email: twitterUser.email,
          firstName: user.firstName,
          lastName: user.lastName,
          twitter_screen_name: twitterUser.screen_name,
          twitterId: twitterUser.id_str,
          accessToken: user.twitter_oauth_token,
          secretToken: user.twitter_oauth_secret,
          profilePicture: twitterUser.profile_image_url
        })
      )
    }
  }
}

/**
 * Registers a new user through Twitter
 */
function registerUserTwitter () {
  return async (dispatch, getState) => {
    try {
      const { formData } = getState().forms
      const referralLinkId = branchUtil.getReferralId()

      const twitterUser = {
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        twitter_id: formData.twitterId,
        profile_picture: formData.profilePicture,
        access_token: formData.accessToken,
        secret_token: formData.secretToken,
        twitter_screen_name: formData.twitter_screen_name,
        referral_link_id: referralLinkId || undefined
      }

      dispatch(startApiCall(API.REGISTER_USER_TWITTER))
      const res = await usersService.registerTwitter(twitterUser)

      const { id_token: idToken, user } = res.data
      dispatch(registerSocialSuccess('twitter', idToken, user))
    } catch (err) {
      dispatch(showMessage('error', err.msg))
      dispatch(apiError(API.REGISTER_USER_TWITTER, err))
    }
  }
}

/**
 * Log a user in through Twitter
 * @param {Object} twitterUser
 * @param {string} twitterUser.email
 * @param {string} twitterUser.name
 * @param {string} twitterUser.id_str
 * @param {string} twitterUser.twitter_oauth_token
 * @param {string} twitterUser.twitter_oauth_secret
 */
function loginTwitter (twitterUser) {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.LOGIN_USER_TWITTER))

      const user = {
        email: twitterUser.email,
        first_name: twitterUser.name,
        twitter_id: twitterUser.id_str,
        access_token: twitterUser.twitter_oauth_token,
        secret_token: twitterUser.twitter_oauth_secret
      }

      const res = await usersService.twitterLogin(user)

      await dispatch(loginSocialSuccess('twitter', res.data.id_token))
    } catch (err) {
      dispatch(showMessage('error', err.msg))
      dispatch(apiError(API.LOGIN_USER_TWITTER, err))
    }
  }
}

/**
 * Closes Twitter modal
 * @returns {Object} - Action
 */
function twitterClose () {
  return {
    type: ACTIONS.TWITTER_CLOSE
  }
}

/**
 * Opens Twitter Modal
 * @returns {Object} - Action
 */
function twitterOpen () {
  return {
    type: ACTIONS.TWITTER_OPEN
  }
}

/**
 * Sets Twitter access token in reducer
 * @param {Object} tokens
 * @returns {Object} - Action
 */
function twitterGetAccessToken (tokens) {
  return {
    type: ACTIONS.TWITTER_GET_ACCESS_TOKEN,
    twitter_tokens: tokens
  }
}


/**
 * Authorizes user on Facebook
 *
 * @param {string} authReason - one of login|register
 */
function authFacebook (authReason) {
  return async dispatch => {
    if (!['login', 'register'].includes(authReason)) return

    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        FACEBOOK_APP_ID.toString(),
        {
          permissions: ['public_profile', 'email'],
          behavior: 'system'
        }
      )

      if (type === 'success') {
        const response = await fetch(`${FACEBOOK_URL}${token}`)

        const user = await response.json()
        user.accessToken = token

        if (authReason === 'login') {
          dispatch(loginFacebook(user))
        } else {
          dispatch(
            updateFormFields({
              email: user.email,
              firstName: user.first_name,
              lastName: user.last_name,
              facebookId: user.id,
              accessToken: user.accessToken
            })
          )
        }
      }
    } catch (e) {
      dispatch(showMessage('error', e.message))
    }
  }
}

/**
 * Creates new user through Facebook
 */
function registerUserFacebook () {
  return async (dispatch, getState) => {
    try {
      const { formData } = getState().forms
      const referralLinkId = branchUtil.getReferralId()

      const facebookUser = {
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        facebook_id: formData.facebookId,
        access_token: formData.accessToken,
        referral_link_id: referralLinkId
      }

      dispatch(startApiCall(API.REGISTER_USER_FACEBOOK))
      const res = await usersService.registerFacebook(facebookUser)

      const { id_token: idToken, user } = res.data
      dispatch(registerSocialSuccess('facebook', idToken, user))
    } catch (err) {
      dispatch(showMessage('error', err.msg))
      dispatch(apiError(API.REGISTER_USER_FACEBOOK, err))
    }
  }
}

/**
 * Logs a user into Celsius through Facebook
 * @param {Object} facebookUser
 * @param {string} facebookUser.email
 * @param {string} facebookUser.first_name
 * @param {string} facebookUser.last_name
 * @param {string} facebookUser.id - facebook id
 * @param {string} facebookUser.accessToken - facebook access token
 */
function loginFacebook (facebookUser) {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.LOGIN_USER_FACEBOOK))

      const user = {
        email: facebookUser.email,
        first_name: facebookUser.first_name,
        last_name: facebookUser.last_name,
        facebook_id: facebookUser.id,
        access_token: facebookUser.accessToken
      }

      const res = await usersService.facebookLogin(user)

      await dispatch(loginSocialSuccess('facebook', res.data.id_token))
    } catch (err) {
      dispatch(showMessage('error', err.msg))
      dispatch(apiError(API.LOGIN_USER_FACEBOOK, err))
    }
  }
}

/**
 * Authorizes user on Facebook
 *
 * @param {string} authReason - one of login|register
 */
function authGoogle (authReason) {
  return async dispatch => {
    if (!['login', 'register'].includes(authReason)) return

    try {
      let result
      if (Constants.appOwnership !== 'standalone') {
        // for Expo Client
        result = await Google.logInAsync({
          behavior: 'web',
          webClientId: GOOGLE_WEB_CLIENT_ID,
          androidClientId: GOOGLE_ANDROID_CLIENT_ID,
          iosClientId: GOOGLE_IOS_CLIENT_ID,
          scopes: ['profile', 'email']
        })
      } else {
        // for standalone apps
        await GoogleSignIn.initAsync({
          clientId: GOOGLE_CLIENT_ID
        })
        await GoogleSignIn.askForPlayServicesAsync()
        const isSignedIn = await GoogleSignIn.isSignedInAsync()
        if (isSignedIn) await GoogleSignIn.signOutAsync()
        result = await GoogleSignIn.signInAsync()
      }

      if (result.type === 'success') {
        // NOTE: different response for Expo and for standalone app
        const user = result.user
        user.email = user.email
        user.firstName = user.givenName || user.firstName
        user.lastName = user.familyName || user.lastName
        user.googleId = user.id || user.uid
        user.profilePicture = user.photoURL
        user.accessToken = result.access_token || result.accessToken
        user.accessToken = !user.accessToken && user.auth ? user.auth.accessToken : user.accessToken

        if (authReason === 'login') {
          dispatch(loginGoogle(user))
        } else {
          dispatch(updateFormFields(user))
        }
      } else {
        return { cancelled: true }
      }
    } catch (e) {
      return { error: true }
    }
  }
}

/**
 * Creates a new user through Google
 */
function registerUserGoogle () {
  return async (dispatch, getState) => {
    try {
      const { formData } = getState().forms
      const referralLinkId = branchUtil.getReferralId()

      const googleUser = {
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        google_id: formData.googleId,
        profile_picture: formData.profilePicture,
        access_token: formData.accessToken,
        referral_link_id: referralLinkId
      }

      dispatch(startApiCall(API.REGISTER_USER_GOOGLE))
      const res = await usersService.registerGoogle(googleUser)

      const { id_token: idToken, user } = res.data

      dispatch(registerSocialSuccess('google', idToken, user))
    } catch (err) {
      dispatch(showMessage('error', err.msg))
      dispatch(apiError(API.REGISTER_USER_GOOGLE, err))
    }
  }
}

/**
 * Logs a user in through Google
 * @param {Object} googleUser - user from Google
 * @param {string} googleUser.email
 * @param {string} googleUser.givenName
 * @param {string} googleUser.familyName
 * @param {string} googleUser.id
 * @param {string} googleUser.photoURL
 * @param {string} googleUser.access_token
 */
function loginGoogle (googleUser) {
  return async dispatch => {
    dispatch(startApiCall(API.LOGIN_USER_GOOGLE))
    try {
      const user = {
        email: googleUser.email,
        first_name: googleUser.firstName,
        last_name: googleUser.lastName,
        google_id: googleUser.googleId,
        profile_picture: googleUser.profilePicture,
        access_token: googleUser.accessToken
      }

      const res = await usersService.googleLogin(user)

      await dispatch(loginSocialSuccess('google', res.data.id_token))
    } catch (err) {
      dispatch(showMessage('error', err.msg))
      dispatch(apiError(API.REGISTER_USER_GOOGLE, err))
    }
  }
}

/**
 * Successfully log the user in from any social network
 *
 * @param {string} network - one of twitter|facebook|google
 * @param {string} token - auth token from social network
 */
function loginSocialSuccess(network, token) {
  return async (dispatch, getState) => {
    await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, token);

    const userRes = await usersService.getPersonalInfo();
    const user = userRes.data;
    
    const { showVerifyScreen } = getState().app
    if(!showVerifyScreen) {
      await dispatch(initAppData());
      dispatch(navigateTo('WalletFab'))
    }

    dispatch({
      type: ACTIONS[`LOGIN_USER_${ network.toUpperCase() }_SUCCESS`],
      user,
    })

    // dispatch(claimAllBranchTransfers());
  }
}

/**
 * Successfully register the user from any social network
 *
 * @param {string} network - one of twitter|facebook|google
 * @param {string} token - auth token from social network
 * @param {string} user - registered user on Celsius
 */
function registerSocialSuccess (network, token, user) {
  return async (dispatch, getState) => {
    await setSecureStoreKey(SECURITY_STORAGE_AUTH_KEY, token)

    dispatch(startApiCall(API.SOCIAL_REGISTER))

    dispatch({
      type: ACTIONS[`REGISTER_USER_${network.toUpperCase()}_SUCCESS`],
      user
    })

    analytics.sessionStarted()
    dispatch(claimAllBranchTransfers())
    
    await dispatch(initAppData(token))
    const { profile } = getState().user
    if (!profile.has_pin) {
      dispatch(navigateTo('RegisterSetPin'))
    } else {
      dispatch(navigateTo('WalletFab'))
    }

    dispatch({ type: ACTIONS.SOCIAL_REGISTER_SUCCESS })
  }
}
