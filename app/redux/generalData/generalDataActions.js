import { showMessage } from "../ui/uiActions";
import generalDataService from "../../services/general-data-service";
import kycService from "../../services/kyc-service";
import { apiError, startApiCall } from "../api/apiActions";
import API from "../../constants/API";
import ACTIONS from "../../constants/ACTIONS";
import { navigateTo } from "../nav/navActions";

// TODO Move to KYC actions
export {
  getBackendStatus,
  getInitialCelsiusData,
  getLoanTermsOfUse,
  getKYCDocTypes,
};

/**
 * Gets all general app data (interest rates, borrow ltvs, ...)
 */
function getInitialCelsiusData() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_INITIAL_CELSIUS_DATA));

    try {
      const res = await generalDataService.getCelsiusInitialData();

      dispatch({
        type: ACTIONS.GET_INITIAL_CELSIUS_DATA_SUCCESS,
        interestRates: res.data.interest_rates,
        ltvs: res.data.borrow_ltvs,
        minimumLoanAmount: res.data.minimum_usd_amount,
        automaticLoanLimit: res.data.auto_maximum_threshold,
        celUtilityTiers: res.data.cel_utility_tiers,
        withdrawalSettings: res.data.withdrawal_settings,
      });
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_INITIAL_CELSIUS_DATA, err));
    }
  };
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
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_KYC_DOC_TYPES, err));
    }
  };
}

/**
 * TODO add JSDoc
 */
function getKYCDocTypesSuccess(kycDocTypes) {
  return {
    type: ACTIONS.GET_KYC_DOC_TYPES_SUCCESS,
    callName: API.GET_KYC_DOC_TYPES,
    kycDocTypes,
  };
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
      if (backendStatus.maintenance)
        dispatch(navigateTo("Maintenance", { maintenance: true }));
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_BACKEND_STATUS, err));
    }
  };
}

/**
 * TODO add JSDoc
 */
function getBackendStatusSuccess(backendStatus) {
  return {
    type: ACTIONS.GET_BACKEND_STATUS_SUCCESS,
    callName: API.GET_BACKEND_STATUS,
    backendStatus,
  };
}

function getLoanTermsOfUse() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_LOAN_TERMS_OF_USE));

    try {
      const res = await generalDataService.getLoanTermsOfUse();
      const pdfRes = await generalDataService.getPDFLoanTermsOfUse();
      const lToU = res.data;
      const pdf = pdfRes;

      dispatch({
        type: ACTIONS.GET_LOAN_TERMS_OF_USE_SUCCESS,
        callName: API.GET_LOAN_TERMS_OF_USE,
        lToU: lToU.document,
        pdf,
      });
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_BACKEND_STATUS, err));
    }
  };
}
