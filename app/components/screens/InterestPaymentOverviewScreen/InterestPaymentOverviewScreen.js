import React, { Component } from "react";
import { View } from "react-native";
import moment from "moment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import InterestPaymentOverviewScreenStyle from "./InterestPaymentOverviewScreen.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import formatter from "../../../utils/formatter";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import { LOAN_ALERTS, LOAN_PAYMENT_REASONS } from "../../../constants/UI";
import Separator from "../../atoms/Separator/Separator";
import loanPaymentUtil from "../../../utils/loanPayment-util";
import AdditionalAmountCard from "../../molecules/AdditionalAmountCard/AdditionalAmountCard";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    loanAlerts: state.loans.loanAlerts,
    allLoans: state.loans.allLoans,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class InterestPaymentOverviewScreen extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Overview",
    right: "profile",
  });

  render() {
    const style = InterestPaymentOverviewScreenStyle();
    const { actions, allLoans, loanAlerts } = this.props;

    const loansOverview = allLoans
      .filter(loan =>
        loanAlerts.find(
          alert =>
            alert.id === loan.id && alert.type === LOAN_ALERTS.INTEREST_ALERT
        )
      )
      .sort((a, b) => a.id - b.id);

    return (
      <RegularLayout>
        {loansOverview.map(loan => {
          const payment = loanPaymentUtil.calculateAdditionalPayment(loan);
          return (
            <View style={style.wrapper}>
              <View style={style.active}>
                <CelText>{`Active Loan - #${loan.id}`}</CelText>
                <Separator margin={"10 0 10 0"} />
                <CelText>{`Interest Owed: ${formatter.fiat(
                  loan.installments_to_be_paid.total,
                  "USD"
                )}`}</CelText>
              </View>

              <View style={style.installmentsWrapper}>
                <View style={style.period}>
                  <CelText type="H7" weight="bold">
                    Payment Period
                  </CelText>
                  <CelText type="H7" weight="bold">
                    Monthly Interest
                  </CelText>
                </View>

                {loan.installments_to_be_paid.installments.map(installment => (
                  <View style={style.period} key={installment.from}>
                    <CelText weight="light">{`${moment(installment.from).format(
                      "D MMM"
                    )} - ${moment(installment.to).format("D MMM")}`}</CelText>
                    <CelText weight="light">
                      {formatter.usd(installment.amount)}
                    </CelText>
                  </View>
                ))}
              </View>

              {!payment.hasEnough && (
                <View style={{ marginHorizontal: 10 }}>
                  <AdditionalAmountCard
                    margin={"0 0 10 0"}
                    color={COLOR_KEYS.NEGATIVE_STATE}
                    text={" additionally required"}
                    coin={payment.coin.short}
                    additionalUsd={payment.additionalUsdAmount}
                    additionalCryptoAmount={payment.additionalCryptoAmount}
                  />
                </View>
              )}

              <View style={style.buttonWrapper}>
                <CelModalButton
                  onPress={() => {
                    actions.navigateTo(SCREENS.CHOOSE_PAYMENT_METHOD, {
                      reason: LOAN_PAYMENT_REASONS.MANUAL_INTEREST,
                      id: loan.id,
                    });
                    actions.closeModal();
                  }}
                >
                  Pay Interest
                </CelModalButton>
              </View>
            </View>
          );
        })}
      </RegularLayout>
    );
  }
}

export default InterestPaymentOverviewScreen;
