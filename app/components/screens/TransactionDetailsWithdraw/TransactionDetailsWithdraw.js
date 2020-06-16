import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
// eslint-disable-next-line import/no-unresolved
import { openInbox } from "react-native-email-link";

import TransactionWithdrawDetailsStyle from "./TransactionDetailsWithdraw.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import TxInfoSection from "../../atoms/TxInfoSection/TxInfoSection";
import TxAddressSection from "../../atoms/TxAddressSection/TxAddressSection";
import TxBasicSection from "../../atoms/TxBasicSection/TxBasicSection";
import CelButton from "../../atoms/CelButton/CelButton";
import STYLES from "../../../constants/STYLES";
import { TRANSACTION_TYPES } from "../../../constants/DATA";
import InfoBox from "../../atoms/InfoBox/InfoBox";
import CelText from "../../atoms/CelText/CelText";
import Icon from "../../atoms/Icon/Icon";
import CheckEmailInfoBox from "../../atoms/CheckEmailInfoBox/CheckEmailInfoBox";

class TransactionDetailsWithdraw extends Component {
  static propTypes = {
    transaction: PropTypes.instanceOf(Object),
    navigateTo: PropTypes.func,
    cancelWithdrawal: PropTypes.func,
  };
  static defaultProps = {};

  render() {
    // const style = TransactionDetailsDepositsStyle();
    const { transaction, navigateTo, cancelWithdrawal } = this.props;
    const transactionProps = transaction.uiProps;
    const style = TransactionWithdrawDetailsStyle();

    return (
      <RegularLayout>
        <View>
          <TxInfoSection
            margin="40 0 20 0"
            transaction={transaction}
            transactionProps={transactionProps}
          />

          {transaction.type === TRANSACTION_TYPES.WITHDRAWAL_PENDING_REVIEW && (
            <InfoBox
              backgroundColor={STYLES.COLORS.CELSIUS_BLUE}
              padding={"20 30 20 10"}
            >
              <View style={style.direction}>
                <Icon
                  name={"Info"}
                  height="25"
                  width="25"
                  fill={STYLES.COLORS.WHITE}
                />
                <CelText color={"white"} margin={"0 10 0 10"}>
                  Due to the larger amount of funds being sent, this transaction
                  may take a little bit longer.
                </CelText>
              </View>
            </InfoBox>
          )}

          {transaction.type ===
            TRANSACTION_TYPES.WITHDRAWAL_PENDING_VERIFICATION && (
            <CheckEmailInfoBox
              infoText={
                "In order to proceed, you must confirm the transaction via email."
              }
            />
          )}

          <TxAddressSection
            transaction={transaction}
            address={transaction.to_address}
            text="Withdrawn to:"
          />
          <TxBasicSection
            label={"Date"}
            value={moment(transaction.time).format("D MMM YYYY")}
          />
          <TxBasicSection
            label={"Time"}
            value={moment.utc(transaction.time).format("h:mm A (z)")}
          />
          {transaction.type ===
            TRANSACTION_TYPES.WITHDRAWAL_PENDING_VERIFICATION && (
            <CelButton
              margin={"20 0 0 0"}
              onPress={() => openInbox()}
              size={"small"}
              color={"green"}
            >
              Check your email!
            </CelButton>
          )}
          <CelButton
            margin={"20 0 0 0"}
            onPress={() => navigateTo("WalletLanding")}
          >
            Go Back to Wallet
          </CelButton>
          {transaction.type !== TRANSACTION_TYPES.WITHDRAWAL_CANCELED && (
            <CelButton
              margin={"20 0 0 0"}
              color={STYLES.COLORS.RED}
              basic
              onPress={() => cancelWithdrawal(transaction.id)}
            >
              Cancel Withdrawal
            </CelButton>
          )}
        </View>
      </RegularLayout>
    );
  }
}

export default TransactionDetailsWithdraw;
