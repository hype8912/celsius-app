import React, { Component } from "react";
import PropTypes from "prop-types";

import InfoModal from "../InfoModalNew/InfoModal.js";
import RemoveAuthAppModalStyle from "./RemoveAuthAppModal.styles";
import { MODALS } from "../../../constants/UI";

class RemoveAuthAppModal extends Component {
  static propTypes = {
    navigateTo: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    disableTwoFactor: PropTypes.func.isRequired,
  };
  static defaultProps = {};

  removeTwoFactor = async () => {
    const { navigateTo, closeModal, disableTwoFactor } = this.props;
    await closeModal();

    navigateTo("VerifyProfile", {
      onSuccess: disableTwoFactor,
    });
  };

  render() {
    const { closeModal } = this.props;
    const style = RemoveAuthAppModalStyle();
    return (
      <InfoModal
        style={style.container}
        name={MODALS.REMOVE_AUTHAPP_MODAL}
        heading={"Remove Auth App"}
        paragraphs={[
          "If you remove authentication application you will lose a second step of verification. Are you sure you want to proceed?",
        ]}
        yesCopy={"Remove"}
        onYes={this.removeTwoFactor}
        noCopy={"Cancel"}
        onNo={closeModal}
        noButtonStyle={"red"}
        yesButtonPosition={"left"}
        noButtonPosition={"right"}
      />
    );
  }
}

export default RemoveAuthAppModal;
