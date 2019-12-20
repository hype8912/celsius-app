import React from "react";
import { View } from "react-native";

import CelModal from "../../../organisms/CelModal/CelModal";
import CelText from "../../../atoms/CelText/CelText";

// import BorrowCalculatorModalStyle from "./BorrowCalculatorModal.styles";
import BorrowCalculator from "../../../organisms/BorrowCalculator/BorrowCalculator";
import { MODALS, THEMES } from "../../../../constants/UI";
import STYLES from "../../../../constants/STYLES";

const BorrowCalculatorModal = props => (
  <CelModal name={MODALS.BORROW_CALCULATOR_MODAL} padding="0 0 0 0">
    <CelText weight="bold" type="H2" align={"center"}>
      Loan calculator
    </CelText>
    <CelText align={"center"} margin="4 0 20 0">
      How much you like to borrow?
    </CelText>

    <View
      style={{
        padding: 15,
        paddingTop: 25,
        backgroundColor: STYLES.COLORS.LIGHT_GRAY,
      }}
    >
      <BorrowCalculator
        emitParams={props.emitParams}
        themeModal={THEMES.LIGHT}
      />
    </View>
  </CelModal>
);

export default BorrowCalculatorModal;
