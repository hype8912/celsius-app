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
import STYLES from "../../../constants/STYLES";
import CircularProgressBar from "../../graphs/CircularProgressBar/CircularProgressBar";
import Badge from "../../atoms/Badge/Badge";

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

    await actions.navigateTo("VerifyProfile", {
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
    actions.setActiveLoan(loan.id);
    actions.openModal(MODALS.INTEREST_DUE_MODAL);
  };

  payPrincipal = async () => {
    const { actions, loan } = this.props;
    this.setState({ isLoading: true });
    await actions.navigateTo("VerifyProfile", {
      onSuccess: () => actions.payPrincipal(loan.id),
    });
    this.setState({ isLoading: false });
  };

  depositCoin = () => {
    const { actions, loan } = this.props;
    actions.navigateTo("Deposit", {
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

    return (
      <View
        style={[
          style.container,
          getMargins(this.getMarginForIndex(index, length)),
        ]}
      >
        <Card padding={"0 0 0 0"}>
          <View style={style.info}>
            <View style={style.status}>
              <Icon
                name={"TransactionLoan"}
                fill={loan.uiProps.color}
                width={"25"}
                height={"25"}
              />
              <CelText
                type={"H5"}
                color={getColor(loan.uiProps.color)}
                margin={"0 5 0 0"}
              >
                {loan.uiProps.displayText} #{loan.id}
              </CelText>
            </View>

            <CelText type={"H2"} weight={"600"} margin={"5 0 5 0"}>
              {loan.uiProps.displayAmount}
            </CelText>

            {loan.status === LOAN_STATUS.COMPLETED && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <CelText type={"H6"}>Loan Completed:</CelText>
                <CelText type={"H6"}>
                  {moment(loan.maturity_date).format("MMM DD, YYYY")}
                </CelText>
              </View>
            )}

            {[LOAN_STATUS.CANCELED].includes(loan.status) && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <CelText type={"H6"}>{"Request Canceled: "}</CelText>
                <CelText type={"H6"}>
                  {moment(loan.canceled_at).format("MMM DD, YYYY")}
                </CelText>
              </View>
            )}

            {[LOAN_STATUS.REFINANCED].includes(loan.status) &&
              loan.refinanced_at && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <CelText type={"H6"}>{"Loan Refinanced: "}</CelText>
                  <CelText type={"H6"}>
                    {moment(loan.refinanced_at).format("MMM DD, YYYY")}
                  </CelText>
                </View>
              )}

            {[LOAN_STATUS.APPROVED, LOAN_STATUS.ACTIVE].includes(
              loan.status
            ) && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <CelText type={"H6"}>Loan Approved: </CelText>
                <CelText type={"H6"}>
                  {moment(loan.approved_at).format("MMM DD, YYYY")}
                </CelText>
              </View>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <CelText type={"H6"}>Loan Requested: </CelText>
              <CelText type={"H6"}>
                {moment(loan.created_at).format("MMM DD, YYYY")}
              </CelText>
            </View>

            {loan.status === LOAN_STATUS.PENDING && (
              <Card color={style.card.color} margin={"30 0 0 0"}>
                <CelText type={"H7"}>
                  Someone from our team is already reviewing your request. You
                  will be notified when your request is approved.
                </CelText>
              </Card>
            )}
          </View>

          {loan.status === LOAN_STATUS.ACTIVE && loan.margin_call_activated && (
            <Card
              styles={{ alignSelf: "center" }}
              size={"twoThirds"}
              color={STYLES.COLORS.RED}
            >
              <CelText weight={"500"} type={"H5"} color={STYLES.COLORS.WHITE}>
                Margin Call Warning
              </CelText>
              <CelText
                weight={"300"}
                type={"H6"}
                color={STYLES.COLORS.WHITE}
                margin={"10 0 0 0"}
              >{`The value of your collateral has dropped significantly. To match the value with the current market prices, we will need to lock an additional ${formatter.crypto(
                loan.margin_call.margin_call_amount,
                loan.margin_call.collateral_coin
              )} from your wallet balance. You can also transfer more funds from your wallet.`}</CelText>
              {loan.margin_call && loan.margin_call.hasEnoughOriginalCoin && (
                <View>
                  <CelButton
                    onPress={this.lockMarginCollateral}
                    size={"small"}
                    margin={"10 0 10 0"}
                    textColor={STYLES.COLORS.RED}
                    basic
                    color={"red"}
                  >{`Approve ${loan.margin_call.collateral_coin} Lock`}</CelButton>
                </View>
              )}
              {loan.margin_call &&
                !loan.margin_call.hasEnoughOriginalCoin &&
                loan.margin_call.hasEnoughOtherCoins && (
                  <CelButton
                    onPress={this.depositCoin}
                    size={"small"}
                    textColor={STYLES.COLORS.WHITE}
                    ghost
                    color={"red"}
                  >
                    Transfer coins
                  </CelButton>
                )}
            </Card>
          )}

          {[LOAN_STATUS.ACTIVE, LOAN_STATUS.APPROVED].includes(loan.status) && (
            <View styles={{ flex: 1 }}>
              <Separator margin={"0 0 0 0"} />
              <View style={{ flexDirection: "row" }}>
                <View>
                  <View style={style.interests}>
                    <View style={[style.interest, { marginBottom: 8 }]}>
                      <CelText align={"center"} type={"H6"} weight={"300"}>
                        Monthly interest
                      </CelText>
                      <CelText align={"center"} type={"H3"} weight={"600"}>
                        {formatter.usd(loan.monthly_payment)}
                      </CelText>
                    </View>
                    <View style={style.interest}>
                      <CelText align={"center"} type={"H6"} weight={"300"}>
                        Total interest
                      </CelText>
                      <CelText align={"center"} type={"H3"} weight={"600"}>
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
              <Separator margin={"0 0 20 0"} />
              <View styles={{ flex: 1 }}>
                <Badge color={style.card.color} margin={"0 0 20 0"}>
                  <CelText type={"H7"} weight={"300"} align={"center"}>
                    -{formatter.percentageDisplay(celDiscount)} if paid in CEL
                  </CelText>
                </Badge>
              </View>
            </View>
          )}

          <Separator margin={"0 0 0 0"} />

          <View style={style.buttonContainer}>
            <CelButton
              onPress={() => navigateTo("LoanRequestDetails", { id: loan.id })}
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
                onPress={() => navigateTo("LoanSettings", { id: loan.id })}
                basic
                textSize={"H6"}
              >
                Loan Settings
              </CelButton>
            )}
          </View>

          {loan.can_pay_principal && (
            <View>
              <Separator margin={"0 0 0 0"} />
              <CelButton
                onPress={this.payPrincipal}
                margin={"15 0 15 0"}
                color="green"
                loading={isLoading}
                disabled={isLoading}
              >
                Payout Principal
              </CelButton>
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
            <CelText weight="500">
              Did you know you can prepay loan interest?
            </CelText>

            <CelText type="H6" style={{ opacity: 0.7 }}>
              Choose a period of six months or more to prepay your interest. You
              will get notified as soon as your interest payment is due again.
            </CelText>

            <CelButton
              basic
              textSize={"H6"}
              onPress={() =>
                navigateTo("ChoosePaymentMethod", {
                  id: loan.id,
                  reason: LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT,
                })
              }
            >
              Prepay interest
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
                    navigateTo("LoanPaymentHistory", { id: loan.id })
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
              <Separator margin="10 0 20 0" />
              <CelButton
                onPress={() => navigateTo("LoanPaymentList", { id: loan.id })}
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
