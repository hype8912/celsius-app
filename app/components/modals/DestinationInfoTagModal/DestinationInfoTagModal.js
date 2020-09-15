import React from "react";
import { MODALS } from "../../../constants/UI";
import InfoModal from "../InfoModalNew/InfoModal";

const DestinationInfoTagModal = props => {
  const { closeModal } = props;

  return (
    <InfoModal
      name={MODALS.DESTINATION_TAG_MODAL}
      heading={"Destination Tag for XRP"}
      paragraphs={[
        "Ripple (XRP) transactions require destination tags as an additional information.",
        "The Destination Tag is used to determine what wallet a given transaction should be assigned and credited to.",
        "Quoting the tag along with the Ripple wallet address ensures that your transaction is uniquely identified and processed successfully.",
      ]}
      yesCopy={"Got it"}
      onYes={closeModal}
    />
  );
};

export default DestinationInfoTagModal;
