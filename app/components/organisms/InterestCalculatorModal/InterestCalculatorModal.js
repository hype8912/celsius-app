import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import * as appActions from '../../../redux/actions'
import CelModal from '../CelModal/CelModal'
import { MODALS, THEMES } from '../../../constants/UI'
import CelButton from '../../atoms/CelButton/CelButton'
import CelText from '../../atoms/CelText/CelText'
import InterestCalculator from '../InterestCalculator/InterestCalculator'

@connect(
  state => ({
    formData: state.forms.formData
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class InterestCalculatorModal extends Component {
  render () {
    const { actions, formData } = this.props
    return (
      <CelModal name={MODALS.INTEREST_CALCULATOR_MODAL} padding='0 0 0 0'>
        <CelText weight='bold' type='H2' align={'center'}>
          Interest calculator
        </CelText>
        <CelText align={'center'} margin='4 0 20 0'>
          How much do you plan to deposit?
        </CelText>

        <InterestCalculator theme={THEMES.LIGHT} />

        <CelButton
          onPress={() => {
            actions.navigateTo('Deposit', { coin: formData.coin })
            actions.closeModal()
            actions.clearForm()
          }}
          margin='15 0 15 0'
        >
          Deposit coins
        </CelButton>
      </CelModal>
    )
  }
}

export default InterestCalculatorModal
