import { Permissions } from 'expo';
import { Linking, Platform } from 'react-native';

export {
  hasPermission,
  requestForPermission,
}


/**
 * Checks if a user has allowed some permission
 *
 * @param {string} permission - from expo.Permissions
 * @returns {boolean}
 */
async function hasPermission(permission) {
  const { status } = await Permissions.getAsync(permission);
  return status === 'granted'
};


/**
 * Requests some permissions for user
 *
 * @param {string} permission - from expo.Permissions
 * @param {Object} options
 * @param {bool} options.goToSettings
 * @param {bool} options.askAnyway
 * @returns {boolean}
 */
async function requestForPermission(permission, options) {
  let { status } = await Permissions.getAsync(permission);
  const defaultOpts = {
    goToSettings: true,
    askAnyway: true,
  }

  const opts = {
    ...defaultOpts,
    ...options,
  }

  if (Platform.OS === 'ios') {
    if (status === 'undetermined' && opts.askAnyway) {
      const perm = await Permissions.askAsync(permission);
      status = perm.status;
    } else if (opts.goToSettings) {
      Linking.openURL('app-settings:')
    }
  } else if (Platform.OS === 'android' && options.askAnyway) {
    const perm = await Permissions.askAsync(permission);
    status = perm.status;
  }

  return status === 'granted'
};
