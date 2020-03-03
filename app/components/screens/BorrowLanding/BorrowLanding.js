import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TouchableOpacity, View } from "react-native";
import moment from "moment";

import formatter from "../../../utils/formatter";

import * as appActions from "../../../redux/actions";
import BorrowLandingStyle from "./BorrowLanding.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import STYLES from "../../../constants/STYLES";

import { EMPTY_STATES } from "../../../constants/UI";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import CelButton from "../../atoms/CelButton/CelButton";
import Card from "../../atoms/Card/Card";
import Icon from "../../atoms/Icon/Icon";
import BorrowCalculator from "../../organisms/BorrowCalculator/BorrowCalculator";
import { KYC_STATUSES, LOAN_STATUS } from "../../../constants/DATA";
import { hasPassedKYC } from "../../../utils/user-util";

@connect(
  state => ({
    user: state.user.profile,
    loanCompliance: state.compliance.loan,
    walletSummary: state.wallet.summary,
    allLoans: state.loans.allLoans,
    minimumLoanAmount: state.generalData.minimumLoanAmount,
    ltv: state.loans.ltvs,
    loan: state.compliance.loan,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BorrowLanding extends Component {

  static navigationOptions = () => ({
    title: "Borrow",
    right: "profile"
  });

  constructor(props) {
    super(props);
    const { walletSummary, loanCompliance, ltv } = this.props;

    const eligibleCoins = walletSummary.coins.filter(coinData => loanCompliance.coins.includes(coinData.short));

    this.state = {
      eligibleCoins,
      maxAmount: eligibleCoins.reduce((max, element) => element.amount_usd > max ? element.amount_usd : max, 0),
      isLoading: true
    };

    this.bestLtv = Math.max(...ltv.map(x => x.percent));
  }

  async componentDidMount() {
    const { actions, loanCompliance, minimumLoanAmount } = this.props;

    if (loanCompliance.allowed) {
      await actions.getAllLoans();
    }

    const { allLoans, user } = this.props;
    const { maxAmount } = this.state;

    this.setState({ isLoading: false });
    // If user has enough money for loan, and doesn't have any previous loans
    // and has passed kyc and is celsius member
    // redirect to BorrowEnterAmount screen
    if (
      maxAmount > minimumLoanAmount / this.bestLtv && (!allLoans || !allLoans.length) &&
      hasPassedKYC() && user.celsius_member
    ) {
      actions.navigateTo("BorrowEnterAmount");
    }
  }

  getLoanStatusDetails = (status) => {
    switch (status) {
      case LOAN_STATUS.ACTIVE:
      case LOAN_STATUS.APPROVED:
        return {
          color: STYLES.COLORS.CELSIUS_BLUE,
          displayText: "Loan active"
        };

      case LOAN_STATUS.PENDING:
        return {
          color: STYLES.COLORS.ORANGE,
          displayText: "Loan pending"
        };

      case LOAN_STATUS.COMPLETED:
        return {
          color: STYLES.COLORS.GREEN,
          displayText: "Loan payout"
        };

      case LOAN_STATUS.REJECTED:
        return {
          color: STYLES.COLORS.RED,
          displayText: "Loan rejected"
        };

      default:
        return {
          color: STYLES.COLORS.CELSIUS_BLUE,
          displayText: "Loan active"
        };
    }
  };

  applyForAnother = () => {
    const { maxAmount } = this.state;
    const { actions, minimumLoanAmount } = this.props;

    if (maxAmount < minimumLoanAmount / this.bestLtv) {
      actions.showMessage("warning", "Insufficient funds!");
    } else {
      actions.navigateTo("BorrowEnterAmount");
    }
  };

  render() {
    const { maxAmount, isLoading } = this.state;
    const { actions, user, kycStatus, loanCompliance, allLoans, minimumLoanAmount, ltv } = this.props;
    const style = BorrowLandingStyle();

    if (kycStatus && !hasPassedKYC()) return <BorrowCalculator
      purpose={EMPTY_STATES.NON_VERIFIED_BORROW}/>;
    if (!user.celsius_member) return <BorrowCalculator purpose={EMPTY_STATES.NON_MEMBER_BORROW}/>;
    if (!loanCompliance.allowed) return <BorrowCalculator purpose={EMPTY_STATES.COMPLIANCE}/>;

    if (isLoading) return <LoadingScreen/>;

    const minLtv = Math.max(...ltv.map(x => x.percent));

    if (maxAmount < minimumLoanAmount / minLtv) return <BorrowCalculator
      purpose={EMPTY_STATES.BORROW_NOT_ENOUGH_FUNDS}/>;

    return (
      <RegularLayout>
        <View>
          <CelButton margin='10 0 25 0' onPress={() => actions.navigateTo("BorrowEnterAmount")}>Apply for another
            loan</CelButton>
          {
            allLoans && allLoans.map(loan => {
              const loanStatusDetails = this.getLoanStatusDetails(loan.status);
              return (
                <Card key={loan.id}>
                  <CelText type='H6' weight='500' margin={"0 0 7 0"}>Your loans</CelText>
                  <TouchableOpacity style={{ alignItems: "center", flexDirection: "row", flex: 1 }}
                                    onPress={() => actions.navigateTo("TransactionDetails", { id: loan.transaction_id })}>
                    <View style={[style.iconWrapper, { backgroundColor: loanStatusDetails.color }]}>
                      <Icon name='TransactionLoan' height={25} width={25} fill={"#FFFFFF"}/>
                    </View>
                    <View style={style.info}>
                      <View style={{paddingRight: 0,}}>
                        <CelText type='H3' weight='600'>${loan.loan_amount}</CelText>
                        <CelText type='H6'
                                 weight='300'>{formatter.crypto(loan.amount_collateral_crypto, loan.coin, { precision: 2 })} LOCKED</CelText>
                      </View>
                      <View>
                        <CelText type='H6'
                                 weight='300'>{moment(loan.created_at).format("MMM DD, YYYY").toUpperCase()}</CelText>
                        <CelText color={loanStatusDetails.color}>{loanStatusDetails.displayText}</CelText>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Card>
              );
            })
          }
        </View>
      </RegularLayout>
    );
  }
}

export default BorrowLanding
