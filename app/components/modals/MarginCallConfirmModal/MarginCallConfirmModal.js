import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import MarginCallConfirmModalStyle from "./MarginCallConfirmModal.styles";
import CelModal from "../CelModal/CelModal.js";
import { COIN_CARD_TYPE, MODALS } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import formatter from "../../../utils/formatter";
import Separator from "../../atoms/Separator/Separator";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import loanPaymentUtil from "../../../utils/loanPayment-util";
import Card from "../../atoms/Card/Card";
import * as appActions from "../../../redux/actions";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class MarginCallConfirmModal extends Component {
  static propTypes = {
    loan: PropTypes.instanceOf(Object),
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  onPress = async loan => {
    const { actions } = this.props;
    this.setState({
      isLoading: true,
    });
    await actions.lockMarginCallCollateral(loan.id, loan.coin);
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { loan } = this.props;
    const { isLoading } = this.state;
    const style = MarginCallConfirmModalStyle();

    if (!loan) return null;
    const modalData = loanPaymentUtil.calculateAdditionalPayment(
      loan,
      COIN_CARD_TYPE.MARGIN_COLLATERAL_COIN_CARD
    );

    return (
      <CelModal style={style.container} name={MODALS.MARGIN_CALL_CONFIRM}>
        <View style={style.wrapper}>
          <CelText type={"H2"} align={"center"} weight={"500"}>
            You are about to add
          </CelText>
          <CelText align={"center"} type={"H1"}>
            {formatter.crypto(
              modalData.collateralAmount,
              modalData.coin.short,
              { precision: 2 }
            )}
          </CelText>
          <CelText align={"center"}>
            {formatter.fiat(modalData.amountUsd, "USD")}
          </CelText>
          <Card styles={style.card}>
            <CelText weight={"500"} type={"H5"}>
              Current Collateral Balance
            </CelText>
            <CelText color={"red"} weight={"500"} type={"H4"}>
              {formatter.crypto(loan.amount_collateral_crypto, loan.coin)}
            </CelText>
            <CelText color={"red"} weight={"300"} type={"H4"}>
              {formatter.fiat(loan.amount_collateral_usd, "USD")}
            </CelText>
            <Separator margin={"10 0 10 0"} />
            <CelText weight={"500"} type={"H5"}>
              New Collateral Balance
            </CelText>
            <CelText weight={"500"} type={"H4"}>
              {formatter.crypto(
                Number(loan.amount_collateral_crypto) +
                  Number(modalData.collateralAmount),
                loan.coin
              )}
            </CelText>
            <CelText weight={"300"} type={"H4"}>
              {formatter.fiat(
                Number(loan.amount_collateral_usd) +
                  Number(modalData.amountUsd),
                "USD"
              )}
            </CelText>
          </Card>
        </View>

        <View style={style.buttonsWrapper}>
          <CelModalButton
            loading={isLoading}
            onPress={() => this.onPress(loan)}
          >
            Confirm
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default MarginCallConfirmModal;
