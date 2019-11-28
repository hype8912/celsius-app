import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { View } from "react-native";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import CreateNewAccountModalStyle from "./CreateNewAccountModal.styles";
import CelModal from "../CelModal/CelModal.js";
import { MODALS } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import * as appActions from "../../../redux/actions";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CreateNewAccountModal extends Component {
  static propTypes = {};
  static defaultProps = {};

  render() {
    const style = CreateNewAccountModalStyle();
    const { actions } = this.props;
    return (
      <CelModal
        style={style.container}
        name={MODALS.CREATE_NEW_ACCOUNT_MODAL}
        picture={require("../../../../assets/images/checkmark.png")}
        pictureDimensions={{ height: 25, width: 25 }}
      >
        <CelText
          type={"H3"}
          align={"center"}
          margin={"0 20 5 20"}
          weight={"700"}
        >
          Congrats On Creating a New Account!
        </CelText>
        <CelText align={"center"} margin={"5 20 0 20"}>
          Don’t forget that you can enter your invitation code from{" "}
          <CelText weight={"600"}>REWARDS SECTION</CelText> before you make your
          first deposit.
        </CelText>
        <View style={style.buttonsWrapper}>
          <CelModalButton
            buttonStyle={"basic"}
            position={"single"}
            onPress={actions.closeModal}
          >
            Done
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default CreateNewAccountModal;
