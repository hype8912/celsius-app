import React from "react";
import { View, TouchableOpacity, Linking, Image } from "react-native";

import formatter from "../../../utils/formatter";
import Separator from "../../atoms/Separator/Separator";
import Icon from "../../atoms/Icon/Icon";
import CelText from "../../atoms/CelText/CelText";
import STYLES from "../../../constants/STYLES";
import Card from "../../atoms/Card/Card";
import CelButton from "../../atoms/CelButton/CelButton";
import ContactSupport from "../../atoms/ContactSupport/ContactSupport";
import CopyButton from "../../atoms/CopyButton/CopyButton";
import { TRANSACTION_TYPES, BLOCKEXPLORERS } from "../../../constants/DATA";
import InfoBox from "../../atoms/InfoBox/InfoBox";

export const InfoSection = ({ transaction, transactionProps }) => (
  <View style={{ marginBottom: 10 }}>
    <View
      style={{
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Icon
        width={transaction.amount_usd ? "12" : "24"}
        fill={transactionProps.color}
        name={transactionProps.iconName}
        style={{ marginRight: 5 }}
      />
      <CelText color={transactionProps.color}>
        {transactionProps.statusText}
      </CelText>
    </View>

    <CelText margin="0 0 10 0" type="H1" align="center">
      {formatter.crypto(transaction.amount, transaction.coin.toUpperCase(), {
        precision: 5,
      })}
    </CelText>
    <CelText
      color={STYLES.COLORS.MEDIUM_GRAY}
      type="H3"
      align="center"
    >
      {transaction.amount_usd ?
        formatter.usd(transaction.amount_usd) :
        `${formatter.fiat(transaction.fiat_amount, transaction.fiat_currency)}`
      }
    </CelText>
  </View>
);

export const BasicSection = ({ label, value, noSeparator = false }) => (
  <View style={{ width: "100%", paddingHorizontal: 20 }}>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 20,
      }}
    >
      <CelText type="H6">{label}:</CelText>
      <CelText type="H6">{value}</CelText>
    </View>
    {!noSeparator && <Separator/>}
  </View>
);

export const BasicCardSection = ({ label, value, coin, monthly, total }) => {
  const coinSize = coin === 'USDT ERC20' ? "H6" : "H4";
  return (
    <View style={{ width: "100%", paddingHorizontal: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 20,
        }}
      >
        <CelText type="H6">{label}:</CelText>
        <CelText type="H6">{`${formatter.percentage(value)} %`}</CelText>
      </View>
      <Card>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View>
            <CelText type={"H6"}>Monthly Interest</CelText>
            <CelText type={coinSize} weight={"600"}>
              {" "}
              {formatter.crypto(monthly, coin.toUpperCase(), { precision: 2 })}
            </CelText>
          </View>
          <Separator vertical/>
          <View>
            <CelText type={"H6"}>Total Interest</CelText>
            <CelText
              color={STYLES.COLORS.CELSIUS_BLUE}
              type={coinSize}
              weight={"600"}
            >
              {formatter.crypto(total, coin.toUpperCase(), { precision: 2 })}
            </CelText>
          </View>
        </View>
      </Card>
    </View>
  )
};

export const CollateralSection = ({ coinAmount, coin }) => (
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

export const CardSection = ({
                              coinAmount,
                              coin,
                              cardText,
                              amount,
                              title,
                              noSeparator = false,
                            }) => (
  <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <CelText type="H6" margin="0 0 10 0">
        {title}
      </CelText>
      {coin && (
        <CelText type="H6">
          {formatter.crypto(coinAmount, coin.toUpperCase())}
        </CelText>
      )}
      {amount && <CelText type="H6">{formatter.usd(amount)}</CelText>}
    </View>
    {cardText && (
      <Card padding="20 10 20 10">
        <CelText type={"H6"}>{cardText}</CelText>
      </Card>
    )}
    {!noSeparator && <Separator/>}
  </View>
);

export const StatusSection = ({ transactionProps, noSeparator = false }) => (
  <View style={{ width: "100%", paddingHorizontal: 20 }}>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 20,
      }}
    >
      <CelText type="H6">Status:</CelText>
      <CelText type="H6" color={transactionProps.color}>
        {transactionProps.statusText}
      </CelText>
    </View>
    {!noSeparator && <Separator/>}
  </View>
);

