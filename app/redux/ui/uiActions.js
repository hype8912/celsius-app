import DeviceInfo from "react-native-device-info";
import ACTIONS from "../../constants/ACTIONS";
import { STORAGE_KEYS } from "../../constants/DATA";
import mixpanelAnalytics from "../../utils/mixpanel-analytics";
import { getSecureStoreKey, setSecureStoreKey } from "../../utils/storage-util";

export {
  openFabMenu,
  closeFabMenu,
  setFabType,
  showMessage,
  clearMessage,
  openModal,
  closeModal,
  toggleKeypad,
  setKeypadInput,
  setActiveTab,
  closeBanner,
  setBannerProps,
  isGoodForAnimations,
};

let msgTimeout;

/**
 * Shows a flash message
 * @param {string} msgType - one of warning|info|success|error
 * @param {string} text - text to show
 * @param {boolean} disableClear - should the message stay forever
 * @param {object} action - text and action for toast message
 */
function showMessage(msgType, text, disableClear, action) {
  return dispatch => {
    clearTimeout(msgTimeout);

    msgTimeout = setTimeout(() => {
      if (!disableClear) {
        dispatch(clearMessage());
      }
      clearTimeout(msgTimeout);
    }, 5000);

    dispatch({
      type: ACTIONS.SHOW_MESSAGE,
      msgType,
      text,
      action,
    });
  };
}

// Custom celsius keypad actions
/**
 * Sets the keypad input ref
 * @param {Object} input - input ref
 * @param {Object} field - active field for keypad input
 */
let _keypadInputRef = null;
function setKeypadInput(input) {
  return (dispatch, getState) => {
    const { isKeypadOpen } = getState().ui;
    const { activeScreen } = getState().nav;

    if (
      input === false &&
      _keypadInputRef &&
      activeScreen === _keypadInputRef.activeScreen
    ) {
      // close keypad
      if (isKeypadOpen) {
        dispatch({
          type: ACTIONS.TOGGLE_KEYPAD,
          isKeypadOpen: false,
        });
      }

      _keypadInputRef = null;
    }

    if (input) {
      _keypadInputRef = {
        ...input,
        activeScreen,
      };
    }
  };
}

/**
 * Toggles the native device keypad
 *
 * @param {boolean} shouldOpen - if keypad should be turned on or off
 */
function toggleKeypad(shouldOpen = false) {
  return dispatch => {
    if (_keypadInputRef) {
      const isFocused = _keypadInputRef.isFocused();
      if (isFocused) {
        // already opened
        if (shouldOpen !== true) _keypadInputRef.blur();
        // closed
      } else if (_keypadInputRef && shouldOpen !== false) {
        _keypadInputRef.focus();
      }

      dispatch({
        type: ACTIONS.TOGGLE_KEYPAD,
        isKeypadOpen: !isFocused,
      });
    }
  };
}

/**
 * Clears flash message
 * @returns {Object} - Action
 */
function clearMessage() {
  return {
    type: ACTIONS.CLEAR_MESSAGE,
  };
}

/**
 * Opens a modal
 * @param {string} modalName - one of the modals from MODALS in UI.js
 * @returns {Object} - Action
 */
function openModal(modalName) {
  return {
    type: ACTIONS.OPEN_MODAL,
    modal: modalName,
  };
}

/**
 * Closes the opened modal
 * @returns {Object} - Action
 */
function closeModal() {
  return {
    type: ACTIONS.CLOSE_MODAL,
  };
}

/**
 * Opens App Menu
 * @returns {Object} - Action
 */
function openFabMenu() {
  return {
    type: ACTIONS.OPEN_FAB_MENU,
  };
}

/**
 * Closes App Menu
 * @returns {Object} - Action
 */
function closeFabMenu() {
  return {
    type: ACTIONS.CLOSE_FAB_MENU,
  };
}

/**
 * Sets FAB menu type
 * @returns {Object} - Action
 */
function setFabType(fabType) {
  return (dispatch, getState) => {
    if (fabType !== getState().ui.fabType) {
      dispatch({ type: ACTIONS.SET_FAB_TYPE, fabType });
    }
  };
}
/**
 * Sets active tab in CelTabs
 * @params {string} activeTab - name of the tab to open
 * @returns {Object} - Action
 */
function setActiveTab(activeTab) {
  return { type: ACTIONS.ACTIVE_TAB, activeTab };
}

/**
 * Closes all banners, mostly those on wallet landing
 * @returns {Object} - Action
 */
function closeBanner() {
  return {
    type: ACTIONS.CLOSE_BANNER,
  };
}

/**
 * Sets active tab in CelTabs
 * @params {Object} newBannerProps
 * @params {number} newBannerProps.sessionCount - number of sessions since last install on device
 * @params {string} newBannerProps.lastReferral - time of the last referral initiated by user
 * @returns {Object} - Action
 */
function setBannerProps(newBannerProps = null) {
  return async (dispatch, getState) => {
    let bannerProps;
    try {
      bannerProps = getState().ui.bannerProps || {};

      if (!newBannerProps) {
        bannerProps =
          JSON.parse(await getSecureStoreKey(STORAGE_KEYS.BANNER_PROPS)) || {};
      } else {
        bannerProps = {
          ...bannerProps,
          ...newBannerProps,
        };
      }

      bannerProps.sessionCount = bannerProps.sessionCount
        ? Number(bannerProps.sessionCount)
        : 0;

      await setSecureStoreKey(
        STORAGE_KEYS.BANNER_PROPS,
        JSON.stringify(bannerProps)
      );
    } catch (err) {
      mixpanelAnalytics.logError("setBannerProps", err);
    }

    dispatch({
      type: ACTIONS.SET_BANNER_PROPS,
      bannerProps,
    });
  };
}

/**
 * Checks if phone can get animations
 * @returns {Object} - Action
 */

function isGoodForAnimations() {
  const system = DeviceInfo.getSystemVersion();
  const name = DeviceInfo.getSystemName();
  let shouldAnimate = true;

  if (
    (Number(system.split(".")[0]) < 9 && name === "Android") ||
    (Number(system.split(".")[0]) < 13 && name === "iOS") ||
    name === "iPhone OS"
  )
    shouldAnimate = false;

  return {
    type: ACTIONS.IS_GOOD_FOR_ANIMATIONS,
    shouldAnimate,
  };
}
