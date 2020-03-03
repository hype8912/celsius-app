import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../../redux/actions'


// import BecameCelMemberModalStyle from "./BecameCelMemberModal.styles";
import CelModal from '../CelModal/CelModal'
import { MODALS } from '../../../constants/UI'
import CelText from '../../atoms/CelText/CelText'
import CelButton from '../../atoms/CelButton/CelButton'

@connect(
  state => ({
    referralLink: state.branch.registeredLink
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BecameCelMemberModal extends Component {
  closeAndGoToDeposit = () => {
    const { actions } = this.props
    actions.closeModal()
    actions.navigateTo('Deposit')
  }

  render() {
    const { actions } = this.props

    return (
      <CelModal
        name={MODALS.BECAME_CEL_MEMBER_MODAL}
        picture={require('../../../../assets/images/illustrations-v3/stamp3x.png')}
      >
        <CelText margin='20 0 0 0' align='center' weight='bold' type='H2'>
          Congrats! You have earned 1 CEL token!
        </CelText>
        <CelText margin='16 0 10 0' type='H4' weight='300' align='center'>
          This CEL token allows you to take advantage of Celsius' products. Without any CEL you will be unable to earn, borrow, or pay, so keep HODLing!
        </CelText>
        <CelButton onPress={this.closeAndGoToDeposit} margin='30 0 20 0'>
          Deposit coins
        </CelButton>
        <CelButton
          size='small'
          basic
          onPress={ () => {
              actions.navigateTo('LoyaltyProgram')
              actions.closeModal() }
            }>
          Learn about the CEL Loyalty Program
        </CelButton>
      </CelModal>
    )
  }
}

export default BecameCelMemberModal
