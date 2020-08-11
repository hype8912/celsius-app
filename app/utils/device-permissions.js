import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";
import { Platform } from "react-native";

export {
  ALL_PERMISSIONS,
  getPermissionStatus,
  hasPermission,
  requestForPermission,
};

// All permissions with platform specific enums
const ALL_PERMISSIONS = {
  CAMERA: {
    name: "CAMERA",
    platforms: {
      android: PERMISSIONS.ANDROID.CAMERA,
      ios: PERMISSIONS.IOS.CAMERA,
    },
  },
  CONTACTS: {
    name: "CONTACTS",
    platforms: {
      android: PERMISSIONS.ANDROID.READ_CONTACTS,
      ios: PERMISSIONS.IOS.CONTACTS,
    },
  },
  LOCATION: {
    name: "LOCATION",
    platforms: {
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    },
  },
  LIBRARY: {
    name: "LIBRARY",
    platforms: {
      android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    },
  },
};

/**
 * Get platform specific permission name
 *
 * @param {string} permission - ALL_PERMISSIONS name
 * @returns {string} - PERMISSIONS platform specific name
 */
function getPermissionName(permission) {
  const platformPermission = Platform.select(
    ALL_PERMISSIONS[permission].platforms
  );
  return platformPermission;
}

/**
 * Get the permission status
 *
 * @param {object} permission - from ALL_PERMISSIONS
 * @param {string} permission.name - from ALL_PERMISSIONS
 * @returns {string} - one of RESULTS
 */
async function getPermissionStatus({ name }) {
  const platformPermission = getPermissionName(name);
  const result = await check(platformPermission);
  return result;
}

/**
 * Checks if a user has allowed a specific permission
 *
 * @param {object} permission - from ALL_PERMISSIONS
 * @param {string} permission.name - from ALL_PERMISSIONS
 * @returns {boolean}
 */
async function hasPermission({ name }) {
  const platformPermission = getPermissionName(name);
  const result = await check(platformPermission);
  return result === RESULTS.GRANTED;
}

/**
 * Requests some permissions for user if the permission is not granted
 *
 * @param {string} permission - from ALL_PERMISSIONS
 * @returns {boolean}
 */
async function requestForPermission(permission) {
  const perm = await getPermissionStatus(permission);

  if (perm !== RESULTS.GRANTED) {
    const platformPermission = getPermissionName(permission.name);
    const result = await request(platformPermission);
    return result;
  }

  return perm;
}
