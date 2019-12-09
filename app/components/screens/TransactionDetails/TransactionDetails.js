import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import { Share } from "react-native";

import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import {
  BasicSection,
  StatusSection,
  InfoSection,
  AddressSection,
  NoteSection,
  InterestSection,
  LoanInfoSection,
  HodlInfoSection,
  CollateralSection,
  TransactionSection,
  SentTo,
  SentFrom,
  ReferrerHODL,
  Referrer,
  Referred,
  ReferrerPending,
  ReferredPending,
  Disclaimer,
  MarginCall,
  Liquidation,
  UnlockReason,
  HeadingCard,
  MarginCallCard,
  ChangePaymentCard,
  SsnInfo,
} from "./TransactionDetailsSections";
import CelButton from "../../atoms/CelButton/CelButton";
import STYLES from "../../../constants/STYLES";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import LoadingState from "../../atoms/LoadingState/LoadingState";
import formatter from "../../../utils/formatter";
import { hasPassedKYC } from "../../../utils/user-util";
import CollateralLoanCard from "../../molecules/CollateralLoanCard/CollateralLoanCard";
import PrepaymentSuccessfulModal from "../../modals/PrepaymentSuccessfulModal/PrepaymentSuccessfulModal";

@connect(
  state => ({
    coins: state.wallet.summary.coins,
    totalInterestEarned: state.wallet.summary.total_interest_earned,
    callsInProgress: state.api.callsInProgress,
    transaction: state.transactions.transactionDetails,
    user: state.user.profile,
    appSettings: state.user.appSettings,
    loyaltyInfo: state.user.loyaltyInfo,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TransactionDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    const hideBack = navigation.getParam("hideBack");
    const { params } = navigation.state;

    return {
      title: params && params.title ? params.title : "Transaction details",
      right: "profile",
      hideBack,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount = async () => {
    const { actions, navigation } = this.props;
    const transactionId = navigation.getParam("id");
    await actions.getTransactionDetails(transactionId);
  };

  componentDidUpdate(prevProps) {
    const { transaction, actions, user } = this.props;
    if (prevProps.transaction !== this.props.transaction) {
      const transactionProps = this.props.transaction.uiProps;
      this.props.navigation.setParams({
        title: transactionProps.title(
          this.props.transaction.coin.toUpperCase()
        ),
      });
      if (
        transaction &&
        !user.individual_referral_link &&
        transaction.type.includes("REFER")
      ) {
        actions.getBranchIndividualLink();
      }
    }
  }

  handleShareLink = async () => {
    const { user } = this.props;

    await Share.share({
      message: `Join Celsius Network using my referral code ${user.individual_referral_link &&
        user.individual_referral_link.split("/")[
          user.individual_referral_link.split("/").length - 1
        ]} when signing up and earn $10 in BTC with your first deposit of $200 or more! #UnbankYourself \n \n${
        user.individual_referral_link
      }`,
    });
  };

  renderSection = sectionType => {
    const {
      actions,
      transaction,
      user,
      totalInterestEarned,
      appSettings,
      loyaltyInfo,
      navigation,
    } = this.props;
    const transactionProps = transaction.uiProps;
    const kycPassed = user.kyc && hasPassedKYC();
    const transactionId = navigation.getParam("id");

    switch (sectionType) {
      case "info":
        return (
          <InfoSection
            margin="40 0 20 0"
            key={sectionType}
            transaction={transaction}
            transactionProps={transactionProps}
          />
        );
      case "date":
        return (
          <BasicSection
            key={sectionType}
            label="Date"
            value={moment(transaction.time).format("D MMM YYYY")}
          />
        );
      case "date:deposited":
        return (
          <BasicSection
            key={sectionType}
            label="Date deposited"
            value={moment(transaction.time).format("D MMM YYYY")}
          />
        );
      case "time":
        return (
          <BasicSection
            key={sectionType}
            label="Time"
            value={moment.utc(transaction.time).format("h:mm A (z)")}
          />
        );
      case "ref:pending":
        return (
          <BasicSection
            key={sectionType}
            label=""
            value={
              "Your award is yet to be confirmed. You will be able to see it in your wallet, soon."
            }
          />
        );
      case "status":
        return (
          <StatusSection
            key={sectionType}
            transactionProps={transactionProps}
          />
        );
      case "status:noSeparator":
        return (
          <StatusSection
            key={sectionType}
            transactionProps={transactionProps}
            noSeparator
          />
        );
      case "address:from":
        return (
          <AddressSection
            key={sectionType}
            transaction={transaction}
            address={transaction.from_address}
            text="Received from:"
          />
        );
      case "address:to":
        return (
          <AddressSection
            key={sectionType}
            transaction={transaction}
            address={transaction.to_address}
            text="Withdrawn to:"
          />
        );
      case "button:back":
        return kycPassed ? (
          <CelButton
            margin="12 0 80 0"
            key={sectionType}
            onPress={() => actions.navigateTo("BorrowLanding")}
            basic
          >
            Go back to Loan Overview
          </CelButton>
        ) : null;
      case "button:back:main":
        return kycPassed ? (
          <CelButton
            margin="12 0 10 0"
            key={sectionType}
            onPress={() => actions.navigateTo("WalletLanding")}
          >
            Go back to wallet
          </CelButton>
        ) : null;
      case "button:deposit":
        return (
          <CelButton
            margin="16 0 10 0"
            key={sectionType}
            onPress={() => actions.navigateTo("Deposit")}
          >
            Deposit coins
          </CelButton>
        );
      case "button:celpay:another":
        return kycPassed ? (
          <CelButton
            margin="30 0 0 0"
            key={sectionType}
            onPress={() => actions.navigateTo("CelPayChooseFriend")}
          >
            CelPay another friend
          </CelButton>
        ) : null;
      case "button:celpay:friend":
        return kycPassed ? (
          <CelButton
            margin="16 0 10 0"
            key={sectionType}
            onPress={() => actions.navigateTo("CelPayChooseFriend")}
          >
            CelPay a friend
          </CelButton>
        ) : null;
      case "button:cancel:withdrawal":
        return (
          <CelButton
            margin="16 0 80 0"
            textColor={STYLES.COLORS.RED}
            key={sectionType}
            onPress={() => actions.cancelWithdrawal(transactionId)}
            basic
          >
            Cancel withdrawal
          </CelButton>
        );
      case "button:cancel:celpay":
        return (
          <CelButton
            margin="12 0 10 0"
            textColor={STYLES.COLORS.RED}
            key={sectionType}
            onPress={() =>
              actions.cancelTransfer(transaction.transfer_data.hash)
            }
            basic
          >
            Cancel transaction
          </CelButton>
        );
      case "button:applyForLoan":
        return (
          <CelButton
            margin="12 0 10 0"
            key={sectionType}
            onPress={() => actions.navigateTo("BorrowChooseLoan")}
          >
            Apply for another loan
          </CelButton>
        );
      case "button:refer":
        return (
          <CelButton
            margin="12 0 10 0"
            key={sectionType}
            onPress={() => {
              this.handleShareLink();
            }}
          >
            Refer more friends
          </CelButton>
        );
      case "note":
        return (
          <NoteSection
            key={sectionType}
            text={transaction.transfer_data.message}
          />
        );
      case "interest":
        return (
          <InterestSection
            margin="20 0 20 0"
            key={sectionType}
            navigateTo={actions.navigateTo}
            interestEarned={totalInterestEarned}
            interestInCel={appSettings.interest_in_cel}
            setUserAppSettings={actions.setUserAppSettings}
            tier={loyaltyInfo.tier.title}
            interestBonus={loyaltyInfo.earn_interest_bonus}
          />
        );
      case "loan:rejected":
        return (
          <LoanInfoSection key={sectionType} navigateTo={actions.navigateTo} />
        );
      // TODO(sb): Value need to be changed
      case "loan:date":
        return (
          <BasicSection
            key={sectionType}
            label="Loan Initiation Date"
            value={transaction.loan_data.initiation_date}
          />
        );
      case "loan:amount":
        return (
          <BasicSection
            key={sectionType}
            label="Loan Amount"
            value={formatter.usd(transaction.loan_data.loan_amount)}
            noSeparator
          />
        );
      case "loan:collateral":
        return (
          <CollateralSection
            key={sectionType}
            dollarAmount={transaction.loan_data.loan_collateral_usd}
            coinAmount={transaction.loan_data.loan_collateral_crypto}
            coin={transaction.coin.toUpperCase()}
          />
        );
      case "loan:deadline":
        return (
          <BasicSection
            key={sectionType}
            label="Repayment Deadline"
            value={moment(transaction.loan_data.repayment_deadline).format(
              "MMMM DD, YYYY"
            )}
          />
        );
      case "loan:annualInterestRate":
        return (
          <BasicSection
            key={sectionType}
            label="Annual Interest Rate"
            value={`${transaction.loan_data.annual_interest_rate}%`}
          />
        );
      case "loan:monthlyInterest":
        return (
          <BasicSection
            key={sectionType}
            label="Monthly Interest"
            value={formatter.usd(
              transaction.loan_data.monthly_interest_payment
            )}
          />
        );
      case "loan:totalInterest":
        return (
          <BasicSection
            key={sectionType}
            label="Total Interest Payment"
            value={formatter.usd(transaction.loan_data.total_interest_payment)}
            noSeparator
          />
        );
      case "hodl:info":
        return (
          <HodlInfoSection
            margin="16 0 10 0"
            key={sectionType}
            date={moment.utc(transaction.time).format("h:mm A (z)")}
            amount="20"
            coin="ETH"
          />
        );
      case "type":
        return <BasicSection key={sectionType} label="Type" value="CelPay" />;
      case "transactionId":
        return (
          <TransactionSection
            key={sectionType}
            transaction={transaction}
            text="Transaction ID:"
            actions={actions}
          />
        );
      case "sentTo":
        return (
          <SentTo
            key={sectionType}
            transaction={transaction}
            text="Sent to:"
            actions={actions}
          />
        );
      case "sentFrom":
        return (
          <SentFrom
            key={sectionType}
            transaction={transaction}
            text="From:"
            actions={actions}
          />
        );
      case "referrerHODL":
        return (
          <ReferrerHODL
            key={sectionType}
            lockedValue={moment(transaction.time).format("D MMM YYYY")}
            transaction={transaction}
            text="Referral Details:"
            actions={actions}
          />
        );
      case "referrer":
        return (
          <Referrer
            key={sectionType}
            transaction={transaction}
            text="Referral Details:"
            actions={actions}
          />
        );
      case "referred":
        return (
          <Referred
            key={sectionType}
            transaction={transaction}
            text="Referral Details:"
            actions={actions}
          />
        );
      case "referrer:pending":
        return (
          <ReferrerPending
            key={sectionType}
            transaction={transaction}
            text="Referral Details:"
            actions={actions}
          />
        );
      case "referred:pending":
        return (
          <ReferredPending
            key={sectionType}
            transaction={transaction}
            text="Referral Details:"
            actions={actions}
          />
        );
      case "collateral:loan:card":
        return (
          <CollateralLoanCard
            key={sectionType}
            transaction={transaction}
            navigateTo={actions.navigateTo}
          />
        );
      case "disclaimer":
        return <Disclaimer key={sectionType} transaction={transaction} />;
      case "margin":
        return <MarginCall key={sectionType} transaction={transaction} />;
      case "liquidation":
        return <Liquidation key={sectionType} transaction={transaction} />;
      case "collateral:date:unlocked":
        return (
          <BasicSection
            key={sectionType}
            label="Date"
            value={moment(transaction.loan_data.unlocked_at).format(
              "D MMM YYYY"
            )}
          />
        );
      case "collateral:time:unlocked":
        return (
          <BasicSection
            key={sectionType}
            label="Time"
            value={moment(transaction.loan_data.unlocked_at).format("h:mm A")}
          />
        );
      case "collateral:unlock:reason":
        return <UnlockReason key={sectionType} transaction={transaction} />;
      case "collateral:date:liquidated":
        return (
          <BasicSection
            key={sectionType}
            label="Date"
            value={moment(transaction.loan_data.liquidated_at).format(
              "D MMM YYYY"
            )}
          />
        );
      case "collateral:time:liquidated":
        return (
          <BasicSection
            key={sectionType}
            label="Time"
            value={moment(transaction.loan_data.liquidated_at).format("h:mm A")}
          />
        );
      case "collateral:liquidation:reason":
        return (
          <HeadingCard
            key={sectionType}
            heading="Margin Call Liquidation"
            text="Your collateral will be liquidated due to the latest Margin Call outbreak."
          />
        );
      case "margin:call:card":
        return <MarginCallCard key={sectionType} />;
      case "change:payment:card":
        return (
          transaction.coin !== "cel" && (
            <ChangePaymentCard
              key={sectionType}
              heading={`You would have saved ${formatter.percentageDisplay(
                loyaltyInfo.tier.loanInterestBonus
              )} if you paid your interest in CEL. Please go to Loan Setting to change your payment method.`}
              text="Change payment"
              navigateTo={actions.navigateTo}
              loan={transaction.loan_data}
            />
          )
        );
      case "info:box":
        return <SsnInfo key={sectionType} navigateTo={actions.navigateTo} />;
      default:
        return null;
    }
  };

  render() {
    const { transaction, callsInProgress } = this.props;
    const loadingTransactionDetails = apiUtil.areCallsInProgress(
      [API.GET_TRANSACTION_DETAILS],
      callsInProgress
    );

    if (loadingTransactionDetails || !transaction)
      return (
        <RegularLayout padding="0 0 0 0">
          <LoadingState />
        </RegularLayout>
      );

    const sections = transaction.uiSections;
    return (
      <RegularLayout padding="0 0 0 0">
        {sections.map(this.renderSection)}
        <PrepaymentSuccessfulModal />
      </RegularLayout>
    );
  }
}

export default TransactionDetails;
