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
          "You can purchase crypto with a credit card or bank transfer at the best rates in the industry directly through your Celsius app.",
          "* Celsius does not charge any fees for the purchase of Coins.",
          "** Simplex charges a 3.5% or $10 minimum fee with a special rate of 2.99% for EEA and UK residents. Wyre charges a 0.1% fee, and Coinify charges a 0.5% fee. Partner fees are included in the price you see.",
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
