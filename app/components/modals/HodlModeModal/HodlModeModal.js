import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import HodlModeModalStyle from "./HodlModeModal.styles";
import { MODALS } from "../../../constants/UI";
import InfoModal from "../InfoModalNew/InfoModal";
import CelText from "../../atoms/CelText/CelText";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

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
          <CelText>
            For your security, we have put your account in HODL Mode. If you
            would to exit HODL Mode, please
            <CelText
              color={getColor(COLOR_KEYS.PRIMARY_BUTTON)}
              onPress={() => actions.navigateTo("Support")}
            >
              {" "}
              contact our support team
            </CelText>
            .
          </CelText>,
        ]}
        yesCopy={"Go to Wallet"}
        onYes={() => actions.closeModal()}
      />
    );
  }
}

export default HodlModeModal;
