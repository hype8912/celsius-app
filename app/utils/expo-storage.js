import { AsyncStorage } from "react-native";
import loggerUtil from "./logger-util";

export { setSecureStoreKey, getSecureStoreKey, deleteSecureStoreKey };

/**
 * @name setSecureStoreKey
 * @param key {string}
 * @param value {string}
 * @description Store a key–value pair.
 * The key to associate with the stored value. Keys may contain alphanumeric characters ., -, and _.
 *
 * @return A promise that will reject if value cannot be stored on the device
 * */
async function setSecureStoreKey(key, value) {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (error) {
    loggerUtil.err(error);
    return null;
  }
}

/**
 * @name getSecureStoreKey
 * @param key {string}
 * @description Fetch the stored value associated with the provided key.
 *
 * @return A promise that resolves to the previously stored value, or null if there is no entry for the given key.
 * The promise will reject if an error occurred while retrieving the value.
 * */
async function getSecureStoreKey(key) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    loggerUtil.err(error);
    return null;
  }
}

/**
 * @name deleteSecureStoreKey
 * @param key {string}
 * @description Delete the value associated with the provided key.
 *
 * @return A promise that will reject if the value couldn’t be deleted.
 * */
async function deleteSecureStoreKey(key) {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (error) {
    loggerUtil.err(error);
    return null;
  }
}
