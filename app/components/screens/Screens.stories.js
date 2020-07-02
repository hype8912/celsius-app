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

storiesOf("AllTransactions", module)
  .add("Regular", AllTransactionsStories.regular)
  .add("Non Compliant", AllTransactionsStories.noTransactions);

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

storiesOf("WalletLanding", module)
  .add("Grid", WalletLandingStories.grid)
  .add("List", WalletLandingStories.list);

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
