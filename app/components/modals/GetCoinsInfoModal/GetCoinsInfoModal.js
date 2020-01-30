import React from "react";

import InfoModal from "../InfoModalNew/InfoModal.js";
// import GetCoinsInfoModalStyle from "./GetCoinsInfoModal.styles";
import { MODALS } from "../../../constants/UI";

class GetCoinsInfoModal extends React.Component {
  goNext = () => {
    const { actions } = this.props;

    actions.navigateTo("GetCoinsChooseAmount");
    actions.closeModal();
  };

  render() {
    return (
      <InfoModal
        name={MODALS.GET_COINS_INFO_MODAL}
        heading={"Buy Crypto with Credit Card"}
        paragraphs={[
          "You can directly purchase any cryptocurrency with credit card on Celsius. We offer the best route to buy crypto using credit card.",
        ]}
        yesCopy={"Get Coins"}
        onYes={this.goNext}
        picture={require("../../../../assets/images/icons/get-coin-modal.png")}
        pictureDimensions={{ height: 40, width: 40 }}
      />
    );
  }
}

export default GetCoinsInfoModal;
