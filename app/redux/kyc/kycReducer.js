import ACTIONS from "../../constants/ACTIONS";
import { KYC_STATUSES } from "../../constants/DATA";

const initialState = {
  status: KYC_STATUSES.collecting,
  primeTrustToULink: undefined,
};

export default function kycReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.START_KYC_SUCCESS:
    case ACTIONS.GET_KYC_STATUS_SUCCESS:
      return {
        ...state,
        status: action.kyc.status,
      };

    case ACTIONS.GET_PRIMETRUST_TOU_LINK_SUCCESS:
      return {
        ...state,
        primeTrustToULink: action.link,
      };

    default:
      return { ...state };
  }
}
