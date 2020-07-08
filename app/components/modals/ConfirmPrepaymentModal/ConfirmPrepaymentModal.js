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
    const { modalData } = this.props;
    const { loan, isLoading } = this.state;
    const style = ConfirmPrepaymentModalStyle();

    const content = this.renderContent(modalData.loanId);
    if (!loan) return null;

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
          <CelModalButton loading={isLoading} onPress={content.onPress}>
            {content.buttonText}
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default ConfirmPrepaymentModal;
