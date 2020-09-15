import React from "react";
import { MODALS } from "../../../constants/UI";
import InfoModal from "../InfoModalNew/InfoModal";

const MemoIdModal = props => {
  const { closeModal, coin } = props;
  const heading =
    coin === "EOS" ? "EOS (EOS) Memo ID" : "Stellar (XLM) Memo ID";
  const paragraphs = [
    "Memo ID is used to determine what wallet a given transaction should be assigned and credited to.",
    `Quoting the Memo ID with the ${
      coin === "EOS" ? "EOS" : "Stellar"
    } wallet address ensures that your transaction is uniquely identified and processed successfully.`,
    "Exchanges require Memo ID, so please make sure to provide it, or you risk losing your coins.",
  ];

  return (
    <InfoModal
      name={MODALS.MEMO_ID_MODAL}
      heading={heading}
      paragraphs={paragraphs}
      yesCopy={"Got it"}
      onYes={closeModal}
    />
  );
};

export default MemoIdModal;
