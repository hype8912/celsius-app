import React, { Component } from "react";
// import { View, Animated } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../../redux/actions";
import CelModal from "../../../organisms/CelModal/CelModal";
import { MODALS } from "../../../../constants/UI";

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
    const { type, currencies } = props;
    let steps;

    const coinName = currencies.find(coin => coin.short === type);

    switch (type) {
      case "":
        steps = [
          {
            image: require("../../../../../assets/images/stacked_coins.png"),
            title: "Only deposit same coin type as selected",
            description:
              "Depositing a different coin than selected will result in permanent loss of funds.",
            buttonText: "Continue",
          },
          {
            image: require("../../../../../assets/images/stacked_coins.png"),
            title: "Review your transaction details carefully",
            description:
              "Depositing coins without all required data, such as Destination Tag (XRP) or MemoID (XLM), or incorrect data will result in permanent loss.",
            buttonText: "I understand",
          },
        ];
        break;
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
        break;
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
        break;
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
        break;
      case "USDT ERC20":
        steps = [
          {
            image: { uri: coinName.image_url },
            title: `Please ensure only Tether ERC20 tokens are deposited to this address`,
            description:
              "Sending other USDT coins to this address (the Omni Layer version) may result in the permanent loss of funds.",
            buttonText: "I understand",
          },
        ];
        break;
      default:
        steps = [
          {
            image: { uri: coinName.image_url },
            title: `Only deposit ${coinName.displayName} (${type}) to this wallet`,
            description:
              "Sending any other digital asset to this specific address, will result in permanent loss.",
            buttonText: "I understand",
          },
        ];
    }

    this.state = {
      currentStep: 0,
      steps,
    };
  }
  closeModalHandler = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  render() {
    const { steps, currentStep } = this.state;
    return (
      <CelModal
        noScroll={steps.length < 2}
        name={MODALS.DEPOSIT_INFO_MODAL}
        picture={steps[currentStep].image}
        pictureCircle
        modalInfo={steps}
        modalType={"deposit"}
      />
    );
  }
}

export default DepositInfoModal;
