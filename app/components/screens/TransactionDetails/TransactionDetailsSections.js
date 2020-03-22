import React from "react";
import { View, TouchableOpacity } from "react-native";

import formatter from "../../../utils/formatter";
import Separator from "../../atoms/Separator/Separator";
import CelText from "../../atoms/CelText/CelText";
import STYLES from "../../../constants/STYLES";
import Card from "../../atoms/Card/Card";
import CelButton from "../../atoms/CelButton/CelButton";
import ContactSupport from "../../atoms/ContactSupport/ContactSupport";
import { TRANSACTION_TYPES } from "../../../constants/DATA";
import InfoBox from "../../atoms/InfoBox/InfoBox";

export {
  CollateralSection,
  NoteSection,
  InterestSection,
  LoanInfoSection,
  Disclaimer,
  MarginCall,
  Liquidation,
  HeadingCard,
  ChangePaymentCard,
  UnlockReason,
  MarginCallCard,
  HodlInfoSection, // maybe remove
  SsnInfo,
};

// can be put directly into necessary screen
const CollateralSection = ({ coinAmount, coin }) => (
  <View style={{ paddingHorizontal: 20 }}>
    <Card padding="20 10 20 10">
      <CelText type="H6" margin="0 0 10 0">
        Locked Collateral:{" "}
      </CelText>
      <CelText type="H6" weight="bold">
        {formatter.crypto(coinAmount, coin.toUpperCase())}
      </CelText>
    </Card>
  </View>
);

// can be put directly into necessary screen
const NoteSection = ({ text }) =>
  text ? (
    <View style={{ width: "100%", paddingHorizontal: 20, paddingVertical: 20 }}>
      <CelText type="H6">Note:</CelText>
      <CelText type="H6" italic margin="5 0 0 0">
        {text}
      </CelText>
      <Separator margin={"20 0 0 0"} />
    </View>
  ) : null;

// can be put directly into necessary screen
const InterestSection = ({ interestEarned }) => (
  <View style={{ width: "100%", paddingHorizontal: 20 }}>
    <Card>
      <CelText
        weight="light"
        type="H6"
        align="center"
        style={{ marginBottom: 2 }}
      >
        So far you earned
      </CelText>
      <CelText type="H3" weight="600" align="center">
        {formatter.usd(interestEarned)}
      </CelText>
    </Card>
  </View>
);

// can be put directly into necessary screen
const LoanInfoSection = ({ navigateTo }) => (
  <Card>
    <ContactSupport copy="Your loan application was rejected, please apply for a new loan or contact our support at app@celsius.network for more details." />
    <CelButton margin="16 0 10 0" onPress={() => navigateTo("Borrow")}>
      Apply for another loan
    </CelButton>
  </Card>
);

// can be put directly into necessary screen
const Disclaimer = ({ transaction }) => {
  let text = "";
  if (transaction.type === TRANSACTION_TYPES.COLLATERAL_PENDING)
    text = "Exact collateral amount would be determined upon loan approval.";
  return (
    <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
      <Card>
        <CelText type="H6" style={{ opacity: 0.7 }}>
          {text}
        </CelText>
      </Card>
    </View>
  );
};

// can be put directly into necessary screen
const MarginCall = ({ transaction }) => (
  <View style={{ paddingHorizontal: 20 }}>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
      }}
    >
      <CelText>{transaction.coin.toUpperCase()} margin call at:</CelText>
      <CelText>{formatter.usd(transaction.loan_data.margin)}</CelText>
    </View>
    <Card>
      <CelText type="H6" style={{ opacity: 0.7 }}>
        If {transaction.coin.toUpperCase()} drops below{" "}
        {formatter.usd(transaction.loan_data.margin)} you will get a
        notification asking for additional collateral.
      </CelText>
    </Card>
    <Separator margin="20 0 20 0" />
  </View>
);

