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
import { SCREENS } from "../../constants/SCREENS";

export { celPayFriend, celPayShareLink };

/**
 * creates celpay transfer for a friend to be sent
 **/
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
        signature,
        payload,
      } = getState().forms.formData;

      const transfer = {
        amount: amountCrypto,
        coin: coin.toUpperCase(),
        friend_id: friend.item.id,
        message,
      };

      const verification = { twoFactorCode: code, pin, signature, payload };

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
        navigateTo(SCREENS.TRANSACTION_INTERSECTION, {
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
 * creates celpay transfer as a link to be shared
 **/
function celPayShareLink() {
  return async (dispatch, getState) => {
    try {
      const {
        amountCrypto,
        coin,
        code,
        pin,
        signature,
        payload,
      } = getState().forms.formData;

      const transfer = {
        amount: amountCrypto,
        coin: coin.toUpperCase(),
      };

      const verification = { twoFactorCode: code, pin, signature, payload };

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
        navigateTo(SCREENS.TRANSACTION_INTERSECTION, {
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
