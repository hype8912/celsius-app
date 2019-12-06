import React from "react";
import { View } from "react-native";

import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import { MODALS } from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import CelText from "../../atoms/CelText/CelText";
import MemoIdModal from "./MemoIdModal";

const MemoIdModalStories = () => (
  <View style={{ marginBottom: 30 }}>
    <CelText margin="0 0 10 0">Memo Id modal:</CelText>
    <CelButton onPress={() => store.dispatch(openModal(MODALS.MEMO_ID_MODAL))}>
      Open MemoIdModal
    </CelButton>
    <MemoIdModal coin={"EOS"} />
  </View>
);

export default MemoIdModalStories;
