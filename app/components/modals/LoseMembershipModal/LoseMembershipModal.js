import React from "react";

import InfoModal from "../InfoModalNew/InfoModal.js";
import LoseMembershipModalStyle from "./LoseMembershipModal.styles";
import { MODALS } from "../../../constants/UI";

const LoseMembershipModal = props => {
  const style = LoseMembershipModalStyle(props.theme);
  const { navigateToNextStep } = props;
  return (
    <InfoModal
      picture={require("../../../../assets/images/alert-icon.png")}
      pictureDimensions={{ width: 30, height: 30 }}
      style={style.container}
      name={MODALS.LOSE_MEMBERSHIP_MODAL}
      heading="Watch out"
      paragraphs={[
        "You are about to Withdraw your last CEL token. Without CEL tokens you will lose your Celsius membership.",
        "Celsius members can earn interest on their coin, apply for a loan and utilize Withdraw.",
      ]}
      yesCopy="Continue"
      onYes={navigateToNextStep}
    />
  );
};

export default LoseMembershipModal;
