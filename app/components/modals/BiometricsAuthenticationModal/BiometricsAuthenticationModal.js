import React from "react";

import InfoModal from "../InfoModalNew/InfoModal.js";
// import BiometricsAuthenticationModalStyle from "./BiometricsAuthenticationModal.styles";
import { MODALS } from "../../../constants/UI";
import { getBiometricTypeData } from "../../../utils/biometrics-util";

class BiometricsAuthenticationModal extends React.Component {
  goNext = () => {
    const { actions } = this.props;
    actions.closeModal();
  };

  render() {
    const biometricsMethod = getBiometricTypeData();
    if (!biometricsMethod) return null;
    return (
      <InfoModal
        name={MODALS.BIOMETRICS_AUTHENTICATION_MODAL}
        heading={"Biometric Authentication"}
        paragraphs={[
          `${biometricsMethod.text} is currently not activated on this device.`,
          `You can activate this feature in your security settings.`,
        ]}
        yesCopy={"I understand"}
        onYes={this.goNext}
        picture={biometricsMethod.image}
        pictureDimensions={{ height: 40, width: 40 }}
      />
    );
  }
}

export default BiometricsAuthenticationModal;
