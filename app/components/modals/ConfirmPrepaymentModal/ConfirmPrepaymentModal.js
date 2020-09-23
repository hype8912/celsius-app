import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View } from "react-native";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";

import ConfirmPrepaymentModalStyle from "./ConfirmPrepaymentModal.styles";
import { MODALS } from "../../../constants/UI";
import CelModal from "../CelModal/CelModal";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import CelText from "../../atoms/CelText/CelText";
import Separator from "../../atoms/Separator/Separator";
import formatter from "../../../utils/formatter";
import STYLES from "../../../constants/STYLES";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ConfirmPrepaymentModal extends Component {
  static propTypes = {
    modalData: PropTypes.instanceOf(Object),
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  renderContent = loanId => {
    const { actions } = this.props;
    return {
      heading: "Confirm Interest Prepayment",
      buttonText: "Prepay Interest",
      onPress: async () => {
        this.setState({
          isLoading: true,
        });
        await actions.prepayInterest(loanId);
        this.setState({
          isLoading: false,
        });
        actions.closeModal();
      },
    };
  };

  render() {
    const { modalData, actions } = this.props;
    const { isLoading } = this.state;
    const style = ConfirmPrepaymentModalStyle();

    if (!modalData) return null;
    if (modalData.coin === "USD")
      return actions.navigateTo(SCREENS.WIRING_BANK_INFORMATION);
    const content = this.renderContent(modalData.loanId);

    const buttonStyle =
      modalData.newBalanceUsd.isLessThanOrEqualTo(0) ||
      modalData.newBalanceCrypto.isLessThanOrEqualTo(0)
        ? { color: STYLES.COLORS.RED, style: "disabled" }
        : { color: " ", style: "basic" };

    return (
      <CelModal
        style={style.container}
        name={MODALS.CONFIRM_INTEREST_PREPAYMENT}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 20,
          }}
        >
          <CelText type={"H2"} align={"center"} weight={"500"}>
            {content.heading}
          </CelText>
          <View>
            <CelText align={"center"} margin={"20 0 0 0"} type={"H5"}>
              You are about to pay
            </CelText>
            <CelText align={"center"} type={"H1"}>
              {formatter.crypto(modalData.cryptoAmountToPay, modalData.coin)}
            </CelText>
            <CelText align={"center"}>
              {formatter.fiat(modalData.sumToPay, "USD")}
            </CelText>
            <View>
              <Separator margin={"20 0 20 0"} />
            </View>
            <CelText align={"center"} type={"H6"}>
              New wallet balance:
            </CelText>
            <CelText
              margin={"5 0 0 0"}
              align={"center"}
              type={"H6"}
            >{`${formatter.crypto(
              modalData.newBalanceCrypto,
              modalData.coin
            )} | ${formatter.fiat(modalData.newBalanceUsd, "USD")}`}</CelText>
          </View>
        </View>

        <View style={style.buttonsWrapper}>
          <CelModalButton
            buttonStyle={buttonStyle.style}
            loading={isLoading}
            onPress={content.onPress}
          >
            {content.buttonText}
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default ConfirmPrepaymentModal;
