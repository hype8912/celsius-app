import React from 'react'


import { MODALS } from '../../../constants/UI'
import CelButton from '../../atoms/CelButton/CelButton'
import CelText from '../../atoms/CelText/CelText'
import CelModal from '../CelModal/CelModal'

const MemoIdModal = props => {
  const { closeModal } = props
  return (
    <CelModal name={MODALS.MEMO_ID_MODAL}>
      <CelText align='center' type='H2' margin='0 0 32 0' weight='bold'>
        Stellar (XLM) Memo ID
      </CelText>
      <CelText align='center' type='H4' margin='0 0 24 0'>
        Memo ID is used to determine what account a given transaction should be
        assigned and credited to.
      </CelText>
      <CelText align='center' type='H4' margin='0 0 24 0'>
        Quoting the Memo ID with the Stellar wallet address ensures that your
        transaction is uniquely identified and processed successfully.
      </CelText>
      <CelText align='center' type='H4' margin='0 0 24 0'>
        Exchanges require Memo ID, so please make sure to provide it, or you
        risk losing your money.
      </CelText>

      <CelButton onPress={closeModal}>Got it</CelButton>
    </CelModal>
  )
}

export default MemoIdModal
