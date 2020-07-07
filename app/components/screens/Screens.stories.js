import { storiesOf } from "@storybook/react-native/dist";

import WalletLandingStories from "./WalletLanding/WalletLanding.stories";
import VerifyProfileStories from "./VerifyProfile/VerifyProfile.stories";
import CoinDetailsStories from "./CoinDetails/CoinDetails.stories";
import WelcomeStories from "./Welcome/Welcome.stories";
import DepositStories from "./Deposit/Deposit.stories";
import ProfileStories from "./Profile/Profile.stories";
import LoginStories from "./Login/Login.stories";
import SelectCoinStories from "./SelectCoin/SelectCoin.stories";
import LoginLandingStories from "./LoginLanding/LoginLanding.stories";
import GetCoinsLandingStories from "./GetCoinsLanding/GetCoinsLanding.stories";
import WithdrawEnterAmountStories from "./WithdrawEnterAmount/WithdrawEnterAmount.stories";
import MyCelStories from "./MyCel/MyCel.stories";
import TransactionsIntersectionStories from "./TransactionsIntersection/TransactionsIntersection.stories";
import InterestRatesStories from "./InterestRates/InterestRates.stories";
import WalletInterestStories from "./WalletInterest/WalletInterest.stories";
import GetCoinsEnterAmountStories from "./GetCoinsEnterAmount/GetCoinsEnterAmount.stories";
import AllTransactionsStories from "./AllTransactions/AllTransactions.stories";

import RegisterInitialStories from "./RegisterInitial/RegisterInitial.stories";
import RegisterSetPinStories from "./RegisterSetPin/RegisterSetPin.stories";
import BalanceHistoryStories from "./BalanceHistory/BalanceHistory.stories";
import CommunityStories from "./Community/Community.stories";
import KYCProfileDetailsStories from "./KYCProfileDetails/KYCProfileDetails.stories";
import KYCAddressInfoStories from "./KYCAddressInfo/KYCAddressInfo.stories";

// Link to screens spreadsheet
// https://docs.google.com/spreadsheets/d/17kUJoGJvZJlHQcAi62mVN6Td2tBXAZ2acly_VmeUse0/edit#gid=0

storiesOf("WalletLanding", module)
  .add("Grid", WalletLandingStories.grid)
  .add("List", WalletLandingStories.list)
  .add("Not Verified", WalletLandingStories.notVerified)
  .add("Pending Verification", WalletLandingStories.pendingVerification)
  .add("KYC Rejeceted", WalletLandingStories.rejeceted)
  .add("Loan & Referral Banner", WalletLandingStories.loanReferralBanner)
  .add("No SSN", WalletLandingStories.noSSN)
  .add("No Address", WalletLandingStories.noAddress);

storiesOf("VerifyProfile", module)
  .add("PIN", VerifyProfileStories.pin)
  .add("2FA", VerifyProfileStories.twoFA);

storiesOf("CoinDetails", module)
  .add("BTC", CoinDetailsStories.btc)
  .add("OMG", CoinDetailsStories.omg);

storiesOf("Welcome", module).add("Regular", WelcomeStories.regular);

storiesOf("Deposit", module)
  .add("Loading", DepositStories.btc)
  .add("Alternate address - BCH", DepositStories.bch)
  .add("ETH", DepositStories.eth)
  .add("With Loyalty - CEL", DepositStories.cel)
  .add("With Tag - XRP", DepositStories.xrp)
  .add("With Memo ID - XLM", DepositStories.xlm);

storiesOf("Profile", module)
  .add("Regular", ProfileStories.regular)
  .add("Not Verified", ProfileStories.notVerified)
  .add("Pending Verification", ProfileStories.pendingVerification)
  .add("Rejeceted", ProfileStories.rejeceted);

storiesOf("Login", module).add("Regular", LoginStories.regular);

storiesOf("SelectCoin", module)
  .add("Crypto", SelectCoinStories.crypto)
  .add("Fiat", SelectCoinStories.fiat);

storiesOf("LoginLanding", module)
  .add("Login", LoginLandingStories.login)
  .add("Register", LoginLandingStories.register);

storiesOf("GetCoinsLanding", module)
  .add("No Transactions", GetCoinsLandingStories.noTransactions)
  .add("Not Compliant", GetCoinsLandingStories.notCompliant)
  .add("Pending Verification", GetCoinsLandingStories.pendingVerification)
  .add("Not Verified", GetCoinsLandingStories.notVerified);

storiesOf("WithdrawEnterAmount", module)
  .add("Regular", WithdrawEnterAmountStories.regular)
  .add("Locked Address", WithdrawEnterAmountStories.lockedAddress)
  .add("Without Amount", WithdrawEnterAmountStories.withoutAmount)
  .add("Not Compliant", WithdrawEnterAmountStories.notCompliant)
  .add("Pending Verification", WithdrawEnterAmountStories.pendingVerification)
  .add("Not Verified", WithdrawEnterAmountStories.notVerified)
  .add("HODL Mode Activated", WithdrawEnterAmountStories.hodlModeActive);

