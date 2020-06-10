import ACTIONS from "../../constants/ACTIONS";
import { apiError, startApiCall } from "../api/apiActions";
import API from "../../constants/API";
import { showMessage } from "../ui/uiActions";
import mixpanelAnalytics from "../../utils/mixpanel-analytics";
import { mocks } from "../../../dev-settings";
import mockTransactions from "../../mock-data/payments.mock";
import store from "../store";
import getCoinsUtil from "../../utils/get-coins-util";
import buyCoinsService from "../../services/buy-coins-service";
import simplexService from "../../services/simplex-service";

export {
  getPaymentRequests,
  getSimplexQuote,
  createSimplexPayment,
  createGemPayment,
  getCrytpoLimits,
};

/**
 * Gets all simplex payments
 */
function getPaymentRequests() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_PAYMENT_REQUESTS));

    try {
      let res;
      if (!mocks.USE_MOCK_TRANSACTIONS) {
        // res = await buyCoinsService.getAllPayments();
        res = await simplexService.getAllPayments();
      } else {
        res = {
          data: Object.values(mockTransactions).filter(t =>
            ["pending", "approved", "declined"].includes(t.id)
          ),
        };
      }

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
      const { simplexData } = getState().simplex;

      const { pin, code } = formData;

      dispatch(startApiCall(API.CREATE_SIMPLEX_PAYMENT));

      const payment = {
        quote_id: simplexData.quote_id,
        coin: simplexData.digital_money.currency,
        amount: simplexData.digital_money.amount,
        fiat_amount: simplexData.fiat_money.total_amount,
        fiat_currency: simplexData.fiat_money.currency,
        fiat_base_amount: simplexData.fiat_money.base_amount,
      };

      const paymentRequest = await buyCoinsService.createSimplexPayment(
        payment,
        {
          pin,
          twoFactorCode: code,
        }
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
 * Gets min and max limits for all crypto coins based on usd limits limits
 * @todo: move to Backend
 */
function getCrytpoLimits() {
  return async (dispatch, getState) => {
    try {
      const buyCoinsSettings = store.getState().generalData.buyCoinsSettings;
      if (buyCoinsSettings.limit_per_crypto_currency) return;

      dispatch(startApiCall(API.GET_CRYPTO_LIMITS));
      const allowedSimplexCoins = getState().compliance.simplex.coins;
      const usdLimits = getCoinsUtil.getBuyLimitsPerFiatCurrency("USD");

      const limitsPerCrypto = {};
      for (let i = 0; i < allowedSimplexCoins.length; i++) {
        const quoteMin = await simplexService.getQuote(
          allowedSimplexCoins[i],
          "USD",
          "USD",
          usdLimits.min
        );
        const quoteMax = await simplexService.getQuote(
          allowedSimplexCoins[i],
          "USD",
          "USD",
          usdLimits.max
        );

        limitsPerCrypto[allowedSimplexCoins[i]] = {
          min: quoteMin.data.digital_money.amount,
          max: quoteMax.data.digital_money.amount,
        };
      }

      dispatch({
        type: ACTIONS.GET_CRYPTO_LIMITS_SUCCESS,
        limitsPerCrypto,
      });
    } catch (err) {
      dispatch(apiError(API.GET_CRYPTO_LIMITS, err));
    }
  };
}