export const AddressSection = ({ transaction, text, address }) => {
  const link = getBlockExplorerLink(transaction);
  return link ? (
    <View style={{ paddingHorizontal: 20 }}>
      <Card margin={"20 0 20 0"}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <CelText>{text}</CelText>
          {!!transaction.transaction_id && !!link.link && (
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "flex-start" }}
              onPress={() => Linking.openURL(link.link)}
            >
              <CelText color={STYLES.COLORS.CELSIUS_BLUE}>
                View on {link.text}
              </CelText>
              <Icon
                name="NewWindowIcon"
                height="17"
                width="17"
                fill={STYLES.COLORS.CELSIUS_BLUE}
                style={{ marginLeft: 5 }}
              />
            </TouchableOpacity>
          )}
        </View>
        {address && (
          <CelText weight="500" type="H4">
            {address.split("?")[0]}
          </CelText>
        )}
      </Card>
      {transaction.coin === "xrp" && (
        <Card margin={"10 0 20 0"}>
          <CelText weight="500" type="H4">
            Destination Tag: {address.split("=")[1]}
          </CelText>
        </Card>
      )}
      {(transaction.coin === "xlm" || transaction.coin === "eos") && (
        <Card margin={"10 0 20 0"}>
          <CelText weight="500" type="H4">
            Memo ID: {address.split("=")[1]}
          </CelText>
        </Card>
      )}
    </View>
  ) : null;
};

export const TransactionSection = ({ transaction, text, actions }) =>
  transaction && transaction.transaction_id ? (
    <View style={{ paddingHorizontal: 20 }}>
      <Card margin={"20 0 20 0"}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <CelText style={{ color: STYLES.COLORS.MEDIUM_GRAY }}>{text}</CelText>
        </View>
        <CelText weight="500" style={{ paddingBottom: 10 }} type="H4">
          {transaction.transaction_id}
        </CelText>
        <CopyButton
          text="Copy ID"
          color={STYLES.COLORS.CELSIUS_BLUE}
          copyText={transaction.transaction_id}
          onCopy={() => {
            actions.showMessage(
              "success",
              "Transaction ID copied to clipboard!"
            );
          }}
        />
      </Card>
    </View>
  ) : null;

export const SentTo = ({ transaction, text }) =>
  transaction.transfer_data.claimer ? (
    <View style={{ paddingHorizontal: 20 }}>
      <Card margin={"20 0 20 0"}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <CelText style={{ color: STYLES.COLORS.MEDIUM_GRAY }}>{text}</CelText>
        </View>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          {!transaction.transfer_data ||
          !transaction.transfer_data.claimer ||
          !transaction.transfer_data.claimer.profile_picture ? (
            <Image
              source={require("../../../../assets/images/empty-profile/empty-profile.png")}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50 / 2,
                borderColor: "#ffffff",
                borderWidth: 3,
              }}
            />
          ) : (
            <Image
              source={{
                uri: transaction.transfer_data.claimer.profile_picture,
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50 / 2,
                borderColor: "#ffffff",
                borderWidth: 3,
                ...STYLES.SHADOW_STYLES,
              }}
            />
          )}
          {transaction.transfer_data && transaction.transfer_data.claimer && (
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignContent: "center",
                paddingLeft: 10,
              }}
            >
              <CelText weight="600" type="H4">
                {transaction.transfer_data.claimer.first_name}{" "}
                {transaction.transfer_data.claimer.last_name}
              </CelText>
              <CelText
                style={{ paddingTop: 5 }}
                color={STYLES.COLORS.CELSIUS_BLUE}
                type="H6"
              >
                {transaction.transfer_data.claimer.email
                  ? transaction.transfer_data.claimer.email
                  : null}
              </CelText>
            </View>
          )}
          <View style={{ paddingTop: 10 }}>
            <Icon
              name="Celsius"
              fill={STYLES.COLORS.CELSIUS_BLUE}
              height={30}
              width={30}
            />
          </View>
        </View>
      </Card>
    </View>
  ) : null;

