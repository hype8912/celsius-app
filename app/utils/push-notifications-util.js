import { Platform } from "react-native";
import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import constants from "../../constants";
import notificationService from "../services/notifications-service";
import { getSecureStoreKey, setSecureStoreKey } from "./storage-util";
import { STORAGE_KEYS } from "../constants/DATA";
import API from "../constants/API";
import ACTIONS from "../constants/ACTIONS";
import store from "../redux/store";
import { apiError, startApiCall, showMessage } from "../redux/actions";

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
    setSecureStoreKey(STORAGE_KEYS.NOTIFICATION_TOKEN, token);
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
      setSecureStoreKey(STORAGE_KEYS.NOTIFICATION_TOKEN, token);
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
      senderID: constants.ANDROID_SENDER_ID,
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
  store.dispatch(startApiCall(API.SET_PUSH_NOTIFICATIONS_TOKEN));

  try {
    const token = await getSecureStoreKey(STORAGE_KEYS.NOTIFICATION_TOKEN);
    if (token) await notificationService.setNotificationToken(token);

    store.dispatch({
      type: ACTIONS.SET_PUSH_NOTIFICATIONS_TOKEN_SUCCESS,
    });
  } catch (err) {
    store.dispatch(showMessage("error", err.msg));
    store.dispatch(apiError(API.SET_PUSH_NOTIFICATIONS_TOKEN, err));
  }
}

/**
 * Delete device push notification token from device storage and from user.
 * @returns {Promise}
 */
async function deletePushNotificationToken() {
  store.dispatch(startApiCall(API.DELETE_PUSH_NOTIFICATIONS_TOKEN));

  try {
    await notificationService.deleteNotificationToken();

    store.dispatch({
      type: ACTIONS.DELETE_PUSH_NOTIFICATIONS_TOKEN_SUCCESS,
    });
  } catch (err) {
    store.dispatch(showMessage("error", err.msg));
    store.dispatch(apiError(API.DELETE_PUSH_NOTIFICATIONS_TOKEN, err));
  }
}
