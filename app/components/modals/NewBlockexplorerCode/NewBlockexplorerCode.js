import React, { Component } from "react";
import { View } from "react-native";

import NewBlockexplorerCodeStyle from "./NewBlockexplorerCode.styles";
import CelModal from "../CelModal/CelModal.js";
import { MODALS } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import STYLES from "../../../constants/STYLES";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";

class NewBlockexplorerCode extends Component {
  render() {
    const style = NewBlockexplorerCodeStyle();
    const { closeModal } = this.props;
    return (
      <CelModal style={style.container} name={MODALS.NEW_BLOCKEXPLORER_CODE}>
        <CelText
          type={"H2"}
          weight={"600"}
          margin={"0 20 20 20"}
          align={"center"}
        >
          New Blockexplorer Code
        </CelText>
        <View
          style={{
            backgroundColor: STYLES.COLORS.LIGHT_GRAY,
            borderRadius: 8,
            marginHorizontal: 30,
            marginBottom: 20,
            padding: 10,
          }}
        >
          <CelText>
            0xDE082CC5F6F02D8B0F0A43357C77059620358BC272D88E84E922061FFCAE2BDD
          </CelText>
        </View>
        <View style={style.buttonsStyle}>
          <CelModalButton
            onPress={() => {
              closeModal();
            }}
          >
            Close
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default NewBlockexplorerCode;
