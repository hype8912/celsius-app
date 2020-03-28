import { Platform } from "react-native";
import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";

import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import notificationService from "../services/notifications-service";
import { getSecureStoreKey, setSecureStoreKey } from "./expo-storage";
import { NOTIFICATION_TOKEN } from "../constants/DATA";

export {
  deletePushNotificationToken,
  assignPushNotificationToken,
  remotePushController,
};

/**
 * Get device notification token from notification provider
 */
async function getNotificationToken() {
  let token;
  if (Platform.OS === "android") {
    token = await messaging().getToken();
    setSecureStoreKey(NOTIFICATION_TOKEN, token);
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
      setSecureStoreKey(NOTIFICATION_TOKEN, token);
    });
  }
}

/**
 * Listen for push notification and show them as local notification in the app
 * @returns {null}
 */
function remotePushController() {
  getNotificationToken();
  useEffect(() => {
    PushNotification.configure({
      // Called when a remote or local notification is opened or received
      onNotification(notification) {
        // console.log("NOTIF: ", notification);
        const notifObj = {
          playSound: true, // (optional)
          soundName: "default", // (optional)
        };

        if (Platform.OS === "android") {
          // From Mixpanel
          if (notification.mp_message_id) {
            notifObj.title = notification.mp_title;
            notifObj.message = notification.mp_message; // (required)
          }
          // From Firebase
          if (notification.notification) {
            const notif = notification.notification;
            notifObj.title = notif.title;
            notifObj.message = notif.body ? notif.body : notif.title; // (required)
            PushNotification.localNotification(notifObj);
          }
        } else {
          // fires when user taps on notification
          const notif = notification.message;
          notifObj.title = notif.title;
          notifObj.message = notif.body; // (required)
          // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
          notification.finish(PushNotificationIOS.FetchResult.NoData);
          // PushNotification.localNotification(notifObj);
        }
      },
      // Android only: GCM or FCM Sender ID
      senderID: "765558032297",
      popInitialNotification: true,
      requestPermissions: false, // - permisssion are requested in separate function
    });
  }, []);

  return null;
}

/**
 * Assign device token for push notifications to user.
 * @returns {Promise<void>}
 */
async function assignPushNotificationToken() {
  const token = await getSecureStoreKey(NOTIFICATION_TOKEN);
  if (token) await notificationService.setNotificationToken(token);
}

/**
 * Delete device push notification token from device storage and from user.
 * @param token
 * @returns {Promise}
 */
async function deletePushNotificationToken() {
  await notificationService.deleteNotificationToken();
}
