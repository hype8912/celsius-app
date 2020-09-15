import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import PrepaymentSuccessfulModalStyle from "./PrepaymentSuccessfulModal.styles";
import CelModal from "../CelModal/CelModal.js";
import { MODALS } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import CelButton from "../../atoms/CelButton/CelButton";
import * as appActions from "../../../redux/actions";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    formData: state.forms.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class PrepaymentSuccessfulModal extends Component {
  static propTypes = {
    onClose: PropTypes.func,
  };
  static defaultProps = {};

  render() {
    const style = PrepaymentSuccessfulModalStyle();
    const { actions, formData } = this.props;
    return (
      <CelModal
        style={style.container}
        name={MODALS.PREPAYMENT_SUCCESSFUL_MODAL}
        onClose={() => {
          actions.updateFormField("prepayLoanId", null);
        }}
      >
        <CelText
          type={"H3"}
          align={"center"}
          margin={"0 20 5 20"}
          weight={"700"}
        >
          {` Successfully Prepayed ${formData.prepaidPeriod} Months of Interest`}
        </CelText>
        <CelText align={"center"} margin={"5 20 20 20"}>
          {`This means you don’t need to make any payments in the next ${formData.prepaidPeriod} months!
          We will let you know when your interest payment resumes.`}
        </CelText>
        <CelButton
          basic
          onPress={() => {
            actions.updateFormField("prepayLoanId", null);
            actions.navigateTo(SCREENS.BORROW_LANDING);
            actions.closeModal();
          }}
        >
          Visit Loan Overview
        </CelButton>
        <View style={style.buttonsWrapper}>
          <CelModalButton
            buttonStyle={"basic"}
            position={"single"}
            onPress={() => {
              actions.updateFormField("prepayLoanId", null);
              actions.closeModal();
            }}
          >
            Check Details
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default PrepaymentSuccessfulModal;
