import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import DepositInfoModalStyle from "./DepositInfoModal.styles";
import MultistepModal from "../MultistepModal/MultistepModal.js";
import { MODALS, THEMES } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import * as appActions from "../../../redux/actions";
import InfoModal from "../InfoModalNew/InfoModal";
import multiStepUtil from "../../../utils/multistep-modal-util";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import { getTheme } from "../../../utils/styles-util";

@connect(
  state => ({
    currencies: state.currencies.rates,
    depositCompliance: state.compliance.deposit,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class DepositInfoModal extends Component {
  static propTypes = {
    type: PropTypes.string,
  };
  static defaultProps = {
    type: "",
  };

  handleMultistepContent = type => {
    const { currencies, actions } = this.props;

    const theme = getTheme();

    const coinName = currencies && currencies.find(coin => coin.short === type);
    let steps;

    switch (type) {
      case "":
        steps = [
          {
            image:
              theme !== THEMES.DARK
                ? require(`../../../../assets/images/deposit-icn.png`)
                : require(`../../../../assets/images/deposit-icn-dark.png`),
            darkImage: require("../../../../assets/images/deposit-icn.png"),
            title: "Only transfer same coin type as selected",
            description:
              "Transferring a different coin than selected will result in permanent loss of funds.",
            buttonText: "Continue",
            onPress: () => multiStepUtil.goToNextStep(),
          },
          {
            image:
              theme !== THEMES.DARK
                ? require(`../../../../assets/images/deposit-icn.png`)
                : require(`../../../../assets/images/deposit-icn-dark.png`),
            title: "Review your transaction details carefully",
            description:
              "Transferring coins without all required data, such as Destination Tag (XRP) or MemoID (XLM), or incorrect data will result in permanent loss.",
            buttonText: "I Understand",
            onPress: () => actions.closeModal(),
          },
        ];
        return steps;
      case "XRP":
        steps = [
          {
            image: { uri: coinName.image_url },
            title: `Only transfer Ripple (XRP) to this wallet using its native blockchain.`,
            description:
              "Sending any other digital asset to this specific address or using any third-party blockchain will result in permanent loss.",
            buttonText: "Continue",
            onPress: () => multiStepUtil.goToNextStep(),
          },
          {
            image: { uri: coinName.image_url },
            title: "Destination Tag is required to transfer XRP",
            description:
              "Sending any other digital asset to this specific address or using any third-party blockchain will result in permanent loss.",
            buttonText: "I Understand",
            onPress: () => actions.closeModal(),
          },
        ];
        return steps;
      case "XLM":
        steps = [
          {
            image: { uri: coinName.image_url },
            title: `Only transfer Stellar (XLM) to this wallet using its native blockchain.`,
            description:
              "Sending any other digital asset to this specific address or using any third-party blockchain will result in permanent loss.",
            buttonText: "Continue",
            onPress: () => multiStepUtil.goToNextStep(),
          },
          {
            image: { uri: coinName.image_url },
            title: "Memo ID is required to transfer XLM",
            description:
              "Sending funds without memo ID or with an incorrect one, will result in loss.",
            buttonText: "I Understand",
            onPress: () => actions.closeModal(),
          },
        ];
        return steps;
      case "EOS":
        steps = [
          {
            image: { uri: coinName.image_url },
            title: `Only transfer EOS (EOS) to this wallet using its native blockchain.`,
            description:
              "Sending any other digital asset to this specific address or using any third-party blockchain will result in permanent loss.",
            buttonText: "Continue",
            onPress: () => multiStepUtil.goToNextStep(),
          },
          {
            image: { uri: coinName.image_url },
            title: "Memo ID is required to transfer EOS",
            description:
              "Sending funds without memo ID or with an incorrect one, will result in loss.",
            buttonText: "I Understand",
            onPress: () => actions.closeModal(),
          },
        ];
        return steps;
    }
  };

  handleInfoContent = type => {
    const { currencies } = this.props;

    const coinName = currencies.find(coin => coin.short === type);
    if (type === "USDT ERC20") {
      return {
        image: { uri: coinName.image_url },
        title: `Only transfer ${coinName.displayName} (${type}) to this wallet using its native blockchain.`,
        description:
          "Please ensure only Tether ERC20 tokens are transferred to this address. Sending coins other than USDT ERC20 to this address may result in the permanent loss of funds.",
        buttonText: "I Understand",
        coinName,
      };
    }

    if (type === "MATIC") {
      return {
        image: { uri: coinName.image_url },
        title: `Only transfer ${coinName.displayName} (${type}) to this wallet using its native blockchain.`,
        description:
          "This address is only for MATIC ERC20 tokens. Sending other MATIC coins to this address may result in a permanent loss of funds.",
        buttonText: "I Understand",
        coinName,
      };
    }

    return {
      image: { uri: coinName.image_url },
      title: `Only transfer ${coinName.displayName} (${type}) to this wallet using its native blockchain.`,
      description:
        "Sending any other digital asset to this specific address or using any third-party blockchain will result in permanent loss.",
      buttonText: "I Understand",
      coinName,
    };
  };

  handleStepImages = () => {
    const { type } = this.props;
    const imagesArray = this.handleMultistepContent(type).map(
      array => array.image
    );

    return imagesArray;
  };

  renderStepBody = (title, description, buttonText, key, onPress) => {
    const style = DepositInfoModalStyle();
    return (
      <View style={style.modalWrapper} key={key}>
        <CelText
          type={"H3"}
          align={"center"}
          margin={"0 20 5 20"}
          weight={"700"}
        >
          {title}
        </CelText>
        <CelText align={"center"} margin={"5 20 0 20"}>
          {description}
        </CelText>

        <View style={style.buttonsWrapper}>
          <CelModalButton
            buttonStyle={buttonText === "I Understand" ? "basic" : "secondary"}
            position={"single"}
            onPress={() => onPress()}
          >
            {buttonText}
          </CelModalButton>
        </View>
      </View>
    );
  };

  render() {
    const { type, actions, depositCompliance } = this.props;
    const style = DepositInfoModalStyle();

    if (
      (!depositCompliance.coins.includes("XLM") ||
        !depositCompliance.coins.includes("XRP")) &&
      (type === "XRP" || type === "XLM")
    ) {
      return null;
    }

    if (type === "XRP" || type === "XLM" || type === "EOS" || !type) {
      // NOTE (djenader): !type is mandatory
      const multistepContent = this.handleMultistepContent(type);
      const imagesArray = this.handleStepImages();

      return (
        <MultistepModal
          style={style.container}
          name={MODALS.DEPOSIT_INFO_MODAL}
          imagesArray={imagesArray}
          imageWidth={35}
          imageHeight={35}
          top={25}
          modalHeight={45}
        >
          {multistepContent.map((s, k) =>
            this.renderStepBody(
              s.title,
              s.description,
              s.buttonText,
              k,
              s.onPress
            )
          )}
        </MultistepModal>
      );
    }

    const infoContent = this.handleInfoContent(type);
    return (
      <InfoModal
        name={MODALS.DEPOSIT_INFO_MODAL}
        picture={infoContent.image}
        darkPicture={infoContent.darkImage}
        pictureDimensions={{ height: 35, width: 35 }}
        heading={infoContent.title}
        paragraphs={[infoContent.description]}
        yesCopy={"I Understand"}
        onYes={actions.closeModal}
        coin={infoContent.coinName.short}
      />
    );
  }
}

export default DepositInfoModal;
