import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../../redux/actions'


import { setSecureStoreKey } from '../../../utils/expo-storage'
import { MODALS } from '../../../constants/UI'
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from '../../atoms/CelText/CelText';
import CelModal from "../CelModal/CelModal";


@connect(
  state => ({
    appSettings: state.user.appSettings
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)

class EarnInterestCelModal extends Component {

  changeInterestEarn = () => {
    const { actions } = this.props
    actions.setUserAppSettings({
      interest_in_cel: true
    })
  }

  render() {
    const { actions } = this.props
    return (
      <CelModal
        name={MODALS.EARN_INTEREST_CEL}
        picture={require('../../../../assets/images/Onboarding-Welcome3x.png')}
      >
        <CelText type="H2" align="center" weight='bold' margin="15 0 15 0">It's time to CELebrate!</CelText>

        <CelText align="center">
          You can now earn up to 25% more on deposits when you earn in CEL.
      </CelText>

        <CelButton onPress={() => {
          this.changeInterestEarn()
          actions.closeModal()

        }}
          margin="15 0 15 0">Activate interest in CEL</CelButton>
        <CelButton basic onPress={async () => {
          actions.closeModal()
        }}>Not now</CelButton>

        <CelButton
          onPress={ async () => {
            actions.closeModal()
            await setSecureStoreKey('HIDE_MODAL_INTEREST_IN_CEL', 'ON')
            }
          }
          basic
          margin={"15 0 0 0"}
        >
          Do not show this again
        </CelButton>
      </CelModal>
    )
  }
}

export default EarnInterestCelModal
