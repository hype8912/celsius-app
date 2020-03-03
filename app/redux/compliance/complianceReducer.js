import ACTIONS from '../../constants/ACTIONS';


const defaultCompliance = { allowed: true, coins: [] }
const initialCompliance = {
  app: { ...defaultCompliance },
  deposit: { ...defaultCompliance },
  withdraw: { ...defaultCompliance },
  celpay: { ...defaultCompliance },
  loan: { ...defaultCompliance },
  interest: { ...defaultCompliance }
}

const initialState = {
   ...initialCompliance
}

export default function complianceReducer(state = initialState, action) {

    switch (action.type) {
      case ACTIONS.GET_COMPLIANCE_INFO_SUCCESS:
        return {
          ...state,
          ...action.complianceInfo,
        }

    default:
        return { ...state };
    }
}
