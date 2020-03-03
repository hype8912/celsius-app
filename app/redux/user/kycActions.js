import ACTIONS from '../../constants/ACTIONS';
import API from "../../constants/API";
import { apiError, startApiCall } from "../api/apiActions";
import * as NavActions from '../nav/navActions';
import { showMessage } from "../ui/uiActions";
import usersService from '../../services/users-service';
import meService from '../../services/me-service';
import apiUtil from "../../utils/api-util";
import logger from '../../utils/logger-util';
import { setFormErrors } from "../forms/formsActions";
import { KYC_STATUSES } from "../../constants/DATA";
import analytics from "../../utils/analytics";
import complianceService from "../../services/compliance-service";

export {
  getKYCStatus,

  updateProfileInfo,
  updateProfileAddressInfo,
  updateTaxpayerInfo,
  getKYCDocuments,
  verifyKYCDocs,

  sendVerificationSMS, // TODO move to user/profile actions
  verifySMS, // TODO move to user/profile actions
}

/**
 * Updates user personal info
 * @param {Object} profileInfo
 */
function updateProfileInfo(profileInfo) {
  return async dispatch => {
    dispatch(startApiCall(API.UPDATE_USER_PERSONAL_INFO));

    try {
      const updatedProfileData = await usersService.updateProfileInfo(profileInfo);
      dispatch(updateProfileInfoSuccess(updatedProfileData.data));

      return {
        success: true
      }

    } catch (err) {
      if (err.type === 'Validation error') {
        dispatch(setFormErrors(apiUtil.parseValidationErrors(err)));
      } else {
        dispatch(showMessage('error', err.msg));
      }
      dispatch(apiError(API.UPDATE_USER_PERSONAL_INFO, err));

      return {
        success: false
      }
    }
  }
}

/**
 * Updates user address and residency info
 * @param {Object} profileAddressInfo
 */
function updateProfileAddressInfo(profileAddressInfo) {
  return async (dispatch, getState) => {
    dispatch(startApiCall(API.UPDATE_USER_ADDRESS_INFO));
    const { formData } = getState().forms;

    try {
      const updatedProfileData = await usersService.updateProfileAddressInfo(profileAddressInfo);
      dispatch(updateProfileAddressInfoSuccess(updatedProfileData.data));

      const compliance = await complianceService.getComplianceInfo();
      dispatch( {
        type: ACTIONS.GET_COMPLIANCE_INFO_SUCCESS,
        callName: API.GET_COMPLIANCE_INFO,
        complianceInfo: compliance.data.allowed_actions
      });

      const forbiddenState = formData.country.name === "United States" ? formData.state : formData.country.name;
      const {kyc} = getState().compliance.app;
      if (!kyc) {
        dispatch(showMessage("error", `Yikes, due to local laws and regulations, we are not allowed to support operations in ${forbiddenState}.`))
      } else {
        dispatch(NavActions.navigateTo('KYCTaxpayer'));
      }

      return {
        success: true
      }
    } catch (err) {
      if (err.type === 'Validation error') {
        dispatch(setFormErrors(apiUtil.parseValidationErrors(err)));
      } else {
        dispatch(showMessage('error', err.msg));
      }
      dispatch(apiError(API.UPDATE_USER_ADDRESS_INFO, err));
      return {
        success: false
      }
    }
  }
}

/**
 * Updates user Taxpayer info
 * @param {Object} profileTaxpayerInfo
 */
function updateTaxpayerInfo(profileTaxpayerInfo) {
  return async (dispatch) => {
    dispatch(startApiCall(API.UPDATE_USER_TAXPAYER_INFO));
    try {
      const updatedProfileData = await usersService.updateProfileTaxpayerInfo(profileTaxpayerInfo);
      await dispatch(updateProfileTaxpayerInfoSuccess(updatedProfileData.data));

      return {
        success: true
      }
    } catch (err) {
      if (err.type === 'Validation error') {
        dispatch(setFormErrors(apiUtil.parseValidationErrors(err)));
      } else {
        dispatch(showMessage('error', err.msg));
      }
      dispatch(apiError(API.UPDATE_USER_TAXPAYER_INFO, err));

      return {
        success: false
      }

    }
  }
}


/**
 * @TODO add JSDoc
 */
export function updateProfileInfoSuccess(personalInfo) {
  return {
    type: ACTIONS.UPDATE_USER_PERSONAL_INFO_SUCCESS,
    callName: API.UPDATE_USER_PERSONAL_INFO,
    personalInfo,
  }
}


/**
 * @TODO add JSDoc
 */
function updateProfileAddressInfoSuccess(addressInfo) {
  return {
    type: ACTIONS.UPDATE_USER_ADDRESS_INFO_SUCCESS,
    callName: API.UPDATE_USER_ADDRESS_INFO,
    addressInfo,
  }
}


