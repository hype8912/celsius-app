import React, { Component } from 'react';
import PropTypes from "prop-types";
import { View, ScrollView, TouchableOpacity } from "react-native";


import formatter from "../../../utils/formatter";
import CelText from '../../atoms/CelText/CelText';
import CelModal from "../CelModal/CelModal";
import { MODALS } from "../../../constants/UI";
import WithdrawInfoModalStyle from "./WithdrawInfoModal.styles";
import CelButton from "../../atoms/CelButton/CelButton";
import DotsBar from '../../atoms/DotsBar/DotsBar';

class WithdrawInfoModal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    toggleKeypad: PropTypes.func,
    type: PropTypes.bool,
    withdrawalSettings: PropTypes.instanceOf(Object),
  };
  static defaultProps = {}

  constructor(props) {
    super(props);
    const { withdrawalSettings } = props

    this.state = {
      currentStep: 1,
      steps: [
        {
          image: require('../../../../assets/images/illustrations-v3/PolarBearHODL3x.png'),
          title: "Are you sure you want to withdraw CEL?",
          description: "A withdrawal could affect your membership interest rates. Rates are determined by your loyalty level: the amount of CEL you HODL vs. the amount of other assets you hold. Please view our loyalty program.",
        },
        {
          image: require('../../../../assets/images/illustrations-v3/PolarBearSad3x.png'),
          title: `Immediate withdrawals under ${ withdrawalSettings && formatter.usd(withdrawalSettings.maximum_withdrawal_amount) }`,
          description: "Celsius enables you to withdraw coins at any time. However, when exceeding this limit, withdrawals might be delayed for twenty-four (24) hours due to our security protocols.",
        },
        {
          image: require('../../../../assets/images/illustrations-v3/PolarBearFistUp3x.png'),
          title: "Don’t forget to check your withdrawal address",
          description: "Celsius uses a smart-contract based wallet for ETH and ERC20 coins, some wallets and exchanges (e.g. Bitfinex) do not support transactions from a smart-contract source. We recommend a one time test withdrawal with a small sum. Contact app@celsius.network if you are unsure.",
        },
        {
          image: require('../../../../assets/images/illustrations-v3/PolarBearFistUp3x.png'),
          title: "Transactions are safely secured with BitGo",
          description: "BitGo is a leading custodial service powering exchanges like Kraken and UPbit. Coins will be moved from time to time to exchanges or to Hedge funds borrowing coins in order to short the market, in this case, coins are converted to fiat and secured in an FDIC-insured bank account.",
        }
      ]
    };
  }

  closeModalHandler = () => {
    const { closeModal } = this.props
    closeModal()
    this.setState({ currentStep: 1 })
  }


  continue = () => {
    const { currentStep } = this.state
    const { toggleKeypad, type } = this.props

    if (type) {
      if (currentStep === 4) {
        if (toggleKeypad) toggleKeypad();
        this.closeModalHandler();
      } else {
        this.setState({ currentStep: currentStep + 1 })
      }
    } else if (currentStep === 3) {
      if (toggleKeypad) toggleKeypad();
      this.closeModalHandler();
    } else {
      this.setState({ currentStep: currentStep + 1 })
    }
  }

  buttonColor = () => {
    const styles = WithdrawInfoModalStyle();
    const { currentStep } = this.state;
    const { type } = this.props;

    const normalButton = [styles.modalButton]

    if (type) {
      if (currentStep !== 4) {
        normalButton.push(styles.whiteButton)
      }
      return (
        <View >
          {currentStep === 4 ? <CelButton style={normalButton} onPress={this.continue}>Continue</CelButton> : <CelButton ghost style={normalButton} onPress={this.continue}>Next tip </CelButton>}
        </View >
      )
    }
    if (currentStep !== 3) {
      normalButton.push(styles.whiteButton)
    }
    return (
      <View >
        {currentStep === 3 ? <CelButton style={normalButton} onPress={this.continue}>Continue</CelButton> : <CelButton ghost style={normalButton} onPress={this.continue}>Next tip </CelButton>}
      </View >
    )

  }

  renderStep() {
    const { steps, currentStep } = this.state;
    const { type } = this.props
    const styles = WithdrawInfoModalStyle();
    const ButtonStyle = this.buttonColor;

    const three = steps.slice(1, 4)

    return (
      <View>
        <ScrollView>
          <CelText type='H2' weight='bold' style={styles.title}> {type ? steps[currentStep - 1].title : three[currentStep - 1].title}</CelText>
          <CelText type='H4' style={styles.description}>{type ? steps[currentStep - 1].description : three[currentStep - 1].description}</CelText>
          <View style={styles.button}>
            <ButtonStyle />
            <TouchableOpacity style={{ marginTop: 10 }} onPress={this.closeModalHandler}>
              <CelText> Skip </CelText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }

  render() {
    const styles = WithdrawInfoModalStyle();
    const { steps, currentStep } = this.state;
    const { type } = this.props;
    let numberOfSteps

    if (type) {
      numberOfSteps = 4
    } else {
      numberOfSteps = 3
    }

    return (
      <CelModal
        name={MODALS.WITHDRAW_INFO_MODAL}
        picture={steps[currentStep - 1].image}
        onClose={this.closeModalHandler}
      >
        <View style={styles.wrapper}>
          <View style={styles.progressBar}>
            <DotsBar length={numberOfSteps} currentStep={currentStep} />
          </View>
          <View>
            {this.renderStep()}
          </View>
        </View>
      </CelModal>
    );
  }
}

export default WithdrawInfoModal
