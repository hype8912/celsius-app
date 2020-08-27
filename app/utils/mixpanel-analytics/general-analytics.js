import moment from "moment";
import {
  sendEvent,
  setUserData,
  getUserData,
  engage,
  engageCompleted,
} from "../mixpanel-util";
import store from "../../redux/store";
import appsFlyerUtil from "../appsflyer-util";
import loggerUtil from "../logger-util";
import { urlForCurrentUser, urlForCurrentSession } from "../uxcam-util";

const generalAnalytics = {
  buttonPressed,
  navigated,
  sessionStarted,
  sessionEnded,
  apiError,
  appCrushed,
  appsflyerEvent,
};

let sessionTime = new moment();

/**
 * Fires an event when a user fires NAVIGATE_TO or NAVIGATE_BACK actions
 *
 * @param {string} screen
 */
function navigated(screen) {
  sendEvent("Navigated to", { screen });
}

/**
 * Fires an event when a user presses a CelButton
 *
 * @param {string} button - copy on the button
 */
function buttonPressed(button) {
  sendEvent("Button pressed", { button });
}

/**
 * Set data to the user selected by distinct_id
 */
async function sessionStarted(trigger) {
  try {
    sessionTime = new moment();

    const uxCamUrl = await urlForCurrentUser();

    let userData = getUserData();
    if (!userData.id) {
      setUserData(store.getState().user.profile);
      userData = getUserData();
    }

    if (userData && userData.id && !engageCompleted.completed) {
      await engage(userData.id, {
        $email: userData.email,
        $first_name: userData.first_name,
        $last_name: userData.last_name,
        $created: userData.created_at,
        $phone: userData.cellphone,
        "Phone verified": userData.cellphone_verified,
        Citizenship: userData.citizenship,
        "Country of residence": userData.country,
        State: userData.state,
        $city: userData.city,
        "Two factor enabled": !!userData.two_factor_enabled,
        "Has pin": userData.has_pin,
        "KYC status": userData.kyc ? userData.kyc.status : "unknown",
        "Has referral link": !!userData.referral_link_id,
        "Has SSN": !!userData.ssn,
        "Has six digit pin": userData.has_six_digit_pin,
        "User's UXCam url": uxCamUrl,
      });
      await sendEvent("$create_alias", { alias: userData.id });
    }

    await sendEvent("Session started", { trigger });
    appsFlyerUtil.setCustomerUserId(userData.id);
  } catch (e) {
    loggerUtil.log(e);
  }
}

/**
 * Fires an event when a user ends the session - logout|app state to background
 */

async function sessionEnded(trigger) {
  setUserData({});

  const x = new moment();
  const sessionDuration = moment
    .duration(x.diff(sessionTime))
    .as("milliseconds");
  const formatedDuration = moment.utc(sessionDuration).format("HH:mm:ss");
  const uxCamUrl = await urlForCurrentSession();
  sendEvent("Session ended", {
    trigger,
    "Session duration": formatedDuration,
    "UXCam Session URL": uxCamUrl,
  });
}

/**
 * Fires an event whenever API returns an error
 */
async function apiError(data) {
  await sendEvent("Api Error", data);
}

/**
 * Fires an event whenever App Crushes!
 */
async function appCrushed(error) {
  await sendEvent("App crushed", error);
}

/**
 * Fires an event an appflyer event should be sent with all the relevant properties. This is for double checking
 */
async function appsflyerEvent(eventProps) {
  await sendEvent("Appsflyer event", eventProps);
}

export default generalAnalytics;