/**
 * @TODO add JSDoc
 */
function updateProfileTaxpayerInfoSuccess(taxpayerInfo) {
  return {
    type: ACTIONS.UPDATE_USER_TAXPAYER_INFO_SUCCESS,
    callName: API.UPDATE_USER_TAXPAYER_INFO,
    taxpayerInfo,
  }
}

/**
 * Gets users KYC documents
 * @param {Object} documents
 */
function getKYCDocuments(documents) {
  return async dispatch => {
    dispatch(startApiCall(API.GET_KYC_DOCUMENTS));
    try {
      const res = await meService.getKYCDocuments(documents);
      dispatch(getKYCDocumentsSuccess(res.data));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_KYC_DOCUMENTS, err));
    }
  }
}


/**
 * @TODO add JSDoc
 */
function getKYCDocumentsSuccess(documents) {
  return {
    type: ACTIONS.GET_KYC_DOCUMENTS_SUCCESS,
    callName: API.GET_KYC_DOCUMENTS,
    documents,
  }
}


/**
 * @TODO add JSDoc
 */
function createKYCDocumentsSuccess() {
  return {
    type: ACTIONS.CREATE_KYC_DOCUMENTS_SUCCESS,
    callName: API.CREATE_KYC_DOCUMENTS,
  }
}

/**
 * Sends phone verification SMS to user
 */
function sendVerificationSMS(phone) {
  return async dispatch => {
    dispatch(startApiCall(API.SEND_VERIFICATION_SMS));
    try {
      await meService.sendVerificationSMS(phone);
      dispatch(sendVerificationSMSSuccess());
      dispatch(showMessage('success', 'Check you inbox, your verification SMS has been sent!'));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.SEND_VERIFICATION_SMS, err));
    }
  }
}


/**
 * @TODO add JSDoc
 */
function sendVerificationSMSSuccess() {
  return {
    type: ACTIONS.SEND_VERIFICATION_SMS_SUCCESS,
    callName: API.SEND_VERIFICATION_SMS,
  }
}

/**
 * Verifies the code received by SMS
 * @param {string} verificationCode - eg: 123456
 */
function verifySMS(verificationCode) {
  return async dispatch => {
    dispatch(startApiCall(API.VERIFY_SMS));
    try {
      await meService.verifySMS(verificationCode);
      dispatch(verifySMSSuccess());
      return {
        success: true
      }
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.VERIFY_SMS, err));
    }
  }
}


/**
 * @TODO add JSDoc
 */
export function verifySMSSuccess() {
  return {
    type: ACTIONS.VERIFY_SMS_SUCCESS,
    callName: API.VERIFY_SMS,
  }
}


/**
 * @TODO add JSDoc
 */
let timeout;
function verifyKYCDocs() {
  return async (dispatch, getState) => {
    const { formData } = getState().forms;
    let callName;
    let res;

    try {
      timeout = setTimeout (() => {
        dispatch(showMessage('info', "Please be patient, this may take a bit longer."));
        clearTimeout(timeout);
      }, 5000);
      callName = API.CREATE_KYC_DOCUMENTS;
      dispatch(startApiCall(API.CREATE_KYC_DOCUMENTS));
      res = await meService.createKYCDocuments({
        front: formData.front,
        back: formData.documentType !== 'passport' ? formData.back : undefined,
        type: formData.documentType,
      });
      dispatch(createKYCDocumentsSuccess(res.data));

      callName = API.START_KYC;
      dispatch(startApiCall(API.START_KYC));
      await meService.startKYC();
      dispatch(startKYCSuccess());

      dispatch(NavActions.navigateTo('WalletFab'));
      clearTimeout(timeout);
      dispatch(showMessage('success', 'KYC verification proccess has started!'));

      analytics.kycStarted()
    } catch (err) {
      clearTimeout(timeout);
      logger.err({ err });
      if (err.type === 'Validation error') {
        dispatch(setFormErrors(apiUtil.parseValidationErrors(err)));
      } else {
        dispatch(showMessage('error', err.msg));
      }
      dispatch(apiError(callName, err));
    }
  }
}


/**
 * @TODO add JSDoc
 */
function startKYCSuccess() {
  return {
    type: ACTIONS.START_KYC_SUCCESS,
    kyc: {
      status: KYC_STATUSES.pending
    },
  }
}


/**
 * @TODO add JSDoc
 */
function getKYCStatus() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_KYC_STATUS));
    try {
      const res = await meService.getKYCStatus();
      dispatch(getKYCStatusSuccess(res.data));
    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_KYC_STATUS, err));
    }
  }
}


/**
 * @TODO add JSDoc
 */
function getKYCStatusSuccess(status) {
  return {
    type: ACTIONS.GET_KYC_STATUS_SUCCESS,
    kyc: status,
  }
}
