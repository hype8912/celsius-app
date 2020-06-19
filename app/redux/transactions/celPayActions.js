import ACTIONS from "../../constants/ACTIONS";
import { apiError, startApiCall } from "../api/apiActions";
import API from "../../constants/API";
import { closeModal, showMessage } from "../ui/uiActions";
import { clearForm } from "../forms/formsActions";
import transfersService from "../../services/transfer-service";
import formatter from "../../utils/formatter";
import { navigateTo } from "../nav/navActions";
import mixpanelAnalytics from "../../utils/mixpanel-analytics";
import { CEL_PAY_TYPES } from "../../constants/UI";

export { celPayFriend, celPayShareLink };

/**
 * TODO add JSDoc
 */
function celPayFriend() {
  return async (dispatch, getState) => {
    try {
      const {
        amountCrypto,
        friend,
        coin,
        code,
        pin,
        message,
      } = getState().forms.formData;

      const transfer = {
        amount: amountCrypto,
        coin: coin.toUpperCase(),
        friend_id: friend.item.id,
        message,
      };

      const verification = { twoFactorCode: code, pin };

      dispatch(startApiCall(API.CREATE_TRANSFER));
      const transferRes = await transfersService.create(transfer, verification);
      const transferData = transferRes.data.transfer;

      dispatch({
        type: ACTIONS.CREATE_TRANSFER_SUCCESS,
        transfer: transferData,
      });

      let msg;
      const names = friend.item.name ? friend.item.name.split(" ") : undefined;
      msg = `Check your email and confirm your CelPay transaction ${formatter.crypto(
        amountCrypto,
        coin
      )}`;
      if (names && names[0]) msg += ` to ${names[0]}!`;

      dispatch(showMessage("success", msg));
      dispatch(clearForm());
      dispatch(
        navigateTo("TransactionsIntersection", {
          id: transferData.transaction_id,
          hideBack: true,
        })
      );
      dispatch(closeModal());

      mixpanelAnalytics.initiatedCelPay(CEL_PAY_TYPES.FRIEND);
    } catch (err) {
      dispatch(apiError(API.CREATE_TRANSFER, err));
      dispatch(showMessage("error", err.msg));
    }
  };
}

/**
 * TODO add JSDoc
 */
function celPayShareLink() {
  return async (dispatch, getState) => {
    try {
      const { amountCrypto, coin, code, pin } = getState().forms.formData;

      const transfer = {
        amount: amountCrypto,
        coin: coin.toUpperCase(),
      };

      const verification = { twoFactorCode: code, pin };

      dispatch(startApiCall(API.CREATE_TRANSFER));
      const transferRes = await transfersService.create(transfer, verification);
      const transferData = transferRes.data.transfer;

      dispatch({
        type: ACTIONS.CREATE_TRANSFER_SUCCESS,
        transfer: transferData,
      });

      dispatch(
        showMessage(
          "success",
          "An email verification has been sent. Check your inbox."
        )
      );
      dispatch(clearForm());
      dispatch(
        navigateTo("TransactionsIntersection", {
          id: transferData.transaction_id,
          hideBack: true,
        })
      );
      dispatch(closeModal());

      mixpanelAnalytics.initiatedCelPay(CEL_PAY_TYPES.LINK);
    } catch (err) {
      dispatch(apiError(API.CREATE_TRANSFER, err));
      dispatch(showMessage("error", err.msg));
    }
  };
}
