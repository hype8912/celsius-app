import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import InfoModal from "../InfoModalNew/InfoModal.js";
import ApiKeyRevokeModalStyle from "./ApiKeyRevokeModal.styles";
import { MODALS } from "../../../constants/UI";
import * as appActions from "../../../redux/actions";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ApiKeyRevokeModal extends Component {
  handleApiKeyRevoke = () => {
    const { actions, apiKey } = this.props;
    actions.closeModal();
    actions.revokeAPIKey(apiKey.id);
  };

  render() {
    const style = ApiKeyRevokeModalStyle();
    const { actions } = this.props;
    return (
      <InfoModal
        style={style.container}
        name={MODALS.API_KEY_REVOKE_MODAL}
        heading={"Are you sure you want to revoke your API key?"}
        yesCopy={"Revoke"}
        onYes={this.handleApiKeyRevoke}
        noCopy={"Cancel"}
        onNo={actions.closeModal}
        noButtonStyle={"red"}
        yesButtonPosition={"left"}
        noButtonPosition={"right"}
      />
    );
  }
}

export default ApiKeyRevokeModal;
