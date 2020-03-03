import BigNumber from 'bignumber.js';

/**
 * Checks if coin is ERC20
 * @todo: add missing ERC20 coins
 *
 * @param {string} currency - eg. eth
 * @returns {boolean}
 */
function isERC20(currency) {
  return ['eth', 'dai', 'pax', 'cel', 'omg', 'zrx', 'tusd', 'gusd', 'usdc', 'orbs'].indexOf(currency.toLowerCase()) !== -1;
}


function isGreaterThan(str1, str2) {
  const num1 = new BigNumber(str1)
  const num2 = new BigNumber(str2)
  return num1.gt(num2)
}

/**
 * WalletLanding page priority order for coins
 */
const priorityCoins = ["CEL", "BTC", "ETH", "XRP", "LTC", "ZRX"];


export default {
  isERC20, // TODO move to BE or something
  priorityCoins, // TODO move somewhere?
  isGreaterThan, // TODO maybe move to formatter? add JSDoc
}
