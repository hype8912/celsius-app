import store from '../redux/store'
import * as actions from '../redux/actions'

export default {
  isLosingMembership,
  isLosingTier,
  refetchMembershipIfChanged, // TODO maybe move to an action?
}

/**
 * get if the user will lose cel membership
 *
 * @param {String} coin - eg. BTC|ETH|CEL
 * @param {String} newBalance
 * @returns {boolean}
 */
function isLosingMembership (coin, newBalance) {
  if (coin !== "CEL") return false;

  const { celsius_member: isCelsiusMember } = store.getState().user.profile
  return isCelsiusMember && Number(newBalance) < 1
}

/**
 * get if the user will lose cel his current tier
 *
 * @param {String} coin
 * @param {String} newBalance - new coin balance after transaction
 * @returns {boolean}
 */
function isLosingTier (coin, newBalance) {
  if (coin !== "CEL") return false;

  const { min_for_tier: minForTier } = store.getState().user.loyaltyInfo
  const celRatio = calculateCelRatio(newBalance)

  return celRatio < minForTier;
}

/**
 * Refetch cel membership flag if the cel summary balance is changed and it is lower than 1
 *
 * @param {String} coin
 */
async function refetchMembershipIfChanged (coin) {
  await store.dispatch(actions.getWalletSummary())
  if (coin === 'CEL') {
    const { summary } = store.getState().wallet
    const coinData = summary.coins.find(c => c.short === 'CEL')
    if (Number(coinData.amount) < 1) {
      await store.dispatch(actions.getProfileInfo())
    }
  }
}

/**
 * Gets CEL ratio
 *
 * @param {Number} newCelBalance - celsius balance after a transaction
 * @returns {Boolean}
 */
function calculateCelRatio (newCelBalance) {
  const walletSummary = store.getState().wallet.summary

  const celBalance = newCelBalance || walletSummary.coins.find(c => c.short === 'CEL').amount_usd
  const otherCoinsBalance = walletSummary.total_amount_usd - celBalance
  const celRatio = otherCoinsBalance ? celBalance/otherCoinsBalance : 1

  return celRatio
}


