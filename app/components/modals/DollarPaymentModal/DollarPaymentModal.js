import React from "react";

// import DollarPaymentModalStyle from "./DollarPaymentModal.styles";
import { MODALS } from "../../../constants/UI";
import InfoModal from "../InfoModalNew/InfoModal";

const DollarPaymentModal = ({ close }) => {
  return (
    <InfoModal
      name={MODALS.DOLLAR_PAYMENT_MODAL}
      heading={"Pay Your Monthly Interest in Dollars"}
      paragraphs={[
        "You can pay your interest in dollars with a wire transfer from your bank. Payment details for a wire transfer will be provided on the next screen. For more information on how to initiate a wire transfer, you will need to contact your bank or local branch.",
      ]}
      yesCopy={"Confirm"}
      onYes={close}
    />
  );
};

export default DollarPaymentModal;
