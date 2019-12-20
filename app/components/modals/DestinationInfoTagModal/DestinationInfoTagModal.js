import React from "react";
// import PropTypes from 'prop-types';
import { ScrollView, View } from "react-native";

import CelModal from "../CelModal/CelModal.js";
import { MODALS } from "../../../constants/UI";
import MemoIdModalStyle from "../MemoIdModal/MemoIdModal.styles";
import { heightPercentageToDP } from "../../../utils/styles-util";
import CelText from "../../atoms/CelText/CelText";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";

const DestinationInfoTagModal = props => {
  const { closeModal } = props;
  const style = MemoIdModalStyle();
  return (
    <CelModal name={MODALS.DESTINATION_TAG_MODAL}>
      <ScrollView style={{ maxHeight: heightPercentageToDP("60%") }}>
        <CelText align="center" type="H2" margin="0 25 32 25" weight="bold">
          Destination Tag for XRP
        </CelText>
        <CelText align="center" type="H4" margin="0 25 24 25">
          Ripple (XRP) transactions require destination tags as an additional
          information.
        </CelText>
        <CelText align="center" type="H4" margin="0 25 24 25">
          The Destination Tag is used to determine what account a given
          transaction should be assigned and credited to.
        </CelText>
        <CelText align="center" type="H4" margin="0 25 24 25">
          Quoting the tag along with the Ripple wallet address ensures that your
          transaction is uniquely identified and processed successfully.
        </CelText>
      </ScrollView>
      <View style={style.buttonsWrapper}>
        <CelModalButton onPress={closeModal}>Got it</CelModalButton>
      </View>
    </CelModal>
  );
};

export default DestinationInfoTagModal;
