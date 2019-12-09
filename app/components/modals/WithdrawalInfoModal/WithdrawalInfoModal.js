import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import WithdrawalInfoStyle from "./WithdrawalInfoModal.styles";
import MultistepModal from "../MultistepModal/MultistepModal";
import { MODALS } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import formatter from "../../../utils/formatter";
import multistepModalUtil from "../../../utils/multistep-modal-util";

class WithdrawalInfoModal extends Component {
  static propTypes = {
    withdrawalSettings: PropTypes.instanceOf(Object),
    type: PropTypes.string,
    closeModal: PropTypes.func.isRequired,
  };
  static defaultProps = {};

  handleModalContent = () => {
    const { withdrawalSettings, type } = this.props;
    let title;
    let body;

    switch (type) {
      case "CEL":
        title = "Are you sure you want to withdraw CEL? ";
        body =
          "The longer you HODL and the more you HODL, the more interest you'll earn with Celsius. Withdrawing your funds will reduce the amount of interest you could potentially earn.";
        break;
      case "DAI":
        title = "ATTENTION";
        body =
          "Please ensure that your withdrawal address supports SAI (Single Collateral DAI). ";
        break;
      default:
        title = null;
        body = null;
    }

    const firstStepButtons = {
      firstButtonCopy: "Next Tip",
      firstButtonStyle: "secondary",
      firstButtonPosition: "single",
      onFirstPress: () => multistepModalUtil.goToNextStep(),
      secondButtonCopy: null,
      secondButtonStyle: null,
      secondButtonPosition: null,
      onSecondPress: null,
    };

    const middleStepButtons = !title
      ? firstStepButtons
      : {
          firstButtonCopy: "Previous Tip",
          firstButtonStyle: "secondary",
          firstButtonPosition: "left",
          onFirstPress: () => multistepModalUtil.goToPrevStep(),
          secondButtonCopy: "Next Tip",
          secondButtonStyle: "secondary",
          secondButtonPosition: "right",
          onSecondPress: () => multistepModalUtil.goToNextStep(),
        };

    const modalContent = [
      {
        title,
        body,
        ...firstStepButtons,
      },
      {
        title: `Immediate withdrawals under ${formatter.usd(
          withdrawalSettings.daily_withdrawal_limit
        )}`,
        body:
          "Celsius enables you to withdraw coins at any time. However, for your security when exceeding this limit withdrawals are delayed for up to twenty-four hours.",
        ...middleStepButtons,
      },
      {
        title: "Check your withdrawal address",
        body:
          "Take a closer look at the address you wish to send your funds to. If you transferred money from an exchange, the address may not be correct. You can change it from your security settings.",
        firstButtonCopy: "Previous Tip",
        firstButtonStyle: "secondary",
        firstButtonPosition: "left",
        onFirstPress: () => multistepModalUtil.goToPrevStep(),
        secondButtonCopy: "I Understand",
        secondButtonStyle: "basic",
        secondButtonPosition: "right",
        onSecondPress: () => multistepModalUtil.goToNextStep(),
      },
    ];

    return modalContent;
  };

  renderStep = (step, k) => {
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
            {step.title}
          </CelText>
          <CelText align={"center"} margin={"5 20 0 20"}>
            {step.body}
          </CelText>
        </View>
        <View style={style.buttonsWrapper}>
          <CelModalButton
            buttonStyle={step.firstButtonStyle}
            position={step.firstButtonPosition}
            onPress={step.onFirstPress}
          >
            {step.firstButtonCopy}
          </CelModalButton>

          {step.secondButtonCopy && (
            <CelModalButton
              buttonStyle={step.secondButtonStyle}
              position={step.secondButtonPosition}
              onPress={step.onSecondPress}
            >
              {step.secondButtonCopy}
            </CelModalButton>
          )}
        </View>
      </View>
    );
  };

  render() {
    const style = WithdrawalInfoStyle();
    const { type } = this.props;
    let steps = [];

    const modalContent = this.handleModalContent();

    switch (type) {
      case "CEL":
        steps = modalContent;
        break;
      case "DAI":
        steps = modalContent;
        break;
      default:
        steps = modalContent.slice(1, 3);
    }

    const imagesArray =
      type === "DAI"
        ? [
            require("../../../../assets/images/alert-icon.png"),
            require("../../../../assets/images/modal-withdraw.png"),
            require("../../../../assets/images/modal-withdraw.png"),
          ]
        : [
            require("../../../../assets/images/modal-withdraw.png"),
            require("../../../../assets/images/modal-withdraw.png"),
            require("../../../../assets/images/modal-withdraw.png"),
          ];

    return (
      <MultistepModal
        style={style.container}
        name={MODALS.WITHDRAW_INFO_MODAL}
        top={25}
        imagesArray={imagesArray}
        imageWidth={31}
      >
        {steps.map(this.renderStep)}
      </MultistepModal>
    );
  }
}

export default WithdrawalInfoModal;
