import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import PrincipalAlertModalStyle from "./PrincipalAlertModal.styles";
import CelModal from "../CelModal/CelModal.js";
import { MODALS } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import formatter from "../../../utils/formatter";

class PrincipalAlertModal extends Component {
  static propTypes = {
    loan: PropTypes.instanceOf(Object),
    actions: PropTypes.instanceOf(Object),
  };
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  payPrincipal = async loan => {
    const { actions } = this.props;
    this.setState({
      isLoading: true,
    });
    await actions.payPrincipal(loan.id);
    this.setState({
      isLoading: false,
    });
    actions.closeModal();
  };

  render() {
    const style = PrincipalAlertModalStyle();
    const { loan } = this.props;
    const { isLoading } = this.state;
    return (
      <CelModal style={style.container} name={MODALS.LOAN_ALERT_MODAL}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 20,
          }}
        >
          <CelText type={"H2"} align={"center"} weight={"700"}>
            Principal Payment Due is in 7 Days
          </CelText>
          <View>
            <CelText
              weight={"300"}
              align={"center"}
              margin={"20 0 0 0"}
              type={"H4"}
            >
              It is time for your final payment.
            </CelText>
            <CelText align={"center"} type={"H1"}>
              {formatter.crypto(loan.loan_amount, loan.coin_loan_asset)}
            </CelText>
            <CelText margin={"0 0 10 0"} align={"center"} type={"H3"}>
              {formatter.fiat(loan.loan_amount_usd, "USD")}
            </CelText>
            <CelText weight={"300"} align={"center"} type={"H4"}>
              Your loan maturity date is in 7 days, so make sure you payout your
              principal.
            </CelText>
          </View>
        </View>

        <View style={style.buttonsWrapper}>
          <CelModalButton
            buttonStyle={"green"}
            position={"single"}
            loading={isLoading}
            onPress={() => this.payPrincipal(loan)}
          >
            Pay principal
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default PrincipalAlertModal;
