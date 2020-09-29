import moment from "moment";

import ACTIONS from "../../constants/ACTIONS";
import { apiError, startApiCall } from "../api/apiActions";
import API from "../../constants/API";
import { showMessage } from "../ui/uiActions";
import mixpanelAnalytics from "../../utils/mixpanel-analytics";
import buyCoinsService from "../../services/buy-coins-service";
import {
  BUY_COINS_PAYMENT_STATUSES,
  TRANSACTION_TYPES,
} from "../../constants/DATA";
import { COLOR_KEYS } from "../../constants/COLORS";

export {
  getPaymentRequests,
  getSimplexQuote,
  createSimplexPayment,
  createGemPayment,
  getGemCoinAddress,
};

/**
 * Gets all simplex payments
 */
function getPaymentRequests() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_PAYMENT_REQUESTS));

    try {
      const res = await buyCoinsService.getAllPayments();
      const payments = res.data.map(mapPayment);

      dispatch({
        type: ACTIONS.GET_PAYMENT_REQUESTS_SUCCESS,
        payments,
      });
    } catch (err) {
      dispatch(apiError(API.GET_PAYMENT_REQUESTS, err));
      dispatch(showMessage("error", err.msg));
    }
  };
}

/**
 * Gets info for Simplex request
 */
function getSimplexQuote() {
  return async (dispatch, getState) => {
    const { formData } = getState().forms;

    try {
      const requestedCurrency = formData.isFiat
        ? formData.fiatCoin
        : formData.cryptoCoin;
      const amount = formData.isFiat
        ? formData.amountFiat
        : formData.amountCrypto;

      if (Number(amount)) {
        dispatch(startApiCall(API.GET_SIMPLEX_QUOTE));
        const quote = await buyCoinsService.getSimplexQuote(
          formData.cryptoCoin,
          formData.fiatCoin,
          requestedCurrency,
          amount
        );
        dispatch({
          type: ACTIONS.GET_SIMPLEX_QUOTE_SUCCESS,
          quote: quote.data,
        });
      }
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_SIMPLEX_QUOTE, err));
    }
  };
}

/**
 * Creates Simplex payment request
 */
function createSimplexPayment() {
  return async (dispatch, getState) => {
    try {
      const { formData } = getState().forms;
      const { simplexData } = getState().buyCoins;

      dispatch(startApiCall(API.CREATE_SIMPLEX_PAYMENT));

      const payment = {
        quote_id: simplexData.quote_id,
        coin: simplexData.digital_money.currency,
        amount: simplexData.digital_money.amount,
        fiat_amount: simplexData.fiat_money.total_amount,
        fiat_currency: simplexData.fiat_money.currency,
        fiat_base_amount: simplexData.fiat_money.base_amount,
      };

      const verification = {
        pin: formData.pin,
        twoFactorCode: formData.code,
        payload: formData.payload,
        signature: formData.signature,
      };

      const paymentRequest = await buyCoinsService.createSimplexPayment(
        payment,
        verification
      );

      dispatch({
        type: ACTIONS.CREATE_SIMPLEX_PAYMENT_SUCCESS,
        paymentRequest: paymentRequest.data,
      });

      mixpanelAnalytics.initiatedBuyCoinsRequest(
        "CARD",
        formData.cryptoCoin,
        formData.fiatCoin,
        formData.amountInUsd,
        simplexData.fiat_money.total_amount,
        simplexData.digital_money.amount
      );
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.CREATE_SIMPLEX_PAYMENT, err));
    }
  };
}

/**
 * Creates Gem payment request
 *
 * @param {string} userId - user id on GEM platform
 * @param {string} transactionId - transaction id on GEM platform
 */
function createGemPayment(userId, transactionId = null) {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.CREATE_GEM_PAYMENT));

      const paymentRequest = await buyCoinsService.createGemPayment({
        user_id: userId,
        transaction_id: transactionId,
      });

      dispatch({
        type: ACTIONS.CREATE_GEM_PAYMENT_SUCCESS,
        paymentRequest: paymentRequest.data,
      });

      // TODO add analytics
      // mixpanelAnalytics.initiatedBuyCoinsRequest();
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.CREATE_GEM_PAYMENT, err));
    }
  };
}

/**
 * Gets Deposit address for coin
 */
function getGemCoinAddress() {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_GEM_COIN_ADDRESS));

      const res = await buyCoinsService.getGemCoinAddresses();
      const addresses = res.data;
      const walletGemAddresses = [];
      Object.keys(addresses).forEach(coin => {
        const value = addresses[coin];

        walletGemAddresses.push({
          asset: coin,
          address: value,
        });
      });
      dispatch({
        type: ACTIONS.GET_GEM_COIN_ADDRESS_SUCCESS,
        walletGemAddresses,
      });
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_GEM_COIN_ADDRESS, err));
    }
  };
}

function mapPayment(payment) {
  let paymentType;
  switch (payment.status) {
    case BUY_COINS_PAYMENT_STATUSES.PENDING:
      paymentType = TRANSACTION_TYPES.DEPOSIT_PENDING;
      break;

    case BUY_COINS_PAYMENT_STATUSES.APPROVED:
    case BUY_COINS_PAYMENT_STATUSES.COMPLETED:
      paymentType = TRANSACTION_TYPES.DEPOSIT_CONFIRMED;
      break;

    case BUY_COINS_PAYMENT_STATUSES.REFUNDED:
    case BUY_COINS_PAYMENT_STATUSES.CANCELLED:
    case BUY_COINS_PAYMENT_STATUSES.DECLINED:
    case BUY_COINS_PAYMENT_STATUSES.EXPIRED:
    case BUY_COINS_PAYMENT_STATUSES.FAILED:
      paymentType = TRANSACTION_TYPES.CANCELED;
      break;
  }

  const time = moment(payment.created_at).isSame(moment(), "day")
    ? moment(payment.created_at).format("HH:mm")
    : moment(payment.created_at).format("DD MMM YYYY");

  const paymentMethod =
    payment.type === "credit_card" ? "Credit Card" : "Bank Wire";
  const orderID =
    payment.order_id &&
    `${payment.order_id.slice(0, 18)} \n ${payment.order_id.slice(19)}`;

  const uiProps = {};
  uiProps.shortName = payment.type === "credit_card" ? "CC" : "BW";

  switch (paymentType) {
    case TRANSACTION_TYPES.DEPOSIT_PENDING:
      uiProps.color = COLOR_KEYS.ALERT_STATE;
      uiProps.statusText = "Pending";
      break;
    case TRANSACTION_TYPES.DEPOSIT_CONFIRMED:
      uiProps.color = COLOR_KEYS.POSITIVE_STATE;
      uiProps.statusText = "Confirmed";
      break;
    case TRANSACTION_TYPES.CANCELED:
      uiProps.color = COLOR_KEYS.NEGATIVE_STATE;
      uiProps.statusText = "Cancelled";
      break;
  }

  return {
    ...payment,
    fiat_currency: payment.fiat_currency.toUpperCase(),
    paymentType,
    time,
    uiProps,
    paymentMethod,
    orderID,
  };
}