export const SentFrom = ({ transaction, text }) =>
  transaction ? (
    <View style={{ paddingHorizontal: 20 }}>
      <Card margin={"20 0 20 0"}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <CelText style={{ color: STYLES.COLORS.MEDIUM_GRAY }}>{text}</CelText>
        </View>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          {!transaction.transfer_data ||
          !transaction.transfer_data.sender ||
          !transaction.transfer_data.sender.profile_picture ? (
            <Image
              source={require("../../../../assets/images/empty-profile/empty-profile.png")}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50 / 2,
                borderColor: "#ffffff",
                borderWidth: 3,
              }}
            />
          ) : (
            <Image
              source={{ uri: transaction.transfer_data.sender.profile_picture }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50 / 2,
                borderColor: "#ffffff",
                borderWidth: 3,
                ...STYLES.SHADOW_STYLES,
              }}
            />
          )}
          {transaction.transfer_data && transaction.transfer_data.sender && (
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignContent: "center",
                paddingLeft: 10,
              }}
            >
              <CelText weight="600" type="H4">
                {transaction.transfer_data.sender.first_name}{" "}
                {transaction.transfer_data.sender.last_name}
              </CelText>
              <CelText
                style={{ paddingTop: 5 }}
                color={STYLES.COLORS.CELSIUS_BLUE}
                type="H6"
              >
                {transaction.transfer_data.sender.email
                  ? transaction.transfer_data.sender.email
                  : " "}
              </CelText>
            </View>
          )}
          <View style={{ paddingTop: 10 }}>
            <Icon
              name="Celsius"
              fill={STYLES.COLORS.CELSIUS_BLUE}
              height={30}
              width={30}
            />
          </View>
        </View>
      </Card>
    </View>
  ) : null;

export const ReferrerHODL = ({ transaction, text, lockedValue }) => (
  <View style={{ paddingHorizontal: 20 }}>
    <Card margin={"20 0 20 0"}>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <CelText style={{ color: STYLES.COLORS.MEDIUM_GRAY }}>{text}</CelText>
      </View>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        {!transaction.referral_data.referred.profile_picture ? (
          <Image
            source={require("../../../../assets/images/empty-profile/empty-profile.png")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              borderColor: "#ffffff",
              borderWidth: 3,
            }}
          />
        ) : (
          <Image
            source={{ uri: transaction.referral_data.referred.profile_picture }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              borderColor: "#ffffff",
              borderWidth: 3,
            }}
          />
        )}
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignContent: "center",
            paddingLeft: 10,
          }}
        >
          <CelText weight="600" type="H4">
            {formatter.hideTextExceptFirstNLetters(
              transaction.referral_data.referred.first_name
            )}{" "}
            {formatter.hideTextExceptFirstNLetters(
              transaction.referral_data.referred.last_name
            )}
          </CelText>
          <CelText
            style={{ paddingTop: 5 }}
            color={STYLES.COLORS.CELSIUS_BLUE}
            type="H6"
          >
            {transaction.referral_data.referred.email
              ? formatter.maskEmail(transaction.referral_data.referred.email)
              : null}
          </CelText>
        </View>
      </View>
      <CelText
        style={{ marginTop: 20 }}
        type="H5"
        color={STYLES.COLORS.MEDIUM_GRAY}
      >
        If{" "}
        {formatter.hideTextExceptFirstNLetters(
          transaction.referral_data.referred.first_name
        )}{" "}
        keeps initial deposit until
        <CelText
          type="H5"
          color={STYLES.COLORS.DARK_GRAY}
          weight="600"
        >{` ${lockedValue} `}</CelText>
        , your referral reward will unlock.
      </CelText>
    </Card>
  </View>
);

export const Referrer = ({ transaction, text }) => (
  <View style={{ paddingHorizontal: 20 }}>
    <Card margin={"20 0 20 0"}>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <CelText style={{ color: STYLES.COLORS.MEDIUM_GRAY }}>{text}</CelText>
      </View>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        {!transaction.referral_data.referred.profile_picture ? (
          <Image
            source={require("../../../../assets/images/empty-profile/empty-profile.png")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              borderColor: "#ffffff",
              borderWidth: 3,
            }}
          />
        ) : (
          <Image
            source={{ uri: transaction.referral_data.referred.profile_picture }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              borderColor: "#ffffff",
              borderWidth: 3,
            }}
          />
        )}
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignContent: "center",
            paddingLeft: 10,
          }}
        >
          <CelText weight="600" type="H4">
            {formatter.hideTextExceptFirstNLetters(
              transaction.referral_data.referred.first_name
            )}{" "}
            {formatter.hideTextExceptFirstNLetters(
              transaction.referral_data.referred.last_name
            )}
          </CelText>
          <CelText
            style={{ paddingTop: 5 }}
            color={STYLES.COLORS.CELSIUS_BLUE}
            type="H6"
          >
            {transaction.referral_data.referred.email
              ? formatter.maskEmail(transaction.referral_data.referred.email)
              : null}
          </CelText>
        </View>
      </View>
    </Card>
  </View>
);

