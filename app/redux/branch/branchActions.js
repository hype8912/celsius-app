import branchService from '../../services/branch-service'
import API from '../../constants/API'
import { apiError, startApiCall } from '../api/apiActions'
import { BRANCH_LINKS } from '../../constants/DATA'
import { MODALS } from '../../constants/UI'
import ACTIONS from "../../constants/ACTIONS";
import * as transfersActions from "../transfers/transfersActions";
import * as actions from "../../redux/actions";


export {
  registerBranchLink, // TODO add JSDoc
  getBranchIndividualLink, // TODO add JSDoc
  submitProfileCode, // TODO add JSDoc
  registrationPromoCode, // TODO add JSDoc
};


function getBranchIndividualLink () {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_INDIVIDUAL_LINK))
      const branchLinkRes = await branchService.getIndividualLink()

      dispatch({
        type: ACTIONS.GET_INDIVIDUAL_LINK_SUCCESS,
        link: branchLinkRes.data.branch_link.branch_link
      })
    } catch (err) {
      dispatch(actions.showMessage("error", err.msg));
      dispatch(apiError(API.GET_INDIVIDUAL_LINK, err));
    }
  }
}

function registerBranchLink (deepLink) {
  return dispatch => {
    const deepLinkParams = deepLink.params
    dispatch({
      type: ACTIONS.BRANCH_LINK_REGISTERED,
      link: deepLinkParams
    })
    if (
      deepLinkParams.link_type === BRANCH_LINKS.TRANSFER ||
      deepLinkParams.type === BRANCH_LINKS.TRANSFER
    ) {
      return dispatch(transfersActions.registerTransferLink(deepLinkParams))
    }

    if (
      deepLinkParams.link_type === BRANCH_LINKS.COMPANY_REFERRAL ||
      deepLinkParams.type === BRANCH_LINKS.COMPANY_REFERRAL ||
      deepLinkParams.link_type === BRANCH_LINKS.INDIVIDUAL_REFERRAL ||
      deepLinkParams.type === BRANCH_LINKS.INDIVIDUAL_REFERRAL
    ) {
      return dispatch(registerReferralLink(deepLinkParams))
    }
  }
}

function registerReferralLink (deepLink) {
  return async (dispatch, getState) => {
    try {
      const { profile } = getState().user
      if (profile.id) {
        return dispatch(
          actions.showMessage(
            'warning',
            "Sorry, but existing users can't use this link!"
          )
        )
      }

      dispatch(startApiCall(API.GET_LINK_BY_URL))

      const linkRes = await branchService.getByUrl(deepLink['~referring_link'])
      const linkResData = linkRes.data

      if (!linkResData.valid) {
        dispatch(apiError(API.GET_LINK_BY_URL))
        dispatch(
          actions.showMessage(
            'warning',
            'Sorry, but this link is not valid anymore!'
          )
        )
      } else {
        dispatch({
          type: ACTIONS.GET_LINK_BY_URL_SUCCESS,
          callName: API.GET_LINK_BY_URL,
          branchLink: linkResData.branch_link
        })

        if (
          !linkResData.branch_link.referred_award_amount ||
          !linkResData.branch_link.referred_award_coin
        ) {
          return
        }
        dispatch(actions.openModal(MODALS.REFERRAL_RECEIVED_MODAL))
      }
    } catch (err) {
      dispatch(apiError(API.GET_LINK_BY_URL, err))
      dispatch(actions.showMessage('error', err.msg))
    }
  }
}

function submitProfileCode(onSuccess) {
  return async (dispatch, getState) => {
    try {
      dispatch(startApiCall(API.CHECK_PROFILE_PROMO_CODE));
      const { formData } = getState().forms;

      const res = await branchService.submitProfileCode(formData.promoCode);
      dispatch(submitProfileCodeSuccess(res.data.branch_link));
      if(onSuccess) onSuccess()
    } catch (err) {
      dispatch(apiError(API.CHECK_PROFILE_PROMO_CODE, err));
      dispatch(actions.setFormErrors({
        promoCode: err.msg
      }));
    }
  };
}

function submitProfileCodeSuccess(promoCodeInfo) {
  return {
    type: ACTIONS.CHECK_PROFILE_PROMO_CODE_SUCCESS,
    callName: API.CHECK_PROFILE_PROMO_CODE,
    code: promoCodeInfo
  };
}

function registrationPromoCode(onSuccess) {
  return async (dispatch, getState) => {
    try {
      const { formData } = getState().forms;
      // check promo code
      if (formData.promoCode && formData.promoCode !== "") {
        dispatch(startApiCall(API.SUBMIT_PROMO_CODE));

        const linkRes = await branchService.submitRegistrationCode(formData.promoCode);
        const linkResData = linkRes.data;

        dispatch({
          type: ACTIONS.SUBMIT_PROMO_CODE_SUCCESS,
          callName: API.SUBMIT_PROMO_CODE,
          branchLink: linkResData.branch_link
        });

        if(onSuccess) onSuccess()
      } else {
        throw new Error("Sorry, but this promo code is not valid!")
      }
    } catch (err) {
      dispatch(apiError(API.SUBMIT_PROMO_CODE, err));
      // dispatch(actions.showMessage("warning", "Sorry, but this promo code is not valid!"));
      dispatch(actions.setFormErrors({
        promoCode: "Sorry, but this promo code is not valid!"
      }));
    }
  }
}
