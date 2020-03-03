import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../../redux/actions'


import formatter from "../../../utils/formatter";
// import ReferralReceivedModalStyle from "./ReferralReceivedModal.styles";
import CelModal from '../CelModal/CelModal'
import { MODALS } from '../../../constants/UI'
import CelText from '../../atoms/CelText/CelText'
import CelButton from '../../atoms/CelButton/CelButton'
import { BRANCH_LINKS } from '../../../constants/DATA'

// TODO check usage & remove
@connect(
  state => ({
    referralLink: state.branch.registeredLink
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ReferralReceivedModal extends Component {
  closeAndGoToSignup = () => {
    const { actions } = this.props

    actions.closeModal()
    actions.navigateTo('RegisterInitial')
  }

  render () {
    const { referralLink } = this.props

    if (!referralLink) return null
    const owner = referralLink.owner ? referralLink.owner.display_name : 'a friend'
    return (
      <CelModal
        name={MODALS.REFERRAL_RECEIVED_MODAL}
        picture={require('../../../../assets/images/frenchy.png')}
      >
        <CelText margin='20 0 0 0' align='center' weight='bold' type='H2'>
          Welcome to Celsius!
        </CelText>
        {referralLink.link_type === BRANCH_LINKS.INDIVIDUAL_REFERRAL && (
          <CelText>
            You have been referred by { owner } and
            receiver{' '}
            <CelText weight='bold'>
              {referralLink.referred_award_amount}{' '}
              {referralLink.referred_award_base_currency}{' '}
            </CelText>
            as a reward. To see it in your wallet, please sign up and verify
            your profile.
          </CelText>
        )}
        {referralLink.link_type === BRANCH_LINKS.COMPANY_REFERRAL && (
          <CelText>
            You will receive{' '}
            <CelText weight='bold'>
              {referralLink.referred_award_amount}{' '}
              {referralLink.referred_award_base_currency ||
                referralLink.referred_award_coin}{' '}
            </CelText>
            {isNaN(referralLink.minimum_deposit_for_reward) ? (
              <CelText>after you verify your account!</CelText>
            ) : (
              <CelText>
                after your first deposit of{' '}
                {formatter.usd(referralLink.minimum_deposit_for_reward)} or more!
              </CelText>
            )}
          </CelText>
        )}
        <CelButton onPress={this.closeAndGoToSignup} margin='30 0 20 0'>
          Sign Up
        </CelButton>
      </CelModal>
    )
  }
}

export default ReferralReceivedModal
