import { PasswordMeter } from "password-meter";
import store from "../redux/store";

/**
 * @typedef {Object} UserData - user's first name, last name and optional middle name.
 * @property {string} firstName - user's first name
 * @property {string|undefined} middleName - user's middle name
 * @property {string} lastName - user's last name
 */
/**
 * Calculates password score based on cleartext and users first, middle and last name.
 *
 * @param {string} password
 * @param {UserData} userData
 * @return {Object}
 */

const calculatePasswordScore = () => {
  const { formData } = store.getState().forms;

  const names = [formData.firstName, formData.lastName];
  if (formData.middleName) {
    names.push(formData.middleName);
  }
  const pm = new PasswordMeter({
    minLength: 8,
    uppercaseLettersMinLength: 1,
    lowercaseLettersMinLength: 2,
    numbersMinLength: 1,
    symbolsMinLength: 1,
    exclude: {
      value: names,
      message: "Can’t contain your name or parts of the your’s full name.",
    },
  });
  const result = pm.getResult(formData.password || formData.newPassword);

  if (!result.errors) {
    return {
      ...result,
      errors: [],
    };
  }

  return result;
};

export default calculatePasswordScore;
