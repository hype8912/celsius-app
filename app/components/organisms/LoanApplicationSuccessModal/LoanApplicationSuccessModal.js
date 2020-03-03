import React, { Component } from 'react';
import { View } from 'react-native';

import LoanApplicationSuccessModalStyle from "./LoanApplicationSuccessModal.styles";
import CelText from '../../atoms/CelText/CelText';
import { MODALS } from "../../../constants/UI";
import CelModal from '../CelModal/CelModal';
import CelButton from '../../atoms/CelButton/CelButton';
import STYLES from '../../../constants/STYLES';


class LoanApplicationSuccessModal extends Component {

  static propTypes = {
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      steps: [
        {
          title: "Loan successfully initiated",
          description: "Thank you for initiating your loan with Celsius. Once approved, your funds will be transferred to your Celsius wallet.",
          buttonText: "Next"

        },
        {
          title: `Prepay your interest`,
          description: "Your first interest payment will be due on May 12, 2019. Stay ahead of schedule and submit your first interest payment in advance.",
          buttonText: "Make a payment"
        }
      ]
    }
  }


  closeModalHandler = () => {
    const { actions } = this.props;
    const { steps, currentStep } = this.state;

    if (steps[currentStep].buttonText === "Next") {
      this.setState({ currentStep: 1 });
    }
    else {
      actions.navigateTo('LoyaltyProgram')
      actions.closeModal();
      this.setState({ currentStep: 0 });
    }
  };


  render() {
    const { actions } = this.props;
    const { steps, currentStep } = this.state;
    const style = LoanApplicationSuccessModalStyle();

    return (

      <CelModal
        name={MODALS.LOAN_APPLICATION_SUCCESS_MODAL}
        picture={require('../../../../assets/images/illustrations-v3/monkey-success/monkey-success.png')}
      >
        <CelText type='H2' align={"center"} weight='bold' style={style.title}>{steps[currentStep].title}</CelText>
        <CelText type='H4' weight={'300'} color={STYLES.COLORS.DARK_GRAY} align={"center"} style={style.description}>{steps[currentStep].description}</CelText>
        <CelButton
          margin={"20 0 10 0"}
          onPress={this.closeModalHandler}
        >{steps[currentStep].buttonText}
        </CelButton>
        {currentStep > 0 &&
          <View>
            <CelButton basic onPress={() => actions.closeModal()}>
              Close
            </CelButton>
          </View>}
      </CelModal>
    )
  }
}

export default LoanApplicationSuccessModal
