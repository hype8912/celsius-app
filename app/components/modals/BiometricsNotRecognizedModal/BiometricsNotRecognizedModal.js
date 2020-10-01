import React from "react";

import InfoModal from "../InfoModalNew/InfoModal.js";
// import BiometricsAuthenticationModalStyle from "./BiometricsAuthenticationModal.styles";
import { MODALS } from "../../../constants/UI";
import { getBiometricTypeData } from "../../../utils/biometrics-util";

class BiometricsNotRecognizedModal extends React.Component {
  goNext = () => {
    const { actions } = this.props;
    actions.closeModal();
  };

  render() {
    const biometricsMethod = getBiometricTypeData();
    if (!biometricsMethod) return null;
    return (
      <InfoModal
        name={MODALS.BIOMETRICS_NOT_RECOGNIZED_MODAL}
        heading={"Not recognized"}
        paragraphs={[
          "We have detected a change in your biometric authentication.",
          `If you want to reset your ${biometricsMethod.text} settings, please go to your Biometric authentication settings screen under Security settings`,
        ]}
        yesCopy={"I understand"}
        onYes={this.goNext}
        picture={biometricsMethod.image}
        darkPicture={biometricsMethod.image}
        pictureDimensions={{ height: 40, width: 40 }}
      />
    );
  }
}

export default BiometricsNotRecognizedModal;
