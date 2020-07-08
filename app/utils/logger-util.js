import { Linking } from "react-native";
import axios from "axios/index";
import Constants from "../../constants";
import store from "../redux/store";
import appUtil from "./app-util";
import mixpanelAnalytics from "./mixpanel-analytics";
import { navigateTo } from "../redux/nav/navActions";
import { showMessage } from "../redux/ui/uiActions";

const { ENV } = Constants;

export default {
  logme, // TODO check better way to log stuff from app
  log,
  warn, // TODO remove
  info, // TODO remove
  err, // TODO add JSDoc
};

/**
 * Blocks console.log in production
 *
 * @param {any} content
 */
function log(content) {
  if (["STAGING"].indexOf(ENV) !== -1) {
    // eslint-disable-next-line no-console
    console.log(content);
  }
}

/**
 * Blocks console.info in production
 *
 * @param {any} content
 */
function info(content) {
  if ([].indexOf(ENV) !== -1) {
    // eslint-disable-next-line no-console
    console.info(content);
  }
}

/**
 * Blocks console.warn in production
 *
 * @param {any} content
 */
function warn(content) {
  if ([].indexOf(ENV) !== -1) {
    // eslint-disable-next-line no-console
    console.warn(content);
  }
}

/**
 * Logs stuff on graylog, used for debugging standalone applications
 *
 * @param {any} payload
 */
function logme(payload) {
  axios.post("https://api.staging.celsius.network/api/v1/logme", payload);
}

function errorValidation(error) {
  const stringIgnore = [
    "Could not download from",
    "undefined is not an object (evaluating 't.dispatch')",
    "JS Functions are not convertible to dynamic",
  ];

  for (let i = 0; i < stringIgnore.length; i++) {
    if (error && error.includes(stringIgnore[i])) {
      return false;
    }
  }
  return true;
}

let revisionId;

async function err(e, isFatal = false) {
  if (errorValidation(e.message)) {
    if (!revisionId) {
      const appVersion = await appUtil.getRevisionId();
      revisionId = appVersion.revisionId;
    }

    const state = store.getState();

    const { profile } = state.user;
    const { lastTenActions } = state.app;
    const userData = profile.id && {
      user_id: profile.id,
      email: profile.email,
    };

    const { activeScreen } = state.nav;

    const error = {
      name: e.name,
      stack: e.stack,
      message: e.message,
    };

    const errorObject = {
      err: error,
      user: userData,
      active_screen: activeScreen,
      is_fatal: isFatal && typeof isFatal === "string" && isFatal === "true",
      app_version: revisionId,
      platform: Constants.platform,
      lastTenActions,
      message: error.message,
    };

    mixpanelAnalytics.appCrushed(errorObject);

    store.dispatch(navigateTo(profile.id ? "WalletLanding" : "Welcome"));
    const action = {
      text: "Open ticket",
      action: () =>
        Linking.openURL(
          "https://support.celsius.network/hc/en-us/requests/new"
        ),
    };
    store.dispatch(
      showMessage(
        "error",
        "There was an unexpected crash in the app. It was automatically reported to our development team, they are working hard on fixing it! If the problem persists, please contact support.",
        false,
        action
      )
    );
  }
}