storiesOf("MyCel", module)
  .add("None", MyCelStories.none)
  .add("Silver", MyCelStories.silver)
  .add("Gold", MyCelStories.gold)
  .add("Platinum", MyCelStories.platinum)
  .add("Overview", MyCelStories.overview)
  .add("Interest", MyCelStories.interest)
  .add("Loans", MyCelStories.loans);

storiesOf("TransactionsIntersection", module)
  .add("Deposit Pending", TransactionsIntersectionStories.depositPending)
  .add("Deposit Confirmed", TransactionsIntersectionStories.depositConfirmed)
  .add("Withdrawal Pending", TransactionsIntersectionStories.withdrawalPending)
  .add(
    "Withdrawal Confirmed",
    TransactionsIntersectionStories.withdrawalConfirmed
  )
  .add(
    "Withdrawal Canceled",
    TransactionsIntersectionStories.withdrawalCanceled
  )
  .add(
    "Withdrawal Pending Verification",
    TransactionsIntersectionStories.withdrawalPendingVerification
  )
  .add(
    "Withdrawal Pending Review",
    TransactionsIntersectionStories.withdrawalPendingReview
  )
  .add("Loan Interest", TransactionsIntersectionStories.loanInterest)
  .add(
    "Loan Principal Received",
    TransactionsIntersectionStories.loanPrincipalReceived
  )
  .add("Interest", TransactionsIntersectionStories.interest)
  .add("Bonus Token", TransactionsIntersectionStories.bonusToken)
  .add("CelPay Claimed", TransactionsIntersectionStories.celpayClaimed)
  .add("CelPay Sent", TransactionsIntersectionStories.celpaySent)
  .add("CelPay Received", TransactionsIntersectionStories.celpayReceived)
  .add("CelPay Returned", TransactionsIntersectionStories.celpayReturned)
  .add("CelPay Canceled", TransactionsIntersectionStories.celpayCanceled)
  .add("Collateral Pending", TransactionsIntersectionStories.collateralPending)
  .add("Collateral Locked", TransactionsIntersectionStories.collateralLocked)
  .add(
    "Collateral Unlocked",
    TransactionsIntersectionStories.collateralUnlocked
  )
  .add("Promo Code Bonus", TransactionsIntersectionStories.promoCodeBonus)
  .add("Referred HODL", TransactionsIntersectionStories.referredHodl)
  .add("Referred Pending", TransactionsIntersectionStories.referredPending)
  .add("Referrer HODL", TransactionsIntersectionStories.referrerHodl)
  .add("Referrer", TransactionsIntersectionStories.referrer)
  .add("Referrer Pending", TransactionsIntersectionStories.referrerPending)
  .add("Canceled", TransactionsIntersectionStories.canceled);

storiesOf("InterestRates", module).add("Regular", InterestRatesStories.regular);

storiesOf("WalletInterest", module)
  .add("Regular", WalletInterestStories.regular)
  .add("Non Compliant", WalletInterestStories.nonCompliant);

storiesOf("GetCoinsEnterAmount", module)
  .add("With Amount", GetCoinsEnterAmountStories.regular)
  .add("Out of Range", GetCoinsEnterAmountStories.notInRange)
  .add("No Amount", GetCoinsEnterAmountStories.withoutAmount)
  .add("In Fiat", GetCoinsEnterAmountStories.inFiat);

storiesOf("AllTransactions", module)
  .add("Regular", AllTransactionsStories.regular)
  .add("Non Transactions", AllTransactionsStories.noTransactions);

storiesOf("Community", module).add("Regular", CommunityStories.regular);

storiesOf("BalanceHistory", module).add(
  "Regular",
  BalanceHistoryStories.regular
);

storiesOf("RegisterInitial", module)
  .add("Empty", RegisterInitialStories.empty)
  .add("Filled", RegisterInitialStories.filled)
  .add("With Errors", RegisterInitialStories.withErrors)
  .add("With Referral", RegisterInitialStories.withReferral);

storiesOf("RegisterSetPin", module)
  .add("Create PIN", RegisterSetPinStories.createPin)
  .add("Confirm PIN", RegisterSetPinStories.confirmPin);

storiesOf("KYCProfileDetails", module)
  .add("Empty", KYCProfileDetailsStories.empty)
  .add("Prefilled", KYCProfileDetailsStories.prefilled)
  .add("With Errors", KYCProfileDetailsStories.withErrors);

storiesOf("KYCAddressInfo", module).add(
  "Address Info",
  KYCAddressInfoStories.regular
);
