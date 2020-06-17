import { storiesOf } from "@storybook/react-native/dist";
import WelcomeStories from "./Welcome/Welcome.stories";
import DepositStories from "./Deposit/Deposit.stories";
import LoginStories from "./Login/Login.stories";
import RegisterInitialStories from "./RegisterInitial/RegisterInitial.stories";
import RegisterSetPinStories from "./RegisterSetPin/RegisterSetPin.stories";

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

storiesOf("RegisterInitial", module)
  .add("Empty", RegisterInitialStories.empty)
  .add("Filled", RegisterInitialStories.filled)
  .add("With Errors", RegisterInitialStories.withErrors)
  .add("With Referral", RegisterInitialStories.withReferral);

storiesOf("RegisterSetPin", module)
  .add("Create PIN", RegisterSetPinStories.createPin)
  .add("Confirm PIN", RegisterSetPinStories.confirmPin);