// can be put directly into necessary screen
const Liquidation = ({ transaction }) => (
  <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
      }}
    >
      <CelText>Liquidation at:</CelText>
      <CelText>{formatter.usd(transaction.loan_data.liquidation)}</CelText>
    </View>
    <Card>
      <CelText type="H6" style={{ opacity: 0.7 }}>
        If {transaction.coin.toUpperCase()} drops below{" "}
        {formatter.usd(transaction.loan_data.liquidation)} we will sell some of
        your collateral to cover the margin.
      </CelText>
    </Card>
  </View>
);

// can be put directly into necessary screen
const HeadingCard = ({ heading, text }) => (
  <View style={{ paddingHorizontal: 20 }}>
    <Card>
      <CelText type="H5" weight="500">
        {heading}
      </CelText>
      <CelText type="H6" style={{ opacity: 0.7 }}>
        {text}
      </CelText>
    </Card>
  </View>
);

// can be put directly into necessary screen
const ChangePaymentCard = ({ heading }) => (
  <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
    <Card>
      <CelText weight={"300"} type={"H5"}>
        {heading}
      </CelText>
      {/* Button removed regarding to navigation issue. When navigation issue we fix, using "replace" Stack Action,
          this code should be uncomment and on "TransactionDetails" screen "ChangePaymentCard" heading revert text to previous
       <CelText
          margin={"10 0 10 0"}
          onPress={() => navigateTo('VerifyProfile', { onSuccess: () => navigateTo("LoanSettings", { id: loan.loan_number}) })}
          weight={"300"} type={"H5"}
          color={STYLES.COLORS.CELSIUS_BLUE}>{text}
        </CelText>
      */}
    </Card>
  </View>
);

// can be put directly into necessary screen
const UnlockReason = ({ transaction }) => {
  let heading;
  if (transaction.loan_data.unlock_reason === "rejected")
    heading = "Your loan request has been rejected";
  if (transaction.loan_data.unlock_reason === "finished")
    heading = "Your loan request has been paid out";
  if (transaction.loan_data.unlock_reason === "cancelled")
    heading = "Your loan request has been cancelled";
  return (
    <HeadingCard
      heading={heading}
      text="Your collateral is now released and ready to earn interest again."
    />
  );
};

// can be put directly into necessary screen
const MarginCallCard = () => (
  <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
    <Card>
      <CelText type="H5" weight="500" margin={"10 0 10 0"}>
        Collateral Liquidation
      </CelText>
      <CelText type="H6" style={{ opacity: 0.7 }} margin={"0 0 10 0"}>
        Additional collateral was locked due to the latest margin call outbreak.
      </CelText>
    </Card>
  </View>
);

// can be put directly into necessary screen
const HodlInfoSection = ({ date, amount, coin }) => (
  <View style={{ width: "100%", paddingHorizontal: 20 }}>
    <Card>
      <CelText type="H4" color={STYLES.COLORS.MEDIUM_GRAY}>
        Keep your initial deposit of{" "}
        {formatter.crypto(amount, coin.toUpperCase())} until
        <CelText
          type="H4"
          color={STYLES.COLORS.MEDIUM_GRAY}
          weight="bold"
        >{` ${date} `}</CelText>
        to unlock your HODL reward.
      </CelText>
    </Card>
  </View>
);
// can be put directly into necessary screen
const SsnInfo = ({ navigateTo }) => (
  <View style={{ paddingHorizontal: 20 }}>
    <InfoBox
      left
      color={"white"}
      backgroundColor={STYLES.COLORS.ORANGE}
      titleText={
        "In order to confirm the interest you earned, please enter your SSN. If you don't provide it by the end of the year, all pending transactions will be cancelled automatically and you won't be able to collect the interest"
      }
      children={
        <TouchableOpacity onPress={() => navigateTo("PersonalInformation")}>
          <CelText
            color={STYLES.COLORS.WHITE}
            weight={"700"}
            margin="20 0 10 0"
          >
            Enter your SSN
          </CelText>
        </TouchableOpacity>
      }
    />
  </View>
);
