import React from "react";

import InfoModal from "../InfoModalNew/InfoModal.js";
// import GetCoinsInfoModalStyle from "./GetCoinsInfoModal.styles";
import { MODALS } from "../../../constants/UI";

class GetCoinsInfoModal extends React.Component {
  goNext = () => {
    const { actions } = this.props;

    actions.closeModal();
  };

  render() {
    return (
      <InfoModal
        name={MODALS.GET_COINS_INFO_MODAL}
        heading={"Buy Crypto Instantly!"}
        paragraphs={[
          "You can purchase crypto with a credit card or bank transfer at the best rates in the industry. All on your Celsius app.",
          "* Celsius does not charge any fees for the purchase of Coins.",
          "** Credit card purchases are subject to a fee of 3.5% or $10. ACH purchases are subject to a fee of .75%. SEPA purchases are subject to a fee of 1%",
        ]}
        yesCopy={"Buy Coins"}
        onYes={this.goNext}
        picture={require("../../../../assets/images/icons/get-coin-modal.png")}
        darkPicture={require("../../../../assets/images/icons/get-coin-modal-dark.png")}
        pictureDimensions={{ height: 40, width: 40 }}
      />
    );
  }
}

export default GetCoinsInfoModal;
