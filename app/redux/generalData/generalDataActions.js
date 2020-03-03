import { showMessage } from "../ui/uiActions";
import generalDataService from "../../services/general-data-service";
import kycService from "../../services/kyc-service";
import { apiError, startApiCall } from "../api/apiActions";
import API from "../../constants/API";
import ACTIONS from '../../constants/ACTIONS';
import { navigateTo } from "../nav/navActions";

export {
  getBackendStatus,
  getInitialCelsiusData,

  getKYCDocTypes, // TODO Move to KYC actions
}

/**
 * Gets all general app data (interest rates, borrow ltvs, ...)
 */
function getInitialCelsiusData() {
  return async (dispatch, getState) => {
    dispatch(startApiCall(API.GET_INITIAL_CELSIUS_DATA));

    const { profile } = getState().user;
    const isCelsiusOrMVP = profile && profile.email && (!!profile.email.includes("@celsius.network") || !!profile.email.includes("@mvpworkshop.co"));

    try {
      const res = await generalDataService.getCelsiusInitialData();
      const minimumLoanAmount = isCelsiusOrMVP ? 5 : res.data.minimum_usd_amount

      dispatch({
        type: ACTIONS.GET_INITIAL_CELSIUS_DATA_SUCCESS,
        interestRates: res.data.interest_rates,
        ltvs: res.data.borrow_ltvs,
        minimumLoanAmount,
        celUtilityTiers: res.data.cel_utility_tiers,
        withdrawalSettings: res.data.withdrawal_settings,
      });
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_INITIAL_CELSIUS_DATA, err));
    }
  }
}

/**
 * Gets all doc types for KYC
 */
function getKYCDocTypes() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_KYC_DOC_TYPES));

    try {
      const res = await kycService.getKYCDocTypes();
      const kycDocTypes = res.data;
      dispatch(getKYCDocTypesSuccess(kycDocTypes));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_KYC_DOC_TYPES, err));
    }
  }
}


/**
 * TODO add JSDoc
 */
function getKYCDocTypesSuccess(kycDocTypes) {
  return {
    type: ACTIONS.GET_KYC_DOC_TYPES_SUCCESS,
    callName: API.GET_KYC_DOC_TYPES,
    kycDocTypes,
  }
}

/**
 * Gets backend status of the app
 */
function getBackendStatus() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_BACKEND_STATUS));

    try {
      const res = await generalDataService.getBackendStatus();
      const backendStatus = res.data;
      await dispatch(getBackendStatusSuccess(backendStatus));
      if (backendStatus.maintenance) dispatch(navigateTo("Maintenance", {maintenance: true}));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_BACKEND_STATUS, err));
    }
  }
}


/**
 * TODO add JSDoc
 */
function getBackendStatusSuccess(backendStatus) {
  return {
    type: ACTIONS.GET_BACKEND_STATUS_SUCCESS,
    callName: API.GET_BACKEND_STATUS,
    backendStatus,
  }
}
