import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import BigNumber from "bignumber.js";

import TransactionWithdrawDetailsStyle from "./TransactionDetailsWithdraw.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import TxInfoSection from "../../atoms/TxInfoSection/TxInfoSection";
import TxAddressSection from "../../atoms/TxAddressSection/TxAddressSection";
import TxBasicSection from "../../atoms/TxBasicSection/TxBasicSection";
import CelButton from "../../atoms/CelButton/CelButton";
import { TRANSACTION_TYPES } from "../../../constants/DATA";
import InfoBox from "../../atoms/InfoBox/InfoBox";
import CelText from "../../atoms/CelText/CelText";
import Icon from "../../atoms/Icon/Icon";
import CheckEmailInfoBox from "../../atoms/CheckEmailInfoBox/CheckEmailInfoBox";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { SCREENS } from "../../../constants/SCREENS";
import API from "../../../constants/API";
import apiUtil from "../../../utils/api-util";

class TransactionDetailsWithdraw extends Component {
  static propTypes = {
    transaction: PropTypes.instanceOf(Object),
    callsInProgress: PropTypes.instanceOf(Array),
    navigateTo: PropTypes.func,
    cancelWithdrawal: PropTypes.func,
    withdrawalSettings: PropTypes.instanceOf(Object),
  };
  static defaultProps = {};

  render() {
    // const style = TransactionDetailsDepositsStyle();
    const {
      transaction,
      navigateTo,
      cancelWithdrawal,
      callsInProgress,
      withdrawalSettings,
    } = this.props;
    const transactionProps = transaction.uiProps;
    const style = TransactionWithdrawDetailsStyle();

    const cancellable = ![
      TRANSACTION_TYPES.WITHDRAWAL_CANCELED,
      TRANSACTION_TYPES.WITHDRAWAL_CONFIRMED,
    ].includes(transaction.type);

    const isCancelling = apiUtil.areCallsInProgress(
      [API.CANCEL_WITHDRAWAL_TRANSACTION],
      callsInProgress
    );

    return (
      <RegularLayout>
        <View>
          <TxInfoSection
            margin="40 0 20 0"
            transaction={transaction}
            transactionProps={transactionProps}
          />

          {transaction.type === TRANSACTION_TYPES.WITHDRAWAL_PENDING_REVIEW &&
            new BigNumber(transaction.amount_usd)
              .abs()
              .isLessThan(withdrawalSettings.maximum_withdrawal_amount) && (
              <InfoBox
                backgroundColor={getColor(COLOR_KEYS.LINK)}
                padding={"20 30 20 10"}
              >
                <View style={style.direction}>
                  <Icon name={"Info"} height="25" width="25" fill="#FFFFFF" />
                  <CelText color="#FFFFFF" margin={"0 10 0 10"}>
                    Due to your recent volume of withdrawals, this transaction
                    may be delayed up to 24 hours for security reasons.
                  </CelText>
                </View>
              </InfoBox>
            )}

          {transaction.type === TRANSACTION_TYPES.WITHDRAWAL_PENDING_REVIEW &&
            new BigNumber(transaction.amount_usd)
              .abs()
              .isGreaterThan(withdrawalSettings.maximum_withdrawal_amount) && (
              <InfoBox
                backgroundColor={getColor(COLOR_KEYS.LINK)}
                padding={"20 30 20 10"}
              >
                <View style={style.direction}>
                  <Icon name={"Info"} height="25" width="25" fill="#FFFFFF" />
                  <CelText color="#FFFFFF" margin={"0 10 0 10"}>
                    Due to the larger amount of funds being sent, this
                    transaction may take a little bit longer.
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
            value={moment.utc(transaction.time).format("D MMM YYYY")}
          />
          <TxBasicSection
            label={"Time"}
            value={moment.utc(transaction.time).format("h:mm A (z)")}
          />

          <CelButton
            margin={"20 0 0 0"}
            onPress={() => navigateTo(SCREENS.WALLET_LANDING)}
          >
            Go Back to Wallet
          </CelButton>
          {cancellable && (
            <CelButton
              margin={"20 0 0 0"}
              color="red"
              basic
              onPress={() => cancelWithdrawal(transaction.id)}
              loading={isCancelling}
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
