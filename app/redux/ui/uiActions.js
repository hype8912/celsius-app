import ACTIONS from '../../constants/ACTIONS';


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
}

let msgTimeout;


/**
 * Shows a flash message
 * @param {string} msgType - one of warning|info|success|error
 * @param {string} text - text to show
 * @param {boolean} disableClear - should the message stay forever
 */
function showMessage(msgType, text, disableClear) {
  return dispatch => {
    clearTimeout(msgTimeout);

    msgTimeout = setTimeout(() => {
      if (!disableClear) {
        dispatch(clearMessage());
      }
      clearTimeout(msgTimeout);
    }, 4000);

    dispatch({
      type: ACTIONS.SHOW_MESSAGE,
      msgType,
      text,
    })
  }
}


// Custom celsius keypad actions
/**
 * Sets the keypad input ref
 * @param {Object} input - input ref
 * @param {Object} field - active field for keypad input
 */
let _keypadInputRef = null;
let _activeField = null;
function setKeypadInput(input, field) {
  return (dispatch, getState) => {
    const { isKeypadOpen } = getState().ui;

    if (input === false && field === _activeField) {
      // close keypad
      if (isKeypadOpen) dispatch({
        type: ACTIONS.TOGGLE_KEYPAD,
        isKeypadOpen: false
      });

      _keypadInputRef = null
      _activeField = null
    }

    if (input && field !== _activeField) {
      _keypadInputRef = input
      _activeField = field
    }
  }
}


/**
 * Toggles the native device keypad
 *
 * @param {boolean} shouldOpen - if keypad should be turned on or off
 */
function toggleKeypad(shouldOpen) {
  return (dispatch) => {
    if (_keypadInputRef) {
      const isFocused = _keypadInputRef.isFocused()

      if (isFocused) {
        // already opened
        if (shouldOpen !== true) _keypadInputRef.blur()
      } else {
        // closed
        const timeout = setTimeout(() => {
          if (_keypadInputRef && shouldOpen !== false) _keypadInputRef.focus()
          clearTimeout(timeout)
        }, 5)
      }

      dispatch({
        type: ACTIONS.TOGGLE_KEYPAD,
        isKeypadOpen: !isFocused,
      });
    }
  }
}


/**
 * Clears flash message
 * @returns {Object} - Action
 */
function clearMessage() {
  return {
    type: ACTIONS.CLEAR_MESSAGE,
  }
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
    type: ACTIONS.OPEN_FAB_MENU
  };
}

/**
 * Closes App Menu
 * @returns {Object} - Action
 */
function closeFabMenu() {
  return {
    type: ACTIONS.CLOSE_FAB_MENU
  };
}

/**
 * Sets FAB menu type
 * @returns {Object} - Action
 */
function setFabType(fabType) {
  return (dispatch, getState) => {
    if (fabType !== getState().ui.fabType) {
      dispatch({ type: ACTIONS.SET_FAB_TYPE, fabType })
    }
  }
}
 /**
   * Sets active tab in CelTabs
   * @params {string} activeTab - name of the tab to open
   * @returns {Object} - Action
   */
function setActiveTab (activeTab) {
  return {type: ACTIONS.ACTIVE_TAB, activeTab}

}
