import { Platform } from "react-native";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import messaging from "@react-native-firebase/messaging";

import { setSecureStoreKey } from "./expo-storage";

export { getNotificationToken };

/**
 * Get device notification token from notification provider
 */
async function getNotificationToken() {
  let token;
  if (Platform.OS === "android") {
    token = await messaging().getToken();
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
      setSecureStoreKey("notificationToken", token);
    });
  }
}
