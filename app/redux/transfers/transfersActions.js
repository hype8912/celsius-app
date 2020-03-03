import ACTIONS from '../../constants/ACTIONS';
import API from '../../constants/API';
import transferService from '../../services/transfer-service';
import { navigateTo, navigateBack } from "../nav/navActions";
import { showMessage, openModal } from "../ui/uiActions";
import { apiError, startApiCall } from "../api/apiActions";
import { TRANSFER_STATUSES } from "../../constants/DATA";
import { getWalletSummary } from "../wallet/walletActions";
import { getAllTransactions } from "../transactions/transactionsActions";
import { MODALS } from '../../constants/UI'
import formatter from '../../utils/formatter'

export {
  getAllTransfers,
  claimTransfer,
  cancelTransfer,
  registerTransferLink,
  claimAllBranchTransfers,
}


/**
 * Gets all transfers by status
 * @param {string} transferStatus - @todo: check all statuses
 */
function getAllTransfers(transferStatus) {
  return async dispatch => {
    dispatch(startApiCall(API.GET_ALL_TRANSFERS));

    try {
      const res = await transferService.getAll(transferStatus);
      const transfers = res.data;
      dispatch(getAllTransfersSuccess(transfers.map(mapTransfer)));
    } catch (err) {
      // dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_ALL_TRANSFERS, err));
    }
  }
}



/**
 * @TODO add JSDoc
 */
function getAllTransfersSuccess(transfers) {
  return {
    type: ACTIONS.GET_ALL_TRANSFERS_SUCCESS,
    callName: API.GET_ALL_TRANSFERS,
    transfers,
  }
}


/**
 * @TODO write JSDoc
 */
function getTransferSuccess(transfer) {
  return {
    type: ACTIONS.GET_TRANSFER_SUCCESS,
    callName: API.GET_TRANSFER,
    transfer: mapTransfer(transfer),
  }
}


/**
 * Gets all transfers by status
 * @param {string} transferStatus - @todo: check all statuses
 */
function claimTransfer(transferHash) {
  return async dispatch => {
    dispatch(startApiCall(API.CLAIM_TRANSFER));

    try {
      const res = await transferService.claim(transferHash);
      dispatch(claimTransferSuccess(res.data));
      dispatch(showMessage('success', `CelPay claimed successfully!`));
      dispatch(getAllTransactions())
      dispatch(navigateBack());
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.CLAIM_TRANSFER, err));
    }
  }
}



/**
 * @TODO add JSDoc
 */
function claimTransferSuccess(transfer) {
  return {
    type: ACTIONS.CLAIM_TRANSFER_SUCCESS,
    callName: API.CLAIM_TRANSFER,
    transfer: mapTransfer(transfer),
  }
}


/**
 * Cancels a pending transfer
 * @param {string} transferHash
 */
function cancelTransfer(transferHash) {
  return async dispatch => {
    dispatch(startApiCall(API.cancel_TRANSFER));

    try {
      const res = await transferService.cancel(transferHash);
      dispatch(cancelTransferSuccess(res.data));
      dispatch(showMessage('success', "Transaction canceled"));
      dispatch(getAllTransactions())
      dispatch(navigateTo('WalletLanding'));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.CANCEL_TRANSFER, err));
    }
  }
}



/**
 * @TODO add JSDoc
 */
function cancelTransferSuccess(transfer) {
  return {
    type: ACTIONS.CANCEL_TRANSFER_SUCCESS,
    callName: API.CANCEL_TRANSFER,
    transfer: mapTransfer(transfer),
  }
}


/**
 * Triggered when transfer branch link is registered
 * @param {Object} deepLink - received deep link from branch
 */
function registerTransferLink(deepLink) {
  return async (dispatch, getState) => {
    let callName;

    try {
      // const { userActions } = getState().ui;
      const { profile } = getState().user;

      if (!profile) {
        dispatch(showMessage('warning', 'In order to user a CelPay link you must be logged in'))
        return;
      }

      callName = API.GET_TRANSFER;
      dispatch(startApiCall(API.GET_TRANSFER));
      let res = await transferService.get(deepLink.hash);
      const transfer = res.data;

      if (transfer.claimed_at) {
        dispatch(showMessage('warning', 'This CelPay Link has already been claimed!'));
        dispatch(getTransferSuccess());
        return;
      }
      dispatch(getTransferSuccess(transfer));

      callName = API.CLAIM_TRANSFER;
      res = await transferService.claim(transfer.hash);
      dispatch(claimTransferSuccess(res.data));

      if (res.data.expired_at) {
        dispatch(showMessage('success', `Your CelPay of ${ formatter.crypto(res.data.amount, res.data.coin) } was canceled successfully!`));
      } else {
        dispatch(openModal(MODALS.CELPAY_RECEIVED_MODAL));
      }
      dispatch(getWalletSummary());
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(callName, err));
    }

  }
}


/**
 * Claims all pending transfers for newly registered user
 */
function claimAllBranchTransfers() {
  return (dispatch, getState) => {
    const { branchHashes } = getState().transfers;
    if (branchHashes && branchHashes.length) branchHashes.forEach(bh => dispatch(claimTransfer(bh)));
  }
}


/**
 * Maps all transfer props
 * @param {Object} transfer
 * @TODO move to reducer
 */
function mapTransfer(transfer) {
  if (!transfer) return;

  let status = TRANSFER_STATUSES.pending;
  if (transfer.claimed_at && !transfer.cleared_at) {
    status = TRANSFER_STATUSES.claimed;
  }
  if (transfer.cleared_at) {
    status = TRANSFER_STATUSES.cleared;
  }
  if (transfer.expired_at) {
    status = TRANSFER_STATUSES.expired;
  }

  return {
    ...transfer,
    status
  }
}
