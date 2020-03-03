import currency from 'currency-formatter'

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
}

/**
 * Formats number to $10,000.00
 *
 * @param {number|string} amount
 * @param {Object} options - check options here https://www.npmjs.com/package/currency-formatter#advanced-usage
 * @returns {string}
 */
function usd (amount, options = {}) {
  return currency.format(floor10(amount), { code: 'USD', ...options })
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
function crypto (amount, cryptocurrency, options = {}) {
  return currency.format(amount, {
    precision: options.noPrecision ? 0 : options.precision || 5,
    thousand: ',',
    symbol:
      typeof options.symbol !== 'undefined' ? options.symbol : cryptocurrency,
    format: '%v %s'
  })
}

/**
 * Formats number to 1.12
 * @todo: do we need this?
 *
 * @param {number|string} amount
 * @param {Object} options - check options here https://www.npmjs.com/package/currency-formatter#advanced-usage
 * @returns {string}
 */
function round (amount, options = {}) {
  return currency.format(amount, {
    precision: options.noPrecision ? 0 : options.precision || 2,
    thousand: ','
  })
}

/**
 * Get allowed decimals for currency
 *
 * @param {string} curr - 'USD' or everything else
 * @returns {number}
 */
function getAllowedDecimals (curr) {
  return curr === 'USD' ? 2 : 5
}

/**
 * Get if the value has > decimal as allowed
 *
 * @param {string} value
 * @param {string} curr - 'USD' or everything else
 * @returns {boolean}
 */
function hasEnoughDecimals (value = '', curr) {
  return getNumberOfDecimals(value) > getAllowedDecimals(curr)
}

/**
 * Formats number for 'USD' -> 1.21, for other -> 1.65453
 *
 * @param {string} value
 * @param {string} curr - 'USD' or everything else
 * @returns {number}
 */
function setCurrencyDecimals (value, curr) {
  if (!hasEnoughDecimals(value, curr)) return value

  return floor10(value, -this.getAllowedDecimals(curr)).toString()
}

/**
 * Capitalizes string
 *
 * @param {string} str
 * @returns {string}
 */
function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Removes decimal zeros if needed - 1.50000 -> 1.5
 *
 * @param {number|string} amount
 * @returns {string}
 */
function removeDecimalZeros (amount) {
  // const numberOfDecimals = getNumberOfDecimals(amount)
  const splitedValue = amount.toString().split('.')
  let decimals = ''
  let deleteDecimals = true
  if (splitedValue.length === 2) {
    decimals = splitedValue[1]
    for (let i = 0; i < decimals.length; i++) {
      if (decimals[i] !== '0') deleteDecimals = false
    }
  }
  return deleteDecimals ? splitedValue[0] : amount.toString()
}

/**
 * Formats percentage from number - 0.0695 * 100 = 6.950000000000001
 *
 * @param {number} number
 * @returns {number}
 */
function percentage (number) {
  return Math.round(number * 10000) / 100
}

/**
 * Formats percentage from number - 0.0695 => 6.95%
 *
 * @param {number|string} - number to format
 * @returns {number}
 */
function percentageDisplay (number) {
  const percentageNum = Math.round(number * 10000) / 100
  return `${percentageNum.toFixed(2)}%`
}


/**
 * Decimal adjustment of a number.
 *
 * @param {String}  type  The type of adjustment.
 * @param {Number}  value The number.
 * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
 * @returns {Number} The adjusted value.
 */
function floor10 (value, exp = -2) {
  const realExp = Math.pow(10, -exp)
  return Math.floor(value * realExp) / realExp
}

/**
 * Get numbers of decimals
 *
 * @param {Number}  value The number.
 * @returns {Number} Decimal number of input value
 */
function getNumberOfDecimals (value) {
  const stringValue = value.toString()
  const splitValue = stringValue && stringValue.split('.')
  return stringValue && (splitValue[1] ? splitValue[1].length : 0)
}

/**
 * Ellipsis Amount (1.656,-2) => 1.65...
 *
 * @param {Number|String}  value The number.
 * @param {Integer} exp   The exponent
 * @returns {String}
 */
function getEllipsisAmount (value, exp) {
  const realValue =
    value === '.' || value === '0.' ? '0.' : (value || 0).toString()
  const floatValue = parseFloat(realValue).toString()
  const decimals = getNumberOfDecimals(floatValue)
  if (decimals && decimals > Math.abs(exp)) {
    return `${floor10(floatValue, exp)}...`
  }
  return realValue
}

// deep merge
/**
 * @todo
 */
function isMergeableObject (val) {
  const nonNullObject = val && typeof val === 'object'

  return (
    nonNullObject &&
    Object.prototype.toString.call(val) !== '[object RegExp]' &&
    Object.prototype.toString.call(val) !== '[object Date]'
  )
}

/**
 * @todo
 */
function emptyTarget (val) {
  return Array.isArray(val) ? [] : {}
}

/**
 * @todo
 */
function cloneIfNecessary (value, optionsArgument) {
  const clone = optionsArgument && optionsArgument.clone === true
  return clone && isMergeableObject(value)
    ? deepmerge(emptyTarget(value), value, optionsArgument)
    : value
}

/**
 * @todo
 */
function defaultArrayMerge (target, source, optionsArgument) {
  const destination = target.slice()
  source.forEach((e, i) => {
    if (typeof destination[i] === 'undefined') {
      destination[i] = cloneIfNecessary(e, optionsArgument)
    } else if (isMergeableObject(e)) {
      destination[i] = deepmerge(target[i], e, optionsArgument)
    } else if (target.indexOf(e) === -1) {
      destination.push(cloneIfNecessary(e, optionsArgument))
    }
  })
  return destination
}

/**
 * @todo
 */
function mergeObject (target, source, optionsArgument) {
  const destination = {}
  if (isMergeableObject(target)) {
    Object.keys(target).forEach(key => {
      destination[key] = cloneIfNecessary(target[key], optionsArgument)
    })
  }
  Object.keys(source).forEach(key => {
    if (!isMergeableObject(source[key]) || !target[key]) {
      destination[key] = cloneIfNecessary(source[key], optionsArgument)
    } else {
      destination[key] = deepmerge(target[key], source[key], optionsArgument)
    }
  })
  return destination
}

/**
 * @todo
 */
function deepmerge (target, source, optionsArgument) {
  const array = Array.isArray(source)
  const options = optionsArgument || { arrayMerge: defaultArrayMerge }
  const arrayMerge = options.arrayMerge || defaultArrayMerge

  if (array) {
    return Array.isArray(target)
      ? arrayMerge(target, source, optionsArgument)
      : cloneIfNecessary(source, optionsArgument)
  }
  return mergeObject(target, source, optionsArgument)
}

/**
 * @todo
 */
deepmerge.all = function deepmergeAll (array, optionsArgument) {
  if (!Array.isArray(array) || array.length < 2) {
    throw new Error(
      'first argument should be an array with at least two elements'
    )
  }

  // we are sure there are at least 2 values, so it is safe to have no initial value
  return array.reduce((prev, next) => deepmerge(prev, next, optionsArgument))
}
