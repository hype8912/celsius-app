import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import WithdrawalInfoStyle from "./WithdrawalInfoModal.styles";
import MultistepModal from "../MultistepModal/MultistepModal";
import { MODALS, THEMES } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import multistepModalUtil from "../../../utils/multistep-modal-util";
import InfoModal from "../InfoModalNew/InfoModal";
import { getTheme } from "../../../utils/styles-util";

class WithdrawalInfoModal extends Component {
  static propTypes = {
    withdrawalSettings: PropTypes.instanceOf(Object),
    type: PropTypes.string,
    closeModal: PropTypes.func.isRequired,
  };
  static defaultProps = {};

  handleModalContent = () => {
    const { type, closeModal } = this.props;

    let title;
    let body;

    switch (type) {
      case "CEL":
        title = "Are you sure you want to withdraw CEL? ";
        body =
          "The longer you HODL and the more you HODL, the more interest you'll earn with Celsius. Withdrawing your funds will reduce the amount of interest you could potentially earn.";
        break;
      case "DASH":
        title = "ATTENTION";
        body =
          'We use multi-sig DASH wallet addresses that start with a "7" while regular DASH addresses start with an "X". These two address types can send to each other just fine and neither of them is invalid. If you experience any issues the cause is your wallet’s address validator. You will have to route your transaction through a wallet that does not have this problem.';
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

    const modalContent = [
      {
        title,
        body,
        ...firstStepButtons,
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
        onSecondPress: () => closeModal(),
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
    const { type, closeModal } = this.props;
    let steps = [];

    const modalContent = this.handleModalContent();

    switch (type) {
      case "CEL":
        steps = modalContent;
        break;
      case "DAI":
        steps = modalContent;
        break;
      case "DASH":
        steps = modalContent;
        break;
      default:
        steps = modalContent.slice(1, 3);
    }

    let picture;
    const theme = getTheme();
    if (theme !== THEMES.DARK) {
      picture = require(`../../../../assets/images/modal-withdraw.png`);
    } else {
      picture = require(`../../../../assets/images/modal-withdraw-dark.png`);
    }

    const imagesArray = ["DASH", "DAI"].includes(type)
      ? [require("../../../../assets/images/alert-icon.png"), picture]
      : [picture, picture];

    if (["DASH", "DAI", "CEL"].includes(type)) {
      return (
        <MultistepModal
          style={style.container}
          name={MODALS.WITHDRAW_INFO_MODAL}
          top={25}
          imagesArray={imagesArray}
          imageWidth={31}
          modalHeight={50}
        >
          {steps.map(this.renderStep)}
        </MultistepModal>
      );
    }

    return (
      <InfoModal
        name={MODALS.WITHDRAW_INFO_MODAL}
        picture={require("../../../../assets/images/modal-withdraw.png")}
        darkPicture={require("../../../../assets/images/modal-withdraw-dark.png")}
        heading={modalContent[1].title}
        paragraphs={[modalContent[1].body]}
        pictureDimensions={{ height: 31, width: 31 }}
        yesCopy={"I Understand"}
        onYes={closeModal}
      />
    );
  }
}

export default WithdrawalInfoModal;
