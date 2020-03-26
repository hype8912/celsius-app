import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import HodlModeModalStyle from "./HodlModeModal.styles";
import { MODALS } from "../../../constants/UI";
import InfoModal from "../InfoModalNew/InfoModal";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class HodlModeModal extends Component {
  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const style = HodlModeModalStyle();
    const { actions } = this.props;
    return (
      <InfoModal
        name={MODALS.HODL_MODE_MODAL}
        heading={"HODL Mode is activated"}
        paragraphs={[
          "For your security, we have put your account in HODL Mode. If you would to exit HODL Mode, please contact our support team.",
        ]}
        yesCopy={"Go to Wallet"}
        onYes={() => actions.closeModal()}
      />
    );
  }
}

export default HodlModeModal;
