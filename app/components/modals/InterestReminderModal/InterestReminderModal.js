import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import moment from "moment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";

import InterestReminderModalStyle from "./InterestReminderModal.styles";
import { LOAN_PAYMENT_REASONS, MODALS } from "../../../constants/UI";
import CelModal from "../CelModal/CelModal";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import CelText from "../../atoms/CelText/CelText";
import formatter from "../../../utils/formatter";
import Separator from "../../atoms/Separator/Separator";
import AdditionalAmountCard from "../../molecules/AdditionalAmountCard/AdditionalAmountCard";
import loanPaymentUtil from "../../../utils/loanPayment-util";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    loanAlerts: state.loans.loanAlerts,
    loanSettings: state.loans.loanSettings,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class InterestReminderModal extends Component {
  static propTypes = {
    navigateTo: PropTypes.func,
    closeModal: PropTypes.func,
    activeLoan: PropTypes.instanceOf(Object).required,
    isSameDay: PropTypes.instanceOf(Object),
  };
  static defaultProps = {};

  handleRequest = (hasEnough, coin, additionalCrypto, additionalUsd) => {
    const { navigateTo, activeLoan, loanAlerts } = this.props;
    if (hasEnough) {
      if (loanAlerts.length > 1)
        return navigateTo(SCREENS.INTEREST_PAYMENT_OVERVIEW);

      return navigateTo(SCREENS.CHOOSE_PAYMENT_METHOD, {
        reason: LOAN_PAYMENT_REASONS.INTEREST,
        id: activeLoan.id,
      });
    }
    return navigateTo(SCREENS.DEPOSIT, {
      coin: coin.short,
      reason: LOAN_PAYMENT_REASONS.INTEREST,
      amountUsd: additionalUsd,
      additionalCryptoAmount: additionalCrypto,
    });
  };

  render() {
    const { activeLoan, closeModal, isSameDay, loanSettings } = this.props;
    const style = InterestReminderModalStyle();
    const payment = loanPaymentUtil.calculateAdditionalPayment(activeLoan);
    if (!activeLoan || !activeLoan.installments_to_be_paid) return null;
    const instalmentsToBePaid = activeLoan.installments_to_be_paid;
    const isDay = isSameDay.sevenDays || isSameDay.threeDays;
    const buttonTitle = payment.hasEnough ? "Pay Interest" : "Deposit More";
    const content = loanSettings.automatic_interest_payment
      ? `Automatic Interest Payment Due is in ${isDay} Days`
      : `Interest Payment Due is in ${isDay} Days`;

    return (
      <CelModal name={MODALS.LOAN_ALERT_MODAL}>
        <View style={{ marginHorizontal: 20 }}>
          <CelText type="H2" align="center" weight="bold">
            {content}
          </CelText>
          <CelText align={"center"} type={"H1"}>
            {formatter.crypto(payment.cryptoAmountToPay, payment.coin.short)}
          </CelText>
          <CelText align={"center"}>
            {formatter.fiat(activeLoan.monthly_payment, "USD")}
          </CelText>
          <Separator margin={"5 0 5 0"} />
        </View>

        {payment.hasEnough ? (
          <CelText weight={"400"} align={"center"} margin={"0 20 0 20"}>
            You can already make a payment. In case you would like to wait, make
            sure you have enough funds by the due date of interest payment.
          </CelText>
        ) : (
          <View>
            {instalmentsToBePaid.installments.length <= 1 && (
              <View>
                <CelText weight={"300"} align={"center"} margin={"5 20 5 20"}>
                  Make sure to have enough funds in your wallet by the payment
                  date
                </CelText>
              </View>
            )}
            <View style={{ alignSelf: "center" }}>
              <AdditionalAmountCard
                additionalCryptoAmount={payment.additionalCryptoAmount}
                additionalUsd={payment.additionalUsdAmount}
                coin={payment.coin.short}
                text={"additionally required"}
              />
            </View>
          </View>
        )}

        {instalmentsToBePaid.installments.length > 1 && (
          <View>
            <View
              style={{
                margin: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <CelText
                type={"H6"}
                color={getColor(COLOR_KEYS.HEADLINE)}
              >{`Active Loan - #${activeLoan.id}`}</CelText>
              <CelText type={"H6"}>{`Interest Owed: ${formatter.fiat(
                activeLoan.installments_to_be_paid.total,
                "USD"
              )}`}</CelText>
            </View>
            <View style={style.installmentsWrapper}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <CelText type="H7" weight="bold">
                  Payment Period
                </CelText>
                <CelText type="H7" weight="bold">
                  Monthly Interest
                </CelText>
              </View>

              {instalmentsToBePaid.installments.map(installment => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                  key={installment.from}
                >
                  <CelText weight="light">{`${moment(installment.from).format(
                    "D MMM"
                  )} - ${moment(installment.to).format("D MMM")}`}</CelText>
                  <CelText weight="light">
                    {formatter.usd(installment.amount)}
                  </CelText>
                </View>
              ))}
            </View>
          </View>
        )}

        <View
          style={{
            justifyContent: "flex-end",
            marginTop: 20,
            height: 50,
          }}
        >
          <CelModalButton
            onPress={() => {
              this.handleRequest(
                payment.hasEnough,
                payment.coin,
                payment.additionalCryptoAmount,
                payment.additionalUsdAmount
              );
              closeModal();
            }}
          >
            {buttonTitle}
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default InterestReminderModal;
