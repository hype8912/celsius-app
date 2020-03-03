import React from 'react'
import { View } from 'react-native'


import { MODALS } from '../../../constants/UI'
import CelButton from '../../atoms/CelButton/CelButton'
import CelText from '../../atoms/CelText/CelText'
import CelModal from '../CelModal/CelModal'

const RemoveAuthAppModal = props => {
  const { closeModal, removeTwoFactor } = props
  return (
    <CelModal name={MODALS.REMOVE_AUTHAPP_MODAL}>
      <CelText type='H2' align='center' weight='bold' margin='30 0 0 0'>
        Remove Auth App
      </CelText>
      <CelText type='H4' align='center' weight='extra-light' margin='16 0 0 0'>
        If you remove authentication application you will lose a second step of
        verification. Are you sure you want to proceed?
      </CelText>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <CelButton margin='30 0 20 0' onPress={removeTwoFactor}>
          Remove
        </CelButton>
        <CelButton margin='0 0 20 0' onPress={closeModal} basic>
          Cancel
        </CelButton>
      </View>
    </CelModal>
  )
}

export default RemoveAuthAppModal
