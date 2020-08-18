import React from "react";
import { MODALS } from "../../../constants/UI";
import InfoModal from "../InfoModalNew/InfoModal";

const PrepayDollarInterestModal = props => {
  const { onPressConfirm } = props;
  return (
    <InfoModal
      name={MODALS.PREPAY_DOLLAR_INTEREST_MODAL}
      heading={"Prepay Your Rewards in Dollars"}
      paragraphs={[
        "You can prepay your rewards in dollars with a wire transfer from your bank. Payment details for a wire transfer will be provided on the next screen. For more information on how to initiate a wire transfer, you will need to contact your bank or local branch.",
      ]}
      yesCopy={"Confirm"}
      onYes={onPressConfirm}
    />
  );
};

export default PrepayDollarInterestModal;
