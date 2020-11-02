import currency from "currency-formatter";
import BigNumber from "bignumber.js";

export default {
  usd,
  crypto,
  round, // TODO check to replace with crypto and remove
  floor10,
  getEllipsisAmount,
  deepmerge, // TODO since this is only for styles, mybe move to styles util?
  getNumberOfDecimals, // TODO check and remove
  hasEnoughDecimals, // TODO check and remove
  getAllowedDecimals,
  setCurrencyDecimals,
  removeDecimalZeros,
  capitalize,
  percentage, // TODO check if we need both or a flag will do
  percentageDisplay, // TODO check if we need both or a flag will do
  hideTextExceptFirstNLetters,
  maskEmail,
  fiat,
  amountInputFieldFormat,
};

/**
 * Formats number to $10,000.00
 *
 * @param {number|string} amount
 * @param {Object} options - check options here https://www.npmjs.com/package/currency-formatter#advanced-usage
 * @returns {string}
 */
function usd(amount, options = {}) {
  return currency.format(floor10(amount), { code: "USD", ...options });
}

/**
 * Formats number to e.g. 10,000.00 EUR
 *
 * @param {number|string} amount
 * @param {string} fiatCode
 * @param {Object} options - check options here https://www.npmjs.com/package/currency-formatter#advanced-usage
 * @returns {string}
 */
function fiat(amount, fiatCode, options = {}) {
  return currency.format(floor10(new BigNumber(amount).toFixed(8)), {
    code: fiatCode,
    ...options,
  });
}

/**
 * Formats number to 1.12345 ETH
 * TODO should set default precision for each coin
 * TODO remove noPrecision tag
 *
 * @param {number|string} amount
 * @param {string} cryptocurrency - eg. ETH|XRP
 * @param {Object} options - check options here https://www.npmjs.com/package/currency-formatter#advanced-usage
 * @returns {string}
 */
function crypto(amount, cryptocurrency, options = {}) {
  return currency.format(new BigNumber(amount).toFixed(8), {
    precision: options.noPrecision ? 0 : options.precision || 5,
    thousand: ",",
    symbol:
      typeof options.symbol !== "undefined" ? options.symbol : cryptocurrency,
    format: "%v %s",
  });
}

/**
 * Formats number to 1.12
 * @todo: do we need this?
 *
 * @param {number|string} amount
 * @param {Object} options - check options here https://www.npmjs.com/package/currency-formatter#advanced-usage
 * @returns {string}
 */
function round(amount, options = {}) {
  return currency.format(amount, {
    precision: options.noPrecision ? 0 : options.precision || 2,
    thousand: ",",
  });
}

/**
 * Get allowed decimals for currency
 *
 * @param {string} curr - 'USD' or everything else
 * @returns {number}
 */
function getAllowedDecimals(curr) {
  return curr === "USD" ? 2 : 5;
}

/**
 * Get if the value has > decimal as allowed
 *
 * @param {string} value
 * @param {string} curr - 'USD' or everything else
 * @returns {boolean}
 */
function hasEnoughDecimals(value = "", curr) {
  return getNumberOfDecimals(value) > getAllowedDecimals(curr);
}

/**
 * Formats number for 'USD' -> 1.21, for other -> 1.65453
 *
 * @param {string} value
 * @param {string} curr - 'USD' or everything else
 * @returns {number}
 */
function setCurrencyDecimals(value, curr) {
  if (!hasEnoughDecimals(value, curr)) return value;

  return floor10(value, -this.getAllowedDecimals(curr)).toString();
}

/**
 * Capitalizes string
 *
 * @param {string} str
 * @returns {string}
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Removes decimal zeros if needed - 1.50000 -> 1.5
 *
 * @param {number|string} amount
 * @returns {string}
 */
function removeDecimalZeros(amount) {
  // const numberOfDecimals = getNumberOfDecimals(amount)
  const splitedValue = amount.toString().split(".");
  let decimals = "";
  let deleteDecimals = true;
  if (splitedValue.length === 2) {
    decimals = splitedValue[1];
    for (let i = 0; i < decimals.length; i++) {
      if (decimals[i] !== "0") deleteDecimals = false;
    }
  }
  return deleteDecimals ? splitedValue[0] : amount.toString();
}

/**
 * Formats percentage from number - 0.0695 * 100 = 6.950000000000001
 *
 * @param {number} number
 * @returns {number}
 */
function percentage(number) {
  return Math.round(number * 10000) / 100;
}

/**
 * Formats percentage from number - 0.0695 => 6.95%
 *
 * @param {number|string} number - number to format
 * @param {boolean} noSymbol - Hide percentage symbol
 * @param {number} fractionDigits - Hide percentage symbol
  @returns {number}
 **/
function percentageDisplay(number, noSymbol = false, fractionDigits = 2) {
  const percentageNum = Math.round(number * 10000) / 100;
  return `${percentageNum.toFixed(fractionDigits)}${noSymbol ? "" : "%"}`;
}

/**
 * Decimal adjustment of a number.
 *
 * @param {Number}  value The number.
 * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
 * @returns {Number} The adjusted value.
 */
