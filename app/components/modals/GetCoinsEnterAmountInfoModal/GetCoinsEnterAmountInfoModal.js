import React from "react";

import InfoModal from "../InfoModalNew/InfoModal.js";
// import GetCoinsEnterAmountInfoModalStyle from "./GetCoinsEnterAmountInfoModal.styles";
import { MODALS } from "../../../constants/UI";

const GetCoinsEnterAmountInfoModal = props => {
  const { close } = props;
  return (
    <InfoModal
      name={MODALS.GET_COINS_ENTER_AMOUNT_INFO_MODAL}
      paragraphs={[
        "This is an estimate. The actual amount will be determined by the exchange rate at the moment of processing the order. Please note that the amount reflects Simplex’s 3.5% service fee or a $10 charge, whichever is greater. ",
      ]}
      onYes={close}
      yesCopy={"I Understand"}
    />
  );
};

export default GetCoinsEnterAmountInfoModal;
