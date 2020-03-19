import BigNumber from "bignumber.js";
import { BLOCKEXPLORERS } from "../constants/DATA";

/**
 * Checks if coin is ERC20
 * @todo: add missing ERC20 coins
 *
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
      "orbs",
      "leo",
      "usdt erc20",
      "tcad",
      "tgbp",
      "thkd",
      "taud",
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
    "CEL",
    "DASH",
    "OMG",
    "ZEC",
    "DAI",
  ].includes(currency);
}

function buyInApp(currency) {
  return ["BTC", "BCH", "ETH", "LTC", "XRP", "XLM"].includes(currency);
}

function provideLink(currency) {
  let link;
  switch (currency) {
    case "BCH":
      link = "https://buy.moonpay.io/celsius";
      break;
    case "BTC":
      link = "https://buy.moonpay.io/celsius";
      break;
    case "ETH":
      link = "https://buy.moonpay.io/celsius";
      break;
    case "LTC":
      link = "https://buy.moonpay.io/celsius";
      break;
    case "XRP":
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
    case "CEL":
      link =
        "https://switcheo.exchange/markets/CEL_ETH?utm_source=website&utm_term=btn1";
      break;
    case "DASH":
      link = "https://www.dash.org/where-to-buy";
      break;
    case "XLM":
      link = "https://buy.moonpay.io/celsius";
      break;
    case "OMG":
      link = "https://buy.moonpay.io/celsius";
      break;
    case "ZEC":
      link = "https://buy.moonpay.io/celsius";
      break;
    case "DAI":
      link = "https://buy.moonpay.io/celsius";
      break;
    default:
      link = null;
  }
  return link;
}

function provideText(currency) {
  let text;
  switch (currency) {
    case "BCH":
      text = `Buy ${currency} in App`;
      break;
    case "BTC":
      text = `Buy ${currency} in App`;
      break;
    case "ETH":
      text = `Buy ${currency} in App`;
      break;
    case "LTC":
      text = `Buy ${currency} in App`;
      break;
    case "XRP":
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
      text = `Buy ${currency} from TrustToken`;
      break;
    case "TCAD":
      text = `Buy ${currency} from TrustToken`;
      break;
    case "TAUD":
      text = `Buy ${currency} from TrustToken`;
      break;
    case "TGBP":
      text = `Buy ${currency} from TrustToken`;
      break;
    case "CEL":
      text = `Buy ${currency} on Switcheo`;
      break;
    case "DASH":
      text = `Buy ${currency}`;
      break;
    case "XLM":
      text = `Buy ${currency} in App`;
      break;
    case "OMG":
      text = `Buy ${currency} on MoonPay`;
      break;
    case "ZEC":
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

function getBlockExplorerLink(transaction) {
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
      return {
        link: BLOCKEXPLORERS.eth && `${BLOCKEXPLORERS.eth}${tId}`,
        text: "etherscan",
      };

    default:
      return null;
  }
}

export default {
  isERC20, // TODO move to BE or something
  isGreaterThan, // TODO maybe move to formatter? add JSDoc
  hasLinkToBuy,
  provideLink,
  provideText,
  buyInApp,
  getBlockExplorerLink,
};