function floor10(value, exp = -2) {
  const realExp = Math.pow(10, -exp);
  return Math.floor(value * realExp) / realExp;
}

/**
 * Get numbers of decimals
 *
 * @param {Number}  value The number.
 * @returns {Number} Decimal number of input value
 */
function getNumberOfDecimals(value) {
  const stringValue = value.toString();
  const splitValue = stringValue && stringValue.split(".");
  return stringValue && (splitValue[1] ? splitValue[1].length : 0);
}

/**
 * Ellipsis Amount (1.656,-2) => 1.65...
 *
 * @param {Number|String}  value The number.
 * @param {Integer} exp   The exponent
 * @returns {String}
 */
function getEllipsisAmount(value, exp) {
  const realValue =
    value === "." || value === "0." ? "0." : (value || 0).toString();
  const floatValue = parseFloat(realValue).toString();
  const decimals = getNumberOfDecimals(floatValue);
  if (decimals && decimals > Math.abs(exp)) {
    return `${floor10(floatValue, exp)}...`;
  }
  return realValue;
}

// deep merge
/**
 * @todo
 */
function isMergeableObject(val) {
  const nonNullObject = val && typeof val === "object";

  return (
    nonNullObject &&
    Object.prototype.toString.call(val) !== "[object RegExp]" &&
    Object.prototype.toString.call(val) !== "[object Date]"
  );
}

/**
 * @todo
 */
function emptyTarget(val) {
  return Array.isArray(val) ? [] : {};
}

/**
 * @todo
 */
function cloneIfNecessary(value, optionsArgument) {
  const clone = optionsArgument && optionsArgument.clone === true;
  return clone && isMergeableObject(value)
    ? deepmerge(emptyTarget(value), value, optionsArgument)
    : value;
}

/**
 * @todo
 */
function defaultArrayMerge(target, source, optionsArgument) {
  const destination = target.slice();
  source.forEach((e, i) => {
    if (typeof destination[i] === "undefined") {
      destination[i] = cloneIfNecessary(e, optionsArgument);
    } else if (isMergeableObject(e)) {
      destination[i] = deepmerge(target[i], e, optionsArgument);
    } else if (target.indexOf(e) === -1) {
      destination.push(cloneIfNecessary(e, optionsArgument));
    }
  });
  return destination;
}

/**
 * @todo
 */
function mergeObject(target, source, optionsArgument) {
  const destination = {};
  if (isMergeableObject(target)) {
    Object.keys(target).forEach(key => {
      destination[key] = cloneIfNecessary(target[key], optionsArgument);
    });
  }
  Object.keys(source).forEach(key => {
    if (!isMergeableObject(source[key]) || !target[key]) {
      destination[key] = cloneIfNecessary(source[key], optionsArgument);
    } else {
      destination[key] = deepmerge(target[key], source[key], optionsArgument);
    }
  });
  return destination;
}

/**
 * @todo
 */
function deepmerge(target, source, optionsArgument) {
  const array = Array.isArray(source);
  const options = optionsArgument || { arrayMerge: defaultArrayMerge };
  const arrayMerge = options.arrayMerge || defaultArrayMerge;

  if (array) {
    return Array.isArray(target)
      ? arrayMerge(target, source, optionsArgument)
      : cloneIfNecessary(source, optionsArgument);
  }
  return mergeObject(target, source, optionsArgument);
}

/**
 * @todo
 */
deepmerge.all = function deepmergeAll(array, optionsArgument) {
  if (!Array.isArray(array) || array.length < 2) {
    throw new Error(
      "first argument should be an array with at least two elements"
    );
  }

  // we are sure there are at least 2 values, so it is safe to have no initial value
  return array.reduce((prev, next) => deepmerge(prev, next, optionsArgument));
};

/**
 * Hide all letters except first n letters
 *
 * @param {string} text
 * @param {number} n - number of the first letters that will be showen
 * @returns {string}
 */
function hideTextExceptFirstNLetters(text, n = 1) {
  let hiddenText = "";
  for (let i = n; i < text.length; i++) {
    hiddenText += "*";
  }

  return text[0] + hiddenText;
}

/**
 * Mask email in format N******@g*****.com
 *
 * @param {string} email
 * @returns {string}
 */
function maskEmail(email) {
  const splitedEmail = email.split("@");

  const splitedEmailProvider = splitedEmail[1].split(".");

  return `${hideTextExceptFirstNLetters(
    splitedEmail[0]
  )}@${hideTextExceptFirstNLetters(splitedEmailProvider[0])}.${
    splitedEmailProvider[1]
  }`;
}

/**
 * Format input amount
 *
 * @param {string} value
 * @returns {string}
 */
function amountInputFieldFormat(value) {
  let newValue;

  if (value.includes(".") && value.includes(",")) {
    newValue = value;
  } else {
    newValue = value.replace(",", ".");
  }

  if (newValue[0] === "0" && newValue[1] === "0")
    newValue = newValue.slice(0, -1);

  if (newValue[0] === "0" && newValue[1] !== "." && newValue[0] !== "0")
    newValue = newValue.substring(0, 0);

  // if ((newValue.match(/[.,]/g) || []).length > 0) {
  //   newValue = newValue.slice(0, -1);
  // }

  return newValue
}
