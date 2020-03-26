import { PasswordMeter } from "password-meter";
import store from "../redux/store";
import {
  SECURITY_STRENGTH_ITEMS,
  SECURITY_STRENGTH_LEVEL,
} from "../constants/DATA";

/**
 * Calculates password score based on cleartext and users first, last name and email.
 *
 * @param {string} password
 * @return {Object}
 */
const calculatePasswordScore = password => {
  const { formData } = store.getState().forms;
  const { profile } = store.getState().user;

  const firstName = formData.firstName || profile.first_name;
  const lastName = formData.lastName || profile.last_name;
  const email = formData.email || profile.email;

  const excludes = [firstName, lastName, email, " "];

  const pm = new PasswordMeter({
    minLength: {
      value: 8,
      message: SECURITY_STRENGTH_ITEMS[0].copy,
    },
    uppercaseLettersMinLength: {
      value: 1,
      message: SECURITY_STRENGTH_ITEMS[1].copy,
    },
    lowercaseLettersMinLength: 2,
    numbersMinLength: {
      value: 1,
      message: SECURITY_STRENGTH_ITEMS[2].copy,
    },
    symbolsMinLength: {
      value: 1,
      message: SECURITY_STRENGTH_ITEMS[3].copy,
    },
    exclude: {
      value: excludes,
      message: SECURITY_STRENGTH_ITEMS[4].copy,
    },
  });
  const result = pm.getResult(password);
  let customStatus;
  switch (true) {
    case result.score < 80:
      customStatus = SECURITY_STRENGTH_LEVEL.WEAK;
      break;
    case result.score < 140:
      customStatus = SECURITY_STRENGTH_LEVEL.FAIR;
      break;
    case result.score < 200:
      customStatus = SECURITY_STRENGTH_LEVEL.GOOD;
      break;
    default:
      customStatus = SECURITY_STRENGTH_LEVEL.STRONG;
  }

  if (!result.errors) {
    result.errors = [];
  }
  return {
    result,
    customStatus,
  };
};

export default calculatePasswordScore;
