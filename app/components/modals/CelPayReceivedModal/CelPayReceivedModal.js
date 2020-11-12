import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CelModal from "../CelModal/CelModal";
import { MODALS } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import formatter from "../../../utils/formatter";
import * as appActions from "../../../redux/actions";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import CelPayReceivedModalStyle from "../CelPayReceivedModal/CelPayReceivedModal.styles";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  (state) => {
    const transfer =
      state.branch.transferHash &&
      state.transfers.transfers[state.branch.transferHash]
        ? state.transfers.transfers[state.branch.transferHash]
        : null;

    return {
      transfer,
    }
  },
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CelPayReceivedModal extends Component {
  static propTypes = {
    transfer: PropTypes.instanceOf(Object),
  };
  static defaultProps = {};

  maskSenderName = () => {
    const { transfer } = this.props;

    let names = transfer.from.name.split(" ")
    names = names.map(n => formatter.hideTextExceptFirstNLetters(n))

    return names.join(" ")
  }

  render() {
    const { actions, transfer } = this.props;
    const style = CelPayReceivedModalStyle();

    if (!transfer) return null;
    const senderName = this.maskSenderName()

    return (
      <CelModal name={MODALS.CELPAY_RECEIVED_MODAL}>
        <CelText type="H2" align="center" weight="bold" margin="0 0 15 0">
          Congrats!
        </CelText>

        <CelText align="center" margin={"0 20 0 20"}>
          Your friend {senderName} just sent you
          <CelText weight="600">
            {" "}
            {formatter.crypto(transfer.amount, transfer.coin)}{" "}
          </CelText>
          . It's already earning rewards in your wallet which will be paid out
          on a weekly basis. Go to your wallet to find out more about rewards
          rates.
        </CelText>
        <View style={style.buttonsWrapper}>
          <CelModalButton
            buttonStyle={"basic"}
            position={"single"}
            onPress={() => {
              actions.closeModal();
              actions.navigateTo(SCREENS.WALLET_LANDING);
            }}
          >
            Go to wallet
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default CelPayReceivedModal;
