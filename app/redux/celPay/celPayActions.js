import { Share } from 'react-native'

import ACTIONS from '../../constants/ACTIONS'
import { apiError, startApiCall } from '../api/apiActions'
import API from '../../constants/API'
import { showMessage } from '../ui/uiActions'
import { clearForm } from '../forms/formsActions'
import transfersService from '../../services/transfer-service'
import formatter from '../../utils/formatter'
import { navigateTo } from '../nav/navActions'
import analytics from '../../utils/analytics'
import celUtilityUtil from '../../utils/cel-utility-util'

export {
  celPayFriend,
  celPayShareLink,
}


/**
 * TODO add JSDoc
 */
function celPayFriend () {
  return async (dispatch, getState) => {
    try {
      const {
        amountCrypto,
        friend,
        coin,
        code,
        pin,
        message
      } = getState().forms.formData

      const transfer = {
        amount: amountCrypto,
        coin: coin.toUpperCase(),
        friend_id: friend.id,
        message
      }

      const verification = { twoFactorCode: code, pin }

      dispatch(startApiCall(API.CREATE_TRANSFER))
      const transferRes = await transfersService.create(transfer, verification)
      const transferData = transferRes.data.transfer

      dispatch({
        type: ACTIONS.CREATE_TRANSFER_SUCCESS,
        transfer: transferData
      })

      const names = friend.name ? friend.name.split(' ') : undefined
      let msg = `Successfully sent ${formatter.crypto(amountCrypto, coin)}`
      if (names && names[0]) msg += ` to ${names[0]}!`
      dispatch(showMessage('success', msg))
      dispatch(clearForm())
      dispatch(
        navigateTo('TransactionDetails', {
          form: 'celPay',
          id: transferData.transaction_id
        })
      )

      await celUtilityUtil.refetchMembershipIfChanged(transfer.coin)

      analytics.celpayCompleted(transferData)
    } catch (err) {
      dispatch(apiError(API.CREATE_TRANSFER, err))
      dispatch(showMessage('error', err.msg))
    }
  }
}


/**
 * TODO add JSDoc
 */
function celPayShareLink () {
  return async (dispatch, getState) => {
    try {
      const { amountCrypto, coin, code, pin } = getState().forms.formData

      const transfer = {
        amount: amountCrypto,
        coin: coin.toUpperCase()
      }

      const verification = { twoFactorCode: code, pin }

      dispatch(startApiCall(API.CREATE_TRANSFER))
      const transferRes = await transfersService.create(transfer, verification)
      const transferData = transferRes.data.transfer

      dispatch({
        type: ACTIONS.CREATE_TRANSFER_SUCCESS,
        transfer: transferData
      })

      const branchLink = transferRes.data.branch_link

      const shareMsg = `You got ${formatter.crypto(
        amountCrypto,
        coin
      )}! Click on the link to claim it ${branchLink}`
      await Share.share({ message: shareMsg, title: 'Celsius CelPay' })

      const msg = `Successfully sent ${formatter.crypto(amountCrypto, coin)}!`
      dispatch(showMessage('success', msg))
      dispatch(clearForm())
      dispatch(
        navigateTo('TransactionDetails', { id: transferData.transaction_id })
      )

      await celUtilityUtil.refetchMembershipIfChanged(transfer.coin)

      analytics.celpayCompleted(transferData)
    } catch (err) {
      dispatch(apiError(API.CREATE_TRANSFER, err))
      dispatch(showMessage('error', err.msg))
    }
  }
}
