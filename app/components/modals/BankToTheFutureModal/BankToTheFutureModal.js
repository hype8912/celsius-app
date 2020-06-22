import React, { Component } from "react";
// import PropTypes from ‘prop-types’;
import { AsyncStorage, Image, Linking, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Modal from "react-native-modal";

import BankToTheFutureModalStyle from "./BankToTheFutureModal.styles";
import { MODALS } from "../../../constants/UI";
import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import CelButton from "../../atoms/CelButton/CelButton";
import STYLES from "../../../constants/STYLES";
import { isIos } from "../../../utils/ui-util";

@connect(
  state => ({
    openedModal: state.ui.openedModal,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BankToTheFutureModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  dontShowAgain = async link => {
    const { actions } = this.props;

    await AsyncStorage.setItem("DONT_SHOW_BNK", "DONT_SHOW");
    if (link)
      Linking.openURL(
        "https://app.bnktothefuture.com/pitches/celsius-network/landing"
      );
    actions.closeModal();
  };

  renderView = () => {
    const style = BankToTheFutureModalStyle();

    return (
      <View style={style.wrapper}>
        <Image
          source={require(`../../../../assets/images/bankToTheFuture.png`)}
          style={style.image}
        />
        <View style={style.text}>
          <CelText
            color={STYLES.COLORS.DARK_GRAY}
            align={"center"}
            type={"H2"}
            weight={"700"}
          >
            Invest in the future of the finance
          </CelText>
          <CelText
            color={STYLES.COLORS.DARK_GRAY}
            margin={"20 0 0 0"}
            align={"center"}
            type={"H5"}
          >
            You can now own equity in Celsius by participating in our A-round of
            funding on BnkToTheFuture.
          </CelText>
          <CelButton
            margin={"30 0 0 0"}
            onPress={() => this.dontShowAgain(true)}
          >
            Learn more here!
          </CelButton>
          <CelButton
            basic
            color={STYLES.COLORS.CELSIUS_BLUE}
            onPress={() => this.dontShowAgain()}
            margin={"20 0 0 0"}
          >
            Don’t show again
          </CelButton>
        </View>
      </View>
    );
  };

  render() {
    const { openedModal } = this.props;

    return (
      <Modal
        isVisible={openedModal === MODALS.BANK_TO_THE_FUTURE_MODAL}
        hasBackdrop={false}
        useNativeDriver={!isIos()}
      >
        {this.renderView()}
      </Modal>
    );
  }
}

export default BankToTheFutureModal;
