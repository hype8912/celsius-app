import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { View } from "react-native";
import WithdrawalInfoStyle from "./WithdrawalInfoModal.styles";
import MultistepModal from "../MultistepModal/MultistepModal";
import { MODALS } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";

class WithdrawalInfoModal extends Component {
  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  handleModalContent = () => {
    const modalContent = [
      {
        title: "Are you sure you want to withdraw CEL? ",
        body:
          "The longer you HODL and the more you HODL, the more interest you'll earn with Celsius. Withdrawing your funds will reduce the amount of interest you could potentially earn.",
        firstButtonCopy: "Next Tip",
        secondButtonCopy: null,
        firstButtonStyle: "secondary",
        secondButtonStyle: "secondary",
        firstButtonPosition: "single",
        secondButtonPosition: null,
      },
      {
        title: "Immediate withdrawals under $20,000",
        body:
          "Celsius enables you to withdraw coins at any time. However, for your security when exceeding this limit withdrawals are delayed for up to twenty-four hours.",
        firstButtonCopy: "Previous Tip",
        secondButtonCopy: "Next Tip",
        firstButtonStyle: "secondary",
        secondButtonStyle: "secondary",
        firstButtonPosition: "left",
        secondButtonPosition: "right",
      },
      {
        title: "Check your withdrawal address",
        body:
          "Take a closer look at the address you wish to send your funds to. If you transferred money from an exchange, the address may not be correct. You can change it from your security settings.",
        firstButtonCopy: "Previous Tip",
        secondButtonCopy: "I Understand",
        firstButtonStyle: "secondary",
        secondButtonStyle: "basic",
        firstButtonPosition: "left",
        secondButtonPosition: "right",
      },
    ];

    return modalContent;
  };

  renderStep = (
    title,
    body,
    firstButtonCopy,
    secondButtonCopy,
    firstButtonStyle,
    secondButtonStyle,
    firstButtonPosition,
    secondButtonPosition,
    k
  ) => {
    const style = WithdrawalInfoStyle();
    return (
      <View key={k} style={style.modalWrapper}>
        <View>
          <CelText
            type={"H3"}
            align={"center"}
            margin={"0 20 5 20"}
            weight={"700"}
          >
            {title}
          </CelText>
          <CelText align={"center"} margin={"5 20 0 20"}>
            {body}
          </CelText>
        </View>
        <View style={style.buttonsWrapper} key={k}>
          <CelModalButton
            buttonStyle={firstButtonStyle}
            position={firstButtonPosition}
          >
            {firstButtonCopy}
          </CelModalButton>
          {secondButtonCopy && (
            <CelModalButton
              buttonStyle={secondButtonStyle}
              position={secondButtonPosition}
            >
              {secondButtonCopy}
            </CelModalButton>
          )}
        </View>
      </View>
    );
  };

  render() {
    const style = WithdrawalInfoStyle();

    const modalContent = this.handleModalContent();

    return (
      <MultistepModal
        style={style.container}
        name={MODALS.WITHDRAW_INFO_MODAL}
        top={30}
        imagesArray={[
          require("../../../../assets/images/modal-withdraw.png"),
          require("../../../../assets/images/modal-withdraw.png"),
          require("../../../../assets/images/modal-withdraw.png"),
        ]}
      >
        {modalContent.map((c, k) =>
          this.renderStep(
            c.title,
            c.body,
            c.firstButtonCopy,
            c.secondButtonCopy,
            c.firstButtonStyle,
            c.secondButtonStyle,
            c.firstButtonPosition,
            c.secondButtonPosition,
            k
          )
        )}
      </MultistepModal>
    );
  }
}

export default WithdrawalInfoModal;
