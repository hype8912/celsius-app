import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { View } from "react-native";

import ConfirmResponseModalStyle from "./ConfirmResponseModal.styles";
import CelModal from "../CelModal/CelModal.js";
import { MODALS } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import Separator from "../../atoms/Separator/Separator";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";

class ConfirmResponseModal extends Component {
  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
  }

  confirm = () => {
    const { actions } = this.props;
    actions.closeModal();
  };

  render() {
    const style = ConfirmResponseModalStyle();

    return (
      <CelModal style={style.container} name={MODALS.CONFIRM_RESPONSE_MODAL}>
        <View style={{ paddingHorizontal: 20 }}>
          <CelText align={"center"} type={"H2"} weight={"500"}>
            Confirm Response to Margin Call
          </CelText>
          <CelText align={"center"} margin={"20 0 0 0"}>
            You are about to lock
          </CelText>
          <CelText align={"center"} type={"H1"} margin={"5 0 0 0"}>
            XXX(BTC)
          </CelText>
          <CelText align={"center"} type={"H3"} margin={"5 0 0 0"}>
            $ XXX
          </CelText>

          <Card color={style.background.backgroundColor}>
            <CelText align={"left"} weight={"500"}>
              New Collateral Balance
            </CelText>
            <CelText align={"left"} margin={"5 0 0 0"}>
              X.XXXXXXXX
            </CelText>
            <CelText align={"left"} margin={"5 0 0 0"}>
              $ XXXX
            </CelText>
            <Separator margin={"10 0 10 0"} />
            <CelText align={"left"}>$ XXX</CelText>
            <CelText align={"left"} weight={"500"}>
              Confirm Response to Margin Call
            </CelText>
            <Separator margin={"10 0 10 0"} />
            <CelText align={"left"}>You are about to lock</CelText>
            <CelText align={"left"} margin={"5 0 0 0"}>
              XXX(BTC)
            </CelText>
            <CelText align={"left"} margin={"5 0 0 0"}>
              $ XXX
            </CelText>
          </Card>
        </View>

        <View style={style.buttonWrapper}>
          <CelModalButton onPress={() => this.confirm()}>
            Continue
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default ConfirmResponseModal;