export const Referred = ({ transaction, text }) => (
  <View style={{ paddingHorizontal: 20 }}>
    <Card margin={"20 0 20 0"}>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <CelText style={{ color: STYLES.COLORS.MEDIUM_GRAY }}>{text}</CelText>
      </View>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        {!transaction.referral_data.referrer.profile_picture ? (
          <Image
            source={require("../../../../assets/images/empty-profile/empty-profile.png")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              borderColor: "#ffffff",
              borderWidth: 3,
            }}
          />
        ) : (
          <Image
            source={{ uri: transaction.referral_data.referrer.profile_picture }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              borderColor: "#ffffff",
              borderWidth: 3,
            }}
          />
        )}
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignContent: "center",
            paddingLeft: 10,
          }}
        >
          <CelText weight="600" type="H4">
            {formatter.hideTextExceptFirstNLetters(
              transaction.referral_data.referrer.first_name
            )}{" "}
            {formatter.hideTextExceptFirstNLetters(
              transaction.referral_data.referrer.last_name
            )}
          </CelText>
          <CelText
            style={{ paddingTop: 5 }}
            color={STYLES.COLORS.CELSIUS_BLUE}
            type="H6"
          >
            {transaction.referral_data.referrer.email
              ? formatter.maskEmail(transaction.referral_data.referrer.email)
              : null}
          </CelText>
        </View>
      </View>
    </Card>
  </View>
);

export const ReferrerPending = ({ transaction, text }) => (
  <View style={{ paddingHorizontal: 20 }}>
    <Card margin={"20 0 0 0"}>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <CelText style={{ color: STYLES.COLORS.MEDIUM_GRAY }}>{text}</CelText>
      </View>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        {!transaction.referral_data.referred.profile_picture ? (
          <Image
            source={require("../../../../assets/images/empty-profile/empty-profile.png")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              borderColor: "#ffffff",
              borderWidth: 3,
            }}
          />
        ) : (
          <Image
            source={{ uri: transaction.referral_data.referred.profile_picture }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              borderColor: "#ffffff",
              borderWidth: 3,
            }}
          />
        )}
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignContent: "center",
            paddingLeft: 10,
          }}
        >
          <CelText weight="600" type="H4">
            {formatter.hideTextExceptFirstNLetters(
              transaction.referral_data.referred.first_name
            )}{" "}
            {formatter.hideTextExceptFirstNLetters(
              transaction.referral_data.referred.last_name
            )}
          </CelText>
          <CelText
            style={{ paddingTop: 5 }}
            color={STYLES.COLORS.CELSIUS_BLUE}
            type="H6"
          >
            {transaction.referral_data.referred.email
              ? formatter.maskEmail(transaction.referral_data.referred.email)
              : null}
          </CelText>
        </View>
      </View>
    </Card>
    <Card>
      <CelText type="H5" color={STYLES.COLORS.MEDIUM_GRAY}>
        Your award is yet to be confirmed. You will be able to see it in your
        wallet, soon.
      </CelText>
    </Card>
  </View>
);

export const ReferredPending = ({ transaction, text }) => (
  <View style={{ paddingHorizontal: 20 }}>
    <Card margin={"20 0 0 0"}>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <CelText style={{ color: STYLES.COLORS.MEDIUM_GRAY }}>{text}</CelText>
      </View>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        {!transaction.referral_data.referrer.profile_picture ? (
          <Image
            source={require("../../../../assets/images/empty-profile/empty-profile.png")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              borderColor: "#ffffff",
              borderWidth: 3,
            }}
          />
        ) : (
          <Image
            source={{ uri: transaction.referral_data.referrer.profile_picture }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              borderColor: "#ffffff",
              borderWidth: 3,
            }}
          />
        )}
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignContent: "center",
            paddingLeft: 10,
          }}
        >
          <CelText weight="600" type="H4">
            {formatter.hideTextExceptFirstNLetters(
              transaction.referral_data.referrer.first_name
            )}{" "}
            {formatter.hideTextExceptFirstNLetters(
              transaction.referral_data.referrer.last_name
            )}
          </CelText>
          <CelText
            style={{ paddingTop: 5 }}
            color={STYLES.COLORS.CELSIUS_BLUE}
            type="H6"
          >
            {transaction.referral_data.referrer.email
              ? formatter.maskEmail(transaction.referral_data.referrer.email)
              : null}
          </CelText>
        </View>
      </View>
    </Card>
    <Card>
      <CelText type="H5" color={STYLES.COLORS.MEDIUM_GRAY}>
        Your award is yet to be confirmed. You will be able to see it in your
        wallet, soon.
      </CelText>
    </Card>
  </View>
);

