import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View } from "react-native";
import LoanAlertsMarginCallLockCoinModalStyle from "./LoanAlertsMarginCallLockCoinModal.styles";

import { MODALS } from "../../../../constants/UI";
import * as appActions from "../../../../redux/actions";
import CelText from "../../../atoms/CelText/CelText";
import CelModalButton from "../../../atoms/CelModalButton/CelModalButton";
import CelModal from "../../CelModal/CelModal";
import CelButton from "../../../atoms/CelButton/CelButton";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class LoanAlertsMarginCallLockCoinModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  lockAdditionalCollateral = () => {
    const { actions, loan } = this.props;

    actions.navigateTo("VerifyProfile", {
      onSuccess: () =>
        actions.lockMarginCallCollateral(
          loan.id,
          loan.margin_call.collateral_coin
        ),
    });
    actions.closeModal();
  };

  render() {
    const style = LoanAlertsMarginCallLockCoinModalStyle();
    const { loan, onPressUseOtherCoins } = this.props;
    return (
      <CelModal
        name={MODALS.LOAN_ALERT_MODAL}
        picture={require("../../../../../assets/images/alert-icon.png")}
        pictureDimensions={{ width: 30, height: 30 }}
      >
        <View style={{ marginHorizontal: 10 }}>
          <CelText
            margin={"0 10 10 10"}
            align={"center"}
            weight="bold"
            type={"H2"}
          >
            Margin Call Warning!
          </CelText>
          <CelText
            weight={"300"}
            type={"H4"}
            align={"center"}
            margin={"0 20 0 20"}
          >
            The value of your collateral has dropped by 30%. To match the value
            with the current market prices, we will need to lock an additional
            <CelText
              margin={"0 10 10 10"}
              align={"center"}
              weight="bold"
              type={"H4"}
            >
              {loan && `${loan.margin_call_amount} ${loan.collateral_coin} `}
            </CelText>
            from your wallet balance. You can also transfer more funds or choose
            other coins from your wallet.
          </CelText>
          <CelButton
            size="small"
            basic
            margin={"20 0 20 0"}
            onPress={onPressUseOtherCoins}
          >
            Use other coins
          </CelButton>
        </View>

        <View style={style.buttonWrapper}>
          <CelModalButton
            margin={"20 0 20 0"}
            onPress={this.lockAdditionalCollateral}
          >
            {loan
              ? `Lock ${loan.margin_call_amount} ${loan.collateral_coin} `
              : "Lock 123 DAI"}
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default LoanAlertsMarginCallLockCoinModal;
