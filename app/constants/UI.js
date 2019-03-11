const KEYBOARD_TYPE = {
  DEFAULT: 'default',
  NUMERIC: 'numeric',
  EMAIL: 'email-address',
  PHONE: 'phone-pad'
};

const AUTO_CAPITALIZE = {
  CHARACTERS: 'characters',   // all characters
  WORDS: 'words',             // first letter of each word
  SENTENCES: 'sentences',     // first letter of each sentence
  NONE: 'none'                // don't auto capitalize anything
};

const CAMERA_COPY = {
  DOCUMENT: 'Please center your document in the marked area. Ensure that there’s enough light in the room for better picture quality.',
  SELFIE: 'Please center your face in the circle and take a selfie. We need your recent picture to compare it with the one on the document.',
}

const MODALS = {
  BASIC_MODAL: 'BASIC_MODAL',
  WITHDRAW_INFO_MODAL: 'WITHDRAW_INFO_MODAL',
  TODAY_INTEREST_RATES_MODAL: 'TODAY_INTEREST_RATES_MODAL',
  DESTINATION_TAG_MODAL: 'DESTINATION_TAG_MODAL',
  MEMO_ID_MODAL: 'MEMO_ID_MODAL',
  BORROW_CONFIRM: 'BORROW_CONFIRM',
  CELPAY_RECEIVED_MODAL: "CELPAY_RECEIVED_MODAL"
};

const VERIFY_IDENTITY_TYPES = {
  TWO_FACTOR: 'TWO_FACTOR',
  PIN: 'PIN',
};

const VERIFY_IDENTITY_ACTION_TYPES = {
  DEFAULT: 'DEFAULT',
  SET_PIN: 'SET_PIN',
  CONFIRM_SET_PIN: 'CONFIRM_SET_PIN',
};

const INITIAL_ROUTE = 'Home';

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  CELSIUS: 'celsius'
}

export const EMPTY_STATES = {
  FIRST_TIME: 'FIRST_TIME',
  ERROR: 'ERROR',
  NO_DATA: 'NO_DATA',
  USER_CLEARED: 'USER_CLEARED',
  COMPLIANCE: 'COMPLIANCE',
  UNDER_CONSTRUCTION: 'UNDER_CONSTRUCTION',
  INSUFFICIENT_FUNDS: "INSUFFICIENT_FUNDS",
}

export const KEYPAD_PURPOSES = {
  WITHDRAW: 'WITHDRAW',
  CELPAY: 'CELPAY',
  VERIFICATION: 'VERIFICATION',
  AMOUNT: 'AMOUNT',
}

export const PHONES_WITH_CUSTOM_KEYPAD = [
  'iPhone X',
  // 'Simulator',
]

export const HIGHLIGHTED_COUNTRIES = [
  'Canada',
  'Germany',
  'United Kingdom',
  'Australia',
  'United States'
]

export default {
  KEYBOARD_TYPE,
  AUTO_CAPITALIZE,
  CAMERA_COPY,
  MODALS,
  VERIFY_IDENTITY_TYPES,
  VERIFY_IDENTITY_ACTION_TYPES,
  INITIAL_ROUTE,
}
