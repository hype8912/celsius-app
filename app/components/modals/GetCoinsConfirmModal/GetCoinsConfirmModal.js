import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ScrollView, View } from 'react-native';

import GetCoinsConfirmModalStyle from "./GetCoinsConfirmModal.styles";
import CelModal from "../CelModal/CelModal.js"
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
    simplexData: state.simplex.simplexData
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class GetCoinsConfirmModal extends Component {

  static propTypes = {};
  static defaultProps = {}

  onButtonPress = () => {
    const { actions, formData, simplexData } = this.props

    const args = {
      quote_id: simplexData.quote_id,
      coin: formData.coin,
      amount: formData.amountCrypto,
      fiat_amount: simplexData.fiat_money.total_amount,
      fiat_currency: simplexData.fiat_money.currency,
      fiat_base_amount: simplexData.fiat_money.base_amount
    }

    actions.navigateTo("VerifyProfile", {
      onSuccess: () =>
        actions.simplexCreatePaymentRequest(args)
    })
    actions.closeModal()
  }

  render() {
    const { formData, simplexData } = this.props
    const style = GetCoinsConfirmModalStyle()

    if (!simplexData || !simplexData.fiat_money) return null

    const baseAmount = simplexData.fiat_money.base_amount
    const totalAmount = simplexData.fiat_money.total_amount
    const fee = simplexData.fiat_money.total_amount - simplexData.fiat_money.base_amount
    const feeInPct = (simplexData.fiat_money.total_amount - simplexData.fiat_money.base_amount) / simplexData.fiat_money.total_amount

    return (
      <CelModal
        style={style.container}
        name={MODALS.GET_COINS_CONFIRM_MODAL}
      >
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
            {formatter.crypto(formData.amountCrypto, formData.coin)}
          </CelText>
          <View
            style={style.infoBlock}
          >
            <CelText
              align={"center"}
              type={"H6"}
            >

              {formData.coin} amount is an estimate. Actual amount will be based on exchange rate at the moment of
              processing the
              order.
            </CelText>
          </View>
          <View style={style.transferData}>
            <Separator/>
            <View style={style.transferDataItem}>
              <CelText type={"H6"} align={"left"}>Payment Method:</CelText>
              <CelText type={"H6"} align={"right"}>{formData.simplexData.paymentMethod}</CelText>
            </View>
            <Separator/>
            <View style={style.transferDataItem}>
              <CelText type={"H6"} align={"left"}>Delivery:</CelText>
              <CelText type={"H6"} align={"right"}>0-1 day</CelText>
            </View>
            <Separator/>
            <View style={style.transferDataItem}>
              <CelText type={"H6"} align={"left"}>Price:</CelText>
              <CelText type={"H6"} align={"right"}>{formatter.usd(baseAmount)}</CelText>
            </View>
            <Separator/>
            <View style={style.transferDataItem}>
              <CelText type={"H6"} align={"left"}>Fee ({formatter.percentage(feeInPct)}%):</CelText>
              <CelText type={"H6"} align={"right"}>{formatter.usd(fee)}</CelText>
            </View>
            <Separator/>
            <View style={style.transferDataItem}>
              <CelText type={"H6"} align={"left"}>Transfer Amount:</CelText>
              <CelText type={"H6"} align={"right"}>{formatter.usd(totalAmount)}</CelText>
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

export default GetCoinsConfirmModal
