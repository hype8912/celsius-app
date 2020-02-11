import React from "react";
import { MODALS } from "../../../constants/UI";
import InfoModal from "../InfoModalNew/InfoModal";

const VerifyAuthAppModal = props => {
  const { onVerify } = props;
  return (
    <InfoModal
      name={MODALS.VERIFY_AUTHAPP_MODAL}
      picture={require("../../../../assets/images/email-sent.png")}
      darkPicture={require("../../../../assets/images/email-sent-dark.png")}
      pictureDimensions={{ width: 40, height: 40 }}
      heading={"Check your Email"}
      paragraphs={[
        "To complete your Two-Factor verification request follow the email instructions.",
      ]}
      yesCopy={"Go To Wallet"}
      onYes={onVerify}
    />
  );
};

export default VerifyAuthAppModal;
