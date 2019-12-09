import React from "react";

import InfoModal from "../InfoModalNew/InfoModal.js";
import LoseTierModalStyle from "./LoseTierModal.styles";
import { MODALS } from "../../../constants/UI";

const LoseTierModal = props => {
  const style = LoseTierModalStyle(props.theme);
  const { navigateToNextStep, tierTitle } = props;
  return (
    <InfoModal
      picture={require("../../../../assets/images/alert-icon.png")}
      pictureDimensions={{ width: 30, height: 30 }}
      style={style.container}
      name={MODALS.LOSE_TIER_MODAL}
      heading="Watch out"
      paragraphs={[
        `You are about to lose your ${tierTitle} Celsius Loyalty Level.`,
        "Withdrawing CEL tokens affects your HODL ratio and Loyalty level.",
      ]}
      yesCopy="Continue"
      onYes={navigateToNextStep}
    />
  );
};

export default LoseTierModal;
