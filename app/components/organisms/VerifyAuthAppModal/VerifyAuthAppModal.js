import React from 'react'
import { View } from 'react-native'


import { MODALS } from '../../../constants/UI'
import CelButton from '../../atoms/CelButton/CelButton'
import CelText from '../../atoms/CelText/CelText'
import CelModal from '../CelModal/CelModal'
import VerifyAuthAppModalStyle from './VerifyAuthAppModal.styles'

const VerifyAuthAppModal = props => {
  const { onVerify } = props
  const style = VerifyAuthAppModalStyle()
  return (
    <CelModal
      name={MODALS.VERIFY_AUTHAPP_MODAL}
      shouldRenderCloseButton={false}
      picture={require('../../../../assets/images/security-dog.png')}
    >
      <View style={{ alignItems: 'center', paddingTop: 40 }}>
        <CelText type='H2' align='center' weight='bold'>
          Check your Email!
        </CelText>
        <CelText
          type='H5'
          align='center'
          weight='extra-light'
          margin={'20 0 0 0'}
        >
          To complete your Two-Factor verification request follow the email
          instructions.
        </CelText>
      </View>

      <View style={style.buttonBottom}>
        <CelButton onPress={onVerify}>Go to wallet</CelButton>
      </View>
    </CelModal>
  )
}

export default VerifyAuthAppModal
