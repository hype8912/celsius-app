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
  state => ({
    loyaltyInfo: state.loyalty.loyaltyInfo,
    formData: state.forms.formData,
    walletSummary: state.wallet.summary,
    allLoans: state.loans.allLoans,
    currencyRates: state.currencies.currencyRatesShort,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ConfirmPrepaymentModal extends Component {
  static propTypes = {
    loanId: PropTypes.number,
    type: PropTypes.string,
  };
  static defaultProps = {
    type: "CRYPTO",
  };

  constructor(props) {
    super(props);
    const { loanId, allLoans } = props;
    this.state = {
      isLoading: false,
      loan: allLoans.find(l => l.id === loanId),
    };
  }

  renderContent = () => {
    const { actions, loanId } = this.props;
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
    const { type, formData, walletSummary, loyaltyInfo } = this.props;
    const { loan, isLoading } = this.state;
    const style = ConfirmPrepaymentModalStyle();

    const content = this.renderContent(type);
    if (!loan) return null;
    const walletCoin = walletSummary.coins.find(c => c.short === formData.coin);
    const amountUsd = walletCoin ? walletCoin.amount_usd : 0;
    const prepaymentAmount =
      Number(loan.monthly_payment) * Number(formData.prepaidPeriod);

    const sumToPay =
      formData.coin === "CEL"
        ? prepaymentAmount -
          (prepaymentAmount -
            (1 - loyaltyInfo.tier.loanInterestBonus) * prepaymentAmount)
        : prepaymentAmount;
    const cryptoAmountToPay = walletCoin
      ? (walletCoin.amount.toNumber() / walletCoin.amount_usd.toNumber()) *
        sumToPay
      : 0;

    const newBalanceCrypto =
      walletCoin && walletCoin.amount.minus(cryptoAmountToPay);
    const newBalanceUsd = amountUsd && amountUsd.minus(sumToPay);

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
              {formatter.crypto(cryptoAmountToPay, formData.coin)}
            </CelText>
            <CelText align={"center"}>
              {formatter.fiat(sumToPay, "USD")}
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
              newBalanceCrypto,
              formData.coin
            )} | ${formatter.fiat(newBalanceUsd, "USD")}`}</CelText>
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
