import React from "react";

import InfoModal from "../InfoModalNew/InfoModal.js";
import CelPayInfoModalStyle from "./CelPayInfoModal.styles";
import { MODALS } from "../../../constants/UI";
import formatter from "../../../utils/formatter";

const CelPayInfoModal = props => {
  const style = CelPayInfoModalStyle(props.theme);
  const { close, maxTransferAmount } = props;
  return (
    <InfoModal
      picture={require("../../../../assets/images/icon-send.png")}
      pictureDimensions={{ width: 30, height: 30 }}
      style={style.container}
      name={MODALS.CELPAY_INFO_MODAL}
      heading={`Use CelPay to send crypto to your contacts`}
      paragraphs={[
        `No addresses needed - send up to ${ formatter.usd(maxTransferAmount) } worth of crypto quickly and easily one-touch sharing options.`,
      ]}
      yesCopy={"Start CelPay"}
      onYes={close}
    />
  );
};

export default CelPayInfoModal;
