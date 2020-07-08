import React, { Component } from "react";
import { View } from "react-native";
import moment from "moment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import LoanOverviewScreenStyle from "./LoanOverviewScreen.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import formatter from "../../../utils/formatter";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import { LOAN_PAYMENT_REASONS } from "../../../constants/UI";
import STYLES from "../../../constants/STYLES";
import Separator from "../../atoms/Separator/Separator";
import loanPaymentUtil from "../../../utils/loanPayment-util";
import AdditionalAmountCard from "../../molecules/AdditionalAmountCard/AdditionalAmountCard";

@connect(
  state => ({
    loanAlerts: state.loans.loanAlerts,
    allLoans: state.loans.allLoans,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class LoanOverviewScreen extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Overview",
    right: "profile",
  });

  render() {
    const style = LoanOverviewScreenStyle();
    const { actions, allLoans, loanAlerts } = this.props;

    const loansOverview = allLoans.filter(loan =>
      loanAlerts.find(alert => alert.id === loan.id)
    );

    return (
      <RegularLayout>
        {loansOverview.map(loan => {
          const payment = loanPaymentUtil.calculateAdditionalPayment(loan);
          return (
            <View
              style={{
                backgroundColor: "white",
                marginVertical: 10,
                borderTopRightRadius: 8,
                borderTopLeftRadius: 8,
              }}
            >
              <View style={{ margin: 10 }}>
                <CelText
                  color={STYLES.COLORS.CELSIUS_BLUE}
                >{`Active Loan - #${loan.id}`}</CelText>
                <Separator margin={"10 0 10 0"} />
                <CelText>{`Interest Owed: ${formatter.fiat(
                  loan.installments_to_be_paid.total,
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

                {loan.installments_to_be_paid.installments.map(installment => (
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

              {!payment.hasEnough && (
                <View style={{ alignSelf: "center" }}>
                  <AdditionalAmountCard
                    color={STYLES.COLORS.RED}
                    text={" additionally required"}
                    coin={payment.coin.short}
                    additionalUsd={payment.additionalUsdAmount}
                    additionalCryptoAmount={payment.additionalCryptoAmount}
                  />
                </View>
              )}

              <View
                style={{
                  justifyContent: "flex-end",
                  marginTop: 10,
                  height: 50,
                }}
              >
                <CelModalButton
                  onPress={() => {
                    actions.navigateTo("ChoosePaymentMethod", {
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

export default LoanOverviewScreen;
