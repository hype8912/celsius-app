import React from "react";

import InfoModal from "../InfoModalNew/InfoModal.js";
// import BiometricsActivateFingerprintModalStyle from "./BiometricsActivateFingerprintModal.styles";
import { MODALS } from "../../../constants/UI";

class BiometricsActivateFingerprintModal extends React.Component {
  goNext = () => {
    const { actions } = this.props;
    actions.closeModal();
  };

  render() {
    return (
      <InfoModal
        name={MODALS.BIOMETRICS_ACTIVATE_FINGERPRINT_MODAL}
        heading={"Change your settings"}
        paragraphs={[
          "In order to successfully use biometrics, please activate your fingerprint.",
        ]}
        yesCopy={"I understand"}
        onYes={this.goNext}
        picture={require("../../../../assets/images/alert-icon.png")}
        darkPicture={require("../../../../assets/images/alert-icon.png")}
        pictureDimensions={{ height: 40, width: 40 }}
      />
    );
  }
}

export default BiometricsActivateFingerprintModal;
