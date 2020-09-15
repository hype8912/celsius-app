import {
  BLOCKEXPLORER_NAME,
  BLOCKEXPLORERS,
  ERC_20_COINS,
  LINKS_FOR_COINS,
} from "../../constants/DATA";
import store from "../../redux/store";

/**
 * Checks if coin is ERC20
 * @param {string} currency - eg. eth
 * @returns {boolean}
 */
function isERC20(currency) {
  return Object.values(ERC_20_COINS).indexOf(currency.toLowerCase()) !== -1;
}

function buyInApp(currency) {
  const { compliance } = store.getState();
  const { simplex, gem } = compliance;

  const availableCoins = [];
  simplex.coins.forEach(c => availableCoins.push(c));
  gem.coins.forEach(c => {
    if (!availableCoins.includes(c)) availableCoins.push(c);
  });

  return availableCoins.includes(currency);
}

function provideLink(currency) {
  if (buyInApp(currency)) return false;

  return LINKS_FOR_COINS[currency] || null;
}

function provideText(currency) {
  let text;
  switch (currency) {
    case "BTC":
    case "BCH":
    case "ETH":
    case "LTC":
    case "XRP":
    case "CEL":
    case "XLM":
      text = `Buy ${currency} in App`;
      break;
    case "TUSD":
      text = `Buy ${currency} from TrustToken`;
      break;
    case "USDC":
      text = `Buy ${currency} from Circle`;
      break;
    case "PAX":
      text = `Buy ${currency} from Paxos`;
      break;
    case "THKD":
    case "TCAD":
    case "TAUD":
    case "TGBP":
      text = `Buy ${currency} from TrustToken`;
      break;
    case "DASH":
      text = `Buy ${currency}`;
      break;
    case "OMG":
      text = `Buy ${currency} on MoonPay`;
      break;
    case "DAI":
      text = `Buy ${currency} on MoonPay`;
      break;
    default:
      text = null;
  }
  return text;
}

export function getBlockExplorerLink(transaction) {
  const tId = transaction.transaction_id;
  switch (transaction.coin) {
    // BTC
    case "btc":
      return {
        link: BLOCKEXPLORERS.btc && `${BLOCKEXPLORERS.btc}${tId}`,
        text: BLOCKEXPLORER_NAME.BTC,
      };
    // BCH
    case "bch":
      return {
        link: BLOCKEXPLORERS.bch && `${BLOCKEXPLORERS.bch}${tId}`,
        text: BLOCKEXPLORER_NAME.BCH,
      };
    // LTC
    case "ltc":
      return {
        link: BLOCKEXPLORERS.ltc && `${BLOCKEXPLORERS.ltc}${tId}`,
        text: BLOCKEXPLORER_NAME.LTC,
      };
    // XRP
    case "xrp":
      return {
        link: BLOCKEXPLORERS.xrp && `${BLOCKEXPLORERS.xrp}${tId}`,
        text: BLOCKEXPLORER_NAME.XRP,
      };
    // XLM
    case "xlm":
      return {
        link: BLOCKEXPLORERS.xlm && `${BLOCKEXPLORERS.xlm}${tId}`,
        text: BLOCKEXPLORER_NAME.XLM,
      };
    // EOS
    case "eos":
      return {
        link: BLOCKEXPLORERS.eos && `${BLOCKEXPLORERS.eos}${tId}`,
        text: BLOCKEXPLORER_NAME.EOS,
      };
    // DASH
    case "dash":
      return {
        link: BLOCKEXPLORERS.dash && `${BLOCKEXPLORERS.dash}${tId}`,
        text: BLOCKEXPLORER_NAME.DASH,
      };
    // ZEC
    case "zec":
      return {
        link: BLOCKEXPLORERS.zec && `${BLOCKEXPLORERS.zec}${tId}`,
        text: BLOCKEXPLORER_NAME.ZEC,
      };
    // BTG
    case "btg":
      return {
        link: BLOCKEXPLORERS.btg && `${BLOCKEXPLORERS.btg}${tId}`,
        text: BLOCKEXPLORER_NAME.BTG,
      };
    // ETC
    case "etc":
      return {
        link: BLOCKEXPLORERS.etc && `${BLOCKEXPLORERS.etc}${tId}`,
        text: BLOCKEXPLORER_NAME.ETC,
      };

    // ETH & ERC20
    case "eth":
    case "dai":
    case "pax":
    case "zrx":
    case "tusd":
    case "gusd":
    case "usdc":
    case "cel":
    case "omg":
    case "link":
    case "lpt":
    case "snx":
    case "kcn":
    case "matic":
      return {
        link: BLOCKEXPLORERS.eth && `${BLOCKEXPLORERS.eth}${tId}`,
        text: BLOCKEXPLORER_NAME.ERC20,
      };

    default:
      return null;
  }
}

export default {
  isERC20,
  provideLink,
  provideText,
  buyInApp,
};
