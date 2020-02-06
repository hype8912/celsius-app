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
function simplexGetQuote(coin, fiatCurrency, requestedCurrency, amount ) {
  return async (dispatch) => {
    try {
      dispatch(startApiCall(API.GET_QUOTE));
      const quote = await simplexService.getQuote(coin, fiatCurrency, requestedCurrency, amount);
      dispatch({
        type: ACTIONS.GET_QUOTE_SUCCESS,
        quote: quote.data,
      });
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_QUOTE, err));
    }
  };
}

/**
 * Creates Simplex request
 * @param {object} args
 */

function simplexCreatePaymentRequest (args) {
  return async (dispatch, getState) => {
    try {
      const { formData } = getState().forms;
      const { pin, code } = formData;
      dispatch(startApiCall(API.CREATE_PAYMENT_REQUEST));
      const paymentRequest = await simplexService.createPaymentRequest(args, {pin, code});

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
