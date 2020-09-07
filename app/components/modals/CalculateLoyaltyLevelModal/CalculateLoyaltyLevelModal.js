import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import CalculateLoyaltyLevelModalStyle from "./CalculateLoyaltyLevelModal.styles";
import CelModal from "../CelModal/CelModal.js";
import { MODALS } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import CelsiusMembershipTable from "../../organisms/CelsiusMembershipTable/CelsiusMembershipTable";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";

class CalculateLoyaltyLevelModal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
  };
  static defaultProps = {};

  render() {
    const style = CalculateLoyaltyLevelModalStyle();
    const { closeModal } = this.props;
    return (
      <CelModal
        style={style.container}
        name={MODALS.MY_CEL_LOYALTY_CALCULATOR_MODAL}
      >
        <CelText
          type={"H3"}
          align={"center"}
          margin={"0 20 10 20"}
          weight={"700"}
        >
          How do we calculate loyalty level?
        </CelText>
        <CelText align={"center"} margin={"5 20 0 20"} weight={"300"}>
          Your loyalty level is determined by the ratio of CEL to other coins in
          your wallet.
        </CelText>
        <View style={style.tableWrapper}>
          <CelsiusMembershipTable />
        </View>

        <View style={style.footerContainer}>
          <CelText
            margin={"10 20 10 20"}
            weight={"300"}
            type={"H5"}
            align={"center"}
          >
            Each loyalty level will bring you better rewards -{" "}
            <CelText weight={"500"} type={"H5"} align={"center"}>
              so keep HODLing!
            </CelText>
          </CelText>
        </View>
        <View style={style.buttonsWrapper}>
          <CelModalButton
            buttonStyle={"secondary"}
            position={"single"}
            onPress={closeModal}
          >
            Close
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default CalculateLoyaltyLevelModal;
