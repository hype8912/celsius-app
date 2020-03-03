import axios from 'axios/index'
import { Constants } from 'expo'
import store from '../redux/store'
import API_URL from '../services/api-url'

const { ENV } = Constants.manifest.extra

export default {
  logme, // TODO check better way to log stuff from app
  log,
  warn, // TODO remove
  info, // TODO remove
  err // TODO add JSDoc
}

/**
 * Blocks console.log in production
 *
 * @param {any} content
 */
function log (content) {
  // eslint-disable-next-line no-console
  if ([].indexOf(ENV) !== -1) console.log(content)
}

/**
 * Blocks console.info in production
 *
 * @param {any} content
 */
function info (content) {
  // eslint-disable-next-line no-console
  if ([].indexOf(ENV) !== -1) { console.info(content) }
}

/**
 * Blocks console.warn in production
 *
 * @param {any} content
 */
function warn (content) {
  // eslint-disable-next-line no-console
  if ([].indexOf(ENV) !== -1) { console.warn(content) }
}

/**
 * Logs stuff on graylog, used for debugging standalone applications
 *
 * @param {any} payload
 */
function logme (payload) {
  axios.post('https://api.staging.celsius.network/api/v1/logme', payload)
}

function err (e, isFatal = false) {
  const { revisionId } = Constants.manifest

  const state = store.getState()

  const { profile } = state.user
  const userData = profile && { user_id: profile.id, email: profile.email }

  const { activeScreen } = state.nav

  const error = {
    name: e.name,
    stack: e.stack,
    message: e.message
  }

  const errorObject = {
    err: error,
    user: userData,
    active_screen: activeScreen,
    is_fatal: isFatal && typeof isFatal === 'string' && isFatal === 'true',
    app_version: revisionId,
    platform: Constants.platform
  }

  axios.post(`${API_URL}/graylog`, errorObject)
}
