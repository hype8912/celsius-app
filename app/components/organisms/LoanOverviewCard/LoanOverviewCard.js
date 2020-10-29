import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

import LoanOverviewCardStyle from "./LoanOverviewCard.styles";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import Separator from "../../atoms/Separator/Separator";
import CelButton from "../../atoms/CelButton/CelButton";
import Icon from "../../atoms/Icon/Icon";
import formatter from "../../../utils/formatter";
import {
  getColor,
  getMargins,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import { LOAN_STATUS } from "../../../constants/DATA";
import { LOAN_PAYMENT_REASONS, MODALS } from "../../../constants/UI";
import PaymentListItem from "../../atoms/PaymentListItem/PaymentListItem";
import CircularProgressBar from "../../graphs/CircularProgressBar/CircularProgressBar";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { SCREENS } from "../../../constants/SCREENS";

class LoanOverviewCard extends Component {
  static propTypes = {
    loan: PropTypes.instanceOf(Object),
    navigateTo: PropTypes.func.isRequired,
    index: PropTypes.number,
    actions: PropTypes.instanceOf(Object),
    length: PropTypes.number,
    celDiscount: PropTypes.string,
  };
  static defaultProps = {
    payed: false,
    loanSettings: false,
    index: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      table: [],
    };
  }

  getMarginForIndex(index, length) {
    if (index === 0) return `0 0 0 ${widthPercentageToDP("15%")}`;
    if (index === length) return `0 ${widthPercentageToDP("15%")} 0 0`;
    return `0 0 0 0`;
  }

  lockMarginCollateral = async () => {
    const { loan, actions } = this.props;

    await actions.navigateTo(SCREENS.VERIFY_PROFILE, {
      onSuccess: () =>
        actions.lockMarginCallCollateral(
          loan.id,
          loan.margin_call.collateral_coin
        ),
    });
  };

  openCancelModal = () => {
    const { actions, loan } = this.props;
    actions.updateFormField("loanId", loan.id);
    actions.openModal(MODALS.LOAN_CANCEL_MODAL);
  };

  payInterest = async () => {
    const { actions, loan } = this.props;
    await actions.setActiveLoan(loan.id);
    actions.navigateTo(SCREENS.CHOOSE_PAYMENT_METHOD, {
      reason: LOAN_PAYMENT_REASONS.MANUAL_INTEREST,
      id: loan.id,
    });
  };

  depositCoin = () => {
    const { actions, loan } = this.props;
    actions.navigateTo(SCREENS.DEPOSIT, {
      coin: loan.margin_call.collateral_coin,
      loan,
      isMarginWarning: true,
    });
  };

  render() {
    const { loan, navigateTo, index, length, celDiscount } = this.props;
    const { isLoading } = this.state;
    const style = LoanOverviewCardStyle();
    let previousPayments;
    let previous5Payments;

    if (loan.amortization_table) {
      previousPayments = loan.amortization_table.filter(p => p.isPaid);
      previous5Payments = previousPayments.slice(-5);
    }

    const canExtend = loan.installments_to_be_paid && loan.installments_to_be_paid.total && Number(loan.installments_to_be_paid.total) === 0;

    const discountedInterest = (1 - celDiscount) * loan.monthly_payment;
    const savedAmount = loan.monthly_payment - discountedInterest;

    return (
      <View
        style={[
          style.container,
          getMargins(this.getMarginForIndex(index, length)),
        ]}
      >
        <Card padding={"0 0 0 0"}>
          {loan.can_pay_principal &&
            <View>
              <View style={{flexDirection: "row",justifyContent: "space-around", alignItems: "center", marginVertical: 10, marginHorizontal: 20 }}>
                <View style={{marginRight: 25}}>
                  <Icon
                    width={widthPercentageToDP("7%")}
                    height={widthPercentageToDP("7%")}
                    name={"CheckCircle"}
                    fill={COLOR_KEYS.POSITIVE_STATE}
                  />
                </View>
                <CelText weight={"600"}>You have completed all of your interest payments</CelText>
              </View>
              <Separator />
            </View>
          }
          {loan && loan.uiProps && (
            <View style={style.loanTitle}>
              <View style={style.status}>
                <Icon
                  name={"TransactionLoan"}
                  fill={getColor(loan.uiProps.color)}
                  width={"25"}
                  height={"25"}
                />
                <CelText
                  type={"H5"}
                  color={getColor(loan.uiProps.color)}
                  margin={"0 5 0 0"}
                >
                  {loan.uiProps.displayText}
                </CelText>
              </View>

              <CelText hideFromRecording type={"H2"} weight={"600"} margin={"0 0 5 0"}>
                {loan.uiProps.displayAmount}
              </CelText>
            </View>
          )}

          <Separator />

          {[LOAN_STATUS.APPROVED, LOAN_STATUS.ACTIVE].includes(loan.status) && (
            <View>
              <View style={style.loanInfo}>
                <CelText type={"H6"} margin={"10 5 10 0"}>
                  Loan ID:
                </CelText>
                <CelText type={"H6"} margin={"10 0 10 0"}>
                  #{loan.id}
                </CelText>
              </View>
              <Separator />
            </View>
          )}

          {loan.status === LOAN_STATUS.COMPLETED && (
            <View style={style.loanInfo}>
              <CelText margin={"10 0 0 0"} type={"H6"}>
                Loan Completed:
              </CelText>
              <CelText margin={"10 0 0 0"} type={"H6"}>
                {moment(loan.maturity_date).format("MMM DD, YYYY")}
              </CelText>
            </View>
          )}

          {[LOAN_STATUS.CANCELED].includes(loan.status) && (
            <View style={style.loanInfo}>
              <CelText margin={"10 0 0 0"} type={"H6"}>
                {"Request Canceled: "}
              </CelText>
              <CelText margin={"10 0 0 0"} type={"H6"}>
                {moment(loan.canceled_at).format("MMM DD, YYYY")}
              </CelText>
            </View>
          )}

          {[LOAN_STATUS.REFINANCED].includes(loan.status) &&
            loan.refinanced_at && (
              <View style={style.loanInfo}>
                <CelText type={"H6"}>{"Loan Refinanced: "}</CelText>
                <CelText type={"H6"}>
                  {moment(loan.refinanced_at).format("MMM DD, YYYY")}
                </CelText>
              </View>
            )}

          {[LOAN_STATUS.APPROVED, LOAN_STATUS.ACTIVE].includes(loan.status) && (
            <View style={style.loanInfoAdditional}>
              <CelText type={"H6"}>Loan Originated: </CelText>
              <CelText type={"H6"}>
                {moment(loan.approved_at).format("MMM DD, YYYY")}
              </CelText>
            </View>
          )}

          {[LOAN_STATUS.APPROVED, LOAN_STATUS.ACTIVE].includes(loan.status) && (
            <View>
              <View style={style.loanInfoAdditional}>
                <CelText type={"H6"}>Loan Maturity: </CelText>
                <CelText margin={"0 0 10 0"} type={"H6"}>
                  {moment(loan.maturity_date).format("MMM DD, YYYY")}
                </CelText>
              </View>
              <Separator margin={"0 0 0 0"} />
            </View>
          )}

          {loan.status === LOAN_STATUS.PENDING && (
            <Card
              size={"twoThirds"}
              color={getColor(COLOR_KEYS.BACKGROUND)}
              margin={"20 20 0 20"}
            >
              <CelText type={"H7"}>
                Someone from our team is already reviewing your request. You
                will be notified when your request is approved.
              </CelText>
            </Card>
          )}

          {loan.status === LOAN_STATUS.ACTIVE && loan.margin_call_activated && (
            <Card
              styles={{ alignSelf: "center" }}
              size={"twoThirds"}
              color={getColor(COLOR_KEYS.NEGATIVE_STATE)}
            >
              <CelText
                weight={"500"}
                type={"H5"}
                color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
              >
                Margin Call Warning
              </CelText>
              <CelText
                margin={"5 0 5 0"}
                weight={"300"}
                type={"H5"}
                color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
              >
                {`LTV: ${Math.round(loan.current_ltv)}%`}
              </CelText>
              <CelButton
                size={"small"}
                basic
                color={"red"}
                onPress={() =>
                  navigateTo("SingleMarginCallScreen", { id: loan.id })
                }
              >
                Respond to Margin Call
              </CelButton>
            </Card>
          )}

          {[LOAN_STATUS.APPROVED, LOAN_STATUS.ACTIVE].includes(loan.status) && (
            <View>
              <View style={style.loanInfoAdditional}>
                <CelText type={"H6"}>Current LTV: </CelText>
                <CelText type={"H6"}>{`${Math.round(
                  loan.current_ltv
                )}%`}</CelText>
              </View>

              <View style={style.loanInfoAdditional}>
                <CelText type={"H6"}>Contract LTV: </CelText>
                <CelText margin={"0 0 10 0"} type={"H6"}>
                  {`${formatter.percentage(loan.ltv)}%`}
                </CelText>
              </View>
            </View>
          )}

          {[LOAN_STATUS.ACTIVE, LOAN_STATUS.APPROVED].includes(loan.status) && (
            <View>
              <Separator margin={"0 0 0 0"} />
              <View style={{ flexDirection: "row" }}>
                <View>
                  <View style={style.interests}>
                    <View
                      style={[style.interest, style.additionalInterestStyle]}
                    >
                      <CelText type={"H6"} weight={"300"}>
                        Monthly interest
                      </CelText>
                      <CelText hideFromRecording type={"H3"} weight={"600"}>
                        {formatter.usd(loan.monthly_payment)}
                      </CelText>
                    </View>
                    <View style={style.interest}>
                      <CelText type={"H6"} weight={"300"}>
                        Total interest
                      </CelText>
                      <CelText hideFromRecording type={"H3"} weight={"600"}>
                        {formatter.usd(loan.total_interest)}
                      </CelText>
                    </View>
                  </View>
                </View>

                <View style={style.progress}>
                  <CircularProgressBar
                    amountLoaned={Number(loan.total_interest)}
                    amountPaid={Number(loan.total_interest_paid)}
                  />
                </View>
              </View>
              <View>
                <Card
                  color={getColor(COLOR_KEYS.BACKGROUND)}
                  padding={"5 5 5 5"}
                  size={"twoThirds"}
                  styles={{ alignSelf: "center" }}
                >
                  <CelText hideFromRecording margin={"5 5 5 5"} type={"H6"} weight={"300"}>
                    {`You could have saved ${formatter.fiat(
                      savedAmount,
                      "USD"
                    )} if you paid interest in CEL.`}
                  </CelText>
                  <CelText
                    onPress={() =>
                      navigateTo(SCREENS.CHOOSE_PAYMENT_METHOD, {
                        id: loan.id,
                        reason: LOAN_PAYMENT_REASONS.INTEREST_SETTINGS,
                      })
                    }
                    margin={"5 5 5 5"}
                    type={"H6"}
                    weight={"400"}
                    color={getColor(COLOR_KEYS.PRIMARY_BUTTON)}
                  >
                    Change payment type
                  </CelText>
                </Card>
              </View>
            </View>
          )}

          <View style={style.buttonContainer}>
            <CelButton
              onPress={() =>
                navigateTo(SCREENS.LOAN_REQUEST_DETAILS, { id: loan.id })
              }
              basic
              textSize={"H6"}
            >
              Loan Details
            </CelButton>

            {[LOAN_STATUS.ACTIVE, LOAN_STATUS.APPROVED].includes(
              loan.status
            ) && <Separator vertical />}

            {[LOAN_STATUS.ACTIVE, LOAN_STATUS.APPROVED].includes(
              loan.status
            ) && (
              <CelButton
                onPress={() =>
                  navigateTo(SCREENS.LOAN_SETTINGS, { id: loan.id })
                }
                basic
                textSize={"H6"}
              >
                Loan Settings
              </CelButton>
            )}
          </View>

          {loan.status === LOAN_STATUS.ACTIVE && canExtend &&
          <View style={{margin: 10}}>
            <CelButton
              margin={"10 0 0 0"}
              size={"small"}
              color={"green"}
              onPress={() =>
                navigateTo(SCREENS.EXTEND_LOAN, {
                  id: loan.id,
                })
              }
            >
              Extend the Loan
            </CelButton>
          </View>
          }

           {loan.can_pay_principal && (
            <View style={{margin: 10}}>
              {/* <CelButton*/}
              {/*  margin={"10 0 0 0"}*/}
              {/*  size={"small"}*/}
              {/*  ghost*/}
              {/*  color={"green"}*/}
              {/*  onPress={this.payPrincipal}*/}
              {/*  loading={isLoading}*/}
              {/*  disabled={isLoading}*/}
              {/* >*/}
              {/*  Close Loan*/}
              {/* </CelButton>*/}
            </View>
           )}

          {loan.can_pay_interest && (
            <View>
              <Separator margin={"0 0 0 0"} />
              <CelButton
                onPress={this.payInterest}
                margin={"15 0 15 0"}
                loading={isLoading}
                disabled={isLoading}
              >
                Pay Monthly Interest
              </CelButton>
            </View>
          )}
        </Card>

        {loan.status === LOAN_STATUS.PENDING && (
          <CelButton
            margin="15 0 15 0"
            onPress={this.openCancelModal}
            color="red"
          >
            Cancel Loan
          </CelButton>
        )}

        {loan.canPrepayInterest && (
          <Card close>
            <CelText margin={"20 0 5 0"} weight="500">
              Did you know you can prepay loan interest?
            </CelText>

            <CelText type="H6" style={style.choose}>
              Choose a period of six months or more to prepay your interest. You
              will get notified as soon as your interest payment is due again.
            </CelText>

            <CelButton
              basic
              textSize={"H6"}
              margin="10 0 0 0"
              onPress={() =>
                navigateTo(SCREENS.CHOOSE_PAYMENT_METHOD, {
                  id: loan.id,
                  reason: LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT,
                })
              }
            >
              Prepay interest >
            </CelButton>
          </Card>
        )}

        {[
          LOAN_STATUS.ACTIVE,
          LOAN_STATUS.APPROVED,
          LOAN_STATUS.COMPLETED,
        ].includes(loan.status) &&
          previousPayments &&
          !!previousPayments.length && (
            <View>
              <CelText>Payment History</CelText>

              {previous5Payments.reverse().map((p, i) => (
                <PaymentListItem key={`${p.dueDate}${i}`} payment={p} />
              ))}

              {previousPayments.length > 5 && (
                <CelButton
                  margin={"10 0 0 0"}
                  basic
                  onPress={() =>
                    navigateTo(SCREENS.LOAN_PAYMENT_HISTORY, { id: loan.id })
                  }
                >
                  See all
                </CelButton>
              )}
            </View>
          )}

        {[LOAN_STATUS.ACTIVE, LOAN_STATUS.APPROVED].includes(loan.status) &&
          (!loan.hasInterestPaymentFinished || !loan.isPrincipalPaid) && (
            <View>
              <CelButton
                margin={"10 0 20 0"}
                onPress={() =>
                  navigateTo(SCREENS.LOAN_PAYMENT_LIST, { id: loan.id })
                }
              >
                Upcoming Payments
              </CelButton>
            </View>
          )}
      </View>
    );
  }
}

export default LoanOverviewCard;
