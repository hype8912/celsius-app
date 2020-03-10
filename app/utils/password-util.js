import { PasswordMeter } from "password-meter"
import store from "../redux/store"


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
 * @return {number}
 */

const calculatePasswordScore = () => {
  // if (checkNames(password, userData)) {
  //   return -1
  // }

  const { formData } = store.getState().forms

  const names = [formData.firstName, formData.lastName]
  if (formData.middleName) {
    names.push(formData.middleName)
  }
  const pm = new PasswordMeter({
    minLength: 8,
    uppercaseLettersMinLength: 1,
    lowercaseLettersMinLength: 2,
    numbersMinLength: 1,
    symbolsMinLength: 1,
    exclude: {
      value: names,
      message: "No names, please",
    },
  })
  const result = pm.getResult(formData.password)
  return result.score
}

export default calculatePasswordScore;
