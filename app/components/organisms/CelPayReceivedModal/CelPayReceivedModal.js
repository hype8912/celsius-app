import React from 'react';
import PropTypes from 'prop-types';



import CelModal from "../CelModal/CelModal";
import { MODALS } from '../../../constants/UI'
import CelText from "../../atoms/CelText/CelText";
import CelButton from "../../atoms/CelButton/CelButton";
import formatter from "../../../utils/formatter";

const CelPayReceivedModal = ({
  transfer,
  navigateTo,
  closeModal,
}) => {
  if (!transfer) return null;

  return (
    <CelModal
      name={MODALS.CELPAY_RECEIVED_MODAL}
      picture={require('../../../../assets/images/frenchy.png')}
    >
      <CelText type="H2" align="center" weight='bold' margin="5 0 15 0">Congrats!</CelText>

      <CelText align="center">
        Your friend { transfer.from.name } just sent you
        <CelText weight="600"> {formatter.crypto(transfer.amount, transfer.coin)} </CelText>
        . It's already earning interest in your wallet which will be paid out on a weekly basis. Go to your wallet to find out more about interest rates.
      </CelText>

      <CelButton onPress={() => {
        closeModal()
        navigateTo('WalletLanding')
      }} margin="15 0 0 0">Go to wallet</CelButton>
    </CelModal>
  )
}

CelPayReceivedModal.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  transfer: PropTypes.instanceOf(Object),
}


export default CelPayReceivedModal
