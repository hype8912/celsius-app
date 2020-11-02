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
        "This is an estimated amount. The actual amount will be determined by the exchange rate at the moment the order is processed. The amount shown includes Simplex’s 3.5% or $10 minimum fee with a special rate of 2.99% for EEA and UK residents.",
      ]}
      onYes={close}
      heading={"Additional Information"}
      yesCopy={"I Understand"}
      picture={require("../../../../assets/images/icons/get-coin-modal.png")}
      darkPicture={require("../../../../assets/images/icons/get-coin-modal-dark.png")}
      pictureDimensions={{ height: 40, width: 40 }}
    />
  );
};

export default GetCoinsEnterAmountInfoModal;
