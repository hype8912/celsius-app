import { storiesOf } from "@storybook/react-native/dist";
import WelcomeStories from "./Welcome/Welcome.stories";
import DepositStories from "./Deposit/Deposit.stories";
import LoginStories from "./Login/Login.stories";
import RegisterInitialStories from "./RegisterInitial/RegisterInitial.stories";
import RegisterSetPinStories from "./RegisterSetPin/RegisterSetPin.stories";
import InterestRatesStories from "./InterestRates/InterestRates.stories";
import SelectCoinStories from "./SelectCoin/SelectCoin.stories";
import WalletLandingStories from "./WalletLanding/WalletLanding.stories";
import CoinDetailsStories from "./CoinDetails/CoinDetails.stories";
import LoginLandingStories from "./LoginLanding/LoginLanding.stories";
import BalanceHistoryStories from "./BalanceHistory/BalanceHistory.stories";
import WalletInterestStories from "./WalletInterest/WalletInterest.stories";
import AllTransactionsStories from "./AllTransactions/AllTransactions.stories";
import TransactionsIntersectionStories from "./TransactionsIntersection/TransactionsIntersection.stories";
import CommunityStories from "./Community/Community.stories";
import MyCelStories from "./MyCel/MyCel.stories";
import ProfileStories from "./Profile/Profile.stories";

storiesOf("WalletLanding", module)
  .add("Grid", WalletLandingStories.grid)
  .add("List", WalletLandingStories.list);

storiesOf("Profile", module).add("Regular", ProfileStories.regular);

storiesOf("MyCel", module)
  .add("None", MyCelStories.none)
  .add("Silver", MyCelStories.silver)
  .add("Gold", MyCelStories.gold)
  .add("Platinum", MyCelStories.platinum)
  .add("Overview", MyCelStories.overview)
  .add("Interest", MyCelStories.interest)
  .add("Loans", MyCelStories.loans);

storiesOf("Community", module).add("Regular", CommunityStories.regular);

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

storiesOf("AllTransactions", module)
  .add("Regular", AllTransactionsStories.regular)
  .add("Non Transactions", AllTransactionsStories.noTransactions);

storiesOf("WalletInterest", module)
  .add("Regular", WalletInterestStories.regular)
  .add("Non Compliant", WalletInterestStories.nonCompliant);

storiesOf("BalanceHistory", module).add(
  "Regular",
  BalanceHistoryStories.regular
);

storiesOf("CoinDetails", module)
  .add("BTC", CoinDetailsStories.btc)
  .add("OMG", CoinDetailsStories.omg);

storiesOf("LoginLanding", module)
  .add("Login", LoginLandingStories.login)
  .add("Register", LoginLandingStories.register);

storiesOf("Welcome", module).add("Regular", WelcomeStories.regular);

storiesOf("Deposit", module)
  .add("BTC", DepositStories.btc)
  .add("Alternate address - BCH", DepositStories.bch)
  .add("ETH", DepositStories.eth)
  .add("With Loyalty - CEL", DepositStories.cel)
  .add("OMG", DepositStories.omg)
  .add("With Tag - XRP", DepositStories.xrp)
  .add("With Memo ID - XLM", DepositStories.xlm)
  .add("With Memo ID - EOS", DepositStories.eos);

storiesOf("Login", module).add("Regular", LoginStories.regular);
storiesOf("InterestRates", module).add("Regular", InterestRatesStories.regular);

storiesOf("SelectCoin", module)
  .add("Crypto", SelectCoinStories.crypto)
  .add("Fiat", SelectCoinStories.fiat);

storiesOf("RegisterInitial", module)
  .add("Empty", RegisterInitialStories.empty)
  .add("Filled", RegisterInitialStories.filled)
  .add("With Errors", RegisterInitialStories.withErrors)
  .add("With Referral", RegisterInitialStories.withReferral);

storiesOf("RegisterSetPin", module)
  .add("Create PIN", RegisterSetPinStories.createPin)
  .add("Confirm PIN", RegisterSetPinStories.confirmPin);
