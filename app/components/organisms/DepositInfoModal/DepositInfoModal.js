import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import * as appActions from "../../../redux/actions";
import DepositInfoModalStyle from "./DepositInfoModal.styles";
import CelModal from "../CelModal/CelModal";
import { MODALS } from "../../../constants/UI";
import DotsBar from "../../atoms/DotsBar/DotsBar";
import CelText from "../../atoms/CelText/CelText";
import CelButton from "../../atoms/CelButton/CelButton";

@connect(
  state => ({
    currencies: state.currencies.rates
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class DepositInfoModal extends Component {

  static propTypes = {
    type: PropTypes.string
  };
  static defaultProps = {
    type: ""
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
            image: require("../../../../assets/images/stacked_coins.png"),
            title: "Only deposit same coin type as selected",
            description: "Depositing a different coin than selected will result in permanent loss of funds.",
            buttonText: "Continue"
          },
          {
            image: require("../../../../assets/images/stacked_coins.png"),
            title: "Review your transaction details carefully",
            description: "Depositing coins without all required data, such as Destination Tag (XRP) or MemoID (XLM), or incorrect data will result in permanent loss.",
            buttonText: "I understand"
          }
        ];
        break;
      case "XRP":
        steps = [
          {
            image: { uri: coinName.image_url },
            title: `Only deposit Ripple (XRP) to this wallet`,
            description: "Sending any other digital asset to this specific address, will result in permanent loss.",
            buttonText: "Continue"
          },
          {
            image: { uri: coinName.image_url },
            title: "Destination Tag is required to deposit XRP",
            description: "Sending funds without destination tag or with an incorrect one, will result in loss.",
            buttonText: "I understand"
          }
        ];
        break;
      case "XLM":
        steps = [
          {
            image: { uri: coinName.image_url },
            title: `Only deposit Stellar (XLM) to this wallet`,
            description: "Sending any other digital asset to this specific address, will result in permanent loss.",
            buttonText: "Continue"
          },
          {
            image: { uri: coinName.image_url },
            title: "Memo ID is required to deposit XLM",
            description: "Sending funds without memo ID or with an incorrect one, will result in loss.",
            buttonText: "I understand"
          }
        ];
        break;
      default:
        steps = [
          {
            image: { uri: coinName.image_url },
            title: `Only deposit ${coinName.displayName} (${type}) to this wallet`,
            description: "Sending any other digital asset to this specific address, will result in permanent loss.",
            buttonText: "I understand"
          }
        ];
    }

    this.state = {
      currentStep: 0,
      steps
    };
  }

  closeModalHandler = () => {
    const { actions } = this.props;
    const { steps, currentStep } = this.state;

    if (steps[currentStep].buttonText === "Continue") {
      this.setState({ currentStep: 1 });
    } else {
      actions.closeModal();
      this.setState({ currentStep: 0 });
    }
  };

  render() {
    const style = DepositInfoModalStyle();
    const { steps, currentStep } = this.state;

    return (
      <CelModal
        name={MODALS.DEPOSIT_INFO_MODAL}
        picture={steps[currentStep].image}
        pictureCircle
      >
        {steps.length > 1 &&
        <View style={style.progressBar}>
          <DotsBar length={2} currentStep={currentStep + 1}/>
        </View>}
        <CelText type='H2' align={"center"} weight='bold' style={style.title}>{steps[currentStep].title}</CelText>
        <CelText type='H4' align={"center"} style={style.description}>{steps[currentStep].description}</CelText>
        <CelButton
          margin={"20 0 20 0"}
          onPress={this.closeModalHandler}
        >{steps[currentStep].buttonText}</CelButton>
      </CelModal>
    );
  }
}

export default DepositInfoModal;