export const NoteSection = ({ text }) =>
  text ? (
    <View style={{ width: "100%", paddingHorizontal: 20, paddingVertical: 20 }}>
      <CelText type="H6">Note:</CelText>
      <CelText type="H6" italic margin="5 0 0 0">{text}</CelText>
      <Separator margin={"20 0 0 0"}/>
    </View>
  ) : null;

export const InterestSection = ({ interestEarned }) => (
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

export const LoanInfoSection = ({ navigateTo }) => (
  <Card>
    <ContactSupport
      copy="Your loan application was rejected, please apply for a new loan or contact our support at app@celsius.network for more details."/>

    <CelButton margin="16 0 10 0" onPress={() => navigateTo("Borrow")}>
      Apply for another loan
    </CelButton>
  </Card>
);

export const Disclaimer = ({ transaction }) => {
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

export const MarginCall = ({ transaction }) => (
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
    <Separator margin="20 0 20 0"/>
  </View>
);

export const Liquidation = ({ transaction }) => (
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

export const HeadingCard = ({ heading, text }) => (
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

export const ChangePaymentCard = ({ heading }) => (
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

export const UnlockReason = ({ transaction }) => {
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

export const MarginCallCard = () => (
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

export const HodlInfoSection = ({ date, amount, coin }) => (
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

export const SsnInfo = ({ navigateTo }) => (
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

function getBlockExplorerLink(transaction) {
  const tId = transaction.transaction_id;
  switch (transaction.coin) {
    // BTC
    case "btc":
      return {
        link: BLOCKEXPLORERS.btc && `${BLOCKEXPLORERS.btc}${tId}`,
        text: "blockchain",
      };
    // BCH
    case "bch":
      return {
        link: BLOCKEXPLORERS.bch && `${BLOCKEXPLORERS.bch}${tId}`,
        text: "blockdozer",
      };
    // LTC
    case "ltc":
      return {
        link: BLOCKEXPLORERS.ltc && `${BLOCKEXPLORERS.ltc}${tId}`,
        text: "chainz",
      };
    // XRP
    case "xrp":
      return {
        link: BLOCKEXPLORERS.xrp && `${BLOCKEXPLORERS.xrp}${tId}`,
        text: "xrpcharts",
      };
    // XLM
    case "xlm":
      return {
        link: BLOCKEXPLORERS.xlm && `${BLOCKEXPLORERS.xlm}${tId}`,
        text: "stellarchain",
      };
    // EOS
    case "eos":
      return {
        link: BLOCKEXPLORERS.eos && `${BLOCKEXPLORERS.eos}${tId}`,
        text: "bloks.io",
      };
    // DASH
    case "dash":
      return {
        link: BLOCKEXPLORERS.dash && `${BLOCKEXPLORERS.dash}${tId}`,
        text: "chainz",
      };
    // ZEC
    case "zec":
      return {
        link: BLOCKEXPLORERS.zec && `${BLOCKEXPLORERS.zec}${tId}`,
        text: "chain.so",
      };
    // BTG
    case "btg":
      return {
        link: BLOCKEXPLORERS.btg && `${BLOCKEXPLORERS.btg}${tId}`,
        text: "btgexplorer",
      };

    // ETH & ERC20
    case "eth":
    case "dai":
    case "pax":
    case "zrx":
    case "tusd":
    case "gusd":
    case "usdc":
    case "cel":
    case "omg":
      return {
        link: BLOCKEXPLORERS.eth && `${BLOCKEXPLORERS.eth}${tId}`,
        text: "etherscan",
      };

    default:
      return null;
  }
}
