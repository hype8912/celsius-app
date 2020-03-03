import React from 'react'


import { MODALS } from '../../../constants/UI'
import CelButton from '../../atoms/CelButton/CelButton'
import CelText from '../../atoms/CelText/CelText'
import CelModal from '../CelModal/CelModal'

const DestinationTagModal = props => {
  const { closeModal } = props
  return (
    <CelModal name={MODALS.DESTINATION_TAG_MODAL}>
      <CelText align='center' type='H2' weight='bold' margin='0 0 32 0'>
        Destination Tag for XRP
      </CelText>
      <CelText align='center' type='H4' margin='0 0 24 0'>
        Ripple (XRP) transactions require destination tags as an additional
        information.
      </CelText>
      <CelText align='center' type='H4' margin='0 0 24 0'>
        The Destination Tag is used to determine what account a given
        transaction should be assigned and credited to.
      </CelText>
      <CelText align='center' type='H4' margin='0 0 24 0'>
        Quoting the tag along with the Ripple wallet address ensures that your
        transaction is uniquely identified and processed successfully.
      </CelText>

      <CelButton onPress={closeModal}>Got it</CelButton>
    </CelModal>
  )
}

export default DestinationTagModal
