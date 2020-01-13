import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View } from "react-native";

import { MODALS } from "../../../constants/UI";
import * as appActions from "../../../redux/actions";
import BecomeCelMemberModalStyle from "./BecomeCelMemberModal.styles";
import CelText from "../../atoms/CelText/CelText";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import CelModal from "../CelModal/CelModal";
import CelButton from "../../atoms/CelButton/CelButton";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BecomeCelMemberModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  closeAndGoToDeposit = () => {
    const { actions } = this.props;
    actions.closeModal();
    actions.navigateTo("Deposit");
  };

  render() {
    const style = BecomeCelMemberModalStyle();
    const { actions } = this.props;
    return (
      <CelModal
        name={MODALS.BECAME_CEL_MEMBER_MODAL}
        picture={require("../../../../assets/images/illustrations-v3/stamp3x.png")}
        pictureDimensions={{ width: 100, height: 100 }}
      >
        <View style={{ marginHorizontal: 10 }}>
          <CelText
            margin={"0 10 10 10"}
            align={"center"}
            weight="bold"
            type={"H2"}
          >
            Congrats! You Have Earned 1 CEL Token!
          </CelText>
          <CelText
            weight={"300"}
            type={"H4"}
            align={"center"}
            margin={"0 20 0 20"}
          >
            {
              "This CEL token allows you to take advantage of Celsius products. Without any CEL you will be unable to earn, borrow, or pay, so keep HODLing!"
            }
          </CelText>
          <CelButton
            size="small"
            basic
            margin={"20 0 20 0"}
            onPress={() => {
              actions.navigateTo("LoyaltyProgram");
              actions.closeModal();
            }}
          >
            Learn about the CEL Loyalty Program
          </CelButton>
        </View>

        <View style={style.buttonWrapper}>
          <CelModalButton
            margin={"20 0 20 0"}
            onPress={this.closeAndGoToDeposit}
          >
            Deposit Coins
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default BecomeCelMemberModal;
