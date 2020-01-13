import ACTIONS from "../../constants/ACTIONS";
import API from "../../constants/API";
import { showMessage } from "../ui/uiActions";
import { apiError, startApiCall } from "../api/apiActions";
import graphService from "../../services/graph-service";

// TODO add JSDoc
// TODO add JSDoc
// TODO add JSDoc
// TODO add JSDoc
// TODO add JSDoc
export {
  getTotalWalletBalanceData,
  getCoinWalletBalanceData,
  getInterestGraphData,
  getCoinInterestGraphData,
  activeTimeline,
};

function activeTimeline(time, period) {
  return {
    type: ACTIONS.GET_ACTIVE_TIMELINE,
    time,
    period,
  };
}

function getTotalWalletBalanceData(interval) {
  return async dispatch => {
    dispatch(startApiCall(API.GET_WALLET_BALANCE_DATA));
    try {
      const res = await graphService.getTotalWalletBalance(interval);
      const walletTotal = res.data;
      dispatch(getWalletTotalChartDataSuccess(walletTotal));
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_WALLET_BALANCE_DATA, err));
    }
  };
}

function getWalletTotalChartDataSuccess(walletTotal) {
  return {
    type: ACTIONS.GET_WALLET_BALANCE_DATA_SUCCESS,
    callName: API.GET_WALLET_BALANCE_DATA,
    walletTotal,
  };
}

function getCoinWalletBalanceData(coin, interval) {
  return async dispatch => {
    dispatch(startApiCall(API.GET_COIN_WALLET_BALANCE_DATA));
    try {
      const res = await graphService.getCoinWalletBalance(coin, interval);
      const coinWallet = res.data;
      const coinLastValue = coinWallet[coinWallet.length - 1][1];
      dispatch(getCoinWalletBalanceDataSuccess(coinWallet, coinLastValue));
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_COIN_WALLET_BALANCE_DATA, err));
    }
  };
}

function getCoinWalletBalanceDataSuccess(coinWallet, coinLastValue) {
  return {
    type: ACTIONS.GET_COIN_WALLET_BALANCE_DATA_SUCCESS,
    callName: API.GET_COIN_WALLET_BALANCE_DATA,
    coinWallet,
    coinLastValue,
  };
}

function getInterestGraphData(interval) {
  return async dispatch => {
    dispatch(startApiCall(API.GET_INTEREST_GRAPH_DATA));
    try {
      const res = await graphService.getInterestGraph(interval);
      const interestChart = res.data;
      dispatch(getInterestGraphDataSuccess(interestChart));
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_INTEREST_GRAPH_DATA, err));
    }
  };
}

function getInterestGraphDataSuccess(interestChart) {
  return {
    type: ACTIONS.GET_INTEREST_GRAPH_DATA_SUCCESS,
    callName: API.GET_INTEREST_GRAPH_DATA,
    interestChart,
  };
}

function getCoinInterestGraphData(coin, interval) {
  return async dispatch => {
    dispatch(startApiCall(API.GET_COIN_INTEREST_GRAPH_DATA));
    try {
      const res = await graphService.getCoinInterestGraph(coin, interval);
      const coinInterestChart = res.data;
      dispatch(getCoinInterestGraphDataSuccess(coinInterestChart));
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_COIN_INTEREST_GRAPH_DATA, err));
    }
  };
}

function getCoinInterestGraphDataSuccess(coinInterestChart) {
  return {
    type: ACTIONS.GET_COIN_INTEREST_GRAPH_DATA_SUCCESS,
    callName: API.GET_COIN_INTEREST_GRAPH_DATA,
    coinInterestChart,
  };
}
