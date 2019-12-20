import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import InfoModal from "../InfoModalNew/InfoModal";
import { MODALS } from "../../../constants/UI";
import * as appActions from "../../../redux/actions";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class SsnModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  continue = () => {
    const { actions } = this.props;
    actions.startKYC();
    actions.closeModal();
  };

  render() {
    return (
      <InfoModal
        name={MODALS.SSN_MODAL}
        heading={"You Chose Not To Enter Your SSN"}
        paragraphs={[
          "Your deposits will not earn interest until this portion of your " +
            "profile is updated. This can be completed at any time.",
        ]}
        yesCopy={"Continue"}
        onYes={this.continue}
      />
    );
  }
}

export default SsnModal;
