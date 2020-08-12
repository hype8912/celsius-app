import React from "react";
import { action } from "@storybook/addon-actions";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import LoanApplicationSuccessModal from "./LoanApplicationSuccessModal";
import { updateFormFields } from "../../../redux/forms/formsActions";
import StoryWrapper from "../../atoms/StoryWrapper/StoryWrapper";

const LoanApplicationSuccessModalStories = () => (
  <StoryWrapper title="Loan Application Successful Modal">
    <CelText margin="15 0 10 0">Application successful modal:</CelText>
    <CelButton
      onPress={() => {
        store.dispatch(
          updateFormFields({
            loanAmount: 1000000000,
            coin: "USD",
          })
        );
        store.dispatch(openModal(MODALS.LOAN_APPLICATION_SUCCESS_MODAL));
      }}
    >
      Open Pending Loan
    </CelButton>

    <LoanApplicationSuccessModal
      onPressConfirm={action("onPressConfirm")}
      loanId={42}
    />
  </StoryWrapper>
);

export default LoanApplicationSuccessModalStories;
