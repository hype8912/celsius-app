import ACTIONS from '../../constants/ACTIONS';
import API from '../../constants/API';
import { openModal, showMessage } from "../ui/uiActions";
import { apiError, startApiCall } from "../api/apiActions";
import { navigateTo } from "../nav/navActions";
import loansService from "../../services/loans-service";
import analytics from "../../utils/analytics";
import { MODALS } from "../../constants/UI";

export {
  applyForALoan,
  getAllLoans,
}

/**
 * Applies the user for a loan
 */
function applyForALoan() {
  return async (dispatch, getState) => {
    try {
      const { formData } = getState().forms;
      startApiCall(API.APPLY_FOR_LOAN);

      const loanApplication = {
        coin: formData.coin,
        amount_collateral_usd: formData.amountCollateralUsd,
        amount_collateral_crypto: formData.amountCollateralCrypto,
        ltv: formData.ltv,
        interest: formData.interest,
        loan_amount: formData.loanAmount,
        term_of_loan: formData.termOfLoan,
        bank_info_id: formData.bankInfo ? formData.bankInfo.id : null,
      }

      dispatch(navigateTo("VerifyProfile", {onSuccess: async () =>  {
          const verification = {
            pin: getState().forms.formData.pin,
            twoFactorCode: getState().forms.formData.code,
          };
          const res = await loansService.apply(loanApplication, verification);
          dispatch({ type: ACTIONS.APPLY_FOR_LOAN_SUCCESS, loan: res.data.loan });
          analytics.loanApplied(res.data.loan)
          dispatch(navigateTo('TransactionDetails', { id: res.data.transaction_id }));
          dispatch(openModal(MODALS.BORROW_CONFIRM))
      }}));

    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.APPLY_FOR_LOAN, err));
    }
  }
}

/**
 * Get all loans for user
 */
function getAllLoans() {
  return async (dispatch) => {
    try {
      startApiCall(API.GET_ALL_LOANS);

      const res = await loansService.getAllLoans();

      dispatch({
        type: ACTIONS.GET_ALL_LOANS_SUCCESS,
        callName: API.GET_ALL_LOANS,
        allLoans: res.data,
      });

    } catch (err) {
      dispatch(showMessage('error', err.msg));
      dispatch(apiError(API.GET_ALL_LOANS, err));
    }
  }
}
