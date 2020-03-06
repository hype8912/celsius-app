import { Platform } from "react-native";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import messaging from "@react-native-firebase/messaging";

import notificationService from "../services/notifications-service";
import { deleteSecureStoreKey, setSecureStoreKey } from "./expo-storage";

export { getNotificationToken, deletePushNotificationToken };

/**
 * Get device notification token from notification provider
 */
async function getNotificationToken() {
  let token;
  if (Platform.OS === "android") {
    token = await messaging().getToken();
    await notificationService.setNotificationToken(token);
    setSecureStoreKey("notificationToken", token);
  } else {
    await getIOSPushNotificationToken();
  }
}

/**
 * On iOS platform, ask for notification permissions, get notification token and store it to storage
 */
async function getIOSPushNotificationToken() {
  const perm = await PushNotificationIOS.requestPermissions();

  if (perm && perm.alert === 1) {
    PushNotificationIOS.addEventListener("register", token => {
      notificationService.setNotificationToken(token);
      setSecureStoreKey("notificationToken", token);
    });
  }
}

/**
 * Delete device push notification token from device storage and from user.
 * @param token
 * @returns {Promise}
 */
async function deletePushNotificationToken() {
  deleteSecureStoreKey("notificationToken");
  await notificationService.deleteNotificationToken();
}
