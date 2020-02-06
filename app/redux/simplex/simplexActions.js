import ACTIONS from "../../constants/ACTIONS";
import { apiError, startApiCall } from "../api/apiActions";
import API from "../../constants/API";
import { showMessage } from "../ui/uiActions";
import simplexService from "../../services/simplex-service";
import { navigateTo } from "../nav/navActions";

export { simplexGetQuote, simplexCreatePaymentRequest, getAllSimplexPayments };

/**
 * Gets info for Simplex request
 * @param {string} coin
 * @param {string} fiatCurrency
 * @param {string} requestedCurrency
 * @param {string} amount
 */
function simplexGetQuote(coin, fiatCurrency, requestedCurrency, amount) {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_QUOTE));
      const quote = await simplexService.getQuote(
        coin,
        fiatCurrency,
        requestedCurrency,
        amount
      );
      const quoteId = quote.data.quote_id;
      const fiatTotalAmount = quote.data.fiat_money.total_amount;
      const fiatBaseAmount = quote.data.fiat_money.base_amount;
      dispatch({
        type: ACTIONS.GET_QUOTE_SUCCESS,
        quote: quote.data,
      });
      // TODO: after implementation of Simplex, remove this line of code. simplexCreatePaymentRequest function will be called in separate action (screen, modal, button).
      dispatch(
        simplexCreatePaymentRequest(
          quoteId,
          coin,
          amount,
          fiatTotalAmount,
          fiatCurrency,
          fiatBaseAmount
        )
      );
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_QUOTE, err));
    }
  };
}

/**
 * Creates Simplex request
 * @param {string} quoteId
 * @param {string} coin
 * @param {string} fiatCurrency
 * @param {string} fiatTotalAmount
 * @param {string} fiatBaseAmount
 * @param {string} requestedCurrency
 * @param {string} amount
 */

function simplexCreatePaymentRequest(
  quoteId,
  coin,
  amount,
  fiatTotalAmount,
  fiatCurrency,
  fiatBaseAmount
) {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.CREATE_PAYMENT_REQUEST));
      const paymentRequest = await simplexService.createPaymentRequest(
        quoteId,
        coin,
        amount,
        fiatTotalAmount,
        fiatCurrency,
        fiatBaseAmount
      );

      dispatch({
        type: ACTIONS.CREATE_PAYMENT_REQUEST_SUCCESS,
        paymentRequest: paymentRequest.data,
      });
      dispatch(navigateTo("Simplex"));
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.CREATE_PAYMENT_REQUEST, err));
    }
  };
}

/**
 * Gets all simplex payments
 * @param {string} quoteId
 * @param {string} coin
 * @param {string} fiatCurrency
 * @param {string} fiatTotalAmount
 * @param {string} fiatBaseAmount
 * @param {string} requestedCurrency
 * @param {string} amount
 */
function getAllSimplexPayments() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_PAYMENT_REQUESTS));

    try {
      const res = await simplexService.getAllPayments();

      dispatch({
        type: ACTIONS.GET_PAYMENT_REQUESTS_SUCCESS,
        payments: res.data,
      });
    } catch (err) {
      dispatch(apiError(API.GET_PAYMENT_REQUESTS, err));
      dispatch(showMessage("error", err.msg));
    }
  };
}
