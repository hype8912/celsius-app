import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import DepositInfoModalStyle from "./DepositInfoModal.styles";
import MultistepModal from "../MultistepModal/MultistepModal.js";
import { MODALS } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import * as appActions from "../../../redux/actions";
import InfoModal from "../InfoModalNew/InfoModal";

@connect(
  state => ({
    currencies: state.currencies.rates,
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

  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };

    // binders
  }

  handleMultistepContent = type => {
    const { currencies } = this.props;

    const coinName = currencies.find(coin => coin.short === type);
    let steps;

    switch (type) {
      case "":
        steps = [
          {
            image: require("../../../../assets/images/deposit-icn.png"),
            title: "Only deposit same coin type as selected",
            description:
              "Depositing a different coin than selected will result in permanent loss of funds.",
            buttonText: "Continue",
          },
          {
            image: require("../../../../assets/images/deposit-icn.png"),
            title: "Review your transaction details carefully",
            description:
              "Depositing coins without all required data, such as Destination Tag (XRP) or MemoID (XLM), or incorrect data will result in permanent loss.",
            buttonText: "I understand",
          },
        ];
        return steps;
      case "XRP":
        steps = [
          {
            image: { uri: coinName.image_url },
            title: `Only deposit Ripple (XRP) to this wallet`,
            description:
              "Sending any other digital asset to this specific address, will result in permanent loss.",
            buttonText: "Continue",
          },
          {
            image: { uri: coinName.image_url },
            title: "Destination Tag is required to deposit XRP",
            description:
              "Sending funds without destination tag or with an incorrect one, will result in loss.",
            buttonText: "I understand",
          },
        ];
        return steps;
      case "XLM":
        steps = [
          {
            image: { uri: coinName.image_url },
            title: `Only deposit Stellar (XLM) to this wallet`,
            description:
              "Sending any other digital asset to this specific address, will result in permanent loss.",
            buttonText: "Continue",
          },
          {
            image: { uri: coinName.image_url },
            title: "Memo ID is required to deposit XLM",
            description:
              "Sending funds without memo ID or with an incorrect one, will result in loss.",
            buttonText: "I understand",
          },
        ];
        return steps;
      case "EOS":
        steps = [
          {
            image: { uri: coinName.image_url },
            title: `Only deposit EOS (EOS) to this wallet`,
            description:
              "Sending any other digital asset to this specific address, will result in permanent loss.",
            buttonText: "Continue",
          },
          {
            image: { uri: coinName.image_url },
            title: "Memo ID is required to deposit EOS",
            description:
              "Sending funds without memo ID or with an incorrect one, will result in loss.",
            buttonText: "I understand",
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
        title: `Please ensure only Tether ERC20 tokens are deposited to this address`,
        description:
          "Sending other USDT coins to this address (the Omni Layer version) may result in the permanent loss of funds.",
        buttonText: "I understand",
      };
    }

    return {
      image: { uri: coinName.image_url },
      title: `Only deposit ${coinName.displayName} (${type}) to this wallet`,
      description:
        "Sending any other digital asset to this specific address, will result in permanent loss.",
      buttonText: "I understand",
    };
  };

  handleStepImages = () => {
    const { type } = this.props;
    const imagesArray = this.handleMultistepContent(type).map(
      array => array.image
    );

    return imagesArray;
  };

  renderStepBody = (title, description, buttonText, key) => {
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
            buttonStyle={
              buttonText === "Continue" || buttonText === "Next"
                ? "secondary"
                : "basic"
            }
            position={"single"}
          >
            {buttonText}
          </CelModalButton>
        </View>
      </View>
    );
  };

  render() {
    const { type, actions } = this.props;
    const style = DepositInfoModalStyle();

    if (type === "XRP" || type === "XLM" || type === "EOS" || !type) {
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
        >
          {multistepContent.map((s, k) =>
            this.renderStepBody(s.title, s.description, s.buttonText, k)
          )}
        </MultistepModal>
      );
    }

    const infoContent = this.handleInfoContent(type);
    return (
      <InfoModal
        name={MODALS.DEPOSIT_INFO_MODAL}
        picture={infoContent.image}
        pictureDimensions={{ height: 35, width: 35 }}
        heading={infoContent.title}
        paragraphs={[infoContent.description]}
        yesCopy={"I Understand"}
        onYes={actions.closeModal}
      />
    );
  }
}

export default DepositInfoModal;
