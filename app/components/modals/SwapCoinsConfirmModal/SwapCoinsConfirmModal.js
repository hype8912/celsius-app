import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ScrollView, View } from "react-native";

import SwapCoinsConfirmModalStyle from "./SwapCoinsConfirmModal.styles";
import CelModal from "../CelModal/CelModal.js";
import { MODALS } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import Separator from "../../atoms/Separator/Separator";
import * as appActions from "../../../redux/actions";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import formatter from "../../../utils/formatter";

@connect(
  state => ({
    formData: state.forms.formData,
    buyCoinsSettings: state.generalData.buyCoinsSettings,
    simplexData: state.buyCoins.simplexData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class SwapCoinsConfirmModal extends Component {
  static propTypes = {};
  static defaultProps = {};

  onButtonPress = () => {
    const { actions } = this.props;

    actions.navigateTo("VerifyProfile", {
      onSuccess: async () => {
        await actions.createChangellyPayment();
        actions.navigateTo("GetCoinsLading");
      },
    });
    actions.closeModal();
  };

  render() {
    const { formData } = this.props;
    const style = SwapCoinsConfirmModalStyle();

    return (
      <CelModal style={style.container} name={MODALS.SWAP_COINS_CONFIRM_MODAL}>
        <ScrollView>
          <CelText
            type={"H2"}
            align={"center"}
            weight={"700"}
            margin={"0 0 25 0"}
          >
            Confirm Transaction Details
          </CelText>
          <CelText
            type={"H5"}
            weight={"300"}
            align={"center"}
            margin={"0 0 10 0"}
          >
            You are about to receive
          </CelText>
          <CelText
            align={"center"}
            weight={"700"}
            type={"H1"}
            margin={"0 0 10 0"}
          >
            {formatter.crypto(formData.toAmount, formData.toCoin)}
          </CelText>
          <View style={style.infoBlock}>
            <CelText align={"center"} type={"H6"}>
              {formData.toCoin} amount is an estimate. Actual amount will be
              based on exchange rate at the moment of processing the order.
            </CelText>
          </View>
          <View style={style.transferData}>
            <Separator />
            <View style={style.transferDataItem}>
              <CelText type={"H6"} align={"left"}>
                Price:
              </CelText>
              <CelText type={"H6"} align={"right"} weight="bold">
                {formatter.fiat(formData.fromAmount, formData.fromCoin)}
              </CelText>
            </View>
            <Separator />
            <View style={style.transferDataItem}>
              <View>
                <CelText type={"H6"} align={"left"}>
                  Changelly Fee:
                </CelText>
                <CelText type={"H7"} align={"left"} italic margin="5 0 0 0">
                  0.5%
                </CelText>
              </View>
              <CelText type={"H6"} align={"right"} weight="bold">
                {formatter.fiat(1, formData.fromCoin)}
              </CelText>
            </View>
            <Separator />
            <View style={style.transferDataItem}>
              <CelText type={"H6"} align={"left"}>
                Transfer Amount:
              </CelText>
              <CelText type={"H6"} align={"right"} weight="bold">
                {formatter.fiat(20, formData.fiatCoin)}
              </CelText>
            </View>
          </View>
        </ScrollView>
        <View style={style.buttonsWrapper}>
          <CelModalButton
            buttonStyle={"basic"}
            position={"single"}
            onPress={this.onButtonPress}
          >
            Confirm & Buy
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default SwapCoinsConfirmModal;
