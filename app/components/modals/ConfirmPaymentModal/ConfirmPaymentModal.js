import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View } from "react-native";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";

import ConfirmPaymentModalStyle from "./ConfirmPaymentModal.styles";
import { MODALS } from "../../../constants/UI";
import CelModal from "../CelModal/CelModal";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import CelText from "../../atoms/CelText/CelText";
import Separator from "../../atoms/Separator/Separator";
import formatter from "../../../utils/formatter";
import { LOAN_PAYMENT_TYPES, PAYMENT_TYPE } from "../../../constants/DATA";

@connect(
  state => ({
    loyaltyInfo: state.loyalty.loyaltyInfo,
    formData: state.forms.formData,
    walletSummary: state.wallet.summary,
    allLoans: state.loans.allLoans,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ConfirmPaymentModal extends Component {
  static propTypes = {
    loanId: PropTypes.number,
    coin: PropTypes.string,
    reason: PropTypes.string,
    type: PropTypes.string,
    paymentType: PropTypes.string,
  };
  static defaultProps = {
    type: PAYMENT_TYPE.CRYPTO,
    paymentType: LOAN_PAYMENT_TYPES.MONTHLY_INTEREST,
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
    const { actions, loanId, coin, formData, paymentType } = this.props;

    const crypto = coin || formData.coin;
    if (paymentType === LOAN_PAYMENT_TYPES.PRINCIPAL_PAYMENT) {
      return {
        heading: "Confirm Principal Payment",
        buttonText: "Pay Principal",
        onPress: async () => {
          this.setState({
            isLoading: true,
          });
          await actions.payPrincipal(loanId);
          this.setState({
            isLoading: false,
          });
          actions.closeModal();
        },
      };
    }
    return {
      heading: "Confirm Monthly Interest Payment",
      buttonText: "Pay Monthly Interest",
      onPress: async () => {
        this.setState({
          isLoading: true,
        });
        await actions.payMonthlyInterest(loanId, crypto);
        this.setState({
          isLoading: false,
        });
        actions.closeModal();
      },
    };
  };

  render() {
    const {
      coin,
      formData,
      walletSummary,
      loyaltyInfo,
      paymentType,
    } = this.props;
    const { loan, isLoading } = this.state;
    const style = ConfirmPaymentModalStyle();
    const content = this.renderContent();
    let sumToPay;
    let cryptoAmountToPay;
    if (!loan) return null;

    const crypto = coin || formData.coin;
    const walletCoin = walletSummary.coins.find(c => c.short === crypto);
    const amountUsd = walletCoin ? walletCoin.amount_usd : 0;
    if (paymentType === LOAN_PAYMENT_TYPES.MONTHLY_INTEREST) {
      sumToPay = coin
        ? loan.installments_to_be_paid.total -
          (loan.installments_to_be_paid.total -
            (1 - loyaltyInfo.tier.loanInterestBonus) *
              Number(loan.installments_to_be_paid.total))
        : loan.installments_to_be_paid.total;
      cryptoAmountToPay = walletCoin
        ? (walletCoin.amount.toNumber() / walletCoin.amount_usd.toNumber()) *
          sumToPay
        : 0;
    } else {
      sumToPay = loan.loan_amount_usd;
      cryptoAmountToPay = loan.loan_amount;
    }

    const newBalanceCrypto =
      walletCoin && walletCoin.amount.minus(cryptoAmountToPay);
    const newBalanceUsd = amountUsd && amountUsd.minus(sumToPay);

    return (
      <CelModal style={style.container} name={MODALS.CONFIRM_PAYMENT}>
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
              {formatter.crypto(cryptoAmountToPay, crypto)}
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
            >{`${formatter.crypto(newBalanceCrypto, crypto)} | ${formatter.fiat(
              newBalanceUsd,
              "USD"
            )}`}</CelText>
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

export default ConfirmPaymentModal;
