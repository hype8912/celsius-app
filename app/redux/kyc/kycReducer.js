import ACTIONS from "../../constants/ACTIONS";
import { KYC_STATUSES } from "../../constants/DATA";

const initialState = {
  status: KYC_STATUSES.collecting,
  primeTrustToULink: undefined,
  kycDocuments: undefined,
  utilityBill: undefined,
  kycDocTypes: undefined,
  applicantId: undefined,
  mobileSDKToken: undefined,
};

export default function kycReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.GET_PRIMETRUST_TOU_LINK_SUCCESS:
      return {
        ...state,
        primeTrustToULink: action.link,
      };

    case ACTIONS.GET_KYC_DOCUMENTS_SUCCESS:
    case ACTIONS.CREATE_KYC_DOCUMENTS_SUCCESS:
      return {
        ...state,
        kycDocuments: action.documents,
      };

    case ACTIONS.GET_UTILITY_BILL_SUCCESS:
      return {
        ...state,
        utilityBill: action.utilityBill,
      };

    case ACTIONS.GET_KYC_DOC_TYPES_SUCCESS:
      return {
        ...state,
        kycDocTypes: action.kycDocTypes,
      };

    case ACTIONS.CREATE_KYC_APPLICANT_SUCCESS:
      return {
        ...state,
        applicantId: action.applicantId,
      };

    case ACTIONS.GET_ONFIDO_MOBILE_SDK_SUCCESS:
      return {
        ...state,
        mobileSDKToken: action.mobileSDKToken,
      };

    default:
      return { ...state };
  }
}
