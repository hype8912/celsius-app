import React from "react";

import TopUpModalStyle from "./TopUpModal.styles";
import { MODALS } from "../../../constants/UI";
import InfoModal from "../InfoModalNew/InfoModal";

const TopUpModal = props => {
  const style = TopUpModalStyle();
  const { actions } = props;
  return (
    <InfoModal
      style={style.container}
      name={MODALS.TOP_UP_MODAL}
      heading={"Top-up your wallet!"}
      paragraphs={[
        "If you have made a deposit, we will notify you when it reaches your wallet. " +
          "After that you will be able to respond to the margin call.",
      ]}
      yesCopy={"Go Back To Wallet"}
      onYes={() => actions.closeModal()}
    />
  );
};

export default TopUpModal;
