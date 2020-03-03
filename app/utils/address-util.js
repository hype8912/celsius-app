
export default {
  splitAddressTag,
  joinAddressTag,
  hasTag,
  hasCoinTag
}


/**
 * Splits the address/public key into address and tag/memo
 *
 * @param {string} address - address for any coin
 * @returns {Object} addressObj
 * @returns {Object} addressObj.newAddress
 * @returns {Object} addressObj.newTag - tag|memo id
 */
function splitAddressTag(address) {
  let addressArray;
  const addressObj = {};

  if (address.indexOf("?dt=") !== -1 ) {
    addressArray = address.split("?dt=");
    addressObj.newAddress = addressArray[0];
    addressObj.newTag = addressArray[1];
  } else if (address.indexOf("?memoId=") !== -1 ) {
    addressArray = address.split("?memoId=");
    addressObj.newAddress = addressArray[0];
    addressObj.newTag = addressArray[1];
  } else {
    addressObj.newAddress = address;
    addressObj.newTag = ""
  }

  return addressObj;
}

/**
 * Checks if the address has a tag or memo id
 *
 * @param {string} address - address for any coin
 * @returns {boolean}
 */
function hasTag(address) {
  const tag = address.indexOf("?dt=") !== -1 || address.indexOf("?memoId=") !== -1;

  return tag
}


/**
 * Checks if coin address can have a tag or memo id
 *
 * @param {string} coin - eg. XRP|xrp
 * @returns {boolean}
 */
function hasCoinTag(coin) {
  return ['XRP','xrp','XLM','xlm'].includes(coin)
}


/**
 * Joins address and the tag or memo id
 *
 * @param {string} coin - eg. xrp
 * @param {string} address - address for coin
 * @param {string} coinTag - coin tag or memo id
 * @returns {boolean}
 */
function joinAddressTag(coin, address, coinTag) {
  let newWithdrawalAddress;
  if (coin.toLowerCase() === "xrp" && coinTag) newWithdrawalAddress = address.concat("?dt=").concat(coinTag);
  if (coin.toLowerCase() === "xlm" && coinTag) newWithdrawalAddress = address.concat("?memoId=").concat(coinTag);
  if (!["xrp", "xlm"].includes(coin.toLowerCase()) || !coinTag) newWithdrawalAddress = address;

  return newWithdrawalAddress
}
