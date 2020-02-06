import { sendEvent } from "../mixpanel-util";

const buyCoinsAnalytics = {
  navigatedToBuyCoins,
  choseBuyCoinsType,
  enteredBuyCoinsAmount,
  initiatedBuyCoinsRequest,
  finishedSimplexFlow,
}

/**
 * Fires when user navigates to BuyCoinsLanding screen
 *
 * @param {string} from - screen from which user navigated to BuyCoinsLanding
 */
function navigatedToBuyCoins(from) {
  sendEvent("Navigated to Buy Coins", { from })
}

/**
 * Fires when user chooses type of BuyCoins flow
 *
 * @param {string} type - CARD|WIRE
 */
function choseBuyCoinsType(type) {
  sendEvent("Chose BuyCoins Type", { buyCoinsType: type })
}

/**
 * Fires when user presses Buy button on BuyCoinsEnterAmount
 *
 * @param {string} coin - BTC|ETH
 * @param {number} amountUsd
 * @param {number} amountCrypto
 */
function enteredBuyCoinsAmount(coin, amountUsd, amountCrypto) {
  sendEvent("Entered Buy Coins Coin & Amount", { coin, amountUsd, amountCrypto })
}

/**
 * Fires when user confirms a Buy Coins request
 *
 * @param {string} buyCoinsType - CARD|WIRE
 * @param {string} coin - BTC|ETH
 * @param {number} amountUsd
 * @param {number} amountCrypto
 */
function initiatedBuyCoinsRequest(buyCoinsType, coin, amountUsd, amountCrypto) {
  sendEvent("Confirmed Buy Coins Request", { buyCoinsType, coin, amountUsd, amountCrypto })
}

/**
 * Fires when user finishes Simplex flow in the app
 *
 * @param {string} buyCoinsType - CARD|WIRE
 * @param {string} coin - BTC|ETH
 * @param {number} amountUsd
 * @param {number} amountCrypto
 */
function finishedSimplexFlow(buyCoinsType, coin, amountUsd, amountCrypto) {
  sendEvent("Confirmed Buy Coins Simplex Flow", { buyCoinsType, coin, amountUsd, amountCrypto })
}

export default buyCoinsAnalytics;
