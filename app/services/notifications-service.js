import { Platform } from "react-native";
import axios from "axios";
import apiUrl from "./api-url";

const notificationService = {
  setNotificationToken,
  deleteNotificationToken,
};

/**
 * Set push notifications device token to user
 * @returns {Promise}
 */
function setNotificationToken(token) {
  const deviceOS = Platform.OS;
  return axios.post(`${apiUrl}/users/pushToken`, {
    token,
    platform: deviceOS,
  });
}

/**
 * Delete push notifications device token from user
 * @returns {Promise}
 */
function deleteNotificationToken() {
  return axios.delete(`${apiUrl}/users/pushToken`);
}

export default notificationService;
