import BigNumber from "bignumber.js";
import { BLOCKEXPLORERS } from "../constants/DATA";
import store from "../redux/store";

/**
 * Checks if coin is ERC20
 * @param {string} currency - eg. eth
 * @returns {boolean}
 */
function isERC20(currency) {
  return (
    [
      "eth",
      "dai",
      "pax",
      "cel",
      "omg",
      "zrx",
      "tusd",
      "gusd",
      "usdc",
      "leo",
      "usdt erc20",
      "tcad",
      "tgbp",
      "thkd",
      "taud",
      "busd",
      "bat",
    ].indexOf(currency.toLowerCase()) !== -1
  );
}

function hasLinkToBuy(currency) {
  return [
    "TUSD",
    "USDC",
    "PAX",
    "THKD",
    "TCAD",
    "TAUD",
    "TGBP",
    "DASH",
    "OMG",
    "DAI",
  ].includes(currency);
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
  let link;
  switch (currency) {
    case "BTC":
    case "BCH":
    case "ETH":
    case "LTC":
    case "XRP":
    case "XLM":
    case "OMG":
    case "DAI":
      link = "https://buy.moonpay.io/celsius";
      break;
    case "TUSD":
      link = "https://www.trusttoken.com/trueusd";
      break;
    case "USDC":
      link = "https://usdc.circle.com/start";
      break;
    case "PAX":
      link = "https://account.paxos.com/signup";
      break;
    case "THKD":
      link = "https://www.trusttoken.com/truehkd";
      break;
    case "TCAD":
      link = "https://www.trusttoken.com/truecad";
      break;
    case "TAUD":
      link = "https://www.trusttoken.com/trueaud";
      break;
    case "TGBP":
      link = "https://www.trusttoken.com/truegbp";
      break;
    case "DASH":
      link = "https://www.dash.org/where-to-buy";
      break;
    default:
      link = null;
  }
  return link;
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

function isGreaterThan(str1, str2) {
  const num1 = new BigNumber(str1);
  const num2 = new BigNumber(str2);
  return num1.gt(num2);
}

export function getBlockExplorerLink(transaction) {
  const tId = transaction.transaction_id;
  switch (transaction.coin) {
    // BTC
    case "btc":
      return {
        link: BLOCKEXPLORERS.btc && `${BLOCKEXPLORERS.btc}${tId}`,
        text: "blockchain",
      };
    // BCH
    case "bch":
      return {
        link: BLOCKEXPLORERS.bch && `${BLOCKEXPLORERS.bch}${tId}`,
        text: "blockdozer",
      };
    // LTC
    case "ltc":
      return {
        link: BLOCKEXPLORERS.ltc && `${BLOCKEXPLORERS.ltc}${tId}`,
        text: "chainz",
      };
    // XRP
    case "xrp":
      return {
        link: BLOCKEXPLORERS.xrp && `${BLOCKEXPLORERS.xrp}${tId}`,
        text: "xrpcharts",
      };
    // XLM
    case "xlm":
      return {
        link: BLOCKEXPLORERS.xlm && `${BLOCKEXPLORERS.xlm}${tId}`,
        text: "stellarchain",
      };
    // EOS
    case "eos":
      return {
        link: BLOCKEXPLORERS.eos && `${BLOCKEXPLORERS.eos}${tId}`,
        text: "bloks.io",
      };
    // DASH
    case "dash":
      return {
        link: BLOCKEXPLORERS.dash && `${BLOCKEXPLORERS.dash}${tId}`,
        text: "chainz",
      };
    // ZEC
    case "zec":
      return {
        link: BLOCKEXPLORERS.zec && `${BLOCKEXPLORERS.zec}${tId}`,
        text: "chain.so",
      };
    // BTG
    case "btg":
      return {
        link: BLOCKEXPLORERS.btg && `${BLOCKEXPLORERS.btg}${tId}`,
        text: "btgexplorer",
      };
    // ETC
    case "etc":
      return {
        link: BLOCKEXPLORERS.etc && `${BLOCKEXPLORERS.etc}${tId}`,
        text: "bitquery.io",
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
        text: "etherscan",
      };

    default:
      return null;
  }
}

export default {
  isERC20,
  isGreaterThan,
  hasLinkToBuy,
  provideLink,
  provideText,
  buyInApp,
};
