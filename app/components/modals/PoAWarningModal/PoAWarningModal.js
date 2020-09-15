import React from "react";

import InfoModal from "../InfoModalNew/InfoModal.js";
import { MODALS } from "../../../constants/UI";

const PoAWarningModal = ({ onYes, onNo }) => {
  return (
    <InfoModal
      name={MODALS.POA_WARNING_MODAL}
      heading="Warning!"
      paragraphs={[
        "Users from the states of New York and Washington that submit their passport need to submit a proof of address in order to verify their profile.",
      ]}
      yesCopy="Continue"
      onYes={onYes}
      noCopy="Submit other document"
      onNo={onNo}
    />
  );
};

export default PoAWarningModal;
