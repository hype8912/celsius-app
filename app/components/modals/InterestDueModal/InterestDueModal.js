import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { View } from "react-native";
import moment from "moment";

import * as appActions from "../../../redux/actions";
import formatter from "../../../utils/formatter";
import CelModal from "../CelModal/CelModal.js";
import {
  LOAN_ALERTS,
  LOAN_PAYMENT_REASONS,
  MODALS,
} from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import InterestDueModalStyle from "./InterestDueModal.styles";
import { SCREENS } from "../../../constants/SCREENS";
// import CelButton from "../../atoms/CelButton/CelButton";
import LoanCard from "../../molecules/LoanCard/LoanCard";
import Separator from "../../atoms/Separator/Separator";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { getColor } from "../../../utils/styles-util";

@connect(
  state => ({
    loanAlerts: state.loans.loanAlerts,
    allLoans: state.loans.allLoans,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class InterestDueModal extends Component {
  static propTypes = {
    navigateTo: PropTypes.func,
    closeModal: PropTypes.func,
    activeLoan: PropTypes.instanceOf(Object).required,
    alert: PropTypes.bool,
  };
  static defaultProps = {};

  proceedWithInterestPayment = multipleAlerts => {
    const { activeLoan, navigateTo } = this.props;
    if (multipleAlerts) {
      return navigateTo(SCREENS.INTEREST_PAYMENT_OVERVIEW);
    }
    return navigateTo(SCREENS.CHOOSE_PAYMENT_METHOD, {
      reason: LOAN_PAYMENT_REASONS.MANUAL_INTEREST,
      id: activeLoan.id,
    });
  };

  render() {
    const {
      activeLoan,
      closeModal,
      navigateTo,
      alert,
      allLoans,
      loanAlerts,
    } = this.props;
    let totalAmount;
    const style = InterestDueModalStyle();
    if (
      allLoans.length === 0 ||
      !activeLoan ||
      !activeLoan.installments_to_be_paid
    )
      return null;
    const instalmentsToBePaid = activeLoan.installments_to_be_paid;
    const modalName = alert
      ? MODALS.LOAN_ALERT_MODAL
      : MODALS.INTEREST_DUE_MODAL;
    const loansOverview = allLoans
      .filter(loan =>
        loanAlerts.find(
          loanAlert =>
            loanAlert.id === loan.id &&
            loanAlert.type === LOAN_ALERTS.INTEREST_ALERT
        )
      )
      .sort((a, b) => a.id - b.id);
    const multipleAlerts = loansOverview.length > 1;
    if (multipleAlerts)
      totalAmount = loansOverview.reduce((a, b) => {
        return Number(a) + Number(b.installments_to_be_paid.total);
      }, 0);
    const alignment = multipleAlerts ? "left" : "center";
    const margin = multipleAlerts ? { marginHorizontal: 20 } : {};

    return (
      <CelModal name={modalName}>
        <View style={margin}>
          <CelText type="H2" align={alignment} weight="bold">
            Interest Payment
          </CelText>

          {!multipleAlerts ? (
            <View>
              <CelText align="center" margin="10 0 10 0">
                Interest owed
                <CelText weight="bold">
                  {" "}
                  {formatter.usd(instalmentsToBePaid.total)}
                </CelText>
              </CelText>
            </View>
          ) : (
            <View>
              <CelText align="left" margin="10 0 10 0">
                {`Interest owed on ${loansOverview.length} active loans`}
                <CelText weight="bold"> {formatter.usd(totalAmount)}</CelText>
              </CelText>
            </View>
          )}

          {multipleAlerts &&
            loansOverview.map((loan, i) => {
              return (
                <View>
                  {i !== 0 && <Separator margin={"10 0 10 0"} />}
                  <CelText
                    type={"H6"}
                    color={getColor(COLOR_KEYS.HEADLINE)}
                  >{`Active Loan - #${loan.id}`}</CelText>
                  <CelText type={"H6"}>{`Interest Due: ${formatter.usd(
                    loan.installments_to_be_paid.total
                  )}`}</CelText>
                </View>
              );
            })}
        </View>

        {!multipleAlerts && (
          <View>
            <LoanCard
              backgroundColor={style.installmentsWrapper.backgroundColor}
              navigateTo={navigateTo}
              loan={activeLoan}
              closeModal={closeModal}
            />

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
              this.proceedWithInterestPayment(multipleAlerts);
              closeModal();
            }}
          >
            Pay Interest
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default InterestDueModal;
