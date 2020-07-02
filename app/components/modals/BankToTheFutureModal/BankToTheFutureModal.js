import React, { Component } from "react";
import { AsyncStorage, Image, Linking, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Modal from "react-native-modal";

import BankToTheFutureModalStyle from "./BankToTheFutureModal.styles";
import { MODALS } from "../../../constants/UI";
import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import CelButton from "../../atoms/CelButton/CelButton";
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

    this.state = {
      screens: [
        {
          title: "Invest in the future of finance",
          text:
            "You can now own equity in Celsius by participating in our A-round of funding on BnkToTheFuture.",
          image: require(`../../../../assets/images/bankToTheFuture.png`),
          button: "Learn more here!",
          secondaryButton: "Don't show again",
        },
      ],
    };
  }

  dontShowAgain = async link => {
    const { actions } = this.props;

    if (link)
      Linking.openURL(
        "https://app.bnktothefuture.com/pitches/celsius-network/landing"
      );
    await AsyncStorage.setItem("DONT_SHOW_BNK", "DONT_SHOW");
    actions.closeModal();
  };

  renderView = screen => {
    const style = BankToTheFutureModalStyle();

    return (
      <View key={screen.title} style={style.wrapper}>
        <Image source={screen.image} style={style.image} />
        <View style={[style.text]}>
          <CelText align={"center"} type={"H2"} weight={"700"}>
            {screen.title}
          </CelText>
          <CelText margin={"20 0 0 0"} align={"center"} type={"H5"}>
            {screen.text}
          </CelText>
          <CelButton
            margin={"30 0 0 0"}
            onPress={() => this.dontShowAgain(true)}
          >
            {screen.button}
          </CelButton>
          <CelButton
            basic
            onPress={() => this.dontShowAgain()}
            margin={"20 0 0 0"}
          >
            {screen.secondaryButton}
          </CelButton>
        </View>
      </View>
    );
  };

  render() {
    const { openedModal } = this.props;
    const { screens } = this.state;

    return (
      <Modal
        isVisible={openedModal === MODALS.BANK_TO_THE_FUTURE_MODAL}
        hasBackdrop={false}
        useNativeDriver={!isIos()}
      >
        {screens.map(screen => this.renderView(screen))}
      </Modal>
    );
  }
}

export default BankToTheFutureModal;
