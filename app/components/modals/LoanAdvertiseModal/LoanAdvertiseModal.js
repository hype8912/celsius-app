import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import LoanAdvertiseModalStyle from "./LoanAdvertiseModal.styles";
import CelModal from "../CelModal/CelModal.js";
import { MODALS } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import CelCheckbox from "../../atoms/CelCheckbox/CelCheckbox";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

class LoanAdvertiseModal extends Component {
  static propTypes = {
    // text: PropTypes.string
    closeModal: PropTypes.func,
    updateFormField: PropTypes.func,
    formData: PropTypes.instanceOf(Object),
    setUserAppSettings: PropTypes.func,
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    const { updateFormField } = this.props;

    updateFormField("hideLoanAdvertiseModal", false);
  }

  closeModal = () => {
    const { closeModal, formData, setUserAppSettings } = this.props;
    if (formData.hideLoanAdvertiseModal) {
      setUserAppSettings({
        user_triggered_actions: {
          hide_loan_advertise_modal: true,
        },
      });
    }
    closeModal();
  };

  render() {
    const { updateFormField, formData } = this.props;
    const style = LoanAdvertiseModalStyle();
    return (
      <CelModal style={style.container} name={MODALS.LOAN_ADVERTISE_MODAL}>
        <CelText type="H2" align="center" weight="bold">
          1% APR Loans!
        </CelText>
        <CelText align="center" margin="30 20 10 20" type={"H4"}>
          Pay only 1% interest on 25% LTV loans up to $200,000!
        </CelText>
        <CelText align="center" margin="5 20 10 20" type={"H7"}>
          Offer valid through June 1 or until $10M in qualifying loans have been
          issued. Maximum loan term is 12 months. Other terms and conditions
          apply.
        </CelText>
        <View style={style.dontShowStyle}>
          <CelCheckbox
            field="hideLoanAdvertiseModal"
            updateFormField={updateFormField}
            value={formData.hideLoanAdvertiseModal}
            uncheckedCheckBoxColor={getColor(COLOR_KEYS.PARAGRAPH)}
            checkedCheckBoxColor={getColor(COLOR_KEYS.POSITIVE_STATE)}
            rightText={"Don't show this again"}
          />
        </View>
        <View style={style.buttonsStyle}>
          <CelModalButton
            onPress={() => {
              this.closeModal();
            }}
          >
            Close
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default LoanAdvertiseModal;
