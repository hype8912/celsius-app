import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import ReferralSendModal from "./ReferralSendModal";

const ReferralSendModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Send Referral modal:</CelText>
    <CelButton
      onPress={() => store.dispatch(openModal(MODALS.REFERRAL_SEND_MODAL))}
    >
      Open ReferralSendModal
    </CelButton>
    <ReferralSendModal />
  </View>
);

export default ReferralSendModalStories;
