import React from "react";
import PropTypes from "prop-types";
import { MODALS } from "../../../constants/UI";
import InfoModal from "../InfoModal/InfoModal";

const LoseMembershipModal = ({
 navigateToNextStep,
 closeModal
}) => (
  <InfoModal
    name={MODALS.LOSE_MEMBERSHIP_MODAL}
    heading='Watch out'
    paragraphs={[
      'You are about to Withdraw your last CEL token. Without CEL tokens you will lose your Celsius membership.',
      'Celsius members can earn interest on their coin, apply for a loan and utilize Withdraw.'
    ]}
    yesCopy='Continue'
    onYes={navigateToNextStep}
    noCopy='Go back'
    onNo={closeModal}
  />
);

LoseMembershipModal.propTypes = {
  navigateToNextStep: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default LoseMembershipModal
