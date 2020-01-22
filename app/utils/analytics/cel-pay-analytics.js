import userBehaviorUtil from "../user-behavior-util";

const { sendEvent } = userBehaviorUtil;

const celPayAnalytics = {
  navigatedToCelPay,
  choseCelPayType,
  importedContacts,
  choseCelPayFriend,
  enteredAmount,
  addedNote,
  initiatedCelPay,
  sharedCelPayLink,
  canceledCelPay,
}


/**
 * Fires when user navigates to CelPayLanding screen
 *
 * @param {string} from - screen from which user navigated to CelPayLanding
 */
function navigatedToCelPay(from) {
  sendEvent("Navigated to CelPay", { from })
}

/**
 * Fires when user chooses type of CelPay to send
 *
 * @param {string} type - LINK|FRIEND
 */
function choseCelPayType(type) {
  sendEvent("Chose CelPay Type", { celpay_type: type })
}

/**
 * Fires when user finishes importing contacts
 *
 * @param {number} numberOfContacts - number of contacts with Celsius app
 */
function importedContacts(numberOfContacts) {
  sendEvent("Imported Contacts", { numberOfContacts })
}

/**
 * Fires when user chooses a friend to CelPay
 */
function choseCelPayFriend() {
  sendEvent("Chose CelPay Friend")
}

/**
 * Fires when user presses Send button on CelPayEnterAmount
 *
 * @param {string} coin - BTC|ETH
 * @param {number} amountUsd
 * @param {number} amountCrypto
 */
function enteredAmount(coin, amountUsd, amountCrypto) {
  sendEvent("Entered CelPay Coin & Amount", { coin, amountUsd, amountCrypto })
}

/**
 * Fires when user enters a note
 */
function addedNote() {
  sendEvent("Added CelPay Note")
}

/**
 * Fires when user confirms CelPay in the ConfirmCelPayModal
 *
 * @param {string} type - LINK|FRIEND
 */
function initiatedCelPay(type) {
  sendEvent("Initiated CelPay", { celpay_type: type })
}

/**
 * Fires when user shares CelPay link
 */
function sharedCelPayLink() {
  sendEvent("Shared CelPay Link")
}

/**
 * Fires when user cancels CelPay link
 */
function canceledCelPay() {
  sendEvent("Canceled CelPay", {})
}

export default celPayAnalytics;
