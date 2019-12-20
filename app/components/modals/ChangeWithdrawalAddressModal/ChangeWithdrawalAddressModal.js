import React from "react";
import { MODALS } from "../../../constants/UI";
import InfoModal from "../InfoModalNew/InfoModal";

const ChangeWithdrawalAddressModal = props => {
  const { onPressConfirm } = props;

  return (
    <InfoModal
      name={MODALS.CHANGE_WITHDRAWAL_ADDRESS_MODAL}
      heading={"Changing Withdrawal Address"}
      paragraphs={[
        "Changing your withdrawal address will make a withdrawal of your coin unavailable for 24 hours.",
      ]}
      yesCopy={"Change Address"}
      onYes={onPressConfirm}
    />
  );
};

export default ChangeWithdrawalAddressModal;
