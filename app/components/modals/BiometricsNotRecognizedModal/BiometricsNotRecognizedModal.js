import React from "react";

import InfoModal from "../InfoModalNew/InfoModal.js";
// import BiometricsAuthenticationModalStyle from "./BiometricsAuthenticationModal.styles";
import { BIOMETRIC_TYPES, MODALS } from "../../../constants/UI";

class BiometricsNotRecognizedModal extends React.Component {
  goNext = () => {
    const { actions } = this.props;
    actions.closeModal();
  };

  getBiometricsMethod = () => {
    const { biometrics } = this.props;
    let biometricsMethod;
    if (biometrics && biometrics.available) {
      biometricsMethod =
        biometrics.biometryType === BIOMETRIC_TYPES.TOUCH_ID
          ? "Touch ID"
          : "Face ID";
      return biometricsMethod;
    }
    return "biometrics";
  };

  render() {
    const biometricsMethod = this.getBiometricsMethod();
    return (
      <InfoModal
        name={MODALS.BIOMETRICS_NOT_RECOGNIZED_MODAL}
        heading={"Not recognized"}
        paragraphs={[
          "We have detected a change in your biometric authentication.",
          `If you want to reset your ${biometricsMethod} settings, please go to your Biometrics authentication settings screen under Security settings`,
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

export default BiometricsNotRecognizedModal;
