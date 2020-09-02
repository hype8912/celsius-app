import React from "react";

import InfoModal from "../InfoModalNew/InfoModal.js";
// import BiometricsAuthenticationModalStyle from "./BiometricsAuthenticationModal.styles";
import { MODALS } from "../../../constants/UI";

class BiometricsAuthenticationModal extends React.Component {
  goNext = () => {
    const { actions } = this.props;
    actions.resetToScreen("BiometricAuthentication");
    actions.closeModal();
  };

  render() {
    return (
      <InfoModal
        name={MODALS.BIOMETRICS_AUTHENTICATION_MODAL}
        heading={"Biometrics Authentication"}
        paragraphs={[
          "We have detected that you haven't used biometric on this device so far. Would you like to set it now?",
        ]}
        yesCopy={"Set Biometrics"}
        onYes={this.goNext}
        picture={require("../../../../assets/images/alert-icon.png")}
        darkPicture={require("../../../../assets/images/alert-icon.png")}
        pictureDimensions={{ height: 40, width: 40 }}
      />
    );
  }
}

export default BiometricsAuthenticationModal;
