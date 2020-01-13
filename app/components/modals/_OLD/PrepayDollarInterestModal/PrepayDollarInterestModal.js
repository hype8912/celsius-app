import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import PrepayDollarInterestModalStyle from "./PrepayDollarInterestModal.styles";
import CelText from "../../../atoms/CelText/CelText";
import { MODALS } from "../../../../constants/UI";
import CelModal from "../../../organisms/CelModal/CelModal";
import CelButton from "../../../atoms/CelButton/CelButton";
import STYLES from "../../../../constants/STYLES";
import * as appActions from "../../../../redux/actions";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class PrepayDollarInterestModal extends Component {
  closeModalHandler = () => {
    const { actions } = this.props;

    actions.navigateTo("LoanPrepaymentPeriod", { type: "dollar" });
    actions.closeModal();
  };

  render() {
    const style = PrepayDollarInterestModalStyle();

    return (
      <CelModal name={MODALS.PREPAY_DOLLAR_INTEREST_MODAL}>
        <CelText type="H2" align={"center"} weight="bold" style={style.title}>
          Prepay your interest in dollars
        </CelText>
        <CelText
          type="H4"
          weight={"300"}
          color={STYLES.COLORS.DARK_GRAY}
          align={"center"}
          style={style.description}
        >
          You can prepay your interest in dollars with a wire transfer from your
          bank. Payment details for a wire transfer will be provided on the next
          screen. For more information on how to initiate a wire transfer, you
          will need to contact your bank or local branch.
        </CelText>
        <CelButton margin={"20 0 10 0"} onPress={this.closeModalHandler}>
          Confirm
        </CelButton>
      </CelModal>
    );
  }
}

export default PrepayDollarInterestModal;
